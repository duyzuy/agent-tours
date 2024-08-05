"use client";
import React from "react";
import BookingProvider from "./BookingProvider";

interface BookingLayoutProps {
  children: React.ReactNode;
}
const BookingLayout = ({ children }: BookingLayoutProps) => {
  return <BookingProvider>{children}</BookingProvider>;
};
export default BookingLayout;
