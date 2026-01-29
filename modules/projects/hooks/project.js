"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createProject, getProjectById, getProjects } from "@/modules/projects/actions/index"

export const useGetAllProjects = () => {
    return useQuery({
        queryKey: ["projects"],
        queryFn: async () => {
            const res = await fetch("/api")
            if (!res.ok) throw new Error("Failed to fetch")
            console.log(res)
            return res.json()
        }
    })
}

export const useGetProjectById = (projectId) => {
    return useQuery({
        queryKey: ["projects", projectId],
        queryFn: async () => {
            if (!projectId) {
                throw new Error("Missing projectId");
            }
            const res = await fetch(`/api/project/${projectId}`)
            if (!res.ok) throw new Error("Failed to fetch")
            console.log("Fetched successfully")
            return res.json();
        },
        enabled: Boolean(projectId),
    });
};

export const useCreateProject = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (value) => createProject(value),
        onSuccess: () => queryClient.invalidateQueries(["projects"])
    })
}