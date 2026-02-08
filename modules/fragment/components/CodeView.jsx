"use client";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import { convertFilesToTreeItems } from '@/lib/utils'
import React, { useMemo, useState, useCallback } from 'react'
import { TreeView } from './TreeView';
import CodeTextView from './CodeTextView';

const CodeView = ({ files }) => {
    const [copied, setCopied] = useState(false);
    const [selectedFile, setSelectedFile] = useState(() => {
        const fileKeys = Object.keys(files);
        return fileKeys.length > 0 ? fileKeys[0] : null;
    });

    const treeData = useMemo(() => {
        return convertFilesToTreeItems(files);
    }, [files]);

    const handleFileSelect = useCallback(
        (filePath) => {
            if (files[filePath]) {
                setSelectedFile(filePath);
            }
        },
        [files]
    );
    const handleCopy = useCallback(() => {
        if (selectedFile && files[selectedFile]) {
            navigator.clipboard
                .writeText(files[selectedFile])
                .then(() => {
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                })
                .catch((error) => {
                    console.error("Failed to copy:", error);
                });
        }
    }, [selectedFile, files]);


    return (
        <ResizablePanelGroup direction='horizontal'>
            <ResizablePanel defaultSize={20} minSize={20} className='bg-sidebar'>
                <div className='h-full overflow-auto'>
                    <TreeView
                        data={treeData}
                        value={selectedFile}
                        onSelect={handleFileSelect} />
                </div>
            </ResizablePanel>
            <ResizableHandle withHandle className={"w-1.5 hover:bg-primary/20"} />
            <ResizablePanel minSize={55}>
                <CodeTextView code={files[selectedFile]} selectedFile={selectedFile} onCopy={handleCopy} copied={copied} />
            </ResizablePanel>
        </ResizablePanelGroup>
    )
}

export default CodeView