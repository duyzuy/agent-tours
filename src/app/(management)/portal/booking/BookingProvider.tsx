"use client";
import React, { useState } from "react";
import { BookingContext } from "@/context/bookingContext";
import { initBookingInfo } from "./modules/useSearchBookingInformation";
import { AppBookingManager } from "./modules/bookingInformation.interface";
import { SearchBookingFormData } from "./modules/searchBooking.interface";
import { ESellChannel } from "@/constants/channel.constant";

const initSearchFormData = new SearchBookingFormData(undefined, undefined, [], [], []);
export const initBookingData = new AppBookingManager(
  initBookingInfo,
  { adult: [], child: [], infant: [] },
  initSearchFormData,
  [],
  [],
  undefined,
  ESellChannel.B2B,
  undefined,
);
const BookingProvider = ({ children }: { children: React.ReactNode }) => {
  const [bookingInformation, setBookingInformation] = useState(initBookingData);
  return (
    <BookingContext.Provider value={[bookingInformation, setBookingInformation]}>{children}</BookingContext.Provider>
  );
};
export default BookingProvider;
