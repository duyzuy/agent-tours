import { Dispatch, SetStateAction, createContext } from "react";
import { BookingInformation } from "@/app/portal/booking/modules/bookingInformation.interface";
export const BookingContext = createContext<
    | [BookingInformation, Dispatch<SetStateAction<BookingInformation>>]
    | undefined
>(undefined);
