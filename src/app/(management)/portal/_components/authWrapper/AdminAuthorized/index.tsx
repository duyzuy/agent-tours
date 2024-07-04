"use client";
import React, { useEffect, useState } from "react";
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
    const [isAuthorized, setAuthorize] = useState(false);

    const { data: userProfile, isLoading } = useLocalUserGetProfileQuery();

    useEffect(() => {
        if (!userProfile && !isLoading) {
            setAuthorize(() => false);
            clearToken();
            router.push(LINKS.PortalLogin);
        } else {
            setAuthorize(() => true);
            setLocalUserName(userProfile?.username || "");
        }
    }, [userProfile, isLoading]);

    return (
        <React.Fragment>
            {isAuthorized ? (
                <LocalUserProfileContext.Provider value={userProfile}>
                    <PermissionWrapper>{children}</PermissionWrapper>
                </LocalUserProfileContext.Provider>
            ) : null}
        </React.Fragment>
    );
};
export default AdminAuthorized;
