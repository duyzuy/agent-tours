import { useGetServiceListMutation } from "@/mutations/fe/booking";
import useMessage from "@/hooks/useMessage";
import { useBookingInformation, useBookingSelector } from "@/store/hooks";
import { EBookingActions } from "@/store/actions/bookingActions";
import { useEffect } from "react";

const useInitServiceList = (sellableId: number) => {
  const [_, dispatch] = useBookingInformation();
  const services = useBookingSelector((state) => state.services);
  const { mutate: getServiceList, isPending, isIdle } = useGetServiceListMutation();
  const message = useMessage();

  useEffect(() => {
    getServiceList(sellableId, {
      onSuccess(data, variables, context) {
        dispatch({
          type: EBookingActions.SET_SERVICE_LIST,
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
    services,
    isPending,
    isIdle,
  };
};
export default useInitServiceList;
