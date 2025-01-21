import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";
import { Theme } from "tinymce";

export const ThemeModeContext = createContext<["light" | "dark", Dispatch<SetStateAction<"light" | "dark">>]>([
  "light",
  () => {},
]);

// export const ThemeModeProvider = ThemeModeContext.Provider;

export function ThemeModeProvider({ children }: { children: React.ReactNode }) {
  const [themeMode, setThemeMode] = useState<"light" | "dark">("light");
  return <ThemeModeContext.Provider value={[themeMode, setThemeMode]}>{children}</ThemeModeContext.Provider>;
}
