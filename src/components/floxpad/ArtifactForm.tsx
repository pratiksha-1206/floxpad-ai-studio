import { ArrowRight, Sparkles, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { INPUT_TYPES, OUTPUT_TYPES, MODELS, type InputType, type OutputType, type ModelId } from "@/lib/floxpad-types";
import { cn } from "@/lib/utils";

interface Props {
  inputType: InputType;
  outputType: OutputType;
  model: ModelId;
  source: string;
  loading: boolean;
  onInputType: (v: InputType) => void;
  onOutputType: (v: OutputType) => void;
  onModel: (v: ModelId) => void;
  onSource: (v: string) => void;
  onGenerate: () => void;
}

export function ArtifactForm(p: Props) {
  const canGenerate = p.source.trim().length > 0 && !p.loading;

  return (
    <div className="rounded-xl border border-border bg-card shadow-card overflow-hidden">
      <div className="px-5 py-3.5 border-b border-border bg-muted/30 flex items-center gap-2">
        <Wand2 className="h-4 w-4 text-primary" />
        <h2 className="text-sm font-semibold">Input Artifact</h2>
      </div>

      <div className="p-5 space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_1fr] gap-4 items-end">
          <div className="space-y-1.5">
            <Label className="text-xs font-medium text-muted-foreground">Input Type</Label>
            <Select value={p.inputType} onValueChange={(v) => p.onInputType(v as InputType)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {INPUT_TYPES.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <ArrowRight className="h-4 w-4 text-muted-foreground mb-3 hidden md:block" />
          <div className="space-y-1.5">
            <Label className="text-xs font-medium text-muted-foreground">Output Type</Label>
            <Select value={p.outputType} onValueChange={(v) => p.onOutputType(v as OutputType)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {OUTPUT_TYPES.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs font-medium text-muted-foreground">Model</Label>
            <Select value={p.model} onValueChange={(v) => p.onModel(v as ModelId)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {MODELS.map((m) => (
                  <SelectItem key={m.id} value={m.id}>
                    <div className="flex flex-col">
                      <span className="font-medium">{m.name}</span>
                      <span className="text-[10px] text-muted-foreground">{m.tagline}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <Label className="text-xs font-medium text-muted-foreground">Source Content</Label>
            <span className="text-[10px] text-muted-foreground">{p.source.length} chars</span>
          </div>
          <Textarea
            value={p.source}
            onChange={(e) => p.onSource(e.target.value)}
            placeholder={`Paste your ${p.inputType.toLowerCase()} here…`}
            className="min-h-[280px] font-mono text-sm resize-y bg-background"
          />
        </div>

        <div className="flex items-center justify-between pt-1">
          <p className="text-xs text-muted-foreground">
            Transforming <span className="font-medium text-foreground">{p.inputType}</span> →{" "}
            <span className="font-medium text-foreground">{p.outputType}</span>
          </p>
          <Button
            onClick={p.onGenerate}
            disabled={!canGenerate}
            className={cn("gap-2 shadow-elegant", canGenerate && "hover:opacity-95")}
            style={{ background: "var(--gradient-brand)", color: "var(--brand-foreground)" }}
          >
            <Sparkles className="h-4 w-4" />
            {p.loading ? "Generating…" : "Generate"}
          </Button>
        </div>
      </div>
    </div>
  );
}