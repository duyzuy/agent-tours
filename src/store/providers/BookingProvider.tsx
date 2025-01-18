"use client";
import { BookingContext } from "../context";
import { useReducer } from "react";
import { bookingReducer, initBookingState } from "../reducers";
type Props = {
  children?: React.ReactNode;
};

export const FeBookingProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(bookingReducer, initBookingState);
  return <BookingContext.Provider value={[state, dispatch]}>{children}</BookingContext.Provider>;
};
