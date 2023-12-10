import {
    object,
    string,
    number,
    date,
    array,
    ObjectSchema,
    InferType,
} from "yup";
import { TRolePermissionPayload } from "@/model/management/role.interface";

export const createRolePermissionsSchema: ObjectSchema<TRolePermissionPayload> =
    object({
        localUser_RolePermissionValue: string().required(
            "Tên nhóm quyền không được bỏ trống",
        ),
        localUser_PermissionList: array(
            object({
                localUser_PermissionKey: string().required(
                    "Quyền chức năng không bỏ trống.",
                ),
            }),
        ).default([]),
        status: string()
            .oneOf<TRolePermissionPayload["status"]>(["OK", "OX", "XX"])
            .default("OK"),
    });
