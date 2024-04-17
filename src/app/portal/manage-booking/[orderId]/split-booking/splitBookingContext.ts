import { Dispatch, SetStateAction, createContext } from "react";
import { SplitBookingFormData } from "./modules/splitBooking.interface";
export const SplitBookingContext = createContext<
    | [SplitBookingFormData, Dispatch<SetStateAction<SplitBookingFormData>>]
    | null
>(null);
