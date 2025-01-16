"use server";

import { serverRequest } from "@/services/serverApi";
import { BaseResponse } from "@/models/common.interface";
import { authOptions } from "@/auth";
import { getServerSession } from "next-auth";
import { CustomerProfileResponse } from "@/models/fe/profile.interface";
import { FeOrderDetailResponse, FeOrderListResponse } from "@/models/fe/order.interface";

export const getUserCustomerProfile = async (): Promise<CustomerProfileResponse["result"] | undefined> => {
  const session = await getServerSession(authOptions);

  const data = await serverRequest.post<CustomerProfileResponse, BaseResponse<null>>("localfront/getProfile", {
    next: { tags: ["customerProfile"], revalidate: false },
    headers: {
      Authorization: `Bearer ${encodeURIComponent(session?.user.accessToken || "")}`,
    },
    params: {
      requestObject: {},
    },
  });

  return data?.result;
};

export const getOrderList = async () => {
  const session = await getServerSession(authOptions);

  const data = await serverRequest.post<FeOrderListResponse, BaseResponse<null>>("localfront/BookingOrder_List", {
    next: { tags: ["customerOrderList"] },
    cache: "no-cache",
    headers: {
      Authorization: `Bearer ${encodeURIComponent(session?.user.accessToken || "")}`,
    },
    params: {
      requestObject: {},
    },
  });

  return data?.result;
};

export const getOrderDetail = async (recId: number) => {
  const session = await getServerSession(authOptions);

  const data = await serverRequest.post<FeOrderDetailResponse, BaseResponse<null>>("localfront/BookingOrder_Details", {
    next: { tags: ["customerOrderDetail", recId.toString()] },
    cache: "no-cache",
    headers: {
      Authorization: `Bearer ${encodeURIComponent(session?.user.accessToken || "")}`,
    },
    params: {
      requestObject: { recId },
    },
  });

  return data?.result;
};
