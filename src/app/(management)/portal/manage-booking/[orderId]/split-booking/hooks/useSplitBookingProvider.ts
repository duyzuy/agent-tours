import { SplitBookingContext } from "../splitBookingContext";
import { useContext } from "react";

const useSplitBookingProvider = () => {
  const context = useContext(SplitBookingContext);

  if (!context) {
    throw new Error("useSplitBooking must be used inside the SplitBookingProvider");
  }

  return context;
};
export default useSplitBookingProvider;
