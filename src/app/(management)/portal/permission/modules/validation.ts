import { object, string, number, date, array, ObjectSchema, InferType } from "yup";

import { PermissionFormData } from "./permission.interface";

export const rolePermissionSchema: ObjectSchema<PermissionFormData> = object({
  cat: string().oneOf<"LOCALUSER_PERMISSION">(["LOCALUSER_PERMISSION"]).required("Không bỏ trống."),
  groupName: string(),
  groupKey: string(),
  localUser_PermissionKey: string().required("Key không bỏ trống."),
  localUser_PermissionValue: string(),
  status: string().oneOf<PermissionFormData["status"]>(["OK", "OX", "XX"]).default("OK"),
});
