import { useBookingInformation } from "@/app/[locale]/hooks/useBookingInformation";
import { EBookingActions } from "@/app/[locale]/store/actions/bookingActions";
import {
    FeBookingFormData,
    FeBookingInformation,
} from "../../modules/booking.interface";
const usePassengerInformation = () => {
    const [bookingInformation, dispatch] = useBookingInformation();
    const setPassengerInformation = (
        passengers: FeBookingInformation["bookingInfo"]["passengers"],
    ) => {
        dispatch({
            type: EBookingActions.SET_PASSENGER_INFORMATION,
            payload: passengers,
        });
    };

    return {
        setPassengerInformation,
        passengers: bookingInformation.bookingInfo.passengers,
    };
};
export default usePassengerInformation;
