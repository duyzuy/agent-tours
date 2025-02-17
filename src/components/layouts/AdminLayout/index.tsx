"use client";
import React, { memo, Suspense, useEffect, useState } from "react";
import { Layout, Button, theme, Avatar, MenuProps, Dropdown, Space, Breadcrumb, Menu } from "antd";
import { UserOutlined, SwapRightOutlined, LogoutOutlined, SwapLeftOutlined } from "@ant-design/icons";
import { usePathname, useRouter } from "next/navigation";
import { originalLogo } from "@/assets";
import Image from "next/image";
import { LINKS } from "@/constants/links.constant";
import AdminMenuLink from "./AdminMenuLink";
import ThemeModeToggle from "@/components/ThemeModeToggle";
import { useThemeMode } from "@/context";
import classNames from "classnames";
import useAdminAuth from "@/modules/admin/auth/hooks/useAdminAuth";
import ThingTodoItemButton from "@/modules/admin/operation/components/ThingTodoItemButton";
import { useAdminProfile } from "@/modules/admin/auth/store/AdminProfileContext";

interface Props {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: Props) => {
  const { Header, Sider, Content, Footer } = Layout;

  const router = useRouter();
  const pathname = usePathname();
  const userProfile = useAdminProfile();
  const [collapsed, setCollapsed] = useState(false);
  const [mode, _] = useThemeMode();

  const { onLogout } = useAdminAuth();
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

  const onNavigation = (path: string) => {
    router.push(`${path}`);
  };

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
          width={240}
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
      <Layout className="!min-h-screen transition-all" style={{ marginLeft: collapsed ? 80 : 240 }}>
        <Header
          style={{ background: colorBgContainer }}
          className={classNames("flex border-b sticky top-0 ml-[1px] z-10 items-center !px-6", {
            "border-[#303030]": mode === "dark",
          })}
        >
          <div className="flex justify-between items-center flex-1">
            <div className="font-semibold text-xl">Tour Management Platform</div>
            <div className="inline-flex items-center gap-x-3">
              <ThingTodoItemButton />
              <ThemeModeToggle />
              <Dropdown
                menu={{
                  items: [
                    {
                      label: "Thông tin cá nhân",
                      key: "userInfo",
                      icon: <UserOutlined />,
                      onClick: () => onNavigation(LINKS.MyAccount),
                    },
                    {
                      label: "Đăng xuất",
                      key: "logout",
                      icon: <LogoutOutlined />,
                      onClick: onLogout,
                    },
                  ],
                }}
              >
                <Space className="cursor-pointer">
                  <Avatar shape="circle" size={28} icon={<UserOutlined />} className="!bg-orange-500" />
                  <div className="text-sm leading-none">
                    <span className="block text-xs">{userProfile?.userType}</span>
                    <span className="text-xs">{userProfile?.fullname}</span>
                  </div>
                </Space>
              </Dropdown>
            </div>
          </div>
        </Header>
        <Suspense fallback={<div>Admin loading...</div>}>
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
          className={classNames("border-t text-right !py-3", {
            "border-[#303030]": mode === "dark",
          })}
          style={{ background: colorBgContainer }}
        >
          <p className="text-sm">Tour Management ©2023 Created by DVU</p>
        </Footer>
      </Layout>
    </Layout>
  );
};
export default memo(AdminLayout);
