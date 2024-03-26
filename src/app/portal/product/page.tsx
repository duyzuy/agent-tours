"use client";
import React, { useEffect } from "react";

import { useRouter } from "next/navigation";

const ProductPage = () => {
    const router = useRouter();

    useEffect(() => {
        router.push("./portal/product/inventory");
    }, []);

    return null;
};
export default ProductPage;
