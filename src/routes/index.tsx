import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Sidebar } from "@/components/floxpad/Sidebar";
import { Topbar } from "@/components/floxpad/Topbar";
import { ArtifactForm } from "@/components/floxpad/ArtifactForm";
import { OutputPanel } from "@/components/floxpad/OutputPanel";
import { HistoryPanel } from "@/components/floxpad/HistoryPanel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MODELS, type GenerationRecord, type InputType, type ModelId, type OutputType } from "@/lib/floxpad-types";
import { generateArtifact } from "@/lib/floxpad-generate";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Floxpad AI Studio — Evaluate Claude for SDLC Artifacts" },
      { name: "description", content: "Generate and transform requirements, user stories, use cases, and test cases with Claude — Sonnet, Opus, and Haiku." },
      { property: "og:title", content: "Floxpad AI Studio" },
      { property: "og:description", content: "Enterprise SDLC artifact generation powered by Claude." },
    ],
  }),
  component: Index,
});

const STORAGE_KEY = "floxpad-history-v1";

function Index() {
  const [inputType, setInputType] = useState<InputType>("Requirement");
  const [outputType, setOutputType] = useState<OutputType>("User Story");
  const [model, setModel] = useState<ModelId>("claude-sonnet");
  const [source, setSource] = useState("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<GenerationRecord[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setHistory(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(history.slice(0, 30)));
    } catch {}
  }, [history]);

  const activeRecord = useMemo(
    () => history.find((r) => r.id === activeId) ?? null,
    [history, activeId]
  );

  const onGenerate = async () => {
    if (!source.trim()) {
      toast.error("Add some source content first");
      return;
    }
    setLoading(true);
    const started = performance.now();
    try {
      const output = await generateArtifact({ source, inputType, outputType, model });
      const durationMs = Math.round(performance.now() - started);
      const modelName = MODELS.find((m) => m.id === model)?.name ?? model;
      const record: GenerationRecord = {
        id: crypto.randomUUID(),
        inputType,
        outputType,
        model,
        modelName,
        source,
        output,
        durationMs,
        createdAt: new Date().toISOString(),
      };
      setHistory((h) => [record, ...h]);
      setActiveId(record.id);
      toast.success(`Generated in ${(durationMs / 1000).toFixed(2)}s`);
    } catch (e) {
      toast.error("Generation failed");
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const onSelectHistory = (r: GenerationRecord) => {
    setActiveId(r.id);
    setInputType(r.inputType);
    setOutputType(r.outputType);
    setModel(r.model);
    setSource(r.source);
  };

  return (
    <div className="min-h-screen flex bg-background text-foreground">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar />
        <main className="flex-1 p-4 md:p-6">
          <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-6 max-w-[1600px] mx-auto">
            <div className="space-y-6 min-w-0">
              <Tabs defaultValue="studio" className="w-full">
                <TabsList>
                  <TabsTrigger value="studio">Studio</TabsTrigger>
                  <TabsTrigger value="output">Output</TabsTrigger>
                </TabsList>
                <TabsContent value="studio" className="mt-4 space-y-6">
                  <ArtifactForm
                    inputType={inputType}
                    outputType={outputType}
                    model={model}
                    source={source}
                    loading={loading}
                    onInputType={setInputType}
                    onOutputType={setOutputType}
                    onModel={setModel}
                    onSource={setSource}
                    onGenerate={onGenerate}
                  />
                  <div className="min-h-[400px]">
                    <OutputPanel record={activeRecord} loading={loading} />
                  </div>
                </TabsContent>
                <TabsContent value="output" className="mt-4">
                  <div className="min-h-[600px]">
                    <OutputPanel record={activeRecord} loading={loading} />
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            <aside className="rounded-xl border border-border bg-card shadow-card overflow-hidden xl:sticky xl:top-20 xl:h-[calc(100vh-7rem)]">
              <HistoryPanel
                records={history}
                activeId={activeId}
                onSelect={onSelectHistory}
                onClear={() => { setHistory([]); setActiveId(null); }}
              />
            </aside>
          </div>
        </main>
      </div>
      <Toaster />
    </div>
  );
}
