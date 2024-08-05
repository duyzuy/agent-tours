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
  GlobalOutlined,
  FileTextOutlined,
  SnippetsOutlined,
} from "@ant-design/icons";
import { Menu, MenuProps } from "antd";
import { pathPermissions } from "@/constants/permission.constant";

type MenuItem = Required<MenuProps>["items"][number] & {
  children?: MenuItem[];
  group?: string;
  pathname?: string;
};

type AdminMenuProps = MenuProps & {
  onNavigation?: MenuProps["onClick"];
};
const AdminMenuLink: React.FC<AdminMenuProps> = ({ onNavigation, ...rest }) => {
  let ADMIN_MENU_ITEMS: MenuItem[] = [
    {
      key: "dashboard",
      icon: React.createElement(DashboardOutlined),
      label: "Dashboard",
    },
    {
      key: "guide",
      icon: React.createElement(SnippetsOutlined),
      label: "Hướng dẫn",
    },
    {
      key: "booking",
      icon: React.createElement(TagOutlined),
      label: "Đặt tour",
    },
    {
      key: "manage-booking",
      icon: React.createElement(ContainerOutlined),
      label: "Quản lý đặt chỗ",
      children: [
        {
          key: "manage-booking/order-list",
          label: "Danh sách đặt chỗ",
        },
        {
          key: "manage-booking/form-of-payment",
          label: "Phiếu thu",
        },
        // {
        //     key: "manage-booking/print",
        //     label: "In vé",
        // },
      ],
    },
    {
      key: "product",
      icon: React.createElement(ShoppingCartOutlined),
      label: "Quản lý sản phẩm",
      children: [
        {
          key: "product/manage-vendor",
          label: "Quản lý vendor",
        },
        {
          key: "product/manage-supplier",
          label: "Quản lý supplier",
        },
        {
          key: "product/inventory",
          label: "Loại dịch vụ",
        },
        {
          key: "product/stock",
          label: "Kho dịch vụ",
        },
        {
          key: "product/template-sellable",
          label: "Nhóm sản phẩm",
        },
        {
          key: "product/sellable",
          label: "Sản phẩm",
        },
      ],
    },
    {
      key: "discountPolicy",
      icon: React.createElement(TagOutlined),
      label: "Chính sách giảm giá",
      children: [
        {
          key: "discount-policy/coupon",
          label: "Coupon",
        },
        {
          key: "discount-policy/policy",
          label: "Policy",
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
      key: "cms-template",
      icon: React.createElement(FileTextOutlined),
      label: "Cms template",
      children: [
        {
          key: "cms-template/list",
          label: "Danh sách template",
        },
      ],
    },
    {
      key: "visa-template",
      icon: React.createElement(FileTextOutlined),
      label: "Visa template",
      children: [
        {
          key: "visa-template/list",
          label: "Danh sách Visa",
        },
      ],
    },
    {
      key: "menu",
      icon: React.createElement(UnorderedListOutlined),
      label: "Menu",
      children: [
        {
          key: "menu/primary",
          label: "Primary",
        },
        {
          key: "menu/secondary",
          label: "Secondary",
        },
        {
          key: "menu/footer",
          label: "Footer",
        },
        {
          key: "menu/footer-info",
          label: "Footer information",
        },
        {
          key: "menu/mobile",
          label: "Mobile menu",
        },
      ],
    },
    {
      key: "contents",
      icon: React.createElement(FileOutlined),
      label: "Quản lý nội dung",
      children: [
        {
          key: "contents/page",
          label: "Trang nội dung",
        },
        {
          key: "contents/category",
          label: "Danh mục bài viết",
        },
        {
          key: "contents/tag",
          label: "Thẻ bài viết",
        },
        {
          key: "contents/post",
          label: "Bài viết",
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
    // {
    //     key: "member",
    //     icon: React.createElement(TeamOutlined),
    //     label: "Quản lý thành viên",
    // },
    {
      key: "language",
      icon: React.createElement(GlobalOutlined),
      label: "Ngôn ngữ",
    },
    {
      key: "system-configuration",
      icon: React.createElement(SettingOutlined),
      label: "Cấu hình hệ thống",
      children: [
        {
          key: "general",
          label: "Cấu hình chung",
        },
        {
          key: "rule-policy",
          label: "Chính sách thanh toán",
        },
      ],
    },
  ];
  const adminMenuItems = Object.keys(pathPermissions).reduce<MenuItem[]>((acc, item) => {
    return acc;
  }, ADMIN_MENU_ITEMS);
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
