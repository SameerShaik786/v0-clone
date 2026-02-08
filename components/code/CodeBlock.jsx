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
      className="text-[13px] leading-6 font-mono h-full w-full overflow-auto"
      style={{
        borderRadius: "4px",
        backgroundColor: "#24292e" // github-dark theme background
      }}
    >
      <div
        className="min-w-max"
        style={{ backgroundColor: "#24292e" }}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  )
}

