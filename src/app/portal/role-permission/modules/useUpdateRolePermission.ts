import { useState } from "react";
import useMessage from "@/hooks/useMessage";
import { ValidationError } from "yup";
import { useQueryClient } from "@tanstack/react-query";
import { GET_LOCAL_ROLE_PERMISSION } from "@/queries/var";
import { TRolePermissionPayload } from "@/Model/Management/role.interface";
import { useUpdateRolePermissionsMutation } from "@/mutations/managements/rolePermission";
import { createRolePermissionsSchema } from "./validation";

type IRolePersFieldsErrors = Partial<
    Record<keyof TRolePermissionPayload, string>
>;
const useUpdateRolePermission = (localUser_RolePermissionKey: string) => {
    const queryClient = useQueryClient();
    const [errors, setErrors] = useState<IRolePersFieldsErrors>();

    const { mutate: makeUpdateRolePermissions } =
        useUpdateRolePermissionsMutation(localUser_RolePermissionKey);

    const message = useMessage();
    const onUpdateRolePermissions = (
        payload: TRolePermissionPayload,
        cb?: () => void,
    ) => {
        createRolePermissionsSchema
            .validate(payload, { abortEarly: false })
            .then((data) => {
                makeUpdateRolePermissions(data, {
                    onSuccess: (response, variable) => {
                        console.log({ response });
                        message.success(
                            `Cập nhật nhóm chức năng ${variable.localUser_RolePermissionValue} thành công.`,
                        );
                        queryClient.invalidateQueries({
                            queryKey: [GET_LOCAL_ROLE_PERMISSION],
                        });
                        cb?.();
                    },
                    onError: (error) => {
                        console.log({ error });
                        message.error("Cập nhật nhóm chức năng thất bại.");
                    },
                });
            })
            .catch((error) => {
                if (error instanceof ValidationError) {
                    let errors: IRolePersFieldsErrors = {};
                    error.inner.forEach((err) => {
                        if (err.path) {
                            errors[err.path as keyof IRolePersFieldsErrors] =
                                err.message;
                        }
                    });
                    setErrors(errors);
                }
            });
    };

    return {
        onUpdateRolePermissions,
        errors,
    };
};
export default useUpdateRolePermission;
