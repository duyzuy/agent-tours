import React, { memo } from "react";
import {
    DashboardOutlined,
    ContainerOutlined,
    ShoppingCartOutlined,
    UnorderedListOutlined,
    FileOutlined,
    FolderOutlined,
    UserOutlined,
    TeamOutlined,
    SettingOutlined,
    EnvironmentOutlined,
    ClusterOutlined,
    SearchOutlined,
    TagOutlined,
} from "@ant-design/icons";
import { Menu, MenuProps } from "antd";

type MenuItem = Required<MenuProps>["items"][number] & {
    children?: MenuItem[];
    group?: string;
    pathname?: string;
};

const ADMIN_MENU_ITEMS: MenuItem[] = [
    {
        key: "dashboard",
        icon: React.createElement(DashboardOutlined),
        label: "Dashboard",
    },
    {
        key: "booking",
        icon: React.createElement(TagOutlined),
        label: "Đặt tour",
    },
    {
        key: "manage-booking",
        icon: React.createElement(ContainerOutlined),
        label: "Quản lý booking",
        children: [
            {
                key: "manage-booking",
                label: "Quản lý booking",
            },
            {
                key: "manage-booking/print",
                label: "In vé",
            },
        ],
    },
    {
        key: "product",
        icon: React.createElement(ShoppingCartOutlined),
        label: "Sản phẩm",
        children: [
            {
                key: "product/inventory",
                label: "Inventories",
            },
            {
                key: "product/stock",
                label: "Stocks",
            },
            {
                key: "product/template-sellable",
                label: "Template sellables",
            },
            {
                key: "product/sellable",
                label: "Sellables",
            },
        ],
    },
    {
        key: "destination",
        icon: React.createElement(ClusterOutlined),
        label: "Nhóm điểm đến",
        children: [
            {
                key: "destination/",
                label: "Danh sách nhóm",
            },
            {
                key: "destination/search-group",
                label: "Nhóm search",
            },
        ],
    },
    {
        key: "geo-location",
        icon: React.createElement(EnvironmentOutlined),
        label: "Quản lý khu vực",
        children: [
            {
                key: "geo-location/region",
                label: "Khu vực",
            },
            {
                key: "geo-location/country",
                label: "Quốc gia",
            },
            {
                key: "geo-location/city",
                label: "Tỉnh/thành phố",
            },
            {
                key: "geo-location/district",
                label: "Quận/huyện",
            },
        ],
    },
    {
        key: "menu",
        icon: React.createElement(UnorderedListOutlined),
        label: "Menu",
        children: [
            {
                key: "menu/menu-header",
                label: "Menu header",
            },
            {
                key: "menu/menu-footer",
                label: "Menu footer",
                // /portal/menu/menu-footer
            },
        ],
    },
    {
        key: "post",
        icon: React.createElement(FileOutlined),
        label: "Blog",
        children: [
            {
                key: "post/list",
                label: "Tất cả bài viết",
            },
            {
                key: "post/create",
                label: "Tạo bài viết mới",
            },
            {
                key: "post/category",
                label: "Chuyên mục",
            },
            {
                key: "post/tag",
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
        key: "user-management",
        icon: React.createElement(UserOutlined),
        label: "Quản lý tài khoản",
        children: [
            {
                key: "user",
                label: "Tài khoản",
            },
            {
                key: "role",
                label: "Quyền người dùng",
            },
            {
                key: "role-permission",
                label: "Nhóm chức năng",
            },
        ],
    },
    {
        key: "member",
        icon: React.createElement(TeamOutlined),
        label: "Quản lý thành viên",
    },
    {
        key: "system-configuration",
        icon: React.createElement(SettingOutlined),
        label: "Cấu hình hệ thống",
    },
];

type AdminMenuProps = MenuProps & {
    onNavigation?: MenuProps["onClick"];
};
const AdminMenuLink: React.FC<AdminMenuProps> = ({ onNavigation, ...rest }) => {
    return (
        <Menu
            theme="light"
            mode="inline"
            selectable
            onClick={onNavigation}
            defaultSelectedKeys={["dashboard"]}
            items={ADMIN_MENU_ITEMS}
            style={{
                borderWidth: 0,
            }}
            {...rest}
        />
    );
};
export default memo(AdminMenuLink);
