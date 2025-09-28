"use client";
import React, { useEffect, useMemo, useCallback, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { PATH_WITH_PERMISSION } from "@/constants/permission.constant";
import { LINKS } from "@/constants/links.constant";
import { ERolesFunctions, TRoleCondition } from "@/constants/permission.constant";
import { isEmpty } from "lodash";

import { IRolePermissions } from "@/models/management/rolePermission.interface";
import { AdminPermissionProvider } from "../../auth/store/AdminPermissionContext";
interface Props {
  children: React.ReactNode;
  rolePers: IRolePermissions[];
}
const PermissionWrapper: React.FC<Props> = ({ children, rolePers }) => {
  const path = usePathname();
  const router = useRouter();

  const [isValidPerm, setValidPerm] = useState(false);

  const permissionList = useMemo(() => {
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
        return hasPerm && checkOnePermission(permissionList, cond);
      }, true);
    },
    [permissionList],
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

  if (!isValidPerm) return null;

  return (
    <AdminPermissionProvider permissionList={permissionList} checkPers={checkPermission}>
      {children}
    </AdminPermissionProvider>
  );
};
export default PermissionWrapper;

const checkOnePermission = (roles: ERolesFunctions[], condition: TRoleCondition[number]): boolean => {
  if (typeof condition === "object" && condition.$or) {
    return (
      isEmpty(condition.$or) ||
      condition.$or.reduce((hasPerm, cond) => hasPerm || checkOnePermission(roles, cond), false)
    );
  }

  if (typeof condition === "string") {
    return roles.includes(condition);
  }
  return true;
};
