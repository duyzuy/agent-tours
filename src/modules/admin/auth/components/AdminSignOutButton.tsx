import { Button } from "antd";
import useAdminAuth from "../hooks/useAdminAuth";
import { LogoutOutlined } from "@ant-design/icons";

interface AdminSignOutButtonProps {
  buttonName?: string;
}
const AdminSignOutButton: React.FC<AdminSignOutButtonProps> = ({ buttonName = "Đăng xuất" }) => {
  const { onLogout } = useAdminAuth();
  return (
    <Button
      icon={<LogoutOutlined />}
      onClick={onLogout}
      className="inline-flex items-center !bg-red-100 !text-red-600 !px-3"
      type="text"
    >
      <span>{buttonName}</span>
    </Button>
  );
};
export default AdminSignOutButton;
