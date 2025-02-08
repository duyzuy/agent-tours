"use client";

import { SplitBookingProvider } from "./context";
export default function SplitBookingLayout({ children }: { children: React.ReactNode }) {
  return <SplitBookingProvider>{children}</SplitBookingProvider>;
}
