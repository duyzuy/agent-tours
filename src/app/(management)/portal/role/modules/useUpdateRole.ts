import { TRolePayload } from "@/models/management/role.interface";

import { useUpdateRoleMutation } from "@/mutations/managements/rolePermission";
import { createRoleSchema } from "./validation";
import useMessage from "@/hooks/useMessage";
import { useQueryClient } from "@tanstack/react-query";
import { GET_LOCAL_ROLE, GET_LOCAL_USER_ROLES } from "@/queries/var";
import { ValidationError } from "yup";
import { useState } from "react";

export type ICreateRoleFieldsErrors = Partial<Record<keyof TRolePayload, string>>;
const useUpdateRole = (localUser_RoleKey: string) => {
  const queryClient = useQueryClient();
  const [errors, setErrors] = useState<ICreateRoleFieldsErrors>();
  const { mutate: makeUpdateRole } = useUpdateRoleMutation(localUser_RoleKey);
  const message = useMessage();

  const onUpdateRole = (payload: TRolePayload, cb?: () => void) => {
    createRoleSchema
      .validate(payload, { abortEarly: false })
      .then((data) => {
        makeUpdateRole(data, {
          onSuccess: (response, variable) => {
            console.log({ response });

            message.success(`Cập nhật ${variable.localUser_RoleValue} thành công.`);
            queryClient.invalidateQueries({
              queryKey: [GET_LOCAL_ROLE],
            });
            queryClient.invalidateQueries({
              queryKey: [GET_LOCAL_USER_ROLES],
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
              errors[err.path as keyof ICreateRoleFieldsErrors] = err.message;
            }
          });
          setErrors(errors);
        }
      });
  };

  return {
    onUpdateRole,
    errors,
  };
};
export default useUpdateRole;
