import { getAdminProfile } from "@/services/management/auth";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { ADMIN_AUTH } from "@/constants/query-var.constant";
import { ILocalUserProfileRs } from "@/models/management/localAuth.interface";
import { ErrorResponse } from "@/models/common.interface";
import { setAdminUserInformationStorage, setAdminUsername } from "@/utils/common";

const useAdminGetProfile = () => {
  return useQuery<ILocalUserProfileRs, ErrorResponse, ILocalUserProfileRs["result"]>({
    queryKey: [ADMIN_AUTH.GET_ADMIN_PROFILE],
    queryFn: getAdminProfile,
    select: (data) => {
      setAdminUsername(data.result.username);
      setAdminUserInformationStorage({
        localUserType: data.result.userType,
        localChildrendUsername: data.result.childrendUsername,
      });
      return data.result;
    },
    retry: false,
  });
};
export default useAdminGetProfile;
