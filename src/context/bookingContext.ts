import { Dispatch, SetStateAction, createContext } from "react";

import { AppBookingManager } from "@/app/(management)/portal/booking/modules/bookingInformation.interface";
export const BookingContext = createContext<
  [AppBookingManager, Dispatch<SetStateAction<AppBookingManager>>] | undefined
>(undefined);
