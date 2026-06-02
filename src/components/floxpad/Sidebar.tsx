import {
  Box,
  Stack,
  Typography,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Divider,
} from "@mui/material";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import DescriptionIcon from "@mui/icons-material/Description";
import HistoryIcon from "@mui/icons-material/History";
import SettingsIcon from "@mui/icons-material/Settings";

const nav = [
  { icon: DashboardIcon, label: "Studio", active: true },
  { icon: AccountTreeIcon, label: "Pipelines" },
  { icon: DescriptionIcon, label: "Artifacts" },
  { icon: HistoryIcon, label: "History" },
  { icon: SettingsIcon, label: "Settings" },
];

export function Sidebar() {
  return (
    <Paper
      elevation={0}
      square
      sx={{
        width: 240,
        display: { xs: "none", md: "flex" },
        flexDirection: "column",
        borderRight: 1,
        borderColor: "divider",
        height: "100vh",
        position: "sticky",
        top: 0,
      }}
    >
      <Stack direction="row" spacing={1.5} sx={{ alignItems: "center", px: 5, py: 5 }}>
        <Box
          sx={{
            width: 36,
            height: 36,
            borderRadius: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "linear-gradient(135deg,#06b6d4,#8b5cf6)",
            color: "#fff",
          }}
        >
          <AutoAwesomeIcon fontSize="small" />
        </Box>
        <Box>
          <Typography variant="body2" sx={{ fontWeight: 700, lineHeight: 1.1 }}>Floxpad</Typography>
          <Typography variant="caption" color="text.secondary">AI Studio</Typography>
        </Box>
      </Stack>
      <Divider />
      <List sx={{ flex: 1, px: 1.5, py: 1 }}>
        {nav.map((item) => {
          const Icon = item.icon;
          return (
            <ListItemButton
              key={item.label}
              selected={item.active}
              sx={{
                borderRadius: 2,
                mb: 0.5,
                "&.Mui-selected": { bgcolor: "action.selected" },
              }}
            >
              <ListItemIcon sx={{ minWidth: 32, color: item.active ? "primary.main" : "text.secondary" }}>
                <Icon fontSize="small" />
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                slotProps={{
                  primary: {
                    sx: {
                      fontSize: 13.5,
                      fontWeight: item.active ? 600 : 500,
                      color: item.active ? "text.primary" : "text.secondary",
                    },
                  },
                }}
              />
            </ListItemButton>
          );
        })}
      </List>
      <Divider />
      <Box sx={{ p: 3 }}>
        <Paper
          variant="outlined"
          sx={{
            p: 2,
            background: "linear-gradient(135deg, rgba(139,92,246,0.12), rgba(6,182,212,0.12))",
          }}
        >
          <Typography variant="caption" sx={{ fontWeight: 600, display: "block" }}>
            Claude Evaluation
          </Typography>
          <Typography variant="caption" color="text.secondary">
            SDLC artifact transformation benchmark
          </Typography>
        </Paper>
      </Box>
    </Paper>
  );
}