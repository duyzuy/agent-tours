import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { usePersistState } from "@/hooks/usePersistState";
import { getThemeMode, setThemeMode } from "@/utils/common";

export const ThemeModeContext = createContext<["light" | "dark", Dispatch<SetStateAction<"light" | "dark">>]>([
  "light",
  () => {},
]);

export function ThemeModeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    const themeMode = getThemeMode();
    return themeMode ?? "light";
  });

  useEffect(() => {
    setThemeMode(theme);
  }, [theme]);

  // const [themeMode, setThemeMode] = usePersistState<"light" | "dark">({ key: "theme-mode", initialValue: "light" });

  return <ThemeModeContext.Provider value={[theme, setTheme]}>{children}</ThemeModeContext.Provider>;
}

export function useThemeMode() {
  "use client";
  const context = useContext(ThemeModeContext);
  if (!context) {
    throw new Error("useThemeMode must be used within a ThemeModeProvider");
  }
  return context;
}
