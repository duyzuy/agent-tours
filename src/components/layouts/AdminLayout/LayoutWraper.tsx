"use client";
import React, { memo, useState } from "react";
import { Layout, theme } from "antd";
import { SwapRightOutlined, SwapLeftOutlined } from "@ant-design/icons";
import { useThemeMode } from "@/context";
import classNames from "classnames";
import styled from "styled-components";

const { Sider, Content, Footer, Header } = Layout;

const StyledSider = styled(Sider)``;
interface LayoutWraper {
  children: React.ReactNode;
  sidebar: React.ReactNode;
  header: React.ReactNode;
  footer: React.ReactNode;
}

const LayoutWraper = ({ children, header, sidebar, footer }: LayoutWraper) => {
  const [collapsed, setCollapsed] = useState(false);
  const [mode, _] = useThemeMode();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout className="min-h-screen">
      <div
        className={classNames("border-r h-[100%] z-10 !fixed left-0 top-0 bottom-0", {
          "border-[#303030]": mode === "dark",
        })}
      >
        <Sider
          trigger={collapsed ? <SwapRightOutlined /> : <SwapLeftOutlined />}
          onCollapse={(collapsed) => setCollapsed(collapsed)}
          collapsible
          collapsed={collapsed}
          width={220}
          theme={mode}
          className="h-screen"
          style={{ background: colorBgContainer }}
        >
          {sidebar}
        </Sider>
      </div>
      <Layout className="!min-h-screen transition-all" style={{ marginLeft: collapsed ? 80 : 220 }}>
        <Header
          style={{ background: colorBgContainer }}
          className={classNames("flex border-b sticky top-0 ml-[1px] z-10 items-center !px-6", {
            "border-[#303030]": mode === "dark",
          })}
        >
          {header}
        </Header>
        <Content
          style={{
            background: colorBgContainer,
          }}
          className="p-6 min-h-full"
        >
          {children}
        </Content>
        <Footer
          style={{ background: colorBgContainer }}
          className={classNames("border-t text-right !py-3", {
            "border-[#303030]": mode === "dark",
          })}
        >
          {footer}
        </Footer>
      </Layout>
    </Layout>
  );
};
export default memo(LayoutWraper);
