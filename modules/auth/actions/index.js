"use server";
import { currentUser } from "@clerk/nextjs/server"
import {db} from '@/lib/db.js'
import { email } from "zod";


export const onBoardingUser = async () => {
    try{
        const user = await currentUser();
        if(!user){
            return {success: false,}
        }
        const {id,emailAddresses,imageUrl,firstName,lastName}  = user;
        if(!id){
            return {success: false, message: "Enter your details"}
        }
        const newUser =  await db.user.upsert({
            where:{
                clerkId: id,
            },
            update:{
                name: firstName && lastName ? `${firstName} ${lastName}` : firstName|| lastName||null,
                image: imageUrl ? imageUrl : "",
                email: emailAddresses[0]?.emailAddress || " "
            },
            create:{
                clerkId: id,
                name: firstName && lastName ? `${firstName} ${lastName}` : firstName|| lastName||null,
                image: imageUrl ? imageUrl : null,
                email: emailAddresses[0]?.emailAddress || " "
            }
        })
        return {
            success:true,
            user:newUser,
            message: "User onboarded successfully"
        }
    }
    catch(error){
        console.log("❌ Error onboarding user:", error)
        return{
            success:false,
            message: "Something went wrong please try again",
        }
    }
};

export const getCurrentUser = async () => {
    const user = await currentUser();
    if(!user){
        return null;
    }
    const userIdentified = await db.user.findUnique({
        where:{
            clerkId: user.id,
        },
        select:{
            name:true,
            image:true,
            email:true,
            id: true,
            clerkId: true
        }
    })
    return userIdentified;
};