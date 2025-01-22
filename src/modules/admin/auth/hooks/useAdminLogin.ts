import { adminSignIn } from "@/services/management/auth";
import { useCustomMutation } from "@/mutations/useCustomMutation";
import { setAdminUserToken } from "@/utils/common";
import { useRouter } from "next/navigation";
import useMessage from "@/hooks/useMessage";

const useAdminLogin = () => {
  const router = useRouter();
  const message = useMessage();
  return useCustomMutation({
    mutationFn: adminSignIn,
    onSuccess: (data, variables) => {
      setAdminUserToken(data.result);
      message.success("Đăng nhập thành công");
      router.refresh();
    },
  });
};
export default useAdminLogin;
