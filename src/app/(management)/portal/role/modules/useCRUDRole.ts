import useMessage from "@/hooks/useMessage";
import { MutateOptions, useQueryClient } from "@tanstack/react-query";
import { GET_LOCAL_ROLE, GET_LOCAL_USER_ROLES } from "@/queries/var";

import {
  useCreateRoleMutation,
  useUpdateRoleMutation,
  useDeleteRoleMutation,
} from "@/mutations/managements/rolePermission";
import { RoleFormData } from "./role.interface";
import { RolesPermissionListResponse } from "@/models/management/rolePermission.interface";
import { BaseResponse } from "@/models/common.interface";
import { RolePayload } from "@/models/management/role.interface";

type UseCRUDRole = {
  onCreate: (
    data: RoleFormData,
    options?: MutateOptions<RolesPermissionListResponse, BaseResponse<null>, RolePayload, unknown>,
  ) => void;
  onUpdate: (
    data: RoleFormData,
    options?: MutateOptions<RolesPermissionListResponse, BaseResponse<null>, RolePayload, unknown>,
  ) => void;
  onDelete: (
    key: string,
    options?: MutateOptions<RolesPermissionListResponse, BaseResponse<null>, string, unknown>,
  ) => void;
};
const useCRUDRole = () => {
  const queryClient = useQueryClient();
  const { mutate: onCreateRole } = useCreateRoleMutation();
  const { mutate: onDeleteRole } = useDeleteRoleMutation();
  const { mutate: makeUpdateRole } = useUpdateRoleMutation();

  const message = useMessage();
  const onCreate: UseCRUDRole["onCreate"] = (formData, options) => {
    let payload: RolePayload = { cat: formData.cat, status: formData.status, roleList: [] };
    const perList = getRolePermissionList(formData.localUser_RolePermissionList);
    onCreateRole(
      {
        ...payload,
        roleList: [
          {
            localUser_RoleKey: formData.localUser_RoleKey,
            localUser_RolePermissionList: perList,
            localUser_RoleValue: formData.localUser_RoleValue,
          },
        ],
      },
      {
        onSuccess: (response, variables, context) => {
          message.success(`Tạo thành công.`);
          queryClient.invalidateQueries({
            queryKey: [GET_LOCAL_ROLE],
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
      },
    );
  };

  const onUpdate: UseCRUDRole["onUpdate"] = (formData, options) => {
    let payload: RolePayload = { cat: formData.cat, status: formData.status, roleList: [] };

    const perList = getRolePermissionList(formData.localUser_RolePermissionList);

    makeUpdateRole(
      {
        ...payload,
        roleList: [
          {
            localUser_RoleKey: formData.localUser_RoleKey,
            localUser_RolePermissionList: perList,
            localUser_RoleValue: formData.localUser_RoleValue,
          },
        ],
      },
      {
        onSuccess: (response, variables, context) => {
          message.success(`Cập nhật thành công.`);
          queryClient.invalidateQueries({
            queryKey: [GET_LOCAL_ROLE],
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
  const onDelete: UseCRUDRole["onDelete"] = (key, options) => {
    onDeleteRole(key, {
      onSuccess: (response, variables, context) => {
        message.success("Xoá thành công.");
        queryClient.invalidateQueries({
          queryKey: [GET_LOCAL_ROLE],
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
  const getRolePermissionList = (rolePermissionList: RoleFormData["localUser_RolePermissionList"]) => {
    return rolePermissionList?.reduce<
      Exclude<Required<RolePayload>["roleList"][number]["localUser_RolePermissionList"], undefined>
    >((acc, rolePers) => {
      if (rolePers.localUser_RolePermissionKey) {
        acc = [...acc, { localUser_RolePermissionKey: rolePers.localUser_RolePermissionKey }];
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
export default useCRUDRole;
