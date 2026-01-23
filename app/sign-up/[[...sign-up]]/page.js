import { SignUp } from '@clerk/nextjs'

export default function SignUpPage(){
    return (
        <div className='flex justify-center items-center px-2 py-2 h-screen'>
            <SignUp />
        </div>
    )
}