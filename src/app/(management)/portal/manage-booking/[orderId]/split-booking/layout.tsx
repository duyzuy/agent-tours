"use client";

import SplitBookingProvider from "./SplitBookingProvider";
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <SplitBookingProvider>{children}</SplitBookingProvider>;
}
