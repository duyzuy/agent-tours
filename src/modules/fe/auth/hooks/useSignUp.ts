import { authAPIs } from "@/services/fe/auth";
import { useTMutation } from "@/lib/reactQueryHooks";
import useMessage from "@/hooks/useMessage";
import { useRouter } from "@/utils/navigation";
import { CLIENT_LINKS } from "@/constants/client/clientRouter.constant";

export const useSignUp = (options?: { redirect?: boolean; callbackUrl?: string }) => {
  const router = useRouter();
  const message = useMessage();
  return useTMutation({
    mutationFn: authAPIs.register,
    onSuccess(data, variables, context) {
      message.success("Đăng ký thành công");
      if (options?.redirect) {
        router.push(`/${CLIENT_LINKS.CustomerLogin}`);
        router.refresh();
      }
    },
    onError(error, variables, context) {
      message.error(error.message);
    },
  });
};
