import { useTMutation } from "@/lib/reactQueryHooks";
import useMessage from "@/hooks/useMessage";
import { useQueryClient } from "@tanstack/react-query";
import { updateBookingContactInformation } from "@/services/fe/manageBooking";

export const useUpdateContactInformation = () => {
  const message = useMessage();
  const queryClient = useQueryClient();
  return useTMutation({
    mutationFn: updateBookingContactInformation,
    onSuccess: (data, variables) => {
      message.success(`Cập nhật thành công`);
    },
    onError: (error, variables) => {
      console.log({ error, variables });
      message.error(error.message);
    },
  });
};
