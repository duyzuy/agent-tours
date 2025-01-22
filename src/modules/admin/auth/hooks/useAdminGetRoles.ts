import { useQuery } from "@tanstack/react-query";
import { ADMIN_AUTH } from "@/constants/query-var.constant";
import { ErrorResponse } from "@/models/common.interface";
import { adminGetRoles } from "@/services/management/auth";
import { RolesPermissionListResponse } from "@/models/management/rolePermission.interface";

const useAdminGetRoles = ({ enabled }: { enabled?: boolean }) => {
  return useQuery<RolesPermissionListResponse, ErrorResponse, RolesPermissionListResponse["result"]>({
    queryKey: [ADMIN_AUTH.GET_ADMIN_ROLES],
    queryFn: adminGetRoles,
    select: (data) => {
      return data.result;
    },
    retry: false,
    enabled: enabled,
  });
};
export default useAdminGetRoles;
