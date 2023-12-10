"use client";
import React, { useEffect, useMemo, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useLocalUserGetRolesQuery } from "@/queries/localUser";
import { LocalUserPermissionContext } from "@/context/permissionContext";
import { pathPermissions } from "@/constants/permission.constant";
import { LINKS } from "@/constants/links.constant";
import {
    ERolesFunctions,
    TRoleCondition,
} from "@/constants/permission.constant";
import { isEmpty } from "lodash";
interface Props {
    children: React.ReactNode;
    token: string;
}
const PermissionWrapper: React.FC<Props> = ({ children, token }) => {
    const { data: roles, isLoading, error } = useLocalUserGetRolesQuery(token);
    const path = usePathname();
    const router = useRouter();
    const localUserPermissionsList = useMemo(() => {
        let totalPermissions: ERolesFunctions[] = [];
        roles?.result.roleList[0].localUser_RolePermissionList.forEach(
            (rolePers) => {
                rolePers.localUser_PermissionList.forEach((per) => {
                    if (
                        !totalPermissions.includes(
                            per.localUser_PermissionKey as ERolesFunctions,
                        )
                    ) {
                        totalPermissions = [
                            ...totalPermissions,
                            per.localUser_PermissionKey as ERolesFunctions,
                        ];
                    }
                });
            },
        );
        return totalPermissions;
    }, [roles]);

    const checkPermission = useCallback(
        (conditions: TRoleCondition) => {
            console.log({ localUserPermissionsList });
            return conditions.reduce((hasPerm, cond) => {
                return (
                    hasPerm &&
                    checkOnePermission(localUserPermissionsList || [], cond)
                );
            }, true);
        },
        [localUserPermissionsList],
    );

    useEffect(() => {
        if (roles) {
            const corectPath = path.replace("/portal", "");
            const perms =
                pathPermissions[corectPath as keyof typeof pathPermissions] ||
                [];

            if (!checkPermission(perms)) {
                router.push(LINKS.DashBoard);
            }
        }
    }, [roles, path]);
    return (
        <LocalUserPermissionContext.Provider value={localUserPermissionsList}>
            {children}
        </LocalUserPermissionContext.Provider>
    );
};
export default PermissionWrapper;

const checkOnePermission = (
    roles: ERolesFunctions[],
    condition: TRoleCondition[0],
): boolean => {
    if (!condition) return true;
    if (typeof condition === "object" && condition.$or) {
        return (
            isEmpty(condition.$or) ||
            condition.$or.reduce(
                (hasPerm, cond) => hasPerm || !!checkOnePermission(roles, cond),
                false,
            )
        );
    }

    return roles.includes(condition as ERolesFunctions);
};
