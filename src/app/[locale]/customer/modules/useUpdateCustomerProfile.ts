import { CustomerProfileFormData } from "@/models/fe/profile.interface";
import { useCustomerUpdateProfileMutation } from "@/mutations/fe/customer";
import { useQueryClient } from "@tanstack/react-query";
import useMessage from "@/hooks/useMessage";
import { queryFE } from "@/queries/var";
import { revalidateTag } from "next/cache";
import { useRouter } from "next/navigation";
// const sesss = useSession();

// console.log(sesss.data?.user.accessToken);

const useUpdateCustomerProfile = () => {
  const { mutate: makeUpdate, isPending, isIdle } = useCustomerUpdateProfileMutation();

  const router = useRouter();

  const message = useMessage();
  const updateProfile = (data: CustomerProfileFormData, cb?: () => void) => {
    makeUpdate(data, {
      onSuccess(data, variables, context) {
        message.success("Cập nhật thành công");
        router.refresh();
        cb?.();
      },
      onError(error, variables, context) {
        message.error(error.message);
        console.log(error);
      },
      onSettled(data, error, variables, context) {
        console.log("setted");
      },
    });
  };
  return {
    updateProfile,
    isloading: isPending,
  };
};
export default useUpdateCustomerProfile;
