"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createMessageModification } from "../actions";


export const useMessageSend = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (value) => createMessageModification(value),
        onSuccess: () => queryClient.invalidateQueries(["projects"])
    })
}