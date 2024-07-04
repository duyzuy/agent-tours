"use client";

import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
export default function ManageContentsPostPage() {
    const router = useRouter();

    useEffect(() => {
        router.push("./portal/contents/post/list");
    }, []);
    return null;
}
