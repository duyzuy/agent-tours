"use client";
import React, { useEffect } from "react";
import { redirect } from "next/navigation";

const MemberPage: React.FC = () => {
  return redirect("operation/list");
};
export default MemberPage;
