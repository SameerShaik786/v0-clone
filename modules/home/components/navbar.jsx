import { Button } from '@/components/ui/button';
import { getCurrentUser } from '@/modules/auth/actions';
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import React from 'react'

const Navbar = async () => {
  const user = await getCurrentUser();
  let imageUrl = ""
  if (user) {
    imageUrl = user.image
  }
  return (
    <div className='flex justify-center'>
      <div className='px-4 py-4 flex justify-between w-5xl'>
        <div className='p-2'>
          <img
            src="https://registry.npmmirror.com/@lobehub/icons-static-png/1.75.0/files/dark/v0.png"
            height={40}
            alt="logo"
            width={40}
            className='items-center'
          />
        </div>
        <div className='p-2'>
          <SignedIn>
            <UserButton appearance={{
              elements: {
                userButtonBox: "rounded-4xl!",
                userButtonAvatarBox: "rounded-md! size-12",
                userButtonTrigger: "rounded-md!",
              },
            }} />
          </SignedIn>
          <SignedOut>
            <SignInButton>
              <Button variant={"outline"} size={"sm"}>Sign In</Button></SignInButton>
            <SignUpButton>
              <Button variant={"outline"} size={"sm"}>Sign Up</Button>
            </SignUpButton>
          </SignedOut>
        </div>
      </div>
    </div>
  )
}

export default Navbar