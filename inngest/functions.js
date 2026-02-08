import z from "zod";
import { inngest } from "./client";
import { grok, createAgent, createTool, createNetwork, gemini } from "@inngest/agent-kit";
import Sandbox from "e2b";
import { PROMPT, RESPONSE_PROMPT } from "@/prompt";
import { lastAssistantTextMessageContent } from "./utils";
import { MessageType, MessageRole } from "@prisma/client"
import { db } from "@/lib/db";


export const codeAgent = inngest.createFunction(
  { id: "code-agent" },
  { event: "code-agent/run" },
  async ({ event, step }) => {
    const { sandboxId } = await step.run("create-sandbox", async () => {
      const sandbox = await Sandbox.create("vo-clone-build2")

      // Start Next.js dev server
      await sandbox.commands.run(
        "cd /home/user && npx next dev -H 0.0.0.0 -p 3000",
        { background: true }
      )

      // Wait for server to be ready with active polling
      const maxAttempts = 30; // 30 attempts * 2 seconds = 60 seconds max
      for (let i = 0; i < maxAttempts; i++) {
        await new Promise(resolve => setTimeout(resolve, 2000));
        try {
          const check = await sandbox.commands.run(
            'curl -s -o /dev/null -w "%{http_code}" http://localhost:3000',
            { timeout: 5000 }
          );
          const status = (check.stdout || '').trim();
          if (status === '200' || status === '304') {
            console.log(`Server ready after ${(i + 1) * 2} seconds`);
            break;
          }
        } catch {
          // Server not ready yet, continue polling
        }
      }

      return { sandboxId: sandbox.sandboxId }
    })


    // Step 2: non-blocking readiness


    const codingAgent = createAgent({
      name: "code Agent",
      description: "Executes code in a sandbox",
      system: PROMPT,
      model: gemini({ model: "gemini-2.5-flash" }),
      tools: [
        //terminal
        createTool({
          name: "terminal",
          description: "It is a terminal to execute commands",
          parameters: z.object({
            commands: z.string()
          }),
          handler: async ({ commands }, { step }) => {
            await step?.run("runCommand", async () => {
              const buffer = { stdout: "", stderror: "" }
              try {
                const sandbox = await Sandbox.connect(sandboxId)
                const result = await sandbox.commands.run(commands, {
                  background: true,
                  onStdout: (data) => {
                    buffer["stdout"] += data;
                  },
                  onStderr: (data) => {
                    buffer["stderror"] += data
                  }
                })
                return buffer.stdout
              }
              catch (error) {
                console.log(`Command failed: ${error} \n stdout: ${buffer.stdout} \n stderror: ${buffer.stderror}`);
                return `Command failed: ${error} \n stdout: ${buffer.stdout} \n stderror: ${buffer.stderror}`;
              }
            })
          }
        }),

        //createOrUpdateFile
        createTool({
          name: "createFile",
          description: "To create or update file in the sandbox",
          parameters: z.object({
            files: z.array(
              z.object({
                path: z.string(),
                content: z.string()
              })
            )
          }),
          handler: async ({ files }, { step, network }) => {
            const newFiles = await step?.run(
              "createOrUpdateFiles", async () => {
                try {
                  const updatedFiles = network.state?.data.files || {}
                  const sandbox = await Sandbox.connect(sandboxId)
                  for (let file of files) {
                    await sandbox.files.write(file.path, file.content)
                    updatedFiles[file.path] = file.content
                  }
                  return updatedFiles
                }
                catch (error) {
                  console.log('Error' + error)
                  return "Error" + error
                }
              }
            )
            if (typeof newFiles === "object") {
              network.state.data.files = newFiles
            }
          },
        }),

        //reading the file
        createTool({
          name: "readFile",
          description: "To read the file in the sandbox",
          parameters: z.object({
            files: z.array(z.string())
          }),
          handler: async ({ files }, { step }) => {
            return await step?.run("readFile", async () => {
              try {
                const data = []
                const sandbox = await Sandbox.connect(sandboxId)
                for (const file of files) {
                  const result = await sandbox.files.read(file)
                  data.push({ path: file, content: result })
                }
                return JSON.stringify(contents)
              }
              catch (error) {
                console.log('Error in reading the file', error)
                return "ERROR" + error
              }
            })
          }
        })

      ],
      lifecycle: {
        onResponse: async ({ result, network }) => {
          const lastAssistantMessageText = lastAssistantTextMessageContent(result)

          if (lastAssistantMessageText && network) {
            if (lastAssistantMessageText.includes("<task_summary>")) {
              network.state.data.summary = lastAssistantMessageText
            }
          }
          return result;
        }
      }
    })



    //mulitple agents over the network
    const network = createNetwork({
      name: "coding agent network",
      maxIter: 5,
      agents: [codingAgent],
      router: async ({ network }) => {
        const summary = network?.state.data.summary

        if (summary) {
          return
        }
        return codingAgent
      }
    })

    const responseAgent = createAgent({
      name: "Response Agent",
      description: "The Final agent to respond",
      system: RESPONSE_PROMPT,
      model: gemini({ model: "gemini-2.5-flash" }),
    })

    try {
      const result = await network.run(event.data.value);
      console.log("Final Network Result:", result);
      console.log("Network State:", result.state);

      const summary = result?.state?.data?.summary || "";

      let displayContent = "";

      if (summary) {
        try {
          const { output: responseData } = await responseAgent.run(summary);

          if (responseData && Array.isArray(responseData) && responseData.length > 0) {
            if (responseData[0].type !== "text") {
              displayContent = "Here you go,";
            } else if (Array.isArray(responseData[0].content)) {
              displayContent = responseData[0].content.map((c) => c).join("");
            } else {
              displayContent = responseData[0].content || "";
            }
          } else {
            displayContent = summary;
          }
        } catch (error) {
          console.error("ResponseAgent error:", error);
          displayContent = summary;
        }
      } else {
        displayContent = "Process completed";
      }

      let sandboxUrl = null;
      try {
        const sandbox = await Sandbox.connect(sandboxId);
        sandboxUrl = `https://${sandbox.getHost(3000)}`;
      } catch (error) {
        console.log(`Could not connect to sandbox: ${error.message}`);
      }

      await step.run("save-the-result", async () => {
        const isError = !result?.state.data.summary || Object.keys(result.state.data.files || {}).length === 0

        if (isError) {
          return await db.message.create({
            data: {
              type: MessageType.ERROR,
              role: MessageRole.ASSISTANT,
              content: "Something went wrong. Please try again",
              projectId: event.data.projectId
            }
          })
        }

        const fragmentData = {
          title: "Untitled",
          files: result.state.data.files
        };

        if (sandboxUrl) {
          fragmentData.sandboxUrl = sandboxUrl;
        }

        return await db.message.create({
          data: {
            type: MessageType.RESULT,
            projectId: event.data.projectId,
            role: MessageRole.ASSISTANT,
            content: displayContent,
            fragments: {
              create: fragmentData
            }
          }
        })
      })

      return {
        sandboxUrl: sandboxUrl,
        title: "Untitled",
        files: result.state.data.files,
        summary: displayContent,
      }
    } catch (error) {
      console.error("Network/API error:", error);

      // Save error message to database so frontend can display it
      await step.run("save-error-result", async () => {
        return await db.message.create({
          data: {
            type: MessageType.ERROR,
            role: MessageRole.ASSISTANT,
            content: "Something went wrong. Please try again later.",
            projectId: event.data.projectId
          }
        })
      })

      return {
        error: true,
        message: error.message || "API request failed"
      }
    }
  },
);
