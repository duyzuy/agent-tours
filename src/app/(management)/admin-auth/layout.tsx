import Link from "next/link";
import AdminAuth from "@/modules/admin/authWrapper/AdminAuth";
import { Layout, Space } from "antd";
import { useThemeMode } from "@/context";
import { Content } from "antd/es/layout/layout";
interface Props {
  children: React.ReactNode;
}
const AdminAuthLayout = ({ children }: Props) => {
  return (
    <AdminAuth>
      <Layout className="login-page h-screen flex flex-wrap">
        <div className="w-full h-full lg:w-1/3 xl:w-1/5 bg-gradient-to-t from-primary-dark to-primary-light flex items-end justify-center">
          <div className="content text-white px-4 py-8">
            <p className="text-2xl font-bold mb-1 uppercase">Nền tảng quản lý tour trực tuyến</p>
            <p className="text-sm ">Giải pháp quản lý tour trực tuyến B2B.</p>
            <Space>
              <Link href="/" className="">
                <span className="text-white">Chính sách</span>
              </Link>
              <span className="text-xs text-white">|</span>
              <Link href="/">
                <span className="text-white">Điều kiện, điều khoản</span>
              </Link>
            </Space>
          </div>
        </div>
        <div className="w-full lg:w-2/3 xl:w-4/5 px-6 pt-12 py-8 flex justify-center items-center min-h-full">
          {children}
        </div>
      </Layout>
    </AdminAuth>
  );
};
export default AdminAuthLayout;
