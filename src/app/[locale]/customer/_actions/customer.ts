"use server";

import { serverRequest } from "@/services/serverApi";
import { BaseResponse } from "@/models/common.interface";

import { authOptions } from "@/auth";
import { getServerSession } from "next-auth";
import { FeUserProfileResponse } from "@/models/fe/profile.interface";

export const getCustomerProfile = async (): Promise<FeUserProfileResponse["result"] | undefined> => {
  const session = await getServerSession(authOptions);

  const data = await serverRequest.post<any, BaseResponse<null>>("localfront/getProfile", {
    next: { tags: ["customerProfile"], revalidate: false },
    headers: {
      Authorization: `Bearer ${encodeURIComponent(session?.user.accessToken || "")}`,
    },
    params: {
      requestObject: {},
    },
  });

  return data.result as FeUserProfileResponse["result"];
  // if (!response) {
  //     return {
  //         errorCode: "invalidToken",
  //         message: "Token không hợp lệ.",
  //     };
  // }
  // return response;
};
