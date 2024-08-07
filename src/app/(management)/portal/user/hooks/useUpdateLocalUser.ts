"use client";
import { useState } from "react";
import { ValidationError } from "yup";
import { localUserSchema } from "./validate";
import useMessage from "@/hooks/useMessage";
import { useUpdateLocalUserMutation, useUpdateStatusLocalUserMutation } from "@/mutations/managements/localUser";
import { ILocalUserPayload } from "@/models/management/localUser.interface";
import { useQueryClient } from "@tanstack/react-query";
import { GET_LOCAL_USER_LIST, GET_LOCAL_USER_ROLES } from "@/queries/var";
export type TLocalUserErrorsField = Partial<Record<keyof ILocalUserPayload, string>>;

const useUpdateLocalUser = (userId: number) => {
  const [errors, setErrors] = useState<TLocalUserErrorsField>();
  const { mutate: makeUpdateLocalUser } = useUpdateLocalUserMutation(userId);
  const { mutate: makeUpdateStatus } = useUpdateStatusLocalUserMutation();
  const message = useMessage();
  const queryClient = useQueryClient();

  const onUpdateLocalUser = (payload: ILocalUserPayload, cb?: () => void) => {
    localUserSchema
      .validate({ ...payload, isRequirePassword: false }, { abortEarly: false })
      .then((userSchema) => {
        const { isRequirePassword, isCreate, ...userDataPayload } = userSchema;

        makeUpdateLocalUser(
          {
            ...userDataPayload,
          },
          {
            onSuccess: (data) => {
              console.log(data);
              onClearValidationUpdateError();
              queryClient.invalidateQueries({
                queryKey: [GET_LOCAL_USER_LIST],
              });
              //   queryClient.invalidateQueries({
              //     queryKey: [GET_LOCAL_USER_ROLES],
              //   });
              message.success("Cập nhật tài khoản thành công");
              cb?.();
            },
            onError: (error) => {
              console.log({ error });
              message.error(error.message);
            },
          },
        );
      })
      .catch((error) => {
        if (error instanceof ValidationError) {
          let errors: TLocalUserErrorsField = {};
          error.inner.forEach((err) => {
            errors[err.path as keyof TLocalUserErrorsField] = err.message;
          });
          setErrors(errors);
        }
      });
  };

  const onUpdateLocalUserStatus = (recordId: number, status: ILocalUserPayload["status"], cb?: () => void) => {
    makeUpdateStatus(
      { recordId: recordId, status: status },
      {
        onSuccess: (data) => {
          const statusText =
            status === "OK" ? "Kích hoạt" : status === "XX" ? "Xoá" : status === "OX" ? "Ngừng kích hoạt" : "--";

          queryClient.invalidateQueries({
            queryKey: [GET_LOCAL_USER_LIST],
          });
          message.success(`${statusText} tài khoản thành công.`);
          cb?.();
        },
        onError: (error) => {
          console.log({ error });
          message.error(error.message);
        },
      },
    );
  };
  const onClearValidationUpdateError = () => {
    setErrors(undefined);
  };
  return {
    onUpdateLocalUser,
    onUpdateLocalUserStatus,
    errors,
    onClearValidationUpdateError,
  };
};
export default useUpdateLocalUser;
