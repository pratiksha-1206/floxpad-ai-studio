import { useEffect, useState, type ReactNode } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { getCurrentTheme } from "@/lib/theme";

export function MuiThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState(() => getCurrentTheme());

  useEffect(() => {
    // Re-build the theme whenever the `dark` class on <html> toggles.
    const obs = new MutationObserver(() => setTheme(getCurrentTheme()));
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    // Recompute once after mount so CSS variables resolve to hex.
    setTheme(getCurrentTheme());
    return () => obs.disconnect();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}