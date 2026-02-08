import { SignIn } from '@clerk/nextjs'

export default function SignInPage() {
    return (
        <div className='min-h-screen bg-sidebar dark:bg-black'>
            <div className='flex justify-center items-center h-screen'>
                <SignIn style={{ backgroundColor: 'black' }} />
            </div>
        </div>
    )
}
