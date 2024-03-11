"use client";

import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
export default function ManageBookingPage() {
    const router = useRouter();

    useEffect(() => {
        router.push("./portal/manage-booking/order-list");
    }, []);
    return null;
}
