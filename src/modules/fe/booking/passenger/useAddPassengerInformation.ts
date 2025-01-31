import { FeBookingInformation } from "@/store/booking/booking.type";
import { useBookingSelector, useAppDispatch } from "@/store";

const useAddPassengerInformation = () => {
  const bookingInformation = useBookingSelector();
  const dispatch = useAppDispatch();
  const updatePassengersInformation = (passengers: FeBookingInformation["bookingInfo"]["passengers"]) => {
    dispatch({
      type: "SET_PASSENGERS_INFORMATION",
      payload: passengers,
    });
  };

  const updatePassengerInformation = (passenger: FeBookingInformation["bookingInfo"]["passengers"][number]) => {
    dispatch({
      type: "SET_PASSENGER_INFORMATION",
      payload: passenger,
    });
  };

  return {
    updatePassengerInformation,
    updatePassengersInformation,
    passengers: bookingInformation.bookingInfo.passengers,
  };
};
export default useAddPassengerInformation;
