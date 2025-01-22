import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";

export const ThemeModeContext = createContext<["light" | "dark", Dispatch<SetStateAction<"light" | "dark">>]>([
  "light",
  () => {},
]);

export function ThemeModeProvider({ children }: { children: React.ReactNode }) {
  const [themeMode, setThemeMode] = useState<"light" | "dark">("light");
  return <ThemeModeContext.Provider value={[themeMode, setThemeMode]}>{children}</ThemeModeContext.Provider>;
}

export function useThemeMode() {
  const context = useContext(ThemeModeContext);
  if (!context) {
    throw new Error("useThemeMode must be used within a ThemeModeProvider");
  }
  return context;
}
