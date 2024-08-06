"use client";

import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
export default function ManageContentsPage() {
  const router = useRouter();

  useEffect(() => {
    router.push("./portal/contents/page");
  }, []);
  return null;
}
