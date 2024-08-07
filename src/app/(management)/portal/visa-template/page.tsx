"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { LINKS } from "@/constants/links.constant";

const CMSTemplatePage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push(LINKS.VisaTemplateList);
  }, []);
  return null;
};
export default CMSTemplatePage;
