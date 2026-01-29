import { db } from "@/lib/db";
import { getCurrentUser } from "@/modules/auth/actions";
import { NextResponse } from "next/server";
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