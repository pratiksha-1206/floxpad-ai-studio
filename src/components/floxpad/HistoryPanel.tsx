import {
  Stack,
  Box,
  Typography,
  IconButton,
  Chip,
  ButtonBase,
  Divider,
  Tooltip,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import DeleteIcon from "@mui/icons-material/Delete";
import type { GenerationRecord } from "@/lib/floxpad-types";

interface Props {
  records: GenerationRecord[];
  activeId: string | null;
  onSelect: (r: GenerationRecord) => void;
  onClear: () => void;
}

export function HistoryPanel({ records, activeId, onSelect, onClear }: Props) {
  return (
    <Stack sx={{ height: "100%" }}>
      <Stack direction="row" sx={{ alignItems: "center", justifyContent: "space-between", p: 3 }}>
        <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
          <AccessTimeIcon fontSize="small" color="action" />
          <Typography variant="body2" sx={{ fontWeight: 700 }}>History</Typography>
          <Chip size="small" label={records.length} />
        </Stack>
        {records.length > 0 && (
          <Tooltip title="Clear history">
            <IconButton size="small" onClick={onClear}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        )}
      </Stack>
      <Divider />
      <Box sx={{ flex: 1, overflow: "auto", p: 1.5 }}>
        {records.length === 0 ? (
          <Typography variant="caption" color="text.secondary" sx={{ display: "block", textAlign: "center", p: 4 }}>
            No generations yet. Run your first transformation to see it here.
          </Typography>
        ) : (
          <Stack spacing={1}>
            {records.map((r) => {
              const active = activeId === r.id;
              return (
                <ButtonBase
                  key={r.id}
                  onClick={() => onSelect(r)}
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    display: "block",
                    width: "100%",
                    textAlign: "left",
                    border: 1,
                    borderColor: active ? "primary.main" : "transparent",
                    bgcolor: active ? "action.selected" : "transparent",
                    "&:hover": { bgcolor: "action.hover" },
                  }}
                >
                  <Stack direction="row" spacing={0.5} sx={{ alignItems: "center", mb: 1 }}>
                    <Chip size="small" variant="outlined" label={r.inputType} sx={{ height: 18, fontSize: 10 }} />
                    <Typography variant="caption" color="text.secondary">→</Typography>
                    <Chip size="small" color="primary" label={r.outputType} sx={{ height: 18, fontSize: 10 }} />
                  </Stack>
                  <Typography
                    variant="caption"
                    sx={{
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      color: "text.primary",
                    }}
                  >
                    {r.source.slice(0, 90) || "(empty)"}
                  </Typography>
                  <Stack direction="row" sx={{ justifyContent: "space-between", mt: 1 }}>
                    <Typography variant="caption" color="text.secondary">{r.modelName}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {new Date(r.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </Typography>
                  </Stack>
                </ButtonBase>
              );
            })}
          </Stack>
        )}
      </Box>
    </Stack>
  );
}