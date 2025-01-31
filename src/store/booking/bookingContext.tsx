// "use client";

// import { useReducer, createContext, useContext } from "react";
// // import { FeBookingInformation } from "@/app/[locale]/(booking)/modules/booking.interface";
// import { FeBookingInformation } from "./booking.type";
// import { BookingActions } from "./bookingActions";
// import { bookingReducer, initBookingState } from "./bookingReducer";
// import { useAppManager } from "../appContext";

// export const BookingContext = createContext<[FeBookingInformation, React.Dispatch<BookingActions>] | undefined>(
//   undefined,
// );

// export const FeBookingProvider = ({ children }: { children: React.ReactNode }) => {
//   const [state, dispatch] = useReducer(bookingReducer, initBookingState);
//   return <BookingContext.Provider value={[state, dispatch]}>{children}</BookingContext.Provider>;
// };

// export const useBookingInformation = () => {
//   const booking = useContext(BookingContext);

//   if (!booking) {
//     throw new Error("Hook must use under Booking provider");
//   }

//   return booking;
// };

// export const useBookingSelector = <T,>(selector: (state: FeBookingInformation) => T) => {
//   const booking = useContext(BookingContext);

//   if (!booking) {
//     throw new Error("Hook must use under Booking provider");
//   }
//   const [state, _] = booking;

//   return selector(state);
// };
