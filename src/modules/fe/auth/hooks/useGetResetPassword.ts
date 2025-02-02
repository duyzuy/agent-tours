import { queryFE } from "@/queries/var";
import { authAPIs } from "@/services/fe/auth";
import { useTQuery } from "@/lib/reactQueryHooks";

export const useGetResetPassword = ({ enable, secretKey }: { enable?: boolean; secretKey?: string }) => {
  return useTQuery({
    queryKey: [queryFE.AUTH_CHECK_KEY_RESET_PASSWORD, secretKey],
    queryFn: () => authAPIs.getResetPassword(secretKey),
    retry: false,
    enabled: enable,
  });
};
