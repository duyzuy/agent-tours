import { RolePermissionPayload } from "@/models/management/rolePermission.interface";
import { IPermission } from "@/models/management/permission.interface";

export class RolePermissionFormData implements RolePermissionPayload {
  cat: "LOCALUSER_ROLEPERMISSION";
  localUser_RolePermissionKey?: string;
  localUser_RolePermissionValue?: string;
  localUser_PermissionList?: IPermission[];
  status?: "OK" | "OX" | "XX";
  constructor(
    localUser_RolePermissionValue: string | undefined,
    localUser_RolePermissionKey: string | undefined,
    localUser_PermissionList: IPermission[],
    status: "OK" | "OX" | "XX",
  ) {
    this.cat = "LOCALUSER_ROLEPERMISSION";
    this.localUser_RolePermissionValue = localUser_RolePermissionValue;
    this.localUser_RolePermissionKey = localUser_RolePermissionKey;
    this.localUser_PermissionList = localUser_PermissionList;
    this.status = status;
  }
}
