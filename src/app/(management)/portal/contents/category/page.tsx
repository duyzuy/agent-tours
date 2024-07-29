"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ManageContentsPostPage() {
  const router = useRouter();

  useEffect(() => {
    router.push("/portal/contents/category/list");
  }, []);
  return null;
}
