"use client";
import CodeBlock from "@/components/code/CodeBlock"
import { getLanguageFromFileName } from "@/lib/getLanguage"
import React from 'react'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { CopyIcon, CheckIcon } from "lucide-react"


function CodeTextView({ code, selectedFile, onCopy, copied }) {
    if (!code) {
        return (
            <div className="flex items-center justify-center h-screen">
                Select a file to view code
            </div>
        )
    }

    const lineCount = code.split('\n').length;

    const breadCrumb = () => {
        const selectedFileElement = selectedFile.split("/");
        const isLast = selectedFileElement.length - 1
        return (
            <div className="p-2 flex items-center justify-between border-b">
                <Breadcrumb>
                    <BreadcrumbList className={"text-md"}>
                        {selectedFileElement.map((eachItem, i) => {
                            return (<BreadcrumbItem key={i}>
                                {
                                    i == isLast ? (
                                        <BreadcrumbPage>{eachItem}</BreadcrumbPage>
                                    ) : (
                                        <>
                                            {eachItem}
                                            <BreadcrumbSeparator />
                                        </>
                                    )
                                }

                            </BreadcrumbItem>)

                        })
                        }
                    </BreadcrumbList>
                </Breadcrumb>
                <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">{lineCount} lines</span>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7"
                        onClick={onCopy}
                    >
                        {copied ? (
                            <CheckIcon className="h-4 w-4 text-green-500" />
                        ) : (
                            <CopyIcon className="h-4 w-4" />
                        )}
                    </Button>
                </div>
            </div>
        )
    }

    return (


        <div className="flex flex-col h-full w-full bg-dark">
            {breadCrumb()}
            <CodeBlock
                code={code}
                lang={getLanguageFromFileName(selectedFile)}
            />
        </div>

    )
}

export default CodeTextView
