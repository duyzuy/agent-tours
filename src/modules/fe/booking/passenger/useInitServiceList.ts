import { useGetServiceListMutation } from "@/mutations/fe/booking";
import useMessage from "@/hooks/useMessage";
import { useAppDispatch, useBookingSelector } from "@/store";
import { useEffect } from "react";

const useInitServiceList = (sellableId: number) => {
  const dispatch = useAppDispatch();
  const bookingInformation = useBookingSelector();
  const { mutate: getServiceList, isPending, isIdle } = useGetServiceListMutation();
  const message = useMessage();

  useEffect(() => {
    getServiceList(sellableId, {
      onSuccess(data, variables, context) {
        dispatch({
          type: "SET_SERVICE_LIST",
          payload: data.result.extraConfigs,
        });
      },
      onError(error, variables, context) {
        message.error("Get list service fail");
        console.log(error);
      },
    });
  }, [sellableId]);

  return {
    services: bookingInformation.services,
    isPending,
    isIdle,
  };
};
export default useInitServiceList;
