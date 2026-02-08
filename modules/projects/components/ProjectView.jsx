"use client";

import React, { useState, useEffect, useRef } from 'react'
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
import { Code2Icon, CrownIcon, EyeIcon, ArrowLeftIcon, HomeIcon, ChevronDownIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import CodeView from '@/modules/fragment/components/CodeView';
import { Spinner } from '@/components/ui/spinner';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from 'next/navigation';

const ProjectView = ({ projectId }) => {
    const [isProcessing, setIsProcessing] = useState(false)
    const [tabState, setTabState] = useState("preview")
    const [activeFragment, setActiveFragment] = useState("")
    const [mobileView, setMobileView] = useState("messages") // "messages" or "fragment"
    const prevMessageCountRef = useRef(0)
    const router = useRouter()

    // Enable polling when processing
    const { data, isPending } = useGetProjectById(projectId, isProcessing)

    const project = data?.data
    const messages = data?.messages

    // Detect when new assistant message arrives to stop processing
    // Also detect initial load where there's only user message (processing from project creation)
    useEffect(() => {
        if (!messages || messages.length === 0) return;

        const currentCount = messages.length
        const lastMessage = messages[messages.length - 1]

        // If only one message and it's from user, set processing (initial project creation)
        if (currentCount === 1 && lastMessage?.role === "USER") {
            setIsProcessing(true)
            prevMessageCountRef.current = currentCount
            return
        }

        // If a new message arrived and it's from the assistant (success or error), stop processing
        if (currentCount > prevMessageCountRef.current && lastMessage?.role === "ASSISTANT") {
            setIsProcessing(false)
        }

        // Also stop processing if last message is an ERROR type
        if (lastMessage?.type === "ERROR") {
            setIsProcessing(false)
        }

        prevMessageCountRef.current = currentCount
    }, [messages])

    if (!project && !isPending) {
        return null;
    }

    const getCurrentFragment = (value) => {
        setActiveFragment(value)
        // On mobile, switch to fragment view when a fragment is selected
        setMobileView("fragment")
    }

    // Called by MessageForm when user sends a message
    const onMessageSent = () => {
        setIsProcessing(true)
    }

    const handleBackToMessages = () => {
        setMobileView("messages")
    }

    const handleGoToDashboard = () => {
        router.push("/")
    }

    // Show loading spinner while fetching project data
    if (isPending && !messages) {
        return (
            <div className="h-screen w-full flex items-center justify-center">
                <Spinner className="h-8 w-8" />
            </div>
        )
    }

    // Mobile Messages Panel
    const MobileMessagesPanel = () => (
        <div className='h-[100dvh] w-full flex flex-col'>
            <div className='shrink-0 overflow-hidden border-b'>
                <ProjectHeader project={project} isPending={isPending} />
            </div>

            <div className='flex-1 overflow-y-auto min-h-0 pb-4'>
                <MessageContainer
                    messages={messages}
                    isPending={isPending}
                    getCurrentFragment={getCurrentFragment}
                    isProcessing={isProcessing}
                />
            </div>

            <div className='shrink-0 pb-4 px-2'>
                <MessageForm projectId={projectId} onMessageSent={onMessageSent} />
            </div>
        </div>
    )

    // Mobile Fragment Panel with Back Button
    const MobileFragmentPanel = () => (
        <div className='h-[100dvh] w-full flex flex-col'>
            {/* Mobile Header with Back Button */}
            <div className='flex items-center gap-2 p-2 border-b'>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className="flex items-center gap-1">
                            <ArrowLeftIcon className="h-4 w-4" />
                            <span>Back</span>
                            <ChevronDownIcon className="h-3 w-3" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                        <DropdownMenuItem onClick={handleBackToMessages}>
                            <ArrowLeftIcon className="h-4 w-4 mr-2" />
                            Back to Chat
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handleGoToDashboard}>
                            <HomeIcon className="h-4 w-4 mr-2" />
                            Go to Dashboard
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                <Tabs value={tabState} onValueChange={setTabState} className="flex-1">
                    <TabsList className={"h-8 p-0 border rounded-md"}>
                        <TabsTrigger value="preview" className={"rounded-md p-2 flex items-center gap-x-2 text-xs"}>
                            <EyeIcon className='size-4' />
                            Demo
                        </TabsTrigger>
                        <TabsTrigger value="code" className={"rounded-md p-2 flex items-center gap-x-2 text-xs"}>
                            <Code2Icon className='size-4' />
                            Code
                        </TabsTrigger>
                    </TabsList>
                </Tabs>

                <Button asChild size='sm' className='text-xs'>
                    <Link href={"/pricing"}>
                        <CrownIcon className='size-3 mr-1' />
                        Upgrade
                    </Link>
                </Button>
            </div>

            {/* Content */}
            <div className='flex-1 overflow-hidden'>
                {tabState === "preview" ? (
                    activeFragment ? (
                        <FragmentView fragment={activeFragment} />
                    ) : (
                        <div className="p-2 flex h-full items-center justify-center">
                            <p className='text-xs text-muted-foreground text-center px-2'>Select a fragment to view the preview</p>
                        </div>
                    )
                ) : (
                    activeFragment ? (
                        <CodeView files={activeFragment.files} />
                    ) : (
                        <div className="p-2 flex h-full items-center justify-center">
                            <p className='text-xs text-muted-foreground text-center px-2'>Select a fragment to view the Code</p>
                        </div>
                    )
                )}
            </div>
        </div>
    )

    return (
        <>
            {/* Mobile View */}
            <div className='md:hidden h-[100dvh] w-full overflow-hidden'>
                {mobileView === "messages" ? (
                    <MobileMessagesPanel />
                ) : (
                    <MobileFragmentPanel />
                )}
            </div>

            {/* Desktop View - Original Resizable Layout */}
            <div className='hidden md:block h-screen w-full overflow-hidden'>
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
                            <MessageContainer
                                messages={messages}
                                isPending={isPending}
                                getCurrentFragment={getCurrentFragment}
                                isProcessing={isProcessing}
                            />
                        </div>

                        <div className='shrink-0'>
                            <MessageForm projectId={projectId} onMessageSent={onMessageSent} />
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
                                        <CodeView files={activeFragment.files} />
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
        </>
    )
}

export default ProjectView