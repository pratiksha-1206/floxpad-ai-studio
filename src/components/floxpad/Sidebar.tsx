import { Sparkles, FileText, History, Settings, LayoutDashboard, Workflow } from "lucide-react";
import { cn } from "@/lib/utils";

const nav = [
  { icon: LayoutDashboard, label: "Studio", active: true },
  { icon: Workflow, label: "Pipelines" },
  { icon: FileText, label: "Artifacts" },
  { icon: History, label: "History" },
  { icon: Settings, label: "Settings" },
];

export function Sidebar() {
  return (
    <aside className="hidden md:flex w-60 flex-col border-r border-border bg-card/40 backdrop-blur-sm">
      <div className="px-5 py-5 flex items-center gap-2">
        <div className="h-9 w-9 rounded-lg flex items-center justify-center text-brand-foreground shadow-elegant" style={{ background: "var(--gradient-brand)" }}>
          <Sparkles className="h-5 w-5" />
        </div>
        <div>
          <div className="text-sm font-semibold leading-tight">Floxpad</div>
          <div className="text-xs text-muted-foreground leading-tight">AI Studio</div>
        </div>
      </div>
      <nav className="flex-1 px-3 py-2 space-y-1">
        {nav.map((item) => (
          <button
            key={item.label}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
              item.active
                ? "bg-accent text-accent-foreground font-medium"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </button>
        ))}
      </nav>
      <div className="px-4 py-4 border-t border-border">
        <div className="rounded-lg p-3 bg-gradient-to-br from-accent/60 to-secondary/60">
          <div className="text-xs font-medium">Claude Evaluation</div>
          <div className="text-[11px] text-muted-foreground mt-1">SDLC artifact transformation benchmark</div>
        </div>
      </div>
    </aside>
  );
}