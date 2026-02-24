"use client"

import { useState, useCallback, useImperativeHandle, forwardRef } from "react"
import { ArrowRight, Copy, Check, Trash2, ArrowDown, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

// Exact port of q3.py text_to_english dictionary
const TEXT_TO_ENGLISH: Record<string, string> = {
  "u": "you",
  "ur": "your",
  "urs": "yours",
  "r": "are",
  "y": "why",
  "im": "I am",
  "i'm": "I am",
  "ive": "I have",
  "i've": "I have",
  "id": "I would",
  "i'd": "I would",
  "pls": "please",
  "plz": "please",
  "thx": "thanks",
  "ty": "thank you",
  "np": "no problem",
  "yw": "you're welcome",
  "idk": "I don't know",
  "imo": "in my opinion",
  "ikr": "I know right",
  "brb": "be right back",
  "gtg": "got to go",
  "ttyl": "talk to you later",
  "omw": "on my way",
  "btw": "by the way",
  "asap": "as soon as possible",
  "fyi": "for your information",
  "afaik": "as far as I know",
  "lol": "laughing out loud",
  "lmao": "laughing my ass off",
  "rofl": "rolling on the floor laughing",
  "smh": "shaking my head",
  "tbh": "to be honest",
  "ngl": "not going to lie",
  "lmk": "let me know",
  "wyd": "what are you doing",
  "wru": "where are you",
  "hru": "how are you",
  "wbu": "what about you",
  "sup": "what is up",
  "tmr": "tomorrow",
  "2": "to",
  "4": "for",
  "8": "ate",
  "b4": "before",
  "l8r": "later",
  "2day": "today",
  "2nite": "tonight",
  "4ever": "forever",
  "gr8": "great",
  "m8": "mate",
  "ok": "okay",
  "kk": "okay",
  "k": "okay",
  "alr": "alright",
  "tho": "though",
  "bc": "because",
  "cuz": "because",
  "coz": "because",
  "msg": "message",
  "sec": "second",
  "mins": "minutes",
  "cya": "see you",
  "gn": "good night",
  "gm": "good morning",
  "dm": "direct message",
  "irl": "in real life",
  "tmi": "too much information",
  "gg": "going",
 "rn": "right now",
"BTWITIAILWU": "by the way i think i am in love with u",
"DYWMTCOAEYPTYCOMF": "Do You Want Me To Come Over And Eat Your Pussy, You Creamy Old Mother Fucker",
}

// Python string.punctuation equivalent
const PUNCTUATION = "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~"

function stripPunctuation(s: string): string {
  let start = 0
  let end = s.length
  while (start < s.length && PUNCTUATION.includes(s[start]!)) start++
  while (end > start && PUNCTUATION.includes(s[end - 1]!)) end--
  return s.slice(start, end)
}

function collapseRepeats(s: string): string {
  if (!s) return s
  const out: string[] = []
  let i = 0
  while (i < s.length) {
    const ch = s[i]!
    let runLen = 1
    while (i + runLen < s.length && s[i + runLen] === ch) {
      runLen++
    }
    if (runLen > 3) {
      out.push(ch)
    } else {
      out.push(ch.repeat(runLen))
    }
    i += runLen
  }
  return out.join("")
}

function translate(text: string): string {
  const words = text.split(/\s+/).filter(Boolean)
  const results: string[] = []
  for (const word of words) {
    const clean = stripPunctuation(word)
    if (clean === "") {
      results.push(word)
      continue
    }
    const normalised = collapseRepeats(clean.toLowerCase())
    let replacement = TEXT_TO_ENGLISH[normalised] ?? normalised
    if ([...clean].some((char) => char === char.toUpperCase() && char !== char.toLowerCase())) {
      replacement = replacement[0]!.toUpperCase() + replacement.slice(1)
    }
    results.push(word.replace(clean, replacement))
  }
  return results.join(" ")
}

function cleanText(input: string): string {
  if (!input.trim()) return ""
  return translate(input)
}

export interface TextCleanerHandle {
  setInputText: (text: string) => void
}

export const TextCleaner = forwardRef<TextCleanerHandle>(function TextCleaner(_props, ref) {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [copied, setCopied] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  useImperativeHandle(ref, () => ({
    setInputText: (text: string) => {
      setInput(text)
      setOutput("")
    },
  }))

  const handleClean = useCallback(() => {
    if (!input.trim()) return
    setIsProcessing(true)
    // Small delay for visual feedback
    setTimeout(() => {
      setOutput(cleanText(input))
      setIsProcessing(false)
    }, 300)
  }, [input])

  const handleCopy = useCallback(() => {
    if (!output) return
    navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [output])

  const handleClear = useCallback(() => {
    setInput("")
    setOutput("")
  }, [])

  const charCount = input.length

  return (
    <div className="flex flex-col gap-4 md:gap-6 animate-slide-in-up" style={{ animationDelay: "0.15s" }}>
      {/* Input / Output panels */}
      <div className="flex flex-col gap-4 lg:flex-row lg:gap-6">
        {/* Input panel */}
        <div className="flex flex-1 flex-col gap-2">
          <div className="flex items-center justify-between">
            <label htmlFor="slang-input" className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Input
            </label>
            <span className="text-xs text-muted-foreground font-mono">
              {charCount} chars
            </span>
          </div>
          <div className="relative">
            <textarea
              id="slang-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="brb gonna grab some food, ttyl. tbh idk wyd rn but hmu when ur free..."
              className="min-h-[200px] w-full resize-none rounded-2xl border border-border bg-card p-4 font-mono text-sm text-foreground shadow-sm placeholder:text-muted-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/30 transition-all md:min-h-[280px] md:text-base leading-relaxed"
              onKeyDown={(e) => {
                if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                  handleClean()
                }
              }}
            />
          </div>
        </div>

        {/* Arrow between panels - horizontal on lg, vertical on mobile */}
        <div className="flex items-center justify-center lg:pt-8">
          <div className="animate-float flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 shadow-sm shadow-primary/10 ring-1 ring-primary/20">
            <ArrowDown className="h-4 w-4 text-primary lg:hidden" />
            <ArrowRight className="hidden h-4 w-4 text-primary lg:block" />
          </div>
        </div>

        {/* Output panel */}
        <div className="flex flex-1 flex-col gap-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Output
            </label>
            {output && (
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
                aria-label="Copy output to clipboard"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-primary" />
                    <span className="text-primary">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            )}
          </div>
          <div className="relative min-h-[200px] w-full rounded-2xl border border-border bg-card p-4 shadow-sm md:min-h-[280px]">
            {output ? (
              <p className="font-mono text-sm text-foreground md:text-base leading-relaxed whitespace-pre-wrap">
                {output}
              </p>
            ) : (
              <p className="text-sm text-muted-foreground/40 md:text-base leading-relaxed">
                Your cleaned text will appear here...
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Button
          onClick={handleClean}
          disabled={!input.trim() || isProcessing}
          size="lg"
          className="w-full cursor-pointer rounded-2xl bg-primary px-8 py-6 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:shadow-xl hover:shadow-primary/30 hover:brightness-105 active:scale-[0.97] disabled:opacity-40 disabled:shadow-none sm:w-auto md:text-base"
        >
          {isProcessing ? (
            <span className="flex items-center gap-2">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground" />
              Processing...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              Clean Text
            </span>
          )}
        </Button>
        {(input || output) && (
          <Button
            onClick={handleClear}
            variant="outline"
            size="lg"
            className="w-full cursor-pointer rounded-2xl border-border px-8 py-6 text-sm text-muted-foreground shadow-sm transition-all hover:bg-secondary hover:text-foreground active:scale-[0.97] sm:w-auto md:text-base"
          >
            <Trash2 className="h-4 w-4" />
            Clear
          </Button>
        )}
      </div>

      {/* Keyboard shortcut hint */}
      <p className="hidden text-center text-xs text-muted-foreground/50 md:block">
        {"Press "}
        <kbd className="rounded-md border border-border bg-secondary px-1.5 py-0.5 font-mono text-[10px]">
          {"Ctrl"}
        </kbd>
        {" + "}
        <kbd className="rounded-md border border-border bg-secondary px-1.5 py-0.5 font-mono text-[10px]">
          {"Enter"}
        </kbd>
        {" to clean"}
      </p>
    </div>
  )
})
