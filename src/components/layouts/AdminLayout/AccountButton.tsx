"use client";
import { LINKS } from "@/constants/links.constant";
import useAdminAuth from "@/modules/admin/auth/hooks/useAdminAuth";
import { useAdminProfile } from "@/modules/admin/auth/store/AdminProfileContext";
import { LoadingOutlined, LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Space, Dropdown } from "antd";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

interface AdminHeaderProps {}

const AccountButton = () => {
  const { onLogout } = useAdminAuth();

  const [isTransition, startTransition] = useTransition();
  const router = useRouter();
  const userProfile = useAdminProfile();

  const TOP_MENU_ITEMS = [
    {
      label: "Thông tin cá nhân",
      key: "userInfo",
      icon: isTransition ? <LoadingOutlined /> : <UserOutlined />,
      onClick: () => onNavigation(LINKS.MyAccount),
    },
    {
      label: "Đăng xuất",
      key: "logout",
      icon: isTransition ? <LoadingOutlined /> : <LogoutOutlined />,
      onClick: onLogout,
    },
  ] as const;
  const onNavigation = (path: string) => {
    startTransition(() => {
      router.push(`${path}`);
    });
  };

  return (
    <Dropdown
      menu={{
        items: [...TOP_MENU_ITEMS],
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
  );
};
export default AccountButton;
