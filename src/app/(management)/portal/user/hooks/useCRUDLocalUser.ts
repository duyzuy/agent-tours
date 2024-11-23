"use client";
import useMessage from "@/hooks/useMessage";
import {
  useCreateLocalUserMutation,
  useUpdateLocalUserMutation,
  useUpdateStatusLocalUserMutation,
} from "@/mutations/managements/localUser";
import { LocalUserFormData } from "./localUser.interface";
import { MutateOptions, useQueryClient } from "@tanstack/react-query";
import { GET_LOCAL_USER_LIST } from "@/queries/var";
import { ILocalUserPayload, LocalUserResponse } from "@/models/management/localUser.interface";
import { BaseResponse } from "@/models/common.interface";

export type UseCRUDLocalUser = {
  onCreate: (
    data: LocalUserFormData,
    options?: MutateOptions<LocalUserResponse, BaseResponse<null>, ILocalUserPayload, unknown>,
  ) => void;
  onUpdate: (
    data: { recId: number } & LocalUserFormData,
    options?: MutateOptions<LocalUserResponse, BaseResponse<null>, ILocalUserPayload, unknown>,
  ) => void;
  onUpdateStatus: (
    data: { recordId: number; status: LocalUserFormData["status"] },
    options?: MutateOptions<
      LocalUserResponse,
      BaseResponse<null>,
      { recordId: number; status: LocalUserFormData["status"] },
      unknown
    >,
  ) => void;
};
const useCRUDLocalUser = () => {
  const { mutate: makeUpdateLocalUser, isPending: isPendingUpdate } = useUpdateLocalUserMutation();
  const { mutate: makeUpdateStatus, isPending: isPendingUpdateStatus } = useUpdateStatusLocalUserMutation();
  const { mutate: makeCreateUser, isPending: isPendingCreate } = useCreateLocalUserMutation();
  const message = useMessage();
  const queryClient = useQueryClient();

  const onCreate: UseCRUDLocalUser["onCreate"] = (formData, options) => {
    makeCreateUser(formData, {
      onSuccess: (response, variabbles, context) => {
        message.success("Tạo tài khoản thành công.");
        queryClient.invalidateQueries({
          queryKey: [GET_LOCAL_USER_LIST],
        });
        options?.onSuccess?.(response, variabbles, context);
      },
      onError: (error, variables, context) => {
        options?.onError?.(error, variables, context);
        message.error(error.message);
      },
    });
  };

  const onUpdate: UseCRUDLocalUser["onUpdate"] = (formData, options) => {
    makeUpdateLocalUser(formData, {
      onSuccess: (response, variabbles, context) => {
        queryClient.invalidateQueries({
          queryKey: [GET_LOCAL_USER_LIST],
        });
        message.success("Cập nhật thành công");
        options?.onSuccess?.(response, variabbles, context);
      },
      onError: (error, variables, context) => {
        console.log({ error });
        message.error(error.message);
        options?.onError?.(error, variables, context);
      },
    });
  };

  const onUpdateStatus: UseCRUDLocalUser["onUpdateStatus"] = (data, options) => {
    makeUpdateStatus(
      { recordId: data.recordId, status: data.status },
      {
        onSuccess: (response, variabbles, context) => {
          queryClient.invalidateQueries({
            queryKey: [GET_LOCAL_USER_LIST],
          });
          message.success("Cập nhật thành công.");
          options?.onSuccess?.(response, variabbles, context);
        },
        onError: (error, variables, context) => {
          console.log({ error });
          message.error(error.message);
          options?.onError?.(error, variables, context);
        },
      },
    );
  };

  return {
    onUpdate,
    onCreate,
    onUpdateStatus,
    isPendingUpdate,
    isPendingCreate,
    isPendingUpdateStatus,
  };
};
export default useCRUDLocalUser;
