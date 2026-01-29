"use client"

import * as React from "react"
import { GripVerticalIcon } from "lucide-react"
import * as ResizablePrimitive from "react-resizable-panels"

import { cn } from "@/lib/utils"

const ResizablePanelGroup = ResizablePrimitive.PanelGroup
const ResizablePanel = ResizablePrimitive.Panel
const ResizableHandlePrimitive = ResizablePrimitive.PanelResizeHandle

function ResizableHandle({ withHandle, className, ...props }) {
  return (
    <ResizableHandlePrimitive
      data-slot="resizable-handle"
      className={cn(
        "bg-border focus-visible:ring-ring relative flex w-px items-center justify-center",
        className
      )}
      {...props}
    >
      {withHandle && (
        <div className="bg-border z-10 flex h-4 w-3 items-center justify-center rounded-xs border">
          <GripVerticalIcon className="size-2.5" />
        </div>
      )}
    </ResizableHandlePrimitive>
  )
}

export { ResizablePanelGroup, ResizablePanel, ResizableHandle }