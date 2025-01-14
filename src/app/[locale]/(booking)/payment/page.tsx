"use server";
import React, { memo } from "react";
import PageWraper from "./_components/PageWraper";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { LangCode } from "@/models/management/cms/language.interface";
import { unstable_setRequestLocale } from "next-intl/server";

interface Props {
  params: { locale: LangCode };
}
export default async function PaymentPage({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale);
  const session = await getServerSession(authOptions);

  return <PageWraper session={session} />;
}
