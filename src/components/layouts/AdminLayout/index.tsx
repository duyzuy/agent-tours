"use client";
import React, { memo, useEffect, useState } from "react";
import { Layout, Button, theme, Avatar, MenuProps, Dropdown, Space } from "antd";
import { UserOutlined, SwapRightOutlined, LogoutOutlined, SwapLeftOutlined } from "@ant-design/icons";
import { usePathname, useRouter } from "next/navigation";

import { originalLogo } from "@/assets";
import Image from "next/image";
import { LINKS } from "@/constants/links.constant";
import AdminMenuLink from "./AdminMenuLink";
import useLocalUserProfile from "@/hooks/useLocalProfile";
import { useLogoutPortal } from "@/app/(management)/(adminAuth)/ag/hooks/useAgAuth";
interface Props {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: Props) => {
  const { Header, Sider, Content, Footer } = Layout;

  const router = useRouter();
  const pathname = usePathname();
  const userProfile = useLocalUserProfile();
  const [collapsed, setCollapsed] = useState(false);
  const logoutPortal = useLogoutPortal();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [openKeys, setOpenKeys] = useState(["dashboard"]);
  const [activeKeys, setActiveKeys] = useState(["dashboard"]);

  const onMenuNavigation: MenuProps["onClick"] = (menuInfo) => {
    let fullPathname = "/portal";

    fullPathname = fullPathname.concat("/", menuInfo.key);

    router.push(fullPathname);
  };

  const onOpenChange: MenuProps["onOpenChange"] = (data: any) => setOpenKeys(() => [...data]);

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
    <Layout hasSider style={{ minHeight: "100vh", background: "#ffffff" }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        width={240}
        theme="light"
        className="border-r z-10 !fixed left-0 top-0 bottom-0"
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
          <div className="flex items-center justify-center bg-slate-50 py-2">
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
      <Layout className="bg-white" style={{ marginLeft: collapsed ? 80 : 240 }}>
        <Header
          style={{
            background: colorBgContainer,
          }}
          className="flex justify-between border-b sticky top-0 z-10 items-center !px-6"
        >
          <span className="font-semibold text-xl">Tour Management Platform</span>
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
                  onClick: logoutPortal,
                },
              ],
            }}
          >
            <Space className="cursor-pointer">
              <Avatar shape="circle" size={28} icon={<UserOutlined />} className="!bg-orange-500" />
              <div className="text-sm leading-none">
                <span className="block text-xs">{userProfile?.fullname}</span>
                <span className="text-xs text-gray-400">{userProfile?.email}</span>
              </div>
            </Space>
          </Dropdown>
        </Header>
        <Content
          style={{
            background: colorBgContainer,
          }}
          className="p-6 min-h-full"
        >
          {children}
        </Content>
        <Footer className="border-t text-right !bg-white !py-3">
          <p className="text-sm">Tour Management ©2023 Created by DVU</p>
        </Footer>
      </Layout>
    </Layout>
  );
};
export default memo(AdminLayout);
