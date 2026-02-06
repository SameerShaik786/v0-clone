"use client";

import React, { useState } from 'react'
import { useGetProjectById } from '../hooks/project';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { Button } from '@/components/ui/button';
import ProjectHeader from './ProjectHeader';
import MessageContainer from '../../messages/components/MessageContainer';
import MessageForm from '@/modules/messages/components/MessageForm';
import FragmentView from '@/modules/fragment/components/FragmentView';
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { Code2Icon, CrownIcon, EyeIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import CodeView from '@/modules/fragment/components/CodeView';
import { Spinner } from '@/components/ui/spinner';

const ProjectView = ({ projectId }) => {
    const { data, isPending } = useGetProjectById(projectId)
    const [tabState, setTabState] = useState("preview")
    const [activeFragment,setActiveFragment] = useState("")
    console.log("Data :" + data)
    const project = data?.data
    if (!project) {
        console.log("Hello data not there")
    }
    const messages = data?.messages
    console.log(messages)

    if (!project && !isPending) {
        return null;
    }

    const getCurrentFragment = (value) => {
        setActiveFragment(value)
    }

    // Show loading spinner while fetching project data
    if (isPending) {
        return (
            <div className="h-screen w-full flex items-center justify-center">
                <Spinner className="h-8 w-8" />
            </div>
        )
    }

    return (
        <div className='h-screen w-full overflow-hidden'>
            <ResizablePanelGroup
                direction="horizontal"
                className="h-full rounded-md border"
            >
                {/* Left Panel - Messages */}
                <ResizablePanel defaultSize={30} maxSize={50} minSize={20} className='p-1 text-sm flex flex-col'>
                    <div className='shrink-0 overflow-hidden'>
                        <ProjectHeader project={project} isPending={isPending} />
                    </div>
                    
                    <div className='flex-1 overflow-y-auto min-h-0'>
                        <MessageContainer messages={messages} isPending={isPending} getCurrentFragment={getCurrentFragment} />
                    </div>
                    
                    <div className='shrink-0'>
                        <MessageForm projectId={projectId} />
                    </div>
                </ResizablePanel>

                <ResizableHandle withHandle />

                {/* Right Panel - Preview/Code */}
                <ResizablePanel defaultSize={70} minSize={30} className='p-1 text-sm flex flex-col'>
                    <Tabs defaultValue="preview" className={"h-full flex flex-col"} value={tabState} onValueChange={(value) => setTabState(value)}>
                        <div className='flex w-full justify-between p-2 border-b gap-x-2 flex-wrap'>
                            <TabsList className={"h-8 p-0 border rounded-md"}>
                                <TabsTrigger value="preview" className={"rounded-md p-2 flex items-center gap-x-2 text-xs sm:text-sm"}>
                                    <EyeIcon className='size-4' />
                                    <span className='hidden sm:inline'>Demo</span>
                                </TabsTrigger>
                                <TabsTrigger value="code" className={"rounded-md p-2 flex items-center gap-x-2 text-xs sm:text-sm"}>
                                    <Code2Icon className='size-4' />
                                    <span className='hidden sm:inline'>Code</span>
                                </TabsTrigger>
                            </TabsList>
                            <div className='flex'>
                                <Button asChild size='sm' className='text-xs sm:text-sm'>
                                    <Link href={"/pricing"}>
                                        <CrownIcon className='size-3 sm:size-4 mr-1' />
                                        <span className='hidden sm:inline'>Upgrade</span>
                                    </Link>
                                </Button>
                            </div>
                        </div>
                        <TabsContent value="preview" className='flex-1 overflow-hidden'>
                            {
                                activeFragment ? (
                                    <FragmentView fragment={activeFragment} />
                                ) : (
                                    <div className="p-2 flex h-full items-center justify-center">
                                        <p className='text-xs sm:text-sm text-muted-foreground text-center px-2'>Select a fragment to view the preview</p>
                                    </div>
                                )
                            }
                        </TabsContent>
                        <TabsContent value="code" className="flex-1 overflow-hidden">
                            {
                                activeFragment ? (
                                    <CodeView files={activeFragment.files}/>
                                ) : (
                                    <div className="p-2 flex h-full items-center justify-center">
                                        <p className='text-xs sm:text-sm text-muted-foreground text-center px-2'>Select a fragment to view the Code</p>
                                    </div>
                                )
                            }
                        </TabsContent>
                    </Tabs>
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    )
}

export default ProjectView