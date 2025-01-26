import { object, string, number, date, array, ObjectSchema, InferType } from "yup";
import { RolePayload } from "@/models/management/role.interface";
import { RoleFormData } from "./role.interface";

export const roleSchema: ObjectSchema<RoleFormData> = object({
  cat: string().oneOf<"LOCALUSER_ROLE">(["LOCALUSER_ROLE"]).required("Thiếu cat."),
  localUser_RoleValue: string().required("Tên quyền không được bỏ trống"),
  localUser_RoleKey: string(),
  localUser_RolePermissionList: array(
    object({
      localUser_RolePermissionKey: string().required("Quyền không bỏ trống."),
    }),
  ).min(1),
  status: string().oneOf<RoleFormData["status"]>(["OK", "OX", "XX"]).default("OK"),
});
