import {
    IRolesPermissionsRs,
    TRolePayload,
} from "@/model/Management/role.interface";

import { useDeleteRoleMutation } from "@/mutations/managements/rolePermission";
import { message } from "antd";
import { useQueryClient } from "@tanstack/react-query";
import { GET_LOCAL_ROLE } from "@/queries/var";

export type ICreateRoleFieldsErrors = Partial<
    Record<keyof TRolePayload, string>
>;
const useDeleteRole = () => {
    const queryClient = useQueryClient();

    const { mutate: makeDeleteRole } = useDeleteRoleMutation();

    const onDeleteRole = (
        role: IRolesPermissionsRs["result"]["roleList"][0],
        cb?: () => void,
    ) => {
        makeDeleteRole(role.localUser_RoleKey, {
            onSuccess: (response, variable) => {
                console.log({ response });
                message.success(`Xoá ${role.localUser_RoleValue} thành công.`);
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
    };

    return {
        onDeleteRole,
    };
};
export default useDeleteRole;
