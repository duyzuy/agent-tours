"use client";
import React, { useEffect } from "react";
import { redirect } from "next/navigation";

const MemberPage: React.FC = () => {
  return redirect("/portal/booking-request/list");
};
export default MemberPage;
