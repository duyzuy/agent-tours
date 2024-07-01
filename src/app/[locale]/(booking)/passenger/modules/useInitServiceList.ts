import { useBookingInformation } from "@/app/[locale]/hooks/useBookingInformation";
import { useGetServiceListMutation } from "@/mutations/fe/booking";
import useMessage from "@/hooks/useMessage";
import { EBookingActions } from "@/app/[locale]/store/actions/bookingActions";
const useInitServiceList = () => {
    const [_, dispatch] = useBookingInformation();

    const {
        mutate: getServiceList,
        isPending,
        isIdle,
    } = useGetServiceListMutation();
    const message = useMessage();

    const initServiceBooking = (seellableId?: number) => {
        getServiceList(seellableId, {
            onSuccess(data, variables, context) {
                dispatch({
                    type: EBookingActions.SET_SERVICE_LIST,
                    payload: data.result,
                });
            },
            onError(error, variables, context) {
                message.error("Get list service fail");
                console.log(error);
            },
        });
    };

    return {
        initServiceBooking,

        isPending,
        isIdle,
    };
};
export default useInitServiceList;
