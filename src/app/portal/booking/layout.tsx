"use client";
import React, { useState } from "react";
import { BookingContext } from "@/context/bookingContext";

import {
    BookingInformation,
    BookingInfo,
} from "./modules/bookingInformation.interface";

const BookingProvider = ({ children }: { children: React.ReactNode }) => {
    const initBookingInfo = new BookingInfo(undefined, [], undefined, "");

    const [bookingInformation, setBookingInformation] = useState(
        () => new BookingInformation(initBookingInfo, undefined, [], undefined),
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
