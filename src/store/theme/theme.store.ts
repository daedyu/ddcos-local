import {atom, selector} from "recoil";

export type ThemePreference = "LIGHT" | "DARK" | "SYSTEM";

const LOCAL_STORAGE_KEY = "themePreference";

export const themePreferenceAtom = atom<ThemePreference>({
  key: "themePreferenceAtom",
  default: "SYSTEM",
  effects: [
    ({ onSet, setSelf }) => {
      if (typeof window === "undefined") return;

      const stored = localStorage.getItem(LOCAL_STORAGE_KEY) as ThemePreference;
      if (stored) setSelf(stored);

      onSet((newValue) => {
        localStorage.setItem(LOCAL_STORAGE_KEY, newValue);
      });
    },
  ],
});

export const resolvedThemeSelector = selector<"LIGHT" | "DARK">({
  key: "resolvedThemeSelector",
  get: ({ get }) => {
    const pref = get(themePreferenceAtom);

    if (pref === "SYSTEM") {
      if (typeof window !== "undefined" && window.matchMedia) {
        const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        return isDark ? "DARK" : "LIGHT";
      }
      return "LIGHT";
    }

    return pref;
  },
});