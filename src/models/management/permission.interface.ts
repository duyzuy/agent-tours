export interface IPermission {
  groupKey: string;
  groupName: string;
  localUser_PermissionKey: string;
  localUser_PermissionValue: string;
  status: "OK" | "OX" | "XX";
}

export type PermissionPayload = {
  cat: "LOCALUSER_PERMISSION";
  permissionList?: Partial<IPermission>[];
  status?: "OK" | "OX" | "XX";
};
