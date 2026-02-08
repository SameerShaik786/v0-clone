"use client";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Spinner } from "@/components/ui/spinner";
import Link from "next/link";
import { ChevronDownIcon, ChevronLeftIcon, MoveDownIcon, MoveDownLeftIcon, MoveLeftIcon, SunMoonIcon } from 'lucide-react';
import { useTheme } from "next-themes";


const ProjectHeader = ({ project, isPending }) => {

    const { setTheme, theme } = useTheme()
    return (
        <div className="p-2 flex justify-between items-center border-b text-sm bg-black-700">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant={"ghost"} size={"sm"} className={"focus-visible:ring-0 hover:bg-transparent hover:opacity-75 transition-opacity cursor-pointer"}>
                        <img
                            src="https://registry.npmmirror.com/@lobehub/icons-static-png/1.75.0/files/dark/v0.png"
                            height={30}
                            alt="logo"
                            width={30}
                            className='items-center shrink:0 invert dark:invert-0'
                        />
                        <span className='text-md p-2'>{isPending ? <Spinner /> : project.name}</span>
                        <ChevronDownIcon className="size-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className={"text-sm w-[180]"} size={"left"} align={"start"}>
                    <DropdownMenuGroup>
                        <DropdownMenuItem className={"text-sm"}>
                            <Link href={"/"} className="flex gap-2 items-center">
                                <span><ChevronLeftIcon size="4" /></span>
                                Go to Dashboard
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuSub>
                            <DropdownMenuSubTrigger className={"cursor-pointer"}>
                                <SunMoonIcon size="4" />Appearance</DropdownMenuSubTrigger>
                            <DropdownMenuPortal>
                                <DropdownMenuSubContent>
                                    <DropdownMenuItem onClick={() => setTheme("light")} className={"cursor-pointer"}>Light</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setTheme("dark")} className={"cursor-pointer"}>Dark</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setTheme("system")} className={"cursor-pointer"}>System</DropdownMenuItem>
                                </DropdownMenuSubContent>
                            </DropdownMenuPortal>
                        </DropdownMenuSub>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

export default ProjectHeader