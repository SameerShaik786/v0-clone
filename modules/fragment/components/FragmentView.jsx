"use client";

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { CopyIcon, RefreshCcwIcon, CheckIcon } from 'lucide-react'
import React, { useState, useCallback } from 'react'

const FragmentView = ({ fragment }) => {
    const { id, messageId, sandboxUrl, title, files, createdAt, updatedAt } = fragment
    const [copied, setCopied] = useState(false)
    const [iframeKey, setIframeKey] = useState(0)

    const handleRefresh = useCallback(() => {
        setIframeKey(prev => prev + 1)
    }, [])

    const handleCopyUrl = useCallback(() => {
        if (sandboxUrl) {
            navigator.clipboard
                .writeText(sandboxUrl)
                .then(() => {
                    setCopied(true)
                    setTimeout(() => setCopied(false), 2000)
                })
                .catch((error) => {
                    console.error("Failed to copy:", error)
                })
        }
    }, [sandboxUrl])

    return (
        <div className='h-full w-full flex flex-col justify-center'>
            <div className='flex gap-x-2 px-2 border-b py-2'>
                <Button className={"p-2"} variant='outline' onClick={handleRefresh} title="Refresh">
                    <RefreshCcwIcon className='size-4' />
                </Button>
                <Card className={"p-2 mr-auto grow rounded-md bg-sidebar truncate"} >
                    {sandboxUrl}
                </Card>
                <Button className={"p-2"} variant='outline' onClick={handleCopyUrl} title="Copy URL">
                    {copied ? (
                        <CheckIcon className='size-4 text-green-500' />
                    ) : (
                        <CopyIcon className='size-4' />
                    )}
                </Button>
            </div>
            <iframe
                key={iframeKey}
                className='h-full w-full'
                sandbox='allow-scripts allow-same-origin'
                loading='lazy'
                src={sandboxUrl}
            />
        </div>
    )
}

export default FragmentView