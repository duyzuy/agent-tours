"use client";
import React, { useEffect } from "react";
import { redirect } from "next/navigation";

const OperationPage: React.FC = () => {
  return redirect("operation/list");
};
export default OperationPage;
