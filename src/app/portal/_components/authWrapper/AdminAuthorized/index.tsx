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

    const { token, clearToken } = useAuth();
    const [isAuthorized, setAuthorize] = useState(false);

    const { data: userProfile, isLoading } = useLocalUserGetProfileQuery();

    useEffect(() => {
        if (!token) {
            setAuthorize(() => false);
            router.push(LINKS.PortalLogin);
        } else {
            if (!isLoading && !userProfile) {
                clearToken();
                router.push(LINKS.PortalLogin);
            } else {
                setAuthorize(() => true);
            }
        }
    }, [userProfile]);

    return (
        <React.Fragment>
            {isAuthorized && token ? (
                <LocalUserProfileContext.Provider value={userProfile?.result}>
                    <PermissionWrapper token={token}>
                        {children}
                    </PermissionWrapper>
                </LocalUserProfileContext.Provider>
            ) : null}
        </React.Fragment>
    );
};
export default AdminAuthorized;
