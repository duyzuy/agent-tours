"use client";

import { PropsWithChildren } from "react";
import { ConfigProvider, App } from "antd";
import StyledComponentsRegistry from "@/lib/AntRegistry";
import { lightTheme, darkTheme } from "@/assets/styles/themes/antTheme";
import { ThemeModeProvider, useThemeMode } from "@/context/ThemeModeContext";

export function AntdConfigProvider({ children }: PropsWithChildren) {
  const [themeMode, _] = useThemeMode();
  return (
    <StyledComponentsRegistry>
      <ConfigProvider
        theme={themeMode === "light" ? lightTheme : darkTheme}
        prefixCls="travel"
        csp={{ nonce: "123456888" }}
      >
        <App>{children}</App>
      </ConfigProvider>
    </StyledComponentsRegistry>
  );
}

export default function ThemeProvider(props: PropsWithChildren) {
  // Disable missing translation message as translations will be added later.
  // We can add a toggle for this later when we have most translations.

  // eslint-disable-next-line
  const consoleError = console.error.bind(console);
  // eslint-disable-next-line
  console.error = (message, ...args) => {
    if (typeof message?.message === "string" && message?.message?.startsWith("MISSING_MESSAGE: Could not resolve")) {
      return;
    }
    consoleError(message, ...args);
  };

  return (
    <ThemeModeProvider>
      <AntdConfigProvider {...props} />
    </ThemeModeProvider>
  );
}
