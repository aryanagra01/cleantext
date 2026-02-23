"use client"

const EXAMPLES = [
  { slang: "wyd rn", clean: "what you doing right now" },
  { slang: "idk tbh", clean: "I don't know to be honest" },
  { slang: "hmu ttyl", clean: "hit me up talk to you later" },
  { slang: "ngl fr", clean: "not going to lie for real" },
  { slang: "omw brb", clean: "on my way be right back" },
]

export function ExamplePills({ onSelect }: { onSelect: (text: string) => void }) {
  return (
    <div className="animate-fade-in flex flex-col items-center gap-3" style={{ animationDelay: "0.4s" }}>
      <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground/50">
        Try an example
      </p>
      <div className="flex flex-wrap justify-center gap-2">
        {EXAMPLES.map((example, i) => (
          <button
            key={example.slang}
            onClick={() => onSelect(example.slang)}
            className="rounded-xl border border-border bg-card px-3.5 py-2 font-mono text-xs text-muted-foreground shadow-sm transition-all hover:border-primary/30 hover:bg-accent hover:text-accent-foreground hover:shadow-md hover:shadow-primary/5 active:scale-95"
            style={{ animationDelay: `${0.5 + i * 0.05}s` }}
          >
            {example.slang}
          </button>
        ))}
      </div>
    </div>
  )
}
