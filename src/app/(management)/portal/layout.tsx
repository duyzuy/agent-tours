import { AdminLayout } from "@/components/layouts";
import AdminAuthorized from "@/modules/admin/authWrapper/AdminAuthorized";

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
