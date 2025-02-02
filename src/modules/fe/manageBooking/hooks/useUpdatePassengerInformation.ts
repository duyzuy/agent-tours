import { useTMutation } from "@/lib/reactQueryHooks";
import useMessage from "@/hooks/useMessage";
import { updateBookingPassengerInformation } from "@/services/fe/manageBooking";

export const useUpdatePassengerInformation = () => {
  const message = useMessage();

  return useTMutation({
    mutationFn: updateBookingPassengerInformation,
    onSuccess: (data, variables) => {
      message.success(`Cập nhật thành công`);
    },
    onError: (error, variables) => {
      console.log({ error, variables });
      message.error(error.message);
    },
  });
};
