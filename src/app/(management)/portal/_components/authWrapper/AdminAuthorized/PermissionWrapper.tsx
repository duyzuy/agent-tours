"use client";
import React, { useEffect, useMemo, useCallback, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { LocalUserPermissionContext } from "@/context/permissionContext";
import { PATH_WITH_PERMISSION } from "@/constants/permission.constant";
import { LINKS } from "@/constants/links.constant";
import { ERolesFunctions, TRoleCondition } from "@/constants/permission.constant";
import { isEmpty } from "lodash";

import { IRolePermissions } from "@/models/management/rolePermission.interface";
interface Props {
  children: React.ReactNode;
  rolePers: IRolePermissions[];
}
const PermissionWrapper: React.FC<Props> = ({ children, rolePers }) => {
  const path = usePathname();
  const router = useRouter();

  const [isValidPerm, setValidPerm] = useState(false);

  const localUserPermissionsList = useMemo(() => {
    let totalPermissions: ERolesFunctions[] = [];
    rolePers.forEach((rolePers) => {
      rolePers.localUser_PermissionList.forEach((per) => {
        if (!totalPermissions.includes(per.localUser_PermissionKey as ERolesFunctions)) {
          totalPermissions = [...totalPermissions, per.localUser_PermissionKey as ERolesFunctions];
        }
      });
    });
    return totalPermissions;
  }, [rolePers]);

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
    if (!checkPermission(perms)) {
      setValidPerm(false);
      router.push(LINKS.DashBoard);
    } else {
      setValidPerm(true);
    }
  }, [path]);

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
