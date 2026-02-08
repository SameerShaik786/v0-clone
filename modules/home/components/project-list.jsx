"use client";
import React from 'react'

import { Button } from "@/components/ui/button"
import {
    Card,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { useRouter } from 'next/navigation';
import { ArrowRight, FolderOpenIcon, Clock } from 'lucide-react';
import { useGetAllProjects } from '@/modules/projects/hooks/project';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';


const ProjectList = () => {
    const { data: projects, isPending, error } = useGetAllProjects()
    const router = useRouter()

    const movingToProjectPage = (projectId) => {
        router.push(`/project/${projectId}`)
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString("en-US", {
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "2-digit",
            hour12: true
        });
    }

    if (isPending) {
        return (
            <div className="w-full mt-16">
                <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Your Projects</h2>
                <div className="p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-full mx-auto mt-16">
                    {[1, 2, 3, 4].map((i) => (
                        <Card key={i} className="w-full h-auto p-4">
                            <CardHeader className="pb-3">
                                <div className="flex items-center justify-between gap-3">
                                    <div className="flex-1">
                                        <Skeleton className="h-5 w-3/4 mb-2" />
                                        <Skeleton className="h-4 w-1/2" />
                                    </div>
                                    <Skeleton className="h-10 w-10 rounded-lg shrink-0" />
                                </div>
                            </CardHeader>
                            <CardFooter className="flex justify-end pt-3">
                                <Skeleton className="h-9 w-20" />
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        );
    }
    if (!projects || projects.length === 0) {
        return null;
    }
    return (
        <div className='w-full mt-16'>
            <h2 className='text-2xl md:text-3xl font-bold text-center mb-8'>Your Projects</h2>
            <div className='p-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-full mx-auto mt-16'>
                {
                    projects.map((eachItem) => {
                        return (
                            <Link href={`/project/${eachItem.id}`} key={eachItem.id}>
                                <Card className="w-full max-w-sm hover:shadow-lg transition-shadow">
                                    <CardHeader>
                                        <div className="flex items-center justify-between gap-3">
                                            {/* Left side: Title and Time */}
                                            <div className="flex-1 min-w-0">
                                                <CardTitle className="text-base line-clamp-1 break-words">{eachItem.name}</CardTitle>
                                                <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                                                    <Clock className="h-3 w-3" />
                                                    <span>{formatDate(eachItem.createdAt)}</span>
                                                </div>
                                            </div>
                                            {/* Right side: Folder Icon */}
                                            <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center shrink-0">
                                                <FolderOpenIcon className="h-5 w-5 text-muted-foreground" />
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardFooter className="flex justify-end">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="flex items-center gap-2 text-sm"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                movingToProjectPage(eachItem.id);
                                            }}
                                        >
                                            Resume
                                            <ArrowRight className="h-4 w-4" />
                                        </Button>
                                    </CardFooter>
                                </Card>
                            </Link>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default ProjectList