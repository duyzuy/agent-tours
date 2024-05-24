"use client";
import React, { useState } from "react";
import { ManageBookingContext } from "@/context";

import { BookingSSRData } from "./modules/bookingSSR.interface";

const BookingProvider = ({ children }: { children: React.ReactNode }) => {
    const [bookingSSR, setBookingSSR] = useState(
        () => new BookingSSRData(undefined, undefined, []),
    );
    return (
        <ManageBookingContext.Provider value={[bookingSSR, setBookingSSR]}>
            {children}
        </ManageBookingContext.Provider>
    );
};

interface ManageBookingServiceAddonLayoutProps {
    children: React.ReactNode;
}
const ManageBookingServiceAddonLayout = ({
    children,
}: ManageBookingServiceAddonLayoutProps) => {
    return <BookingProvider>{children}</BookingProvider>;
};
export default ManageBookingServiceAddonLayout;
