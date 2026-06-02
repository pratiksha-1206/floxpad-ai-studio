// @ts-nocheck
import {
  alpha,
  createTheme,
  darken,
  getContrastRatio,
  responsiveFontSizes,
} from "@mui/material";
import { font } from "./font";

const getCSSVariableValue = (varName: string) => {
  if (typeof window === "undefined") return "";
  return getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
};

// Parse oklch(...) or hsl(...) or hex from a CSS variable. Returns hex.
const cssColorToHex = (value: string): string | null => {
  if (!value) return null;
  if (value.startsWith("#")) return value;
  try {
    if (typeof document === "undefined") return null;
    const probe = document.createElement("div");
    probe.style.color = value;
    probe.style.display = "none";
    document.body.appendChild(probe);
    const computed = getComputedStyle(probe).color;
    document.body.removeChild(probe);
    const m = computed.match(/rgba?\(([^)]+)\)/);
    if (!m) return null;
    const parts = m[1].split(",").map((p) => parseFloat(p.trim()));
    const [r, g, b] = parts;
    const toHex = (n: number) => Math.max(0, Math.min(255, Math.round(n))).toString(16).padStart(2, "0");
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  } catch {
    return null;
  }
};

const getColorFromCSS = (varName: string, fallback: string) => {
  const v = getCSSVariableValue(varName);
  return cssColorToHex(v) || fallback;
};

export const COLORS = {
  col_1: "#bbdbe3",
  col_2: "#e8eff3",
  col_3: "#272525",
  col_4: "#5B478E",
  primary: "#000000",
  secondary: "#1A73E8",
  text: "#000000",
  icon: "rgba(0, 0, 0, 0.54)",
  background: "#FFFFFF",
  lightBackground: "#F5F8FD",
  header: "#e0e0e0",
  highlight: "#F5F8FD",
  ai: "#8b5cf6",
  accent: "#FFD700",
  success: "#2ECC71",
  error: "#E74C3C",
  warning: "#F1C40F",
  info: "#3498DB",
};

