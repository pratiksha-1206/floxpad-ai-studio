import { Clock, Trash2 } from "lucide-react";
import type { GenerationRecord } from "@/lib/floxpad-types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface Props {
  records: GenerationRecord[];
  activeId: string | null;
  onSelect: (r: GenerationRecord) => void;
  onClear: () => void;
}

export function HistoryPanel({ records, activeId, onSelect, onClear }: Props) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <h3 className="text-sm font-semibold">History</h3>
          <Badge variant="secondary" className="ml-1">{records.length}</Badge>
        </div>
        {records.length > 0 && (
          <Button variant="ghost" size="sm" onClick={onClear} className="text-muted-foreground hover:text-destructive">
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        )}
      </div>
      <ScrollArea className="flex-1">
        {records.length === 0 ? (
          <div className="p-6 text-center text-xs text-muted-foreground">
            No generations yet. Run your first transformation to see it here.
          </div>
        ) : (
          <ul className="p-2 space-y-1">
            {records.map((r) => (
              <li key={r.id}>
                <button
                  onClick={() => onSelect(r)}
                  className={cn(
                    "w-full text-left p-3 rounded-md border transition-colors",
                    activeId === r.id
                      ? "border-primary/40 bg-accent/60"
                      : "border-transparent hover:bg-muted/60"
                  )}
                >
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <Badge variant="outline" className="text-[10px] h-4 px-1.5">{r.inputType}</Badge>
                    <span className="text-[10px] text-muted-foreground">→</span>
                    <Badge className="text-[10px] h-4 px-1.5">{r.outputType}</Badge>
                  </div>
                  <div className="text-xs line-clamp-2 text-foreground/90">{r.source.slice(0, 90) || "(empty)"}</div>
                  <div className="flex items-center justify-between mt-2 text-[10px] text-muted-foreground">
                    <span>{r.modelName}</span>
                    <span>{new Date(r.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        )}
      </ScrollArea>
    </div>
  );
}