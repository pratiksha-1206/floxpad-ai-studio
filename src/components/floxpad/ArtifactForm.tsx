import {
  Card,
  CardHeader,
  CardContent,
  Stack,
  TextField,
  MenuItem,
  Button,
  Box,
  Typography,
  Divider,
} from "@mui/material";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {
  INPUT_TYPES,
  OUTPUT_TYPES,
  MODELS,
  type InputType,
  type OutputType,
  type ModelId,
} from "@/lib/floxpad-types";

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
    <Card variant="outlined">
      <CardHeader
        avatar={<AutoFixHighIcon color="primary" fontSize="small" />}
        title={<Typography variant="body2" sx={{ fontWeight: 700 }}>Input Artifact</Typography>}
        sx={{ py: 2, bgcolor: "action.hover" }}
      />
      <Divider />
      <CardContent>
        <Stack spacing={3}>
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={2}
            sx={{ alignItems: { md: "flex-end" } }}
          >
            <TextField
              select
              fullWidth
              label="Input Type"
              value={p.inputType}
              onChange={(e) => p.onInputType(e.target.value as InputType)}
            >
              {INPUT_TYPES.map((t) => (
                <MenuItem key={t} value={t}>{t}</MenuItem>
              ))}
            </TextField>
            <ArrowForwardIcon sx={{ color: "text.secondary", display: { xs: "none", md: "block" }, mb: 1 }} />
            <TextField
              select
              fullWidth
              label="Output Type"
              value={p.outputType}
              onChange={(e) => p.onOutputType(e.target.value as OutputType)}
            >
              {OUTPUT_TYPES.map((t) => (
                <MenuItem key={t} value={t}>{t}</MenuItem>
              ))}
            </TextField>
            <TextField
              select
              fullWidth
              label="Model"
              value={p.model}
              onChange={(e) => p.onModel(e.target.value as ModelId)}
            >
              {MODELS.map((m) => (
                <MenuItem key={m.id} value={m.id}>
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>{m.name}</Typography>
                    <Typography variant="caption" color="text.secondary">{m.tagline}</Typography>
                  </Box>
                </MenuItem>
              ))}
            </TextField>
          </Stack>

          <Box>
            <Stack direction="row" sx={{ mb: 1, justifyContent: "space-between", alignItems: "center" }}>
              <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>
                Source Content
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {p.source.length} chars
              </Typography>
            </Stack>
            <TextField
              multiline
              minRows={10}
              fullWidth
              value={p.source}
              onChange={(e) => p.onSource(e.target.value)}
              placeholder={`Paste your ${p.inputType.toLowerCase()} here…`}
              slotProps={{
                input: {
                  sx: {
                    fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
                    fontSize: 13,
                  },
                },
              }}
            />
          </Box>

          <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>
            <Typography variant="caption" color="text.secondary">
              Transforming{" "}
              <Box component="span" sx={{ fontWeight: 600, color: "text.primary" }}>{p.inputType}</Box>{" → "}
              <Box component="span" sx={{ fontWeight: 600, color: "text.primary" }}>{p.outputType}</Box>
            </Typography>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AutoAwesomeIcon />}
              onClick={p.onGenerate}
              disabled={!canGenerate}
            >
              {p.loading ? "Generating…" : "Generate"}
            </Button>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}