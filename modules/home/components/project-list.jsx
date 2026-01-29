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
import { ArrowRight, ArrowRightFromLineIcon } from 'lucide-react';
import { useGetAllProjects } from '@/modules/projects/hooks/project';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';
import ProjectPage from '@/app/project/[projectId]/page';


const ProjectList = () => {
    const { data: projects, isPending,error } = useGetAllProjects()
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
              {[1, 2, 3,4,5,6,7,8].map((i) => (
                <Card key={i} className="relative mx-auto w-full max-w-sm pt-0 h-90 my-auto">
                                <div className="absolute inset-0 z-30 aspect-video bg-black/35 h-40 w-full" />
                                <Skeleton
                                    className="relative z-100 aspect-video w-full object-cover rounded-xl h-40"
                                />
                                <CardHeader>
                                    <Skeleton className="z-100 h-5"/>
                                    <Skeleton className="z-100 h-10 w-full"/>
                                </CardHeader>
                                <CardFooter className="flex justify-start">
                                    <Skeleton className="z-100"/>
                                </CardFooter>
                            </Card>
              ))}
            </div>
          </div>
        );
      }
    if(!projects || projects.length===0){
        return null;
    }
    return (
        <div className='w-full mt-16'>
        <h2 className='text-2xl md:text-3xl font-bold text-center mb-8'>Your Projects</h2>
        <div className='p-3 lg:grid grid-cols-4 gap-4 max-w-full mx-auto mt-16'>
            {
                projects.map((eachItem) => {
                    return (
                        <Link href={`/project/${eachItem.id}`} key={eachItem.id}>
                            <Card key={eachItem.id} className="relative mx-auto w-full max-w-sm pt-0 h-90 my-auto">
                                <div className="absolute inset-0 z-30 aspect-video bg-black/35 h-40 w-full" />
                                <img
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2ftddIpEklr388yDlUIZEspJrMD1agpw9XA&s"
                                    alt="Event cover"
                                    className="relative z-100 aspect-video w-full object-cover rounded-xl h-50"
                                />
                                <CardHeader>
                                    <CardTitle>{eachItem.name}</CardTitle>
                                    <CardDescription>
                                        A practical talk on component APIs, accessibility, and shipping
                                        faster.
                                    </CardDescription>
                                </CardHeader>
                                <CardFooter className="flex justify-start">
                                    <Button
                                        variant="ghost"
                                        className="flex items-center gap-2 p-0 text-sm text-white hover:bg-transparent ml-auto"
                                        onClick={() => movingToProjectPage(eachItem.id)}
                                        type="submit"
                                    >
                                        View Code
                                        <ArrowRight className="h-5 w-5 mt-1" />
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