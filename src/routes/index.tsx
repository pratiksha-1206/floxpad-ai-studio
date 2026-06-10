import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Box, Stack, Tabs, Tab, Paper } from "@mui/material";
import { Sidebar } from "@/components/floxpad/Sidebar";
import { Topbar } from "@/components/floxpad/Topbar";
import { ArtifactForm } from "@/components/floxpad/ArtifactForm";
import { OutputPanel } from "@/components/floxpad/OutputPanel";
import { HistoryPanel } from "@/components/floxpad/HistoryPanel";
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
  const [tab, setTab] = useState(0);

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

  const onGenerateAll = async () => {
    if (!source.trim()) {
      toast.error("Add some source content first");
      return;
    }
    setLoading(true);
    const modelName = MODELS.find((m) => m.id === model)?.name ?? model;
    const targets: OutputType[] = ["User Story", "Use Case", "Test Case"];
    try {
      const records: GenerationRecord[] = [];
      for (const ot of targets) {
        const started = performance.now();
        const output = await generateArtifact({ source, inputType, outputType: ot, model });
        const durationMs = Math.round(performance.now() - started);
        records.push({
          id: crypto.randomUUID(),
          inputType,
          outputType: ot,
          model,
          modelName,
          source,
          output,
          durationMs,
          createdAt: new Date().toISOString(),
        });
      }
      setHistory((h) => [...records.slice().reverse(), ...h]);
      setActiveId(records[0].id);
      toast.success(`Generated all 3 artifacts`);
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
    <Box sx={{ minHeight: "100vh", display: "flex", bgcolor: "background.default", color: "text.primary" }}>
      <Sidebar />
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        <Topbar />
        <Box component="main" sx={{ flex: 1, p: { xs: 4, md: 6 } }}>
          <Box
            sx={{
              display: "grid",
              gap: 6,
              maxWidth: 1600,
              mx: "auto",
              gridTemplateColumns: { xs: "1fr", xl: "1fr 320px" },
            }}
          >
            <Stack spacing={4} sx={{ minWidth: 0 }}>
              <Tabs value={tab} onChange={(_, v) => setTab(v)}>
                <Tab label="Studio" />
                <Tab label="Output" />
              </Tabs>
              {tab === 0 && (
                <Stack spacing={4}>
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
                    onGenerateAll={onGenerateAll}
                  />
                  <Box sx={{ minHeight: 400 }}>
                    <OutputPanel record={activeRecord} loading={loading} />
                  </Box>
                </Stack>
              )}
              {tab === 1 && (
                <Box sx={{ minHeight: 600 }}>
                  <OutputPanel record={activeRecord} loading={loading} />
                </Box>
              )}
            </Stack>
            <Paper
              variant="outlined"
              sx={{
                overflow: "hidden",
                display: { xs: "none", xl: "block" },
                position: "sticky",
                top: 80,
                height: "calc(100vh - 7rem)",
              }}
            >
              <HistoryPanel
                records={history}
                activeId={activeId}
                onSelect={onSelectHistory}
                onClear={() => { setHistory([]); setActiveId(null); }}
              />
            </Paper>
          </Box>
        </Box>
      </Box>
      <Toaster />
    </Box>
  );
}