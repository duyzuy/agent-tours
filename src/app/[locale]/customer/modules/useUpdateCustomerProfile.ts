import { CustomerProfileFormData } from "@/models/fe/profile.interface";
import { useCustomerUpdateProfileMutation } from "@/mutations/fe/customer";
import { useQueryClient } from "@tanstack/react-query";
import useMessage from "@/hooks/useMessage";
import { queryFE } from "@/queries/var";
import { revalidateTag } from "next/cache";
// const sesss = useSession();

// console.log(sesss.data?.user.accessToken);

const useUpdateCustomerProfile = () => {
  const { mutate: makeUpdate, isPending, isIdle } = useCustomerUpdateProfileMutation();

  const queryClient = useQueryClient();
  const message = useMessage();
  const updateProfile = (data: CustomerProfileFormData, cb?: () => void) => {
    makeUpdate(data, {
      onSuccess(data, variables, context) {
        message.success("Cập nhật thành công");
        revalidateTag("customerProfile");
        cb?.();
      },
      onError(error, variables, context) {
        console.log("err");
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
