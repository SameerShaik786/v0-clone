"use server";

import { inngest } from "@/inngest/client";
import { db } from "@/lib/db"
import { getCurrentUser } from "@/modules/auth/actions"
import {MessageRole,MessageType} from "@prisma/client"
import { generateSlug } from "random-word-slugs";


export const createProject = async (value) => {
    const user = await getCurrentUser();

    if(!user) throw new Error("Unauthorized")

    const newProject = await db.project.create({
    data: {
      name: generateSlug(2, { format: "kebab" }),
      userId: user.id,
      messages: {
        create:{
          content: value,
          role: MessageRole.USER,
          type: MessageType.RESULT,
        },
      },
    },
    include:{
        messages:true,
    }
  });

    await inngest.send({
        name:"code-agent/run",
        data:{
            value: value,
            projectId: newProject.id
        }
    })

    return newProject
}

export const getProjects = async() => {
    const user = await getCurrentUser()

    if(!user) throw new Error("Unauthorized User")
    
    const allProjects = await db.project.findMany({
        where:{
            userId: user.id,
        },
        orderBy:{
            createdAt: "desc"
        }
    })
    return allProjects
}

export const getProjectById = async (id) => {
    const user = await getCurrentUser()

    if(!user) throw new Error("Unauthorized User")

    const project = await db.project.findUnique({
        where:{
            userId: user.id,
            id: id
        }
    })
    return project
}