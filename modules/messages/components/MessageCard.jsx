import { Card } from '@/components/ui/card'
import { Spinner } from '@/components/ui/spinner'
import React, { useState, useEffect } from 'react'
import WordByWordText from '../../projects/components/WordbyWord'
import { Button } from '@/components/ui/button'
import { ChevronRightIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import FragmentView from '@/modules/fragment/components/FragmentView'
import { Skeleton } from '@/components/ui/skeleton'

export const ThinkingMessage = () => {
  const [thinkingText, setThinkingText] = useState("Thinking");
  const messages = ["Thinking", "Working", "Processing", "Analyzing", "Building"];

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % messages.length;
      setThinkingText(messages[index]);
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className='flex flex-col items-start max-w-[80%]'>
      <img
        src="https://registry.npmmirror.com/@lobehub/icons-static-png/1.75.0/files/dark/v0.png"
        height={30}
        alt="v0 logo"
        width={30}
        className='items-center shrink-0 invert dark:invert-0'
      />
      <div className={"rounded-lg p-3 text-sm max-w-[90%]"}>
        <div className='flex flex-col gap-3'>
          {/* Thinking message with spinner */}
          <div className='flex items-center gap-2'>
            <Spinner className='h-4 w-4' />
            <span className='text-muted-foreground'>{thinkingText}...</span>
          </div>

          {/* Skeleton lines */}
          <div className='space-y-2 pt-1'>
            <Skeleton className='h-4 w-full' />
            <Skeleton className='h-4 w-5/6' />
            <Skeleton className='h-4 w-4/6' />
          </div>
        </div>
      </div>
    </div>
  );
};

const MessageCard = ({ message, isPending, getCurrentFragment, isLastMessage, isProcessing }) => {
  const { role, type, content } = message

  // Strip task_summary tags from content for display
  const cleanContent = content?.replace(/<task_summary>[\s\S]*?<\/task_summary>/g, '').trim() || content

  // Show word-by-word animation for user message only when it's the last message and processing
  const shouldAnimateUserMessage = isLastMessage && isProcessing && role === "USER"

  return (
    <div className='p-3'>{
      isPending && role === "USER" ? (<Spinner size="4" />) : (
        type === "ERROR" ? <Card className="text-red flex items-center justify-center">Something Went Wrong please wait</Card> : (
          role === "USER" ? <div className='flex items-end'><Card className={"rounded-lg bg-muted ml-auto p-2 text-sm max-w-[80%] border-none shadow-none wrap-break-word"}>
            {shouldAnimateUserMessage ? (
              <WordByWordText text={message.content} interval={50} />
            ) : (
              <p>{message.content}</p>
            )}
          </Card>
          </div> :
            // ASSISTANT message
            (!cleanContent || isPending) ?
              <ThinkingMessage />
              : (
                <div className='flex flex-col items-start max-w-[80%]'>
                  <img
                    src="https://registry.npmmirror.com/@lobehub/icons-static-png/1.75.0/files/dark/v0.png"
                    height={30}
                    alt="v0 logo"
                    width={30}
                    className='items-center shrink-0 invert dark:invert-0'
                  />
                  <div className={"rounded-lg p-2 text-sm max-w-[90%] border-none shadow-none"}>
                    <div className='flex flex-col'>
                      <p>{cleanContent}</p>
                    </div>
                  </div>
                  {message.fragments && (
                    <Button className={cn("bg-green flex gap-2 items-center mt-1")} variant='ghost'
                      onClick={() => getCurrentFragment(message.fragments)}>
                      View Demo <ChevronRightIcon size="4" />
                    </Button>
                  )}
                </div>
              )
        )

      )}
    </div>
  )
}

export default MessageCard