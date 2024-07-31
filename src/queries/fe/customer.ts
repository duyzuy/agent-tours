import { useQuery } from "@tanstack/react-query";
import { queryFE } from "../var";
import { customerAPIs } from "@/services/fe/customer";
export const useGetUserProfile = ({ enable, token }: { enable?: boolean; token?: string }) => {
  return useQuery({
    queryKey: [queryFE.CUSTOMER_PROFILE],
    queryFn: () => customerAPIs.getProfile(token),
    retry: false,
    enabled: enable,
  });
};
