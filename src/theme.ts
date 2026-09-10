import { theme } from "antd";
import type { Theme } from "./schemas";

export type { Theme };

const sharedTokens = {
  colorPrimary: "#0D9488",
  borderRadius: 8,
  fontFamily:
    '"Space Grotesk", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
};

export const antTheme = {
  light: {
    algorithm: theme.defaultAlgorithm,
    token: {
      ...sharedTokens,
      colorBgContainer: "#FFFFFF",
      colorBgLayout: "#F5F5F4",
      colorText: "#1C1917",
      colorTextSecondary: "#78716C",
      colorBorder: "#0D9488",
      colorBorderSecondary: "#E7E5E4",
    },
  },
  dark: {
    algorithm: theme.darkAlgorithm,
    token: {
      ...sharedTokens,
      colorPrimary: "#2DD4BF",
      colorBgContainer: "#1C1C1F",
      colorBgLayout: "#121214",
      colorText: "#FFFFFF",
      colorTextSecondary: "#C4C4C4",
      colorBorder: "#2DD4BF",
      colorBorderSecondary: "#3F3F46",
    },
  },
} as const;

export type AntThemeKey = Theme;
