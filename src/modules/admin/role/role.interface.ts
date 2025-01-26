import { RolePayload } from "@/models/management/role.interface";
import { IRolePermissions } from "@/models/management/rolePermission.interface";

export class RoleFormData {
  cat: "LOCALUSER_ROLE";
  localUser_RoleKey?: string;
  localUser_RoleValue?: string;
  localUser_RolePermissionList?: Partial<IRolePermissions>[];
  status?: "OK" | "OX" | "XX";
  constructor(
    localUser_RoleKey: string | undefined,
    localUser_RoleValue: string | undefined,
    localUser_RolePermissionList: Partial<IRolePermissions>[] | undefined,
    status: "OK" | "OX" | "XX",
  ) {
    this.cat = "LOCALUSER_ROLE";
    this.localUser_RoleKey = localUser_RoleKey;
    this.localUser_RoleValue = localUser_RoleValue;
    this.localUser_RolePermissionList = localUser_RolePermissionList;
    this.status = status;
  }
}
