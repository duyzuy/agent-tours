import ThemeModeToggle from "@/components/ThemeModeToggle";
import { LINKS } from "@/constants/links.constant";
import useAdminAuth from "@/modules/admin/auth/hooks/useAdminAuth";
import { useAdminProfile } from "@/modules/admin/auth/store/AdminProfileContext";
import ThingTodoItemButton2 from "@/modules/admin/operation/components/ThingTodoItemButton2";
import { LoadingOutlined, LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Layout, theme, Avatar, MenuProps, Space, Dropdown } from "antd";
import classNames from "classnames";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

interface AdminHeaderProps {
  themeMode?: "dark" | "light";
}
const AdminHeader: React.FC<AdminHeaderProps> = ({ themeMode = "light" }) => {
  const { onLogout } = useAdminAuth();

  const { Header, Sider, Content, Footer } = Layout;
  const [isTransition, startTransition] = useTransition();
  const router = useRouter();
  const userProfile = useAdminProfile();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

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
    <Header
      style={{ background: colorBgContainer }}
      className={classNames("flex border-b sticky top-0 ml-[1px] z-10 items-center !px-6", {
        "border-[#303030]": themeMode === "dark",
      })}
    >
      <div className="flex justify-between items-center flex-1">
        <div className="font-semibold text-xl">Tour Management Platform</div>
        <div className="inline-flex items-center gap-x-3">
          <ThingTodoItemButton2 />
          <ThemeModeToggle />
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
        </div>
      </div>
    </Header>
  );
};
export default AdminHeader;
