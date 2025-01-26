import { PermissionPayload } from "@/models/management/permission.interface";

export class PermissionFormData implements PermissionPayload {
  cat: "LOCALUSER_PERMISSION";
  groupKey?: string;
  groupName?: string;
  localUser_PermissionKey?: string;
  localUser_PermissionValue?: string;
  status?: "OK" | "OX" | "XX";
  constructor(
    groupKey: string | undefined,
    groupName: string | undefined,
    localUser_PermissionKey: string | undefined,
    localUser_PermissionValue: string | undefined,
    status: "OK" | "OX" | "XX",
  ) {
    this.cat = "LOCALUSER_PERMISSION";
    this.groupKey = groupKey;
    this.groupName = groupName;
    this.localUser_PermissionKey = localUser_PermissionKey;
    this.localUser_PermissionValue = localUser_PermissionValue;
    this.status = status;
  }
}
