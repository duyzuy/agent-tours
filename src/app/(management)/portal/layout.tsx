import { AdminLayout } from "@/components/layouts";
import AdminAuthorized from "@/modules/admin/authWrapper/AdminAuthorized";
import { DrawerMediaManagerProvider, DrawerMediaContainer } from "@/modules/admin/drawerMedia";

interface Props {
  children: React.ReactNode;
  media_manager: React.ReactNode;
}
export default function AdminPortalLayout({ children, media_manager }: Props) {
  return (
    <AdminAuthorized>
      <DrawerMediaManagerProvider>
        <AdminLayout>
          {media_manager}
          {children}
        </AdminLayout>
        <DrawerMediaContainer />
      </DrawerMediaManagerProvider>
    </AdminAuthorized>
  );
}
