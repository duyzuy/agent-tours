"use client";
import React, { memo, Suspense, useEffect, useState } from "react";
import { Layout, theme, MenuProps } from "antd";
import { SwapRightOutlined, SwapLeftOutlined } from "@ant-design/icons";
import { usePathname, useRouter } from "next/navigation";
import { originalLogo } from "@/assets";
import Image from "next/image";
import AdminMenuLink from "./AdminMenuLink";
import { useThemeMode } from "@/context";
import classNames from "classnames";
import { useAdminProfile } from "@/modules/admin/auth/store/AdminProfileContext";
import AdminLoading from "./Loading";
import { useTransition } from "react";
import AdminHeader from "./Header";

interface Props {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: Props) => {
  const { Sider, Content, Footer } = Layout;
  const router = useRouter();
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mode, _] = useThemeMode();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [openKeys, setOpenKeys] = useState(["dashboard"]);
  const [activeKeys, setActiveKeys] = useState(["dashboard"]);

  const onOpenChange: MenuProps["onOpenChange"] = (data: any) => setOpenKeys(() => [...data]);
  const onMenuNavigation: MenuProps["onClick"] = (menuInfo) => {
    let fullPathname = "/portal";
    fullPathname = fullPathname.concat("/", menuInfo.key);
    router.push(fullPathname);
  };

  useEffect(() => {
    const formatPathname = pathname.replace("/portal/", "");

    setActiveKeys(() => [formatPathname]);

    const arrFormatPathname = formatPathname.split("/");

    if (arrFormatPathname.length > 1) {
      setOpenKeys(() => [arrFormatPathname[0]]);
    }
  }, [pathname]);

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
          <div className={classNames("h-16 flex items-center px-4")}>
            <Image src={originalLogo} alt="logo" priority className="w-full max-w-[120px] mx-auto" />
          </div>
          <div
            className="flex-1 overflow-y-auto"
            style={{
              height: "calc(100% - 64px)",
              scrollbarWidth: "thin",
              scrollbarGutter: "inherit",
              insetInlineStart: 0,
            }}
          >
            <AdminMenuLink
              onNavigation={(menuInfo) => onMenuNavigation(menuInfo)}
              onOpenChange={onOpenChange}
              openKeys={openKeys}
              defaultSelectedKeys={["dashboard"]}
              selectedKeys={activeKeys}
            />
          </div>
        </Sider>
      </div>
      <Layout className="!min-h-screen transition-all" style={{ marginLeft: collapsed ? 80 : 220 }}>
        <AdminHeader themeMode={mode} />
        <Suspense fallback={<AdminLoading />}>
          <Content
            style={{
              background: colorBgContainer,
            }}
            className="p-6 min-h-full"
          >
            {children}
          </Content>
        </Suspense>
        <Footer
          style={{ background: colorBgContainer }}
          className={classNames("border-t text-right !py-3", {
            "border-[#303030]": mode === "dark",
          })}
        >
          <p className="text-sm">Tour Management ©2023 Created by DVU</p>
        </Footer>
      </Layout>
    </Layout>
  );
};
export default memo(AdminLayout);
