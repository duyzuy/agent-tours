"use client";
import React, { useState } from "react";
import { BookingContext } from "@/context/bookingContext";
import { AppBookingManager, BookingInfo } from "./modules/bookingInformation.interface";
import { SearchBookingFormData } from "./modules/searchBooking.interface";
import { ESellChannel } from "@/constants/channel.constant";
import dayjs from "dayjs";
import { MONTH_FORMAT } from "@/constants/common";

const initSearchFormData = new SearchBookingFormData(dayjs().locale("en").format(MONTH_FORMAT), undefined, [], [], []);
const initBookingInfo = new BookingInfo(undefined, [], undefined, undefined, undefined, undefined);

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
export { initBookingInfo, initSearchFormData };
