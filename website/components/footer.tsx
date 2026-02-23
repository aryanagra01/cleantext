export function Footer() {
  return (
    <footer className="animate-fade-in flex flex-col items-center gap-2 py-8 text-center" style={{ animationDelay: "0.6s" }}>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5">
          <div className="h-1.5 w-1.5 rounded-full bg-primary/50" />
          <span className="text-xs text-muted-foreground">100+ slang terms</span>
        </div>
        <div className="h-3 w-px bg-border" />
        <div className="flex items-center gap-1.5">
          <div className="h-1.5 w-1.5 rounded-full bg-primary/50" />
          <span className="text-xs text-muted-foreground">Instant cleanup</span>
        </div>
        <div className="h-3 w-px bg-border" />
        <div className="flex items-center gap-1.5">
          <div className="h-1.5 w-1.5 rounded-full bg-primary/50" />
          <span className="text-xs text-muted-foreground">Privacy first</span>
        </div>
      </div>
    </footer>
  )
}
