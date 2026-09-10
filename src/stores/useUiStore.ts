import { create } from "zustand";
import { loadPersistedTheme, savePersistedTheme } from "../lib/storage";
import type { Theme } from "../theme";

function systemTheme(): Theme {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

const persistedTheme = loadPersistedTheme();

interface UiState {
  theme: Theme;
  themeUserSet: boolean;
  isExpanded: boolean;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  toggleExpanded: () => void;
  closeExpanded: () => void;
}

export const useUiStore = create<UiState>((set) => ({
  theme: persistedTheme ?? systemTheme(),
  themeUserSet: persistedTheme !== null,
  isExpanded: false,
  setTheme: (theme) => set({ theme }),
  toggleTheme: () =>
    set((state) => {
      const next = state.theme === "light" ? "dark" : "light";
      savePersistedTheme(next);
      return { theme: next, themeUserSet: true };
    }),
  toggleExpanded: () => set((state) => ({ isExpanded: !state.isExpanded })),
  closeExpanded: () => set({ isExpanded: false }),
}));