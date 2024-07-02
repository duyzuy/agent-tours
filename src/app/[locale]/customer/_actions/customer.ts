"use server";

import { serverRequest } from "@/services/serverApi";
import { BaseResponse } from "@/models/common.interface";

import { authOptions } from "@/auth";
import { getServerSession } from "next-auth";

export const getCustomerProfile = async () => {
    const session = await getServerSession(authOptions);

    return await serverRequest.post<any, BaseResponse<null>>(
        "localfront/getProfile",
        {
            next: { tags: ["customerProfile"], revalidate: false },
            headers: {
                Authorization: `Bearer ${encodeURIComponent(
                    session?.user.accessToken || "",
                )}`,
            },
            params: {
                requestObject: {},
            },
        },
    );
};
