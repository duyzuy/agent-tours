import { client } from "@/services/api";
import { ProductServiceListResponse } from "@/models/fe/serviceItem.interface";
import { getAccessToken } from "@/utils/common";
import {
  UpdatePassengerInformationPayload,
  UpdateCustomerContactPayload,
  UpdateInvoincePayload,
} from "@/modules/fe/manageBooking/manageBooking.type";

export const updateBookingContactInformation = async (payload: UpdateCustomerContactPayload) => {
  const accessToken = getAccessToken();
  return await client.post<any>("localfront/BookingOrder_EditContactInfo", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: {
      requestObject: {
        ...payload,
      },
    },
  });
};

export const updateBookingInvoice = async (payload: UpdateInvoincePayload) => {
  const accessToken = getAccessToken();
  return await client.post<ProductServiceListResponse>("localfront/BookingOrder_EditInvoiceInfo", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: {
      requestObject: {
        ...payload,
      },
    },
  });
};

export const updateBookingPassengerInformation = async (payload: UpdatePassengerInformationPayload) => {
  const accessToken = getAccessToken();
  return await client.post<ProductServiceListResponse>("localfront/BookingOrder_EditBookingPaxInfo", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: {
      requestObject: {
        ...payload,
      },
    },
  });
};
