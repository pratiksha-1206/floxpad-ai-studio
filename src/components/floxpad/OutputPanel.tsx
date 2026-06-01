import { Copy, Check, Sparkles, Clock, Cpu, ArrowRight } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import type { GenerationRecord } from "@/lib/floxpad-types";

interface Props {
  record: GenerationRecord | null;
  loading: boolean;
}

export function OutputPanel({ record, loading }: Props) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    if (!record) return;
    await navigator.clipboard.writeText(record.output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="rounded-xl border border-border bg-card shadow-card overflow-hidden flex flex-col h-full">
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-border bg-muted/30">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-primary" />
          <h2 className="text-sm font-semibold">Generated Artifact</h2>
        </div>
        {record && !loading && (
          <Button variant="ghost" size="sm" onClick={copy}>
            {copied ? <Check className="h-3.5 w-3.5 mr-1.5" /> : <Copy className="h-3.5 w-3.5 mr-1.5" />}
            {copied ? "Copied" : "Copy"}
          </Button>
        )}
      </div>

      {loading ? (
        <div className="p-6 space-y-3 flex-1">
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-4/6" />
          <Skeleton className="h-4 w-3/4" />
          <div className="text-xs text-center text-muted-foreground pt-4 flex items-center justify-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-primary animate-pulse" />
            Claude is composing the output…
          </div>
        </div>
      ) : record ? (
        <>
          <div className="px-5 py-3 border-b border-border flex flex-wrap items-center gap-2 text-xs">
            <Badge variant="outline" className="gap-1">
              <span className="text-muted-foreground">Input:</span>
              <span className="font-medium">{record.inputType}</span>
            </Badge>
            <ArrowRight className="h-3 w-3 text-muted-foreground" />
            <Badge variant="outline" className="gap-1">
              <span className="text-muted-foreground">Output:</span>
              <span className="font-medium">{record.outputType}</span>
            </Badge>
            <Badge variant="secondary" className="gap-1">
              <Cpu className="h-3 w-3" />
              {record.modelName}
            </Badge>
            <Badge variant="secondary" className="gap-1">
              <Clock className="h-3 w-3" />
              {(record.durationMs / 1000).toFixed(2)}s
            </Badge>
          </div>
          <ScrollArea className="flex-1">
            <pre className="p-5 text-sm whitespace-pre-wrap font-sans leading-relaxed text-foreground/90">
              {record.output}
            </pre>
          </ScrollArea>
        </>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center p-10 text-center">
          <div className="h-14 w-14 rounded-2xl flex items-center justify-center mb-4 shadow-elegant" style={{ background: "var(--gradient-brand)" }}>
            <Sparkles className="h-6 w-6 text-brand-foreground" />
          </div>
          <h3 className="text-sm font-semibold mb-1">Output appears here</h3>
          <p className="text-xs text-muted-foreground max-w-xs">
            Configure your input and output artifact types, paste your source, and click Generate to evaluate Claude.
          </p>
        </div>
      )}
    </div>
  );
}