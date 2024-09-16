"use client";
import React, { useEffect } from "react";
import { redirect } from "next/navigation";

const MemberPage: React.FC = () => {
  return redirect("leading/list");
};
export default MemberPage;
