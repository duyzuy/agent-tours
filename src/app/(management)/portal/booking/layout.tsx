"use client";
import React from "react";

import { PortalBookingProvider } from "./context";
interface BookingLayoutProps {
  children: React.ReactNode;
}
export default function BookingLayout({ children }: BookingLayoutProps) {
  return <PortalBookingProvider>{children}</PortalBookingProvider>;
}
