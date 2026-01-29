import { Card } from '@/components/ui/card'
import { Spinner } from '@/components/ui/spinner'
import React from 'react'
import WordByWordText from '../../projects/components/WordbyWord'
import { Button } from '@/components/ui/button'
import { ChevronRightIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import FragmentView from '@/modules/fragment/components/FragmentView'

const MessageCard = ({ message, isPending,getCurrentFragment }) => {
    const { role, type, content } = message


    return (
        <div className='p-3'>{
            isPending ? (<Spinner size="4" />) : (
                type === "ERROR" ? <Card className="text-red flex items-center justify-center">Something Went Wrong please wait</Card> : (
                    role === "USER" ? <div className='flex items-end'><Card className={"rounded-lg bg-muted ml-auto p-2 text-sm max-w-[80%] border-none shadow-none wrap-break-word"}>
                        <p>{message.content}</p>
                    </Card>
                    </div> :
                        <div className='flex flex-col items-start max-w-[80%]'>
                            <img
                                src="https://registry.npmmirror.com/@lobehub/icons-static-png/1.75.0/files/dark/v0.png"
                                height={30}
                                alt="logo"
                                width={30}
                                className='items-center shrink:0 invert dark:invert-0'
                            />
                            <div className={"rounded-lg p-2 text-sm max-w-[90%] border-none shadow-none"}>
                                {isPending ?
                                    <div className='flex gap-2'>
                                        <span className='text-md p-2'>Hello</span>
                                    </div> :
                                    <div className='flex flex-col'>
                                        <WordByWordText text={content} />
                                    </div>
                                }
                            </div>
                            <Button className={cn("bg-green flex gap-2 items-center mt-1")} variant='ghost' 
                            onClick = {() => getCurrentFragment(message.fragments)}>
                                View Demo <ChevronRightIcon size="4" />
                            </Button>
                        </div>
                )

            )}
        </div>
    )
}

export default MessageCard