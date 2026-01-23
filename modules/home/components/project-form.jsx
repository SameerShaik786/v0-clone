"use client";

import { FormField, Form } from '@/components/ui/form';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { Kbd, KbdGroup } from "@/components/ui/kbd"
import TextareaAutosize from "react-textarea-autosize";
import { toast } from 'sonner';
import { zodResolver } from "@hookform/resolvers/zod";
import z from 'zod'
import { cn } from '@/lib/utils';
import { ArrowUpIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

const formSchema = z.object({
    content: z.string().min(1, "Project Description is required").max(1000, "Description too long")
});


const ProjectForm = () => {
    const [isFocused, setIsFocused] = useState(false)

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            content: "",
        },
        mode: "onChange",
    });

    const onSubmit = () => {
    toast.success('submitted successfully');
    form.reset();
    }
    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='relative border p-4 pt-1 rounded-xl bg-sidebar max-w-3xl mx-auto dark:bg-sidebar transition-all m-4'>
                <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => {
                        return (
                            <TextareaAutosize
                                {...field}
                                className='pt-2 resize-none border-none w-full outline-none bg-transparent text-sm'
                                minRows={3}
                                maxRows={10}
                                onFocus={() => setIsFocused(true)}
                                onBlur={() => setIsFocused(false)}
                                placeholder='Describe your idea...'
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
                                        e.preventDefault();
                                        form.handleSubmit(onSubmit)(e);
                                    }
                                }}
                            />)
                    }}
                />
                <div className="flex items-center justify-between px-2 pt-2">
                    {/* Keyboard hint */}
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1 rounded-md bg-muted/40 px-2 py-1">
                            <Kbd className="h-5 px-1.5 text-[10px]">⌘</Kbd>Enter
                        </div>
                        <span className="text-[11px]">to submit</span>
                    </div>
                    {/* Submit button */}
                    <Button
                        type="submit"
                        className="h-8 w-8 rounded-full p-0"
                    >
                        <ArrowUpIcon className="h-4 w-4" />
                    </Button>
                </div>
            </form>
        </Form>
    )
}

export default ProjectForm