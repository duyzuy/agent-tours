import { object, string, number, date, array, ObjectSchema, InferType } from "yup";

import { RolePermissionFormData } from "./rolePer.interface";

export const rolePermissionSchema: ObjectSchema<RolePermissionFormData> = object({
  cat: string().oneOf<"LOCALUSER_ROLEPERMISSION">(["LOCALUSER_ROLEPERMISSION"]).required("Không bỏ trống."),
  localUser_RolePermissionKey: string(),
  localUser_RolePermissionValue: string().required("Tên nhóm quyền không được bỏ trống"),
  localUser_PermissionList: array()
    .of(
      object({
        localUser_PermissionKey: string().required("Quyền chức năng không bỏ trống."),
      }),
    )
    .min(1, "Không bỏ trống."),
  status: string().oneOf<RolePermissionFormData["status"]>(["OK", "OX", "XX"]).default("OK"),
});
