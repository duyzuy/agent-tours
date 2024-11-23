import useMessage from "@/hooks/useMessage";

import { MutateOptions, useQueryClient } from "@tanstack/react-query";
import { GET_LOCAL_ROLE_PERMISSION, GET_LOCAL_USER_ROLES } from "@/queries/var";

import {
  useCreateRolePermissionsMutation,
  useDeleteRolePermissionsMutation,
  useUpdateRolePermissionsMutation,
} from "@/mutations/managements/rolePermission";

import { RolePermissionFormData } from "./rolePer.interface";
import { RolePermissionPayload, RolesPermissionListResponse } from "@/models/management/rolePermission.interface";
import { BaseResponse } from "@/models/common.interface";

type UseRolePermission = {
  onCreate: (
    data: RolePermissionFormData,
    options?: MutateOptions<RolesPermissionListResponse, BaseResponse<null>, RolePermissionPayload, unknown>,
  ) => void;
  onUpdate: (
    data: RolePermissionFormData,
    options?: MutateOptions<RolesPermissionListResponse, BaseResponse<null>, RolePermissionPayload, unknown>,
  ) => void;
  onDelete: (
    key: string,
    options?: MutateOptions<RolesPermissionListResponse, BaseResponse<null>, string, unknown>,
  ) => void;
};
const useRolePermission = () => {
  const queryClient = useQueryClient();
  const { mutate: onCreateRolePers } = useCreateRolePermissionsMutation();
  const { mutate: onDeleteRolePers } = useDeleteRolePermissionsMutation();
  const { mutate: makeUpdateRolePermissions } = useUpdateRolePermissionsMutation();

  const message = useMessage();
  const onCreate: UseRolePermission["onCreate"] = (formData, options) => {
    let payload: RolePermissionPayload = { cat: formData.cat, status: formData.status, rolePermissionList: [] };
    const perList = getPermissionList(formData.localUser_PermissionList);
    onCreateRolePers(
      {
        ...payload,
        rolePermissionList: [
          {
            localUser_PermissionList: perList,
            localUser_RolePermissionKey: formData.localUser_RolePermissionKey,
            localUser_RolePermissionValue: formData.localUser_RolePermissionValue,
          },
        ],
      },
      {
        onSuccess: (response, variables, context) => {
          message.success(`Tạo thành công.`);
          queryClient.invalidateQueries({
            queryKey: [GET_LOCAL_ROLE_PERMISSION],
          });
          options?.onSuccess?.(response, variables, context);
        },
        onError: (error, variables, context) => {
          message.error(error.message);
          options?.onError?.(error, variables, context);
        },
      },
    );
  };

  const onDelete: UseRolePermission["onDelete"] = (key, options) => {
    onDeleteRolePers(key, {
      onSuccess: (response, variables, context) => {
        message.success("Xoá nhóm chức năng thành công.");
        queryClient.invalidateQueries({
          queryKey: [GET_LOCAL_ROLE_PERMISSION],
        });
        queryClient.invalidateQueries({
          queryKey: [GET_LOCAL_USER_ROLES],
        });
        options?.onSuccess?.(response, variables, context);
      },
      onError: (error, variables, context) => {
        message.error(error.message);
        options?.onError?.(error, variables, context);
      },
    });
  };
  const onUpdate: UseRolePermission["onUpdate"] = (formData, options) => {
    let payload: RolePermissionPayload = { cat: formData.cat, status: formData.status, rolePermissionList: [] };

    const perList = getPermissionList(formData.localUser_PermissionList);

    makeUpdateRolePermissions(
      {
        ...payload,
        rolePermissionList: [
          {
            localUser_PermissionList: perList,
            localUser_RolePermissionKey: formData.localUser_RolePermissionKey,
            localUser_RolePermissionValue: formData.localUser_RolePermissionValue,
          },
        ],
      },
      {
        onSuccess: (response, variables, context) => {
          message.success(`Cập nhật thành công.`);
          queryClient.invalidateQueries({
            queryKey: [GET_LOCAL_ROLE_PERMISSION],
          });
          queryClient.invalidateQueries({
            queryKey: [GET_LOCAL_USER_ROLES],
          });
          options?.onSuccess?.(response, variables, context);
        },
        onError: (error, variables, context) => {
          console.log({ error });
          message.error(error.message);
          options?.onError?.(error, variables, context);
        },
      },
    );
  };

  const getPermissionList = (permissionList: RolePermissionFormData["localUser_PermissionList"]) => {
    return permissionList?.reduce<
      Exclude<
        Required<Required<RolePermissionPayload>["rolePermissionList"]>[number]["localUser_PermissionList"],
        undefined
      >
    >((acc, per) => {
      if (per.localUser_PermissionKey) {
        acc = [...acc, { localUser_PermissionKey: per.localUser_PermissionKey }];
      }
      return acc;
    }, []);
  };
  return {
    onCreate,
    onDelete,
    onUpdate,
  };
};
export default useRolePermission;
