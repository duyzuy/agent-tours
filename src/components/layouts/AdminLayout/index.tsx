import React, { useState } from "react";
import { Layout, Menu, Button, theme, Avatar, Space, MenuProps } from "antd";
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined,
    DashboardOutlined,
    FileOutlined,
    FolderOutlined,
    ShoppingCartOutlined,
    ContainerOutlined,
    SettingOutlined,
    TeamOutlined,
} from "@ant-design/icons";
import Link from "next/link";

type MenuItem = Required<MenuProps>["items"][number] & {
    children?: MenuItem[];
    group?: string;
    pathname?: string;
};

interface Props {
    children: React.ReactNode;
}

const ADMIN_MENU_ITEMS: MenuItem[] = [
    {
        key: "dasboard",
        icon: React.createElement(DashboardOutlined),
        label: <Link href={"/portal/dashboard"}>Dashboard</Link>,
    },
    {
        key: "booking",
        icon: React.createElement(ContainerOutlined),
        label: "Quản lý booking",
        children: [
            {
                key: "all",
                label: <Link href={"/portal/dashboard"}>Quản lý đặt tour</Link>,
            },
            {
                key: "add-post",
                label: "In vé",
            },
        ],
    },
    {
        key: "product",
        icon: React.createElement(ShoppingCartOutlined),
        label: "Quản lý Sản phẩm",
        children: [
            {
                key: "all",
                label: "Tất cả sản phẩm",
            },
            {
                key: "add-post",
                label: "Tạo sản phẩm mới",
            },
        ],
    },
    {
        key: "post",
        icon: React.createElement(FileOutlined),
        label: "Blog",
        children: [
            {
                key: "all",
                label: <Link href={"/portal/post"}>Tất cả bài viết</Link>,
            },
            {
                key: "add-post",
                label: "Tạo bài viết mới",
            },
            {
                key: "postCategory",
                label: "Chuyên mục",
            },
            {
                key: "tags",
                label: "Thẻ",
            },
        ],
    },
    {
        key: "media",
        icon: React.createElement(FolderOutlined),
        label: "Media",
    },
    {
        key: "account",
        icon: React.createElement(UserOutlined),
        label: "Quản lý tài khoản",
    },
    {
        key: "member",
        icon: React.createElement(TeamOutlined),
        label: "Quản lý thành viên",
    },
    {
        key: "system",
        icon: React.createElement(SettingOutlined),
        label: "Cấu hình hệ thống",
    },
];

const AdminLayout = ({ children }: Props) => {
    const { Header, Sider, Content, Footer } = Layout;

    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const [openKeys, setOpenKeys] = useState(["sub1"]);

    const onMenuClick: MenuProps["onClick"] = (data) => {
        console.log(data);
    };
    return (
        <Layout style={{ minHeight: "100vh", background: "#ffffff" }}>
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
                width={240}
                theme="light"
                className="border-r"
                style={{
                    position: "fixed",
                    left: 0,
                    top: 0,
                    bottom: 0,
                }}
            >
                <div className="logo h-16 flex items-center justify-center">
                    {!collapsed ? <p className="text-center font-semibold uppercase text-gray-400">Tour Management</p> : null}

                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
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
                    <Menu
                        theme="light"
                        mode="inline"
                        // onOpenChange={onOpenChange}
                        onClick={onMenuClick}
                        inlineCollapsed={collapsed}
                        defaultSelectedKeys={["dasboard"]}
                        // defaultOpenKeys={["dasboard"]}
                        items={ADMIN_MENU_ITEMS}
                        style={{
                            borderWidth: 0,
                        }}
                    />
                </div>
            </Sider>
            <Layout className="site-layout bg-white" style={{ marginLeft: 240 }}>
                <Header
                    style={{
                        padding: "0 24px",
                        background: colorBgContainer,
                    }}
                    className="flex justify-between border-b sticky top-0 z-10 items-center"
                >
                    <p className="font-semibold text-lg">Agent Hub - Cổng Quản lý Tours</p>
                    <Space>
                        <p className="text-sm">NGUYEN VAN A</p>
                        <Avatar shape="circle" size={30} icon={<UserOutlined />} style={{ background: "var(--secondary-3)" }} />
                    </Space>
                </Header>
                <Content
                    style={{
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                    }}
                >
                    {children}
                </Content>
                <Footer
                    style={{
                        textAlign: "right",
                        backgroundColor: "#fff",
                        paddingTop: "10px",
                        paddingBottom: "10px",
                    }}
                    className="bg-white border-t"
                >
                    <p className="text-sm">Tour Management ©2023 Created by DVU</p>
                </Footer>
            </Layout>
        </Layout>
    );
};
export default AdminLayout;

const getOpenKeys = (items: MenuItem[], key: string): string | undefined => {
    for (let i = 0; i < items.length; i++) {
        const item: any = items[i];
        if (item?.children?.length) {
            const res = getOpenKeys(item.children, key);
            if (res) return res;
        }
        if (item?.key === key) {
            return item.group || item.key;
        }
    }
};
