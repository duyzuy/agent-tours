import { useState } from "react";
import useMessage from "@/hooks/useMessage";
import { ValidationError } from "yup";
import { useQueryClient } from "@tanstack/react-query";
import { GET_LOCAL_ROLE_PERMISSION } from "@/queries/var";
import { TRolePermissionPayload } from "@/model/management/role.interface";
import { useCreateRolePermissionsMutation } from "@/mutations/managements/rolePermission";
import { createRolePermissionsSchema } from "./validation";

export type TRolePersErrorsFields = Partial<
    Record<keyof TRolePermissionPayload, string>
>;
const useCreateRolePermission = () => {
    const queryClient = useQueryClient();
    const [errors, setErrors] = useState<TRolePersErrorsFields>();
    const { mutate: onCreateRolePers } = useCreateRolePermissionsMutation();

    const message = useMessage();
    const onCreateRolePermissions = (
        payload: TRolePermissionPayload,
        cb?: () => void,
    ) => {
        createRolePermissionsSchema
            .validate(payload, { abortEarly: false })
            .then((data) => {
                onCreateRolePers(data, {
                    onSuccess: (response, variable) => {
                        console.log({ response });
                        message.success(
                            `Tạo nhóm chức năng ${variable.localUser_RolePermissionValue} thành công.`,
                        );
                        queryClient.invalidateQueries({
                            queryKey: [GET_LOCAL_ROLE_PERMISSION],
                        });
                        cb?.();
                    },
                    onError: (error) => {
                        console.log({ error });
                        message.error("Tạo nhóm chức năng thất bại.");
                    },
                });
            })
            .catch((error) => {
                if (error instanceof ValidationError) {
                    let errors: TRolePersErrorsFields = {};
                    error.inner.forEach((err) => {
                        if (err.path) {
                            errors[err.path as keyof TRolePersErrorsFields] =
                                err.message;
                        }
                    });
                    setErrors(errors);
                }
            });
    };

    return {
        onCreateRolePermissions,
        errors,
    };
};
export default useCreateRolePermission;
