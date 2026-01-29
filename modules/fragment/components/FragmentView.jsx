import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { CopyIcon, RefreshCcwDotIcon } from 'lucide-react'
import React from 'react'

const FragmentView = ({fragment}) => {
    const {id,messageId,sandboxUrl,title,files,createdAt,updatedAt} = fragment
    console.log(fragment)
    return(
        <div className='h-full w-full flex flex-col justify-center'>
        <div className='flex gap-x-2 px-2 border-b py-2'>
            <Button className={"p-2"} variant='outline'>
                <RefreshCcwDotIcon className='size-4'/>
            </Button>
            <Card className={"p-2 mr-auto grow rounded-md bg-sidebar truncate"} >
                {sandboxUrl}
            </Card>
            <Button className={"p-2"} variant='outline'>
                <CopyIcon className='size-4' />
            </Button>
        </div>
        <iframe className='h-full w-full' sandbox='allow-scripts allow-same-origin' loading='lazy' src={sandboxUrl}/>
        </div>
    )
}

export default FragmentView