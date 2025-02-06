"use client";
import React from "react";
import { PortalManageBookingProvider } from "./context";

interface ManageBookingLayoutProps {
  children: React.ReactNode;
  params: { orderId: string };
}
const ManageBookingLayout = ({ children, params }: ManageBookingLayoutProps) => {
  return <PortalManageBookingProvider orderId={Number(params.orderId)}>{children}</PortalManageBookingProvider>;
};
export default ManageBookingLayout;
