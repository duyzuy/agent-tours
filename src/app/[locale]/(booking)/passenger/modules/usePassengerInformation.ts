import { useBookingInformation } from "@/app/[locale]/hooks/useBookingInformation";
import { EBookingActions } from "@/app/[locale]/store/actions/bookingActions";
import { FeBookingFormData, FeBookingInformation } from "../../modules/booking.interface";
const usePassengerInformation = () => {
  const [bookingInformation, dispatch] = useBookingInformation();
  const updatePassengersInformation = (passengers: FeBookingInformation["bookingInfo"]["passengers"]) => {
    dispatch({
      type: EBookingActions.SET_PASSENGERS_INFORMATION,
      payload: passengers,
    });
  };

  const updatePassengerInformation = (passenger: FeBookingInformation["bookingInfo"]["passengers"][number]) => {
    dispatch({
      type: EBookingActions.SET_PASSENGER_INFORMATION,
      payload: passenger,
    });
  };

  return {
    updatePassengerInformation,
    updatePassengersInformation,
    passengers: bookingInformation.bookingInfo.passengers,
  };
};
export default usePassengerInformation;
