import React, { memo } from "react";
import useLocalUserPermissions from "@/hooks/useLocalUserPermissions";
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
  ClusterOutlined,
  TagOutlined,
  GlobalOutlined,
  FileTextOutlined,
  SnippetsOutlined,
  ControlOutlined,
} from "@ant-design/icons";
import { Menu, MenuProps } from "antd";
import { PATH_WITH_PERMISSION, TRoleCondition } from "@/constants/permission.constant";

type MenuItem = Required<MenuProps>["items"][number] & {
  children?: MenuItem[];
  group?: string;
  pathname?: string;
  rolepers?: TRoleCondition;
};

type AdminMenuProps = MenuProps & {
  onNavigation?: MenuProps["onClick"];
};

const ADMIN_MENU_ITEMS: MenuItem[] = [
  {
    key: "dashboard",
    icon: React.createElement(DashboardOutlined),
    label: "Dashboard",
    rolepers: PATH_WITH_PERMISSION["dashboard"],
  },
  {
    key: "guide",
    icon: React.createElement(SnippetsOutlined),
    label: "Hướng dẫn",
    rolepers: PATH_WITH_PERMISSION["guide"],
  },
  {
    key: "booking-request",
    icon: React.createElement(TagOutlined),
    label: "Đặt tour yêu cầu",
    rolepers: PATH_WITH_PERMISSION["booking-request"],
  },
  {
    key: "booking",
    icon: React.createElement(TagOutlined),
    label: "Đặt tour",
    rolepers: PATH_WITH_PERMISSION["booking"],
  },
  {
    key: "manage-booking",
    icon: React.createElement(ContainerOutlined),
    label: "Quản lý đặt chỗ",
    rolepers: PATH_WITH_PERMISSION["manage-booking"],
    children: [
      {
        key: "manage-booking/order-list",
        label: "Danh sách đặt chỗ",
        rolepers: PATH_WITH_PERMISSION["manage-booking/order-list"],
      },
      {
        key: "manage-booking/form-of-payment",
        label: "Phiếu thu",
        rolepers: PATH_WITH_PERMISSION["manage-booking/form-of-payment"],
      },
    ],
  },
  {
    key: "operation",
    icon: React.createElement(ControlOutlined),
    label: "Điều hành",
    rolepers: PATH_WITH_PERMISSION["operation"],
    children: [
      {
        key: "operation/list",
        label: "Mã điều hành",
        rolepers: PATH_WITH_PERMISSION["operation/list"],
      },
    ],
  },
  {
    key: "product",
    icon: React.createElement(ShoppingCartOutlined),
    label: "Quản lý sản phẩm",
    rolepers: PATH_WITH_PERMISSION["product"],
    children: [
      {
        key: "product/manage-vendor",
        label: "Quản lý vendor",
        rolepers: PATH_WITH_PERMISSION["product/manage-vendor"],
      },
      {
        key: "product/manage-supplier",
        label: "Quản lý supplier",
        rolepers: PATH_WITH_PERMISSION["product/manage-supplier"],
      },
      {
        key: "product/inventory",
        label: "Loại dịch vụ",
        rolepers: PATH_WITH_PERMISSION["product/inventory"],
      },
      {
        key: "product/stock",
        label: "Kho dịch vụ",
        rolepers: PATH_WITH_PERMISSION["product/stock"],
      },
      {
        key: "product/template-sellable",
        label: "Sản phẩm",
        rolepers: PATH_WITH_PERMISSION["product/template-sellable"],
      },
      // {
      //   key: "product/sellable",
      //   label: "Sản phẩm",
      //   rolepers: PATH_WITH_PERMISSION["product/sellable"],
      // },
    ],
  },
  {
    key: "rule-policy",
    icon: React.createElement(TagOutlined),
    label: "Chính sách",
    rolepers: PATH_WITH_PERMISSION["rule-policy"],
    children: [
      {
        key: "rule-policy/coupon",
        label: "Coupon",
        rolepers: PATH_WITH_PERMISSION["rule-policy/coupon"],
      },
      {
        key: "rule-policy/coupon-policy",
        label: "Policy",
        rolepers: PATH_WITH_PERMISSION["rule-policy/coupon-policy"],
      },
      {
        key: "rule-policy/payment",
        label: "Thanh toán, thuế, phí",
        rolepers: PATH_WITH_PERMISSION["rule-policy/payment"],
      },
    ],
  },
  {
    key: "destination",
    icon: React.createElement(ClusterOutlined),
    label: "Điểm đến",
    rolepers: PATH_WITH_PERMISSION["destination"],
    children: [
      {
        key: "destination/",
        label: "Danh sách điểm đến",
        rolepers: PATH_WITH_PERMISSION["destination/list"],
      },
      {
        key: "destination/search-group",
        label: "Nhóm search",
        rolepers: PATH_WITH_PERMISSION["destination/notice-information"],
      },
      {
        key: "destination/notice-information",
        label: "Thông tin lưu ý",
        rolepers: PATH_WITH_PERMISSION["destination/notice-information"],
      },
    ],
  },

  {
    key: "content-template",
    icon: React.createElement(FileTextOutlined),
    label: "Thông tin chi tiết",
    rolepers: PATH_WITH_PERMISSION["content-template"],
    children: [
      {
        key: "content-template/sellable/list",
        label: "Nội dung sản phẩm",
        rolepers: PATH_WITH_PERMISSION["content-template/sellable/list"],
      },
      {
        key: "content-template/visa/list",
        label: "Nội dung visa",
        rolepers: PATH_WITH_PERMISSION["content-template/visa/list"],
      },
      {
        key: "content-template/misc-document/list",
        label: "Hồ sơ, giấy tờ yêu cầu",
        rolepers: PATH_WITH_PERMISSION["content-template/misc-document/list"],
      },
      {
        key: "content-template/misc-depart/list",
        label: "Điểm khởi hành",
        rolepers: PATH_WITH_PERMISSION["content-template/misc-depart/list"],
      },
    ],
  },
  {
    key: "menu",
    icon: React.createElement(UnorderedListOutlined),
    label: "Menu",
    rolepers: PATH_WITH_PERMISSION["menu"],
    children: [
      {
        key: "menu/primary",
        label: "Primary",
        rolepers: PATH_WITH_PERMISSION["menu/primary"],
      },
      {
        key: "menu/secondary",
        label: "Secondary",
        rolepers: PATH_WITH_PERMISSION["menu/secondary"],
      },
      {
        key: "menu/footer",
        label: "Footer",
        rolepers: PATH_WITH_PERMISSION["menu/footer"],
      },
      {
        key: "menu/footer-info",
        label: "Footer information",
        rolepers: PATH_WITH_PERMISSION["menu/footer-info"],
      },
      {
        key: "menu/mobile",
        label: "Mobile menu",
        rolepers: PATH_WITH_PERMISSION["menu/mobile"],
      },
    ],
  },
  {
    key: "contents",
    icon: React.createElement(FileOutlined),
    label: "Quản lý nội dung",
    rolepers: PATH_WITH_PERMISSION["post"],
    children: [
      {
        key: "contents/category",
        label: "Danh mục bài viết",
        rolepers: PATH_WITH_PERMISSION["category"],
      },
      {
        key: "contents/tag",
        label: "Thẻ bài viết",
        rolepers: PATH_WITH_PERMISSION["tag"],
      },
      {
        key: "contents/post",
        label: "Bài viết",
        rolepers: PATH_WITH_PERMISSION["post"],
      },
      {
        key: "contents/page",
        label: "Trang nội dung",
        rolepers: PATH_WITH_PERMISSION["post"],
      },
    ],
  },
  {
    key: "media",
    icon: React.createElement(FolderOutlined),
    label: "Media",
    rolepers: PATH_WITH_PERMISSION["media"],
  },
  {
    key: "user-management",
    icon: React.createElement(UserOutlined),
    label: "Quản lý tài khoản",
    rolepers: PATH_WITH_PERMISSION["user"],
    children: [
      {
        key: "user",
        label: "Tài khoản",
        rolepers: PATH_WITH_PERMISSION["user"],
      },
      {
        key: "role",
        label: "Quyền",
        rolepers: PATH_WITH_PERMISSION["role"],
      },
      {
        key: "role-permission",
        label: "Nhóm chức năng",
        rolepers: PATH_WITH_PERMISSION["role-permission"],
      },
      {
        key: "permission",
        label: "Chức năng",
        rolepers: PATH_WITH_PERMISSION["role-permission"],
      },
    ],
  },
  {
    key: "leading",
    icon: React.createElement(TeamOutlined),
    label: "Leading",
    rolepers: PATH_WITH_PERMISSION["leading"],
    children: [
      {
        key: "leading/list",
        label: "Leading list",
        rolepers: PATH_WITH_PERMISSION["leading/list"],
      },
    ],
  },
  {
    key: "language",
    icon: React.createElement(GlobalOutlined),
    label: "Ngôn ngữ",
    rolepers: PATH_WITH_PERMISSION["language"],
  },
  {
    key: "system-configuration",
    icon: React.createElement(SettingOutlined),
    label: "Cấu hình hệ thống",
    rolepers: PATH_WITH_PERMISSION["system-configuration"],
    children: [
      {
        key: "system-configuration/general",
        label: "Cấu hình chung",
        rolepers: PATH_WITH_PERMISSION["system-configuration/general"],
      },
    ],
  },
];

const AdminMenuLink: React.FC<AdminMenuProps> = ({ onNavigation, ...rest }) => {
  const [_, checkPermession] = useLocalUserPermissions();

  const adminMenuMappingRule = ADMIN_MENU_ITEMS.reduce<MenuItem[]>((acc, item) => {
    const childItems = item.children?.reduce<MenuItem[]>((childItems, childItem) => {
      if (!childItem.rolepers) {
        childItems = [...childItems, childItem];
      }
      if (childItem.rolepers && checkPermession(childItem.rolepers)) {
        childItems = [...childItems, childItem];
      }
      return childItems;
    }, []);

    if (!item.rolepers) {
      acc = [...acc, { ...item, children: childItems }];
    }

    if (item.rolepers && checkPermession(item.rolepers)) {
      acc = [...acc, { ...item, children: childItems }];
    }
    return acc;
  }, []);

  return (
    <Menu
      theme="light"
      mode="inline"
      selectable
      onClick={onNavigation}
      defaultSelectedKeys={["dashboard"]}
      items={adminMenuMappingRule}
      style={{
        borderWidth: 0,
      }}
      {...rest}
    />
  );
};
export default memo(AdminMenuLink);
