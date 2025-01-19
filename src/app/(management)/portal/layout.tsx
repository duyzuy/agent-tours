import { AdminLayout } from "@/components/layouts";
import AdminAuthorized from "@/components/admin/authWrapper/AdminAuthorized";
import "@/styles/globals.scss";

interface Props {
  children: React.ReactNode;
}
export default function AdminPortalLayout({ children }: Props) {
  return (
    <AdminAuthorized>
      <AdminLayout>{children}</AdminLayout>
    </AdminAuthorized>
  );
}
