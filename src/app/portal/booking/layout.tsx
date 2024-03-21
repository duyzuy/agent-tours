"use client";
import React, { useState } from "react";
import { BookingContext } from "@/context/bookingContext";

import {
    BookingInformation,
    BookingInfo,
} from "./modules/bookingInformation.interface";
import { SearchBookingFormData } from "./modules/searchBooking.interface";
export const initBookingInfo = new BookingInfo(undefined, [], undefined);
export const initSearchFormData = new SearchBookingFormData(
    undefined,
    undefined,
    [],
    [],
    [],
);
const BookingProvider = ({ children }: { children: React.ReactNode }) => {
    const [bookingInformation, setBookingInformation] = useState(
        () =>
            new BookingInformation(
                initBookingInfo,
                initSearchFormData,
                [],
                [],
                undefined,
            ),
    );
    return (
        <BookingContext.Provider
            value={[bookingInformation, setBookingInformation]}
        >
            {children}
        </BookingContext.Provider>
    );
};

interface BookingLayoutProps {
    children: React.ReactNode;
}
const BookingLayout = ({ children }: BookingLayoutProps) => {
    return <BookingProvider>{children}</BookingProvider>;
};
export default BookingLayout;
