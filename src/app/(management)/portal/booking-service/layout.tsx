"use client";
import React from "react";

import { PortalBookingServiceProvider } from "./modules/store/context";
interface BookingServiceLayoutProps {
  children: React.ReactNode;
}
export default function BookingServiceLayout({ children }: BookingServiceLayoutProps) {
  return <PortalBookingServiceProvider>{children}</PortalBookingServiceProvider>;
}
