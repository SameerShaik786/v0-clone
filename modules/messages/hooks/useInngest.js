"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createMessageModification } from "../actions";
import { useState, useCallback } from "react";

// Hook to send messages and trigger Inngest processing
export const useMessageSend = (projectId) => {
    const queryClient = useQueryClient()
    const [isProcessing, setIsProcessing] = useState(false)

    const mutation = useMutation({
        mutationFn: ({ projectId, content }) => createMessageModification(projectId, content),
        onMutate: () => {
            // Start processing state when mutation begins
            setIsProcessing(true)
        },
        onSuccess: () => {
            // Invalidate to show the user message immediately
            queryClient.invalidateQueries({ queryKey: ["projects", projectId] })
        },
        onError: () => {
            setIsProcessing(false)
        }
    })

    // Call this when assistant response is detected to stop processing state
    const stopProcessing = useCallback(() => {
        setIsProcessing(false)
    }, [])

    return {
        ...mutation,
        isProcessing,
        stopProcessing
    }
}
