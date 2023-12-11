import { TRolePayload } from "@/model/management/role.interface";

import { useCreateRoleMutation } from "@/mutations/managements/rolePermission";
import { createRoleSchema } from "./validation";
import useMessage from "@/hooks/useMessage";
import { useQueryClient } from "@tanstack/react-query";
import { GET_LOCAL_ROLE } from "@/queries/var";
import { ValidationError } from "yup";
import { useState } from "react";

export type ICreateRoleFieldsErrors = Partial<
    Record<keyof TRolePayload, string>
>;
const useCreateRole = () => {
    const queryClient = useQueryClient();
    const [errors, setErrors] = useState<ICreateRoleFieldsErrors>();
    const { mutate: makeCreateRole } = useCreateRoleMutation();
    const message = useMessage();
    const onCreateRole = (payload: TRolePayload, cb?: () => void) => {
        createRoleSchema
            .validate(payload, { abortEarly: false })
            .then((data) => {
                makeCreateRole(data, {
                    onSuccess: (response, variable) => {
                        console.log({ response });

                        message.success(
                            `Tạo ${variable.localUser_RoleValue} thành công.`,
                        );
                        queryClient.invalidateQueries({
                            queryKey: [GET_LOCAL_ROLE],
                        });
                        cb?.();
                    },
                    onError: (error) => {
                        console.log({ error });
                        message.error(error.message);
                    },
                });
            })
            .catch((error) => {
                if (error instanceof ValidationError) {
                    let errors: ICreateRoleFieldsErrors = {};
                    error.inner.forEach((err) => {
                        if (err.path) {
                            errors[err.path as keyof ICreateRoleFieldsErrors] =
                                err.message;
                        }
                    });
                    setErrors(errors);
                }
            });
    };

    return {
        onCreateRole,
        errors,
    };
};
export default useCreateRole;
