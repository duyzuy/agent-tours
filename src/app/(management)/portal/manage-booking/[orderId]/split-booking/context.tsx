import { Dispatch, SetStateAction, createContext } from "react";
import { SplitBookingFormData } from "./modules/splitBooking.interface";
import { useState } from "react";
import { useContext } from "react";
export const SplitBookingContext = createContext<
  [SplitBookingFormData, Dispatch<SetStateAction<SplitBookingFormData>>] | null
>(null);

interface SplitBookingProviderProps {
  children: React.ReactNode;
}
const SplitBookingProvider: React.FC<SplitBookingProviderProps> = ({ children }) => {
  const [bookingSplit, setBookingSplitItem] = useState(
    () => new SplitBookingFormData({ recId: undefined, rmk3: "", fops: [] }, {}, {}),
  );

  return (
    <SplitBookingContext.Provider value={[bookingSplit, setBookingSplitItem]}>{children}</SplitBookingContext.Provider>
  );
};

const useSplitBooking = () => {
  const context = useContext(SplitBookingContext);

  if (!context) {
    throw new Error("useSplitBooking must be used inside the SplitBookingProvider");
  }

  return context;
};

export { SplitBookingProvider, useSplitBooking };
