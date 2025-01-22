"use client";
import React, { memo, Suspense, useEffect, useState } from "react";
import { Layout, Button, theme, Avatar, MenuProps, Dropdown, Space } from "antd";
import { UserOutlined, SwapRightOutlined, LogoutOutlined, SwapLeftOutlined } from "@ant-design/icons";
import { usePathname, useRouter } from "next/navigation";
import { originalLogo } from "@/assets";
import Image from "next/image";
import { LINKS } from "@/constants/links.constant";
import AdminMenuLink from "./AdminMenuLink";
import useLocalUserProfile from "@/hooks/useLocalProfile";
import useAdminAuth from "@/modules/admin/auth/hooks/useAdminAuth";
import ThemeModeToggle from "@/components/ThemeModeToggle";
import { useThemeMode } from "@/context";
import classNames from "classnames";

interface Props {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: Props) => {
  const { Header, Sider, Content, Footer } = Layout;

  const router = useRouter();
  const pathname = usePathname();
  const userProfile = useLocalUserProfile();
  const [collapsed, setCollapsed] = useState(false);
  const [mode, _] = useThemeMode();

  const { onLogout } = useAdminAuth();
  const {
    token: { colorBgContainer, colorTextLabel },
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
    <Layout
      hasSider
      style={{ minHeight: "100vh" }}
      className={classNames(mode === "dark" ? "text-gray-300" : "text-gray-900")}
    >
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        width={240}
        theme={mode}
        className={classNames("border-r z-10 !fixed left-0 top-0 bottom-0", {
          "border-[#303030]": mode === "dark",
        })}
      >
        <div className="flex flex-col h-full">
          <div className="logo p-4">
            {!collapsed ? <Image src={originalLogo} alt="logo" priority className="w-40 mx-auto" /> : null}
          </div>
          <div className="overflow-y-auto flex-1">
            <AdminMenuLink
              onNavigation={(menuInfo) => onMenuNavigation(menuInfo)}
              onOpenChange={onOpenChange}
              openKeys={openKeys}
              defaultSelectedKeys={["dashboard"]}
              selectedKeys={activeKeys}
            />
          </div>
          <div className="flex items-center justify-center py-2" style={{ background: colorBgContainer }}>
            <Button
              type="text"
              shape="circle"
              icon={collapsed ? <SwapRightOutlined /> : <SwapLeftOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              className="mx-auto"
            />
          </div>
        </div>
      </Sider>
      <Layout style={{ marginLeft: collapsed ? 80 : 240 }}>
        <Header
          style={{ background: colorBgContainer }}
          className={classNames("flex justify-between border-b sticky top-0 z-10 items-center !px-6", {
            "border-[#303030] !text-gray-300": mode === "dark",
            "text-gray-900 bg-white": mode === "light",
          })}
        >
          <div className="font-semibold text-xl">Tour Management Platform</div>
          <div className="inline-flex items-center gap-x-3">
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
        <Footer className="border-t text-right !py-3" style={{ background: colorBgContainer, color: colorTextLabel }}>
          <p className="text-sm">Tour Management ©2023 Created by DVU</p>
        </Footer>
      </Layout>
    </Layout>
  );
};
export default memo(AdminLayout);
