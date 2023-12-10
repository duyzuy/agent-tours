"use client";

import { PropsWithChildren } from "react";

import { ConfigProvider, theme, App } from "antd";
import StyledComponentsRegistry from "@/lib/AntRegistry";
import { antdTheme } from "@/styles/themes/antTheme";

export function AntdConfigProvider({ children }: PropsWithChildren) {
    return (
        <StyledComponentsRegistry>
            <ConfigProvider theme={antdTheme} prefixCls="travel">
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
        if (
            typeof message?.message === "string" &&
            message?.message?.startsWith("MISSING_MESSAGE: Could not resolve")
        ) {
            return;
        }
        consoleError(message, ...args);
    };

    return <AntdConfigProvider {...props} />;
}
