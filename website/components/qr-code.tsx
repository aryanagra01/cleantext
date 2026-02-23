"use client"

import { useState, useEffect } from "react"
import { QRCodeSVG } from "qrcode.react"
import { Smartphone } from "lucide-react"

export function QRCode() {
  const [url, setUrl] = useState<string | null>(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUrl(window.location.origin + window.location.pathname)
    }
  }, [])

  if (!url) return null

  return (
    <div className="flex flex-col items-center gap-1.5 rounded-xl border border-border bg-card/80 p-2.5 shadow-sm">
      <div className="flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
        <Smartphone className="h-3 w-3" />
        Try on phone
      </div>
      <div className="rounded-lg bg-white p-2">
        <QRCodeSVG
          value={url}
          size={80}
          level="M"
          includeMargin={false}
          className="rounded"
        />
      </div>
    </div>
  )
}
