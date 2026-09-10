import { themeSchema } from "../schemas";
import type { Theme } from "../schemas";

const THEME_KEY = "portfolio-theme:v1";

export function loadPersistedTheme(): Theme | null {
  try {
    const raw = localStorage.getItem(THEME_KEY);
    if (raw === null) return null;
    const parsed = themeSchema.safeParse(JSON.parse(raw));
    return parsed.success ? parsed.data : null;
  } catch {
    return null;
  }
}

export function savePersistedTheme(theme: Theme): void {
  try {
    localStorage.setItem(THEME_KEY, JSON.stringify(theme));
  } catch {
    // Throws in private browsing / quota-exceeded scenarios; ignore.
  }
}