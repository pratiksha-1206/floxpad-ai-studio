import { useState } from "react";
import {
  Card,
  CardHeader,
  Stack,
  Typography,
  Button,
  Box,
  Chip,
  Divider,
  Skeleton,
} from "@mui/material";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckIcon from "@mui/icons-material/Check";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import MemoryIcon from "@mui/icons-material/Memory";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
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
    <Card variant="outlined" sx={{ display: "flex", flexDirection: "column", height: "100%", minHeight: 400 }}>
      <CardHeader
        avatar={<AutoAwesomeIcon color="primary" fontSize="small" />}
        title={<Typography variant="body2" sx={{ fontWeight: 700 }}>Generated Artifact</Typography>}
        action={
          record && !loading ? (
            <Button
              size="small"
              startIcon={copied ? <CheckIcon /> : <ContentCopyIcon />}
              onClick={copy}
            >
              {copied ? "Copied" : "Copy"}
            </Button>
          ) : null
        }
        sx={{ py: 2, bgcolor: "action.hover" }}
      />
      <Divider />

      {loading ? (
        <Box sx={{ p: 4, flex: 1 }}>
          <Stack spacing={1.5}>
            <Skeleton variant="text" width="66%" />
            <Skeleton variant="text" />
            <Skeleton variant="text" width="85%" />
            <Skeleton variant="text" width="70%" />
            <Skeleton variant="text" width="75%" />
          </Stack>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 1, mt: 4 }}
          >
            <Box component="span" className="animate-pulse" sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: "primary.main" }} />
            Claude is composing the output…
          </Typography>
        </Box>
      ) : record ? (
        <>
          <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", alignItems: "center", px: 4, py: 2, rowGap: 1 }}>
            <Chip variant="outlined" label={`Input: ${record.inputType}`} />
            <ArrowForwardIcon sx={{ fontSize: 14, color: "text.secondary" }} />
            <Chip variant="outlined" label={`Output: ${record.outputType}`} />
            <Chip icon={<MemoryIcon />} label={record.modelName} color="primary" variant="outlined" />
            <Chip icon={<AccessTimeIcon />} label={`${(record.durationMs / 1000).toFixed(2)}s`} />
          </Stack>
          <Divider />
          <Box
            component="pre"
            sx={{
              flex: 1,
              p: 4,
              m: 0,
              overflow: "auto",
              whiteSpace: "pre-wrap",
              fontFamily: "inherit",
              fontSize: 14,
              lineHeight: 1.6,
              color: "text.primary",
            }}
          >
            {record.output}
          </Box>
        </>
      ) : (
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", p: 6 }}>
          <Box
            sx={{
              width: 56,
              height: 56,
              borderRadius: 3,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "linear-gradient(135deg,#06b6d4,#8b5cf6)",
              color: "#fff",
              mb: 2,
            }}
          >
            <AutoAwesomeIcon />
          </Box>
          <Typography variant="body2" sx={{ fontWeight: 700 }}>Output appears here</Typography>
          <Typography variant="caption" color="text.secondary" sx={{ maxWidth: 320, mt: 1 }}>
            Configure your input and output artifact types, paste your source, and click Generate to evaluate Claude.
          </Typography>
        </Box>
      )}
    </Card>
  );
}