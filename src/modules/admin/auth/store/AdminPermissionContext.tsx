import React, { createContext, useReducer, useContext, ReactNode } from "react";
import { ERolesFunctions, TRoleCondition } from "@/constants/permission.constant";

type AdminPermissionContextProps = [
  permissionList: ERolesFunctions[],
  checkPers: (conditions: TRoleCondition) => boolean,
];

const AdminPermissionContext = createContext<AdminPermissionContextProps | undefined>(undefined);

interface AdminPermissionProviderProps {
  children: ReactNode;
  permissionList: any;
  checkPers: (conditions: TRoleCondition) => boolean;
}

export const AdminPermissionProvider: React.FC<AdminPermissionProviderProps> = ({
  children,
  permissionList,
  checkPers,
}) => {
  return (
    <AdminPermissionContext.Provider value={[permissionList, checkPers]}>{children}</AdminPermissionContext.Provider>
  );
};

export const useAdminPermission = (): AdminPermissionContextProps => {
  const context = useContext(AdminPermissionContext);
  if (!context) {
    throw new Error("useAdminPermission must be used within a AdminPermissionProvider");
  }
  return context;
};
