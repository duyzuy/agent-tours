"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAgAuth";
import { LINKS } from "@/constants/links.constant";
import PermissionWrapper from "./PermissionWrapper";

import { useLocalUserGetProfileQuery, useLocalUserGetRolesQuery } from "@/queries/localUser";
import { LocalUserProfileContext } from "@/context/localUserProfileContext";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

interface Props {
  children: React.ReactNode;
}
const AdminAuthorized: React.FC<Props> = ({ children }) => {
  const router = useRouter();

  const { clearToken, setLocalUserName } = useAuth();

  const { data: userProfile, isLoading } = useLocalUserGetProfileQuery();
  const { data: rolesPers, isLoading: isLoadingRole } = useLocalUserGetRolesQuery({
    enabled: !isLoading && !!userProfile,
  });

  useEffect(() => {
    if (!userProfile && !isLoading) {
      clearToken();
      router.push(LINKS.PortalLogin);
    } else {
      setLocalUserName(userProfile?.username);
    }
  }, [userProfile, isLoading]);

  if (isLoading || isLoadingRole) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
      </div>
    );
  }
  if (!userProfile || !rolesPers) return null;
  return (
    <LocalUserProfileContext.Provider value={userProfile}>
      <PermissionWrapper rolePers={rolesPers.roleList[0].localUser_RolePermissionList}>{children}</PermissionWrapper>
    </LocalUserProfileContext.Provider>
  );
};
export default AdminAuthorized;
