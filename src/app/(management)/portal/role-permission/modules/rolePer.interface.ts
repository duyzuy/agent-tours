import { RolePermissionPayload } from "@/models/management/rolePermission.interface";
import { IPermission } from "@/models/management/permission.interface";

export class RolePermissionFormData implements RolePermissionPayload {
  cat: "LOCALUSER_ROLEPERMISSION";
  localUser_RolePermissionKey?: string;
  localUser_RolePermissionValue?: string;
  localUser_PermissionList?: Partial<IPermission>[];
  status?: "OK" | "OX" | "XX";
  constructor(
    localUser_RolePermissionValue: string | undefined,
    localUser_RolePermissionKey: string | undefined,
    localUser_PermissionList: Partial<IPermission>[],
    status: "OK" | "OX" | "XX",
  ) {
    this.cat = "LOCALUSER_ROLEPERMISSION";
    this.localUser_RolePermissionValue = localUser_RolePermissionValue;
    this.localUser_RolePermissionKey = localUser_RolePermissionKey;
    this.localUser_PermissionList = localUser_PermissionList;
    this.status = status;
  }
}

// export class RoleFormData implements RolePayload {
//   cat: "LOCALUSER_ROLE";
//   localUser_RoleKey?: string;
//   localUser_RoleValue?: string;
//   localUser_RolePermissionList?: {
//     localUser_RolePermissionKey: string;
//   }[];
//   status?: "OK" | "OX" | "XX";
//   constructor(
//     localUser_RoleKey: string | undefined,
//     localUser_RoleValue: string | undefined,
//     localUser_RolePermissionList:
//       | {
//           localUser_RolePermissionKey: string;
//         }[]
//       | undefined,
//     status: "OK" | "OX" | "XX",
//   ) {
//     this.cat = "LOCALUSER_ROLE";
//     this.localUser_RoleKey = localUser_RoleKey;
//     this.localUser_RoleValue = localUser_RoleValue;
//     this.localUser_RolePermissionList = localUser_RolePermissionList;
//     this.status = status;
//   }
// }

// export class PermissionFormData implements PermissionPayload {
//   cat: "LOCALUSER_PERMISSION";
//   groupKey?: string;
//   groupName?: string;
//   localUser_PermissionKey?: string;
//   localUser_PermissionValue?: string;
//   status?: "OK" | "OX" | "XX";
//   constructor(
//     groupKey: string | undefined,
//     groupName: string | undefined,
//     localUser_PermissionKey: string | undefined,
//     localUser_PermissionValue: string | undefined,
//     status: "OK" | "OX" | "XX",
//   ) {
//     this.cat = "LOCALUSER_PERMISSION";
//     this.groupKey = groupKey;
//     this.groupName = groupName;
//     this.localUser_PermissionKey = localUser_PermissionKey;
//     this.localUser_PermissionValue = localUser_PermissionValue;
//     this.status = status;
//   }
// }
