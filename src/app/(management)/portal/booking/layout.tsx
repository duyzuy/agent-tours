"use client";
import React, { useState } from "react";
import { BookingContext } from "@/context/bookingContext";
import { initBookingInfo } from "./modules/useSearchBookingInformation";
import { BookingInformation, BookingInfo } from "./modules/bookingInformation.interface";
import { SearchBookingFormData } from "./modules/searchBooking.interface";

const BookingProvider = ({ children }: { children: React.ReactNode }) => {
  const initSearchFormData = new SearchBookingFormData(undefined, undefined, [], [], []);

  const [bookingInformation, setBookingInformation] = useState(
    () =>
      new BookingInformation(
        initBookingInfo,
        { adult: [], child: [], infant: [] },
        initSearchFormData,
        [],
        [],
        undefined,
        undefined,
        undefined,
      ),
  );
  return (
    <BookingContext.Provider value={[bookingInformation, setBookingInformation]}>{children}</BookingContext.Provider>
  );
};

interface BookingLayoutProps {
  children: React.ReactNode;
}
const BookingLayout = ({ children }: BookingLayoutProps) => {
  return <BookingProvider>{children}</BookingProvider>;
};
export default BookingLayout;
