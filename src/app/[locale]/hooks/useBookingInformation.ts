import { BookingContext } from "../store/context";
import { FeBookingInformation } from "../(booking)/modules/booking.interface";
import { useContext } from "react";

export const useBookingInformation = () => {
    const booking = useContext(BookingContext);

    if (!booking) {
        throw new Error("Hook must use under Booking provider");
    }

    return booking;
};

export const useBookingSelector = <T>(
    selector: (state: FeBookingInformation) => T,
) => {
    const booking = useContext(BookingContext);

    if (!booking) {
        throw new Error("Hook must use under Booking provider");
    }
    const [state, _] = booking;

    return selector(state);
};
