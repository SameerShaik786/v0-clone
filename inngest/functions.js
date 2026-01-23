import { inngest } from "./client";
import { gemini, createAgent } from "@inngest/agent-kit";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {

    const helloAgent = createAgent({
      name: "Hello Agent",
      description: "A simple agent that say hello",
      system: "You are a helpful assistant, Always greet with the enthusiam",
      model: gemini({ model: "gemini-2.5-flash" })
    })

    const { output } = await helloAgent.run("Say Hello to the user!");

    return {
      message: output[0].content
    }
  },
);
