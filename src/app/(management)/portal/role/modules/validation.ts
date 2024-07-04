import {
    object,
    string,
    number,
    date,
    array,
    ObjectSchema,
    InferType,
} from "yup";
import { TRolePayload } from "@/models/management/role.interface";

export const createRoleSchema: ObjectSchema<TRolePayload> = object({
    localUser_RoleValue: string().required("Tên quyền không được bỏ trống"),
    localUser_RolePermissionList: array(
        object({
            localUser_RolePermissionKey: string().required(
                "Quyền không bỏ trống.",
            ),
        }),
    ).default([]),
    status: string()
        .oneOf<TRolePayload["status"]>(["OK", "OX", "XX"])
        .default("OK"),
});
