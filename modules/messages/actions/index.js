"use server";

import { db } from "@/lib/db";
import { MessageType, MessageRole } from "@prisma/client";

export async function createMessageModification(projectId, content) {
  try {
    const message = await db.message.create({
      data: {
        type: MessageType.RESULT,
        role: MessageRole.USER,
        content: content,
        projectId: projectId,
      },
    });

    return {
      success: true,
      message: message,
    };
  } catch (error) {
    console.error("Error creating message:", error);
    return {
      success: false,
      error: error.message,
    };
  }
}
