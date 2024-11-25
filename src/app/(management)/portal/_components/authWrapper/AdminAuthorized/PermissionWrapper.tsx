"use client";
import React, { useEffect, useMemo, useCallback, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useLocalUserGetRolesQuery } from "@/queries/localUser";
import { LocalUserPermissionContext } from "@/context/permissionContext";
import { PATH_WITH_PERMISSION } from "@/constants/permission.constant";
import { LINKS } from "@/constants/links.constant";
import { ERolesFunctions, TRoleCondition } from "@/constants/permission.constant";
import { isEmpty } from "lodash";
import { Spin } from "antd";
interface Props {
  children: React.ReactNode;
}
const PermissionWrapper: React.FC<Props> = ({ children }) => {
  const { data: rolesPers, isLoading: isLoadingRole } = useLocalUserGetRolesQuery();
  const path = usePathname();
  const router = useRouter();

  const [isValidPerm, setValidPerm] = useState(false);

  const localUserPermissionsList = useMemo(() => {
    let totalPermissions: ERolesFunctions[] = [];
    rolesPers?.roleList[0].localUser_RolePermissionList.forEach((rolePers) => {
      rolePers.localUser_PermissionList.forEach((per) => {
        if (!totalPermissions.includes(per.localUser_PermissionKey as ERolesFunctions)) {
          totalPermissions = [...totalPermissions, per.localUser_PermissionKey as ERolesFunctions];
        }
      });
    });
    return totalPermissions;
  }, [rolesPers]);

  const checkPermission = useCallback(
    (conditions: TRoleCondition) => {
      // if (isEmpty(localUserPermissionsList)) return false;
      return conditions.reduce((hasPerm, cond) => {
        return hasPerm && checkOnePermission(localUserPermissionsList, cond);
      }, true);
    },
    [localUserPermissionsList],
  );

  useEffect(() => {
    const corectPath = path.replace("/portal/", "") as keyof typeof PATH_WITH_PERMISSION;
    const perms = PATH_WITH_PERMISSION[corectPath] || [];
    if (!checkPermission(perms) && !isLoadingRole) {
      setValidPerm(false);
      router.push(LINKS.DashBoard);
    } else {
      setValidPerm(true);
    }
  }, [path, rolesPers]);

  if (isLoadingRole) {
    return <Spin />;
  }
  if (!isValidPerm) {
    return null;
  }
  return (
    <LocalUserPermissionContext.Provider value={[localUserPermissionsList, checkPermission]}>
      {children}
    </LocalUserPermissionContext.Provider>
  );
};
export default PermissionWrapper;

const checkOnePermission = (roles: ERolesFunctions[], condition: TRoleCondition[number]): boolean => {
  if (!condition) return true;
  if (typeof condition === "object" && condition.$or) {
    return (
      isEmpty(condition.$or) ||
      condition.$or.reduce((hasPerm, cond) => hasPerm || checkOnePermission(roles, cond), false)
    );
  }

  return roles.includes(condition as ERolesFunctions);
};
