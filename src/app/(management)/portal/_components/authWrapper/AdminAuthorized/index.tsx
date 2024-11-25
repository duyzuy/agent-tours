"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAgAuth";
import { LINKS } from "@/constants/links.constant";
import PermissionWrapper from "./PermissionWrapper";

import { useLocalUserGetProfileQuery } from "@/queries/localUser";
import { LocalUserProfileContext } from "@/context/localUserProfileContext";

interface Props {
  children: React.ReactNode;
}
const AdminAuthorized: React.FC<Props> = ({ children }) => {
  const router = useRouter();

  const { clearToken, setLocalUserName } = useAuth();

  const { data: userProfile, isLoading } = useLocalUserGetProfileQuery();

  useEffect(() => {
    if (!userProfile && !isLoading) {
      clearToken();
      router.push(LINKS.PortalLogin);
    } else {
      setLocalUserName(userProfile?.username);
    }
  }, [userProfile, isLoading]);

  if (!userProfile) return null;
  return (
    <LocalUserProfileContext.Provider value={userProfile}>
      <PermissionWrapper>{children}</PermissionWrapper>
    </LocalUserProfileContext.Provider>
  );
};
export default AdminAuthorized;
