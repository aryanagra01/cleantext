"use client"

import { useRef } from "react"
import { Header } from "@/components/header"
import { TextCleaner, type TextCleanerHandle } from "@/components/text-cleaner"
import { ExamplePills } from "@/components/example-pills"
import { Footer } from "@/components/footer"
import { QRCode } from "@/components/qr-code"
import { AnimatedBackground } from "@/components/animated-background"

export default function Home() {
  const cleanerRef = useRef<TextCleanerHandle>(null)

  return (
    <div className="relative min-h-dvh overflow-hidden bg-background">
      <AnimatedBackground />

      <div className="fixed right-4 top-4 z-20 hidden md:block">
        <QRCode />
      </div>

      <main className="relative z-10 mx-auto flex min-h-dvh max-w-4xl flex-col px-4 md:px-6">
        <Header />

        <div className="flex-1 pb-4">
          <TextCleaner ref={cleanerRef} />
        </div>

        <div className="py-6">
          <ExamplePills
            onSelect={(text) => {
              cleanerRef.current?.setInputText(text)
            }}
          />
        </div>

        <Footer />
      </main>
    </div>
  )
}
