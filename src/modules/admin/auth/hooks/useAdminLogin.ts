import { adminSignIn } from "@/services/management/auth";
import { setAdminUserToken } from "@/utils/common";
import { useRouter } from "next/navigation";
import useMessage from "@/hooks/useMessage";
import { useTMutation } from "@/lib/reactQueryHooks";

const useAdminLogin = () => {
  const router = useRouter();
  const message = useMessage();
  return useTMutation({
    mutationFn: adminSignIn,
    onSuccess: (data, variables) => {
      setAdminUserToken(data.result);
      message.success("Đăng nhập thành công");
      router.push("/portal/dashboard");
    },
    onError(error, variables, context) {
      message.error(error.message);
    },
  });
};
export default useAdminLogin;
