import { object, string, number, date, array, ObjectSchema, InferType } from "yup";

import { RolePermissionFormData } from "./rolePer.interface";
import { RolePermissionPayload } from "@/models/management/rolePermission.interface";

export const rolePermissionSchema: ObjectSchema<RolePermissionPayload> = object({
  cat: string().oneOf<"LOCALUSER_ROLEPERMISSION">(["LOCALUSER_ROLEPERMISSION"]).required("Không bỏ trống."),
  rolePermissionList: array().of(
    object({
      localUser_RolePermissionKey: string(),
      localUser_RolePermissionValue: string().required("Tên nhóm quyền không được bỏ trống"),
      localUser_PermissionList: array()
        .of(
          object({
            localUser_PermissionKey: string().required("Quyền chức năng không bỏ trống."),
          }),
        )
        .min(1, "Không bỏ trống."),
    }),
  ),
  status: string().oneOf<RolePermissionFormData["status"]>(["OK", "OX", "XX"]).default("OK"),
});
