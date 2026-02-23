"use client"

import { Sparkles } from "lucide-react"

export function Header() {
  return (
    <header className="flex items-center justify-center py-10 md:py-14">
      <div className="animate-slide-in-up flex flex-col items-center gap-5 text-center">
        <div className="flex items-center gap-3">
          <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 shadow-sm shadow-primary/10 md:h-14 md:w-14">
            <div className="animate-pulse-ring absolute inset-0 rounded-2xl border border-primary/15" />
            <Sparkles className="h-6 w-6 text-primary md:h-7 md:w-7" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
            Clean<span className="text-primary">Text</span>
          </h1>
        </div>
        <p className="max-w-sm text-sm text-muted-foreground md:max-w-md md:text-base leading-relaxed text-balance">
          Transform messy texting slang into clean, proper English instantly.
        </p>
      </div>
    </header>
  )
}
