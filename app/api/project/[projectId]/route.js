import { db } from "@/lib/db";
import { getCurrentUser } from "@/modules/auth/actions";
import { NextResponse } from "next/server";
import { inngest } from "@/inngest/client";
import { includes } from "zod";

export async function GET(req, {params}) {
    const { projectId } = await params;
    const user = await getCurrentUser()

    if (!user) {
        return NextResponse.json(
            { error: "Unauthorized" },
            { status: 401 }
        );
    }
    
    const data = await db.project.findFirst({
        where: {
            userId: user.id,
            id: projectId
        }
    })
    console.log(data)
    if (!data) {
        return NextResponse.json(
            { error: "Project not found" },
            { status: 404 }
        );
    }

    const messages = await db.message.findMany({
        where:{
            projectId,
        },
        orderBy:{
            createdAt: "asc"
        },
        include:{
            fragments: true
        }
    })
    console.log(messages)

    if(messages.length == 0) throw new Error("Messages are not found")

    return NextResponse.json({data,messages})
}

export async function POST(request) {
  try {
    const { event, data } = await request.json();

    if (!event) {
      console.error("Event name is missing");
      return new Response(
        JSON.stringify({ error: "Event name is required" }),
        { status: 400 }
      );
    }

    if (!data) {
      console.error("Event data is missing");
      return new Response(
        JSON.stringify({ error: "Event data is required" }),
        { status: 400 }
      );
    }

    console.log("Sending event to Inngest:", { event, data });

    // Send event to Inngest
    const result = await inngest.send({
      name: "code-agent/run",
      data: data,
    });

    console.log("Inngest response:", result);

    return new Response(
      JSON.stringify({
        success: true,
        message: "Event sent successfully",
        eventId: result[0]?.ids?.[0],
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Inngest send error:", error);
    return new Response(
      JSON.stringify({ 
        error: error.message || "Failed to send event" 
      }),
      { status: 500 }
    );
  }
}
