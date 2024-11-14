"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { LINKS } from "@/constants/links.constant";

const CMSTemplatePage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/portal/content-template/misc-depart/list");
  }, []);
  return null;
};
export default CMSTemplatePage;
