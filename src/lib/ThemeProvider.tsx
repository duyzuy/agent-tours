"use client";

import { PropsWithChildren } from "react";
import { ConfigProvider, App } from "antd";
import AntStyleProvider from "@/lib/AntStyleProvider";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { lightTheme, darkTheme } from "@/assets/styles/themes/antTheme";
import { ThemeModeProvider, useThemeMode } from "@/context/ThemeModeContext";
import vi_VN from "antd/locale/vi_VN";
export default function ThemeProvider({ children }: PropsWithChildren) {
  // Disable missing translation message as translations will be added later.
  // We can add a toggle for this later when we have most translations.
  const [themeMode, _] = useThemeMode();

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
    <AntdRegistry>
      <AntStyleProvider>
        <ThemeModeProvider>
          <ConfigProvider
            theme={themeMode === "light" ? lightTheme : darkTheme}
            prefixCls="travel"
            csp={{ nonce: "123456888" }}
            locale={vi_VN}
          >
            <App>{children}</App>
          </ConfigProvider>
        </ThemeModeProvider>
      </AntStyleProvider>
    </AntdRegistry>
  );
}
