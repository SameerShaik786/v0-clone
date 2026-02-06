"use client";
import React from 'react'

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardAction,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { useRouter } from 'next/navigation';
import { ArrowRight, FolderOpenIcon, Clock } from 'lucide-react';
import { useGetAllProjects } from '@/modules/projects/hooks/project';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';
import ProjectPage from '@/app/project/[projectId]/page';


const ProjectList = () => {
    const { data: projects, isPending, error } = useGetAllProjects()
    console.log(projects)
    console.log(error)
    const router = useRouter()

    const movingToProjectPage = (projectId) => {
        router.push(`/project/${projectId}`)
    }

    if (isPending) {
        return (
            <div className="w-full mt-16">
                <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Your Projects</h2>
                <div className="p-3 lg:grid grid-cols-4 gap-4 max-w-full mx-auto mt-16">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                        <Card key={i} className="w-full max-w-sm h-auto my-auto">
                            <CardHeader className="pb-3">
                                <div className="flex items-start justify-between gap-2">
                                    <div className="flex-1">
                                        <Skeleton className="h-6 w-3/4 mb-2" />
                                        <Skeleton className="h-4 w-1/2" />
                                    </div>
                                    <Skeleton className="h-6 w-6 rounded" />
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
            <div className='p-3 lg:grid grid-cols-4 gap-4 max-w-full mx-auto mt-16'>
                {
                    projects.map((eachItem) => {
                        const now = new Date();

                        const options = {
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit"
                        };
                        
                        const createdDate = new Date(eachItem.createdAt);
                        if (createdDate.getFullYear() !== now.getFullYear()) {
                            options.year = "numeric";
                        }

                        const formattedDate = createdDate.toLocaleString("en-US", options);


                        return (
                            <Link href={`/project/${eachItem.id}`} key={eachItem.id}>
                                <Card className="w-full max-w-sm h-40 my-auto hover:shadow-lg transition-shadow flex flex-col justify-between">
                                    <CardHeader className="">
                                        <div className="flex items-start justify-between gap-2">
                                            <div className="flex-1">
                                                <CardTitle className="text-lg">{eachItem.name}</CardTitle>
                                                <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                                                    <Clock className="h-3 w-3" />
                                                    {formattedDate}
                                                </div>
                                            </div>
                                            <FolderOpenIcon className="h-5 w-5 text-primary shrink-0 mt-1" />
                                        </div>
                                    </CardHeader>
                                    <CardFooter className="flex justify-end">
                                        <Button
                                            variant="ghost"
                                            className="flex items-center gap-2 text-sm text-white hover:bg-transparent"
                                            onClick={() => movingToProjectPage(eachItem.id)}
                                            type="submit"
                                        >
                                            View
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