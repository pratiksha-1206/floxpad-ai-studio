import { AppBar, Toolbar, Box, Typography, TextField, IconButton, Avatar, InputAdornment, Badge } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { ThemeToggle } from "./ThemeToggle";

export function Topbar() {
  return (
    <AppBar
      position="sticky"
      color="inherit"
      elevation={0}
      sx={{ borderBottom: 1, borderColor: "divider", backdropFilter: "blur(8px)" }}
    >
      <Toolbar variant="dense" sx={{ minHeight: 56, gap: 2, px: { xs: 2, md: 4 } }}>
        <Box>
          <Typography variant="body2" fontWeight={700} lineHeight={1.1}>
            Artifact Studio
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Generate & transform SDLC artifacts with Claude
          </Typography>
        </Box>
        <Box sx={{ flex: 1 }} />
        <TextField
          placeholder="Search artifacts…"
          size="small"
          sx={{ width: 260, display: { xs: "none", md: "block" } }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            ),
          }}
        />
        <IconButton aria-label="Notifications">
          <Badge color="error" variant="dot">
            <NotificationsNoneIcon fontSize="small" />
          </Badge>
        </IconButton>
        <ThemeToggle />
        <Avatar sx={{ width: 32, height: 32, fontSize: 12, background: "linear-gradient(135deg,#06b6d4,#8b5cf6)" }}>
          FX
        </Avatar>
      </Toolbar>
    </AppBar>
  );
}