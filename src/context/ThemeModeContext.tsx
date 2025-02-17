import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { usePersistState } from "@/hooks/usePersistState";

export const ThemeModeContext = createContext<["light" | "dark", Dispatch<SetStateAction<"light" | "dark">>]>([
  "light",
  () => {},
]);

export function ThemeModeProvider({ children }: { children: React.ReactNode }) {
  const [themeMode, setThemeMode] = usePersistState<"light" | "dark">({ key: "theme-mode", initialValue: "light" });

  return <ThemeModeContext.Provider value={[themeMode, setThemeMode]}>{children}</ThemeModeContext.Provider>;
}

export function useThemeMode() {
  "use client";
  const context = useContext(ThemeModeContext);
  if (!context) {
    throw new Error("useThemeMode must be used within a ThemeModeProvider");
  }
  return context;
}
