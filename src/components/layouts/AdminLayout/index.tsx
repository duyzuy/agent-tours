"use client";
import React, { memo, useEffect, useState } from "react";
import { Layout, Button, theme, Avatar, MenuProps, Dropdown } from "antd";
import {
    UserOutlined,
    MoreOutlined,
    SwapRightOutlined,
    LogoutOutlined,
} from "@ant-design/icons";
import { usePathname, useRouter } from "next/navigation";
import classNames from "classnames";
import { travelLogo } from "@/assets";
import Image from "next/image";
import { removeAgToken } from "@/utils/common";
import { LINKS } from "@/constants/links.constant";
import AdminMenuLink from "./AdminMenuLink";
import useLocalUserProfile from "@/hooks/useLocalProfile";
import { useLogoutPortal } from "@/app/(adminAuth)/ag/hooks/useAgAuth";
interface Props {
    children: React.ReactNode;
}

const AdminLayout = ({ children }: Props) => {
    const { Header, Sider, Content, Footer } = Layout;

    const router = useRouter();
    const pathname = usePathname();

    const userProfile = useLocalUserProfile();

    const [collapsed, setCollapsed] = useState(false);
    const onLogoutPortal = useLogoutPortal();
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

    const onOpenChange: MenuProps["onOpenChange"] = (data: any) =>
        setOpenKeys(() => [...data]);

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
                className="border-r z-10"
                style={{
                    position: "fixed",
                    left: 0,
                    top: 0,
                    bottom: 0,
                }}
            >
                <div className="logo h-16 flex items-center justify-center">
                    {!collapsed ? (
                        <Image
                            src={travelLogo}
                            alt="logo"
                            width={180}
                            priority
                        />
                    ) : null}
                    <Button
                        type="text"
                        className={classNames({
                            "absolute right-0": !collapsed,
                        })}
                        icon={
                            collapsed ? <SwapRightOutlined /> : <MoreOutlined />
                        }
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: "16px",
                            width: 30,
                            height: 30,
                        }}
                    />
                </div>
                <div
                    className="menu overflow-y-auto"
                    style={{
                        height: "calc(100% - 64px)",
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
            <Layout
                className="bg-white"
                style={{ marginLeft: collapsed ? 80 : 240 }}
            >
                <Header
                    style={{
                        padding: "0 24px",
                        background: colorBgContainer,
                    }}
                    className="flex justify-between border-b sticky top-0 z-10  items-center"
                >
                    <p className="font-semibold text-lg">
                        Agent Hub - Cổng Quản lý Tours
                    </p>
                    <div className="avata ">
                        <Dropdown
                            menu={{
                                items: [
                                    {
                                        label: "Thông tin cá nhân",
                                        key: "1",
                                        icon: <UserOutlined />,
                                        onClick: () =>
                                            onNavigation(LINKS.MyAccount),
                                    },
                                    {
                                        label: "Đăng xuất",
                                        key: "2",
                                        icon: <LogoutOutlined />,
                                        onClick: onLogoutPortal,
                                    },
                                ],
                            }}
                        >
                            <div className="flex items-center">
                                <p className="text-sm mr-2 leading-none">
                                    <span className="block text-xs">
                                        {userProfile?.fullname}
                                    </span>
                                    <span className="text-xs text-gray-400">
                                        {userProfile?.email}
                                    </span>
                                </p>
                                <Avatar
                                    shape="circle"
                                    size={28}
                                    icon={<UserOutlined />}
                                    style={{ backgroundColor: "#87d068" }}
                                />
                            </div>
                        </Dropdown>
                    </div>
                </Header>
                <Content
                    style={{
                        padding: "24px 24px 0",
                        minHeight: 280,
                        background: colorBgContainer,
                    }}
                >
                    {children}
                </Content>
                <Footer
                    style={{
                        backgroundColor: "#fff",
                        paddingTop: "16px",
                        paddingBottom: "16px",
                    }}
                    className="border-t text-right"
                >
                    <p className="text-sm">
                        Tour Management ©2023 Created by DVU
                    </p>
                </Footer>
            </Layout>
        </Layout>
    );
};
export default memo(AdminLayout);
