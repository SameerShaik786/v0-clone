import { Button } from "@/components/ui/button";
import { onBoardingUser } from "@/modules/auth/actions";
import Navbar from "@/modules/home/components/navbar";
import SuggestionContainer from "@/modules/home/components/suggestion-container";
import Image from "next/image";

export default async function Home() {
  return (
    <div className="p-2">
      <div className="flex flex-col items-center">
        <Image src="https://registry.npmmirror.com/@lobehub/icons-static-png/1.75.0/files/dark/v0.png" width={90} height={90} alt="logo" className='invert dark:invert-1' />
        <h1 className="text-black font-bold text-4xl text-center dark:text-white mt-1 "> Build Something with ❣️</h1>
        <p className="text-gray-600 text-xl text-center p-2 mt-1">Create Apps and Websites by chatting with AI</p>
      </div>
      <SuggestionContainer />
    </div>
  );
}