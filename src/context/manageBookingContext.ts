import { Dispatch, SetStateAction, createContext } from "react";
import { BookingSSRData } from "@/app/portal/manage-booking/[orderId]/addon-service/modules/bookingSSR.interface";
export const ManageBookingContext = createContext<
    [BookingSSRData, Dispatch<SetStateAction<BookingSSRData>>] | undefined
>(undefined);
