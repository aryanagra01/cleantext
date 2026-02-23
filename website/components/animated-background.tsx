"use client"

import { useEffect, useState } from "react"

function FloatingOrb({
  size,
  color,
  top,
  left,
  delay,
  duration,
}: {
  size: number
  color: string
  top: string
  left: string
  delay: string
  duration: string
}) {
  return (
    <div
      className="absolute rounded-full opacity-[0.35] blur-3xl"
      style={{
        width: size,
        height: size,
        top,
        left,
        background: color,
        animation: `float-slow ${duration} ease-in-out infinite`,
        animationDelay: delay,
      }}
    />
  )
}

function GridDot({ x, y, delay }: { x: number; y: number; delay: number }) {
  return (
    <circle
      cx={x}
      cy={y}
      r="1"
      className="fill-foreground/[0.06]"
      style={{
        animation: `pulse-ring 5s ease-in-out infinite`,
        animationDelay: `${delay}s`,
      }}
    />
  )
}

export function AnimatedBackground() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const gridDots: { x: number; y: number; delay: number }[] = []
  for (let row = 0; row < 12; row++) {
    for (let col = 0; col < 20; col++) {
      gridDots.push({
        x: col * 80 + 40,
        y: row * 80 + 40,
        delay: (row + col) * 0.15,
      })
    }
  }

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden="true">
      {/* Subtle dot grid */}
      <svg className="absolute inset-0 h-full w-full opacity-60" xmlns="http://www.w3.org/2000/svg">
        {gridDots.map((dot, i) => (
          <GridDot key={i} x={dot.x} y={dot.y} delay={dot.delay} />
        ))}
      </svg>

      {/* Floating color orbs */}
      <FloatingOrb
        size={400}
        color="oklch(0.85 0.12 165)"
        top="-5%"
        left="-8%"
        delay="0s"
        duration="10s"
      />
      <FloatingOrb
        size={300}
        color="oklch(0.88 0.08 200)"
        top="60%"
        left="75%"
        delay="2s"
        duration="12s"
      />
      <FloatingOrb
        size={250}
        color="oklch(0.90 0.06 165)"
        top="30%"
        left="50%"
        delay="4s"
        duration="14s"
      />

      {/* Top edge gradient line */}
      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
    </div>
  )
}