const createDynamicTheme = () => {
  const isDark =
    typeof document !== "undefined" && document.documentElement.classList.contains("dark");

  const themeColors = {
    primary: getColorFromCSS("--primary", isDark ? "#06b6d4" : "#4f46e5"),
    secondary: getColorFromCSS("--secondary", isDark ? "#374151" : "#1A73E8"),
    background: getColorFromCSS("--background", isDark ? "#0f172a" : "#FFFFFF"),
    foreground: getColorFromCSS("--foreground", isDark ? "#f9fafb" : "#000000"),
    muted: getColorFromCSS("--muted", isDark ? "#1f2937" : "#f3f4f6"),
    mutedForeground: getColorFromCSS("--muted-foreground", isDark ? "#9ca3af" : "#6b7280"),
    border: getColorFromCSS("--border", isDark ? "#374151" : "#e5e7eb"),
    input: getColorFromCSS("--input", isDark ? "#1f2937" : "#FFFFFF"),
    card: getColorFromCSS("--card", isDark ? "#1f2937" : "#FFFFFF"),
    cardForeground: getColorFromCSS("--card-foreground", isDark ? "#f9fafb" : "#000000"),
    destructive: getColorFromCSS("--destructive", "#ef4444"),
    destructiveForeground: getColorFromCSS("--destructive-foreground", "#ffffff"),
    cyan: getColorFromCSS("--cyan", "#06b6d4"),
    emerald: getColorFromCSS("--emerald", "#10b981"),
    purple: getColorFromCSS("--purple", "#8b5cf6"),
    highlight: isDark ? "#1f2937" : "#f3f4f6",
    ai: "#8b5cf6",
  };

  const BORDER_RADIUS = "0.6rem";

  const safeContrast = (a: string, b: string) => {
    try {
      return getContrastRatio(a, b);
    } catch {
      return 21;
    }
  };

  const theme = createTheme({
    typography: {
      fontFamily: '"Inter", "system-ui", "sans-serif"',
      fontSize: 14,
      h1: { fontWeight: 800, fontSize: font.size.fs_1 },
      h2: { fontWeight: 700, fontSize: font.size.fs_2 },
      h3: { fontWeight: 600, fontSize: font.size.fs_3 },
      h4: { fontWeight: 600, fontSize: font.size.fs_4 },
      h5: { fontWeight: 600, fontSize: font.size.fs_5 },
      h6: { fontWeight: 600, fontSize: font.size.fs_6 },
      body1: { fontSize: font.size.fs_5 },
      body2: { fontSize: font.size.fs_6 },
      button: { fontWeight: 600, textTransform: "none", fontSize: font.size.fs_5 },
      caption: { fontSize: font.size.fs_7 },
      overline: { fontSize: font.size.fs_7 },
    },
    palette: {
      mode: isDark ? "dark" : "light",
      primary: {
        main: themeColors.primary,
        light: alpha(themeColors.primary, 0.15),
        dark: darken(themeColors.primary, 0.2),
        contrastText:
          safeContrast(themeColors.primary, themeColors.background) > 4.5
            ? themeColors.background
            : themeColors.foreground,
      },
      secondary: {
        main: themeColors.secondary,
        light: alpha(themeColors.secondary, 0.15),
        dark: darken(themeColors.secondary, 0.2),
      },
      background: { default: themeColors.background, paper: themeColors.card },
      text: {
        primary: themeColors.foreground,
        secondary: themeColors.mutedForeground,
        disabled: alpha(themeColors.foreground, 0.38),
      },
      divider: alpha(themeColors.border, 0.7),
      error: {
        main: themeColors.destructive,
        contrastText: themeColors.destructiveForeground,
      },
      warning: { main: "#f59e0b" },
      info: { main: themeColors.cyan },
      success: { main: themeColors.emerald },
      action: {
        active: alpha(themeColors.foreground, 0.54),
        hover: alpha(themeColors.foreground, 0.06),
        selected: alpha(themeColors.primary, 0.1),
        disabled: alpha(themeColors.foreground, 0.26),
        disabledBackground: alpha(themeColors.foreground, 0.12),
      },
    },
    shape: { borderRadius: 10 },
    spacing: 4,
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundColor: themeColors.background,
            color: themeColors.foreground,
          },
        },
      },
      MuiSvgIcon: { styleOverrides: { root: { fontSize: "1.4rem" } } },
      MuiButton: {
        defaultProps: { disableElevation: true },
        styleOverrides: {
          root: {
            borderRadius: BORDER_RADIUS,
            fontWeight: 600,
            textTransform: "none",
            transition: "all 0.2s ease",
          },
          containedPrimary: {
            background: `linear-gradient(135deg, ${themeColors.cyan}, ${themeColors.emerald})`,
            color: "#fff",
            "&:hover": {
              background: `linear-gradient(135deg, ${darken(themeColors.cyan, 0.1)}, ${darken(themeColors.emerald, 0.1)})`,
              transform: "translateY(-1px)",
            },
          },
        },
      },
      MuiTextField: {
        defaultProps: { size: "small" },
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-root": {
              backgroundColor: themeColors.input,
              borderRadius: BORDER_RADIUS,
            },
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: { borderRadius: BORDER_RADIUS },
          notchedOutline: { borderColor: themeColors.border },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: { borderRadius: BORDER_RADIUS, backgroundImage: "none" },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: BORDER_RADIUS,
            border: `1px solid ${alpha(themeColors.border, 0.7)}`,
          },
        },
      },
      MuiIconButton: {
        defaultProps: { size: "small" },
        styleOverrides: { root: { borderRadius: BORDER_RADIUS } },
      },
      MuiSelect: { defaultProps: { size: "small" } },
      MuiChip: { defaultProps: { size: "small" } },
      MuiLink: {
        styleOverrides: {
          root: { textDecoration: "none", "&:hover": { textDecoration: "underline" } },
        },
      },
    },
  });

  return responsiveFontSizes(theme);
};

export const getCurrentTheme = () => createDynamicTheme();
export const themePalette = createDynamicTheme();
export default themePalette;