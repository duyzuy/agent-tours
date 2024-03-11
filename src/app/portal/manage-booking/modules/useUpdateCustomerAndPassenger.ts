import { useUpdatePassengerAndCustomerInformationMutation } from "@/mutations/managements/booking";
import { IBookingOrderCustomerAndPassengerPayload } from "./bookingOrder.interface";

const useUpdateCustomerAndPassenger = () => {
    const { mutate: makeUpdateCustomerAndPassengerInfo } =
        useUpdatePassengerAndCustomerInformationMutation();

    const onUpdateCustomerAndPassengerInfo = (
        payload: IBookingOrderCustomerAndPassengerPayload,
    ) => {
        makeUpdateCustomerAndPassengerInfo(payload, {
            onSuccess(data, variables, context) {
                console.log(data);
            },
            onError(error, variables, context) {
                console.log(error);
            },
        });
    };

    return {
        onUpdateCustomerAndPassengerInfo,
    };
};
export default useUpdateCustomerAndPassenger;
