"use client"

import { useEffect, useState } from "react"
import { codeToHtml } from "shiki"

export default function CodeBlock({ code, lang = "js" }) {
  const [html, setHtml] = useState("")

  useEffect(() => {
    async function highlight() {
      const result = await codeToHtml(code || "", {
        lang,
        theme: "github-dark"
      })
      setHtml(result)
    }

    highlight()
  }, [code, lang])

  return (
    <div
      className="text-[13px] leading-6 font-mono whitespace-pre-wrap wrap-break-word h-screen w-full overflow-auto"
      style={{borderRadius:"4px", width:"100%"}}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
