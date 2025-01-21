"use client";

import { PropsWithChildren } from "react";

import { ConfigProvider, App } from "antd";
import StyledComponentsRegistry from "@/lib/AntRegistry";
import { lightTheme, darkTheme } from "@/styles/themes/antTheme";
import { ThemeModeContext, ThemeModeProvider } from "@/context/themeModeContent";
import { useContext } from "react";

export function AntdConfigProvider({ children }: PropsWithChildren) {
  const [themeMode, _] = useContext(ThemeModeContext);
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
      <AntdConfigProvider {...props} />;
    </ThemeModeProvider>
  );
}
