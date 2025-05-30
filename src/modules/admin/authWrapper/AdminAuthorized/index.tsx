"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAdminAuth from "@/modules/admin/auth/hooks/useAdminAuth";
import { LINKS } from "@/constants/links.constant";
import PermissionWrapper from "./PermissionWrapper";
import useAdminGetProfile from "../../auth/hooks/useAdminGetProfile";
import useAdminGetRoles from "../../auth/hooks/useAdminGetRoles";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import useMessage from "@/hooks/useMessage";
import { AdminProfileProvider } from "../../auth/store/AdminProfileContext";

interface Props {
  children: React.ReactNode;
}
const AdminAuthorized: React.FC<Props> = ({ children }) => {
  const router = useRouter();
  const message = useMessage();

  const { clearToken, isAuth } = useAdminAuth();

  const { data: userProfile, isLoading, isError, error } = useAdminGetProfile({ enabled: isAuth });

  const { data: rolesPers, isLoading: isLoadingRole } = useAdminGetRoles({
    enabled: !isLoading && !isError && !!userProfile,
  });

  useEffect(() => {
    if (isError) {
      clearToken();
      message.error(error.message);
    }
  }, [error, isError]);

  useEffect(() => {
    if (!userProfile && !isLoading) {
      clearToken();
      router.push(LINKS.PortalLogin);
    }
  }, [userProfile, isLoading]);

  // if (isLoading || isLoadingRole) {
  //   return (
  //     <div className="flex items-center justify-center h-screen">
  //       <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
  //     </div>
  //   );
  // }
  if (!userProfile || !rolesPers) return null;
  return (
    <AdminProfileProvider profile={userProfile}>
      <PermissionWrapper rolePers={rolesPers.roleList[0].localUser_RolePermissionList}>{children}</PermissionWrapper>
    </AdminProfileProvider>
  );
};
export default AdminAuthorized;
