import useMessage from "@/hooks/useMessage";

import { MutateOptions, useQueryClient } from "@tanstack/react-query";
import { GET_LOCAL_PERMISSION } from "@/queries/var";
import { ADMIN_AUTH } from "@/constants/query-var.constant";
import {
  useCreatePermissionMutation,
  useUpdatePermissionMutation,
  useDeletePermissionMutation,
} from "@/mutations/managements/rolePermission";

import { PermissionFormData } from "./permission.interface";
import { RolesPermissionListResponse } from "@/models/management/rolePermission.interface";
import { BaseResponse } from "@/models/common.interface";
import { PermissionPayload } from "@/models/management/permission.interface";

type UseCRUDPermission = {
  onCreate: (
    data: PermissionFormData,
    options?: MutateOptions<RolesPermissionListResponse, BaseResponse<null>, PermissionPayload, unknown>,
  ) => void;
  onUpdate: (
    data: PermissionFormData,
    options?: MutateOptions<RolesPermissionListResponse, BaseResponse<null>, PermissionPayload, unknown>,
  ) => void;
  onDelete: (
    key: string,
    options?: MutateOptions<RolesPermissionListResponse, BaseResponse<null>, string, unknown>,
  ) => void;
};
const useCRUDPermission = () => {
  const queryClient = useQueryClient();
  const { mutate: onCreatePer } = useCreatePermissionMutation();
  const { mutate: onDeletePer } = useDeletePermissionMutation();
  const { mutate: makeUpdatePer } = useUpdatePermissionMutation();

  const message = useMessage();
  const onCreate: UseCRUDPermission["onCreate"] = (formData, options) => {
    let payload: PermissionPayload = {
      cat: formData.cat,
      status: formData.status,
      permissionList: [
        {
          groupKey: formData.groupKey,
          groupName: formData.groupName,
          localUser_PermissionKey: formData.localUser_PermissionKey,
          localUser_PermissionValue: formData.localUser_PermissionValue,
          status: formData.status,
        },
      ],
    };

    onCreatePer(payload, {
      onSuccess: (response, variables, context) => {
        message.success(`Tạo thành công.`);
        queryClient.invalidateQueries({
          queryKey: [GET_LOCAL_PERMISSION],
        });
        options?.onSuccess?.(response, variables, context);
      },
      onError: (error, variables, context) => {
        message.error(error.message);
        options?.onError?.(error, variables, context);
      },
    });
  };

  const onDelete: UseCRUDPermission["onDelete"] = (key, options) => {
    onDeletePer(key, {
      onSuccess: (response, variables, context) => {
        message.success("Xoá thành công.");
        queryClient.invalidateQueries({
          queryKey: [GET_LOCAL_PERMISSION],
        });
        queryClient.invalidateQueries({
          queryKey: [ADMIN_AUTH.GET_ADMIN_PROFILE],
        });
        options?.onSuccess?.(response, variables, context);
      },
      onError: (error, variables, context) => {
        message.error(error.message);
        options?.onError?.(error, variables, context);
      },
    });
  };
  const onUpdate: UseCRUDPermission["onUpdate"] = (formData, options) => {
    let payload: PermissionPayload = {
      cat: formData.cat,
      status: formData.status,
      permissionList: [
        {
          groupKey: formData.groupKey,
          groupName: formData.groupName,
          localUser_PermissionKey: formData.localUser_PermissionKey,
          localUser_PermissionValue: formData.localUser_PermissionValue,
          status: formData.status,
        },
      ],
    };
    makeUpdatePer(payload, {
      onSuccess: (response, variables, context) => {
        message.success(`Cập nhật thành công.`);
        queryClient.invalidateQueries({
          queryKey: [GET_LOCAL_PERMISSION],
        });
        queryClient.invalidateQueries({
          queryKey: [ADMIN_AUTH.GET_ADMIN_ROLES],
        });
        options?.onSuccess?.(response, variables, context);
      },
      onError: (error, variables, context) => {
        console.log({ error });
        message.error(error.message);
        options?.onError?.(error, variables, context);
      },
    });
  };

  return {
    onCreate,
    onDelete,
    onUpdate,
  };
};
export default useCRUDPermission;
