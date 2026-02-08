import { SignUp } from '@clerk/nextjs'

export default function SignUpPage() {
    return (
        <div className='min-h-screen bg-black dark:bg-black'>
            <div className='flex justify-center items-center h-screen'>
                <SignUp />
            </div>
        </div>
    )
}
