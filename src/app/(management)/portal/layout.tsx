import { AdminLayout } from "@/components/layouts";
import AdminAuthorized from "@/modules/admin/authWrapper/AdminAuthorized";
import { DrawerMediaManagerProvider, DrawerMediaContainer } from "@/modules/admin/drawerMedia";

interface Props {
  children: React.ReactNode;
  media_manager: React.ReactNode;
  test: React.ReactNode;
}
export default function AdminPortalLayout({ children, media_manager, test }: Props) {
  return (
    <AdminAuthorized>
      <DrawerMediaManagerProvider>
        <AdminLayout>
          {media_manager}
          {test}
          {children}
        </AdminLayout>
        <DrawerMediaContainer />
      </DrawerMediaManagerProvider>
    </AdminAuthorized>
  );
}
