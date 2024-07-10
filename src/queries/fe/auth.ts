import { useQuery } from "@tanstack/react-query";
import { queryFE } from "../var";
import { authAPIs } from "@/services/fe/auth";

export const useGetResetPasswordQuery = ({ enable, secretKey }: { enable?: boolean; secretKey?: string }) => {
  return useQuery({
    queryKey: [queryFE.AUTH_CHECK_KEY_RESET_PASSWORD, secretKey],
    queryFn: () => authAPIs.getResetPassword(secretKey),
    retry: false,
    enabled: enable,
  });
};
