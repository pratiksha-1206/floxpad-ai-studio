import { Search, Bell } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";

export function Topbar() {
  return (
    <header className="h-14 border-b border-border bg-background/70 backdrop-blur sticky top-0 z-20 flex items-center px-4 md:px-6 gap-3">
      <div>
        <h1 className="text-sm font-semibold leading-tight">Artifact Studio</h1>
        <p className="text-xs text-muted-foreground leading-tight">Generate & transform SDLC artifacts with Claude</p>
      </div>
      <div className="ml-auto flex items-center gap-2">
        <div className="relative hidden md:block">
          <Search className="h-4 w-4 absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search artifacts…" className="pl-8 w-64 h-9 bg-muted/40" />
        </div>
        <Button variant="ghost" size="icon" aria-label="Notifications">
          <Bell className="h-4 w-4" />
        </Button>
        <ThemeToggle />
        <div className="h-8 w-8 rounded-full flex items-center justify-center text-xs font-semibold text-brand-foreground" style={{ background: "var(--gradient-brand)" }}>
          FX
        </div>
      </div>
    </header>
  );
}