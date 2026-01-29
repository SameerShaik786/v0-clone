"use client";

import React, { useState } from 'react'
import { useGetProjectById } from '../hooks/project';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { Button } from '@/components/ui/button';
import ProjectHeader from './ProjectHeader';
import MessageContainer from '../../messages/components/MessageContainer';
import ProjectForm from '@/modules/home/components/project-form';
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

    if (!project) {
        return null;
    }

    const getCurrentFragment = (value) => {
        setActiveFragment(value)
    }

    return (
        <div className='h-screen'>
            <ResizablePanelGroup
                direction="horizontal"
                className="h-full rounded-md border"
            >
                <ResizablePanel defaultSize={45} minSize={40} className='p-1 text-sm'>
                    <ProjectHeader project={project} isPending={isPending} />
                    <MessageContainer messages={messages} isPending={isPending} getCurrentFragment = {getCurrentFragment}/>
                    <MessageForm />
                </ResizablePanel>

                <ResizableHandle withHandle />

                <ResizablePanel defaultSize={75} className='p-1 text-sm'>
                    <Tabs defaultValue="preview" className={"h-full flex flex-col"} value={tabState} onValueChange={(value) => setTabState(value)}>
                        <div className='flex w-full justify-between p-2 border-b gap-x-2'>
                            <TabsList className={"h-8 p-0 border rounded-md"}>
                                <TabsTrigger value="preview" className={"rounded-md p-2 flex items-center gap-x-2"}>

                                    <EyeIcon className='size-4' />
                                    Demo

                                </TabsTrigger>
                                <TabsTrigger value="code" className={"rounded-md p-2 flex items-center gap-x-2"}>
                                    <Code2Icon className='size-4' />
                                    Code
                                </TabsTrigger>
                            </TabsList>
                            <div className='flex'>
                                <Button asChild size='sm'>
                                    <Link href={"/pricing"}>
                                        <CrownIcon className='size-4 mr-1' />
                                        Upgrade
                                    </Link>
                                </Button>
                            </div>
                        </div>
                        <TabsContent value="preview">
                                <FragmentView fragment = {activeFragment} />
                        </TabsContent>
                        <TabsContent value="code" className={""}>

                        </TabsContent>
                    </Tabs>
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    )
}

export default ProjectView