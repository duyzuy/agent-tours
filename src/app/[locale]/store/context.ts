import { createContext } from "react";

import { LanguageActions } from "./actions/languageActions";
import { LanguageContentContainer } from "./type";
import { ICustomerProfile } from "@/models/customerAuth.interface";

import { FeBookingInformation } from "../(booking)/modules/booking.interface";
import { BookingActions } from "./actions/bookingActions";

export const LanguageContext = createContext<
    [LanguageContentContainer, React.Dispatch<LanguageActions>] | undefined
>(undefined);

export const CustomerAuthContext = createContext<
    [ICustomerProfile, React.Dispatch<LanguageActions>] | undefined
>(undefined);

export const BookingContext = createContext<
    [FeBookingInformation, React.Dispatch<BookingActions>] | undefined
>(undefined);
