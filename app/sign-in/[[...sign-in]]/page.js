import { SignIn } from '@clerk/nextjs'

export default function SignInPage (){
    return (
        <div className='px-10 py-10'>
        <div className='flex justify-center items-center px-2 py-2 h-screen'>
            <SignIn />
        </div>
        </div>
    )
}