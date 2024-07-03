"use server";
import React, { memo } from "react";
import PageWraper from "./_components/PageWraper";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";

export default async function PaymentPage() {
    const session = await getServerSession(authOptions);
    return (
        <>
            <PageWraper session={session} />
        </>
    );
}
