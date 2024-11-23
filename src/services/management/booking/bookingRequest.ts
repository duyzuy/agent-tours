import {
  BookingRequestListResponse,
  BookingRequestPayload,
  BookingRequestQueryParams,
  BookingRequestResponse,
  BookingRequestUpdateStatusPayload,
} from "@/models/management/bookingRequest/bookingRequest.interface";
import { coreApi } from "../coreApi";

export const bookingRequestAPIs = {
  getList: async (queryParams?: BookingRequestQueryParams) => {
    return await coreApi.post<BookingRequestListResponse>("core/BookingRequest_List", {
      requestObject: {
        ...queryParams?.requestObject,
      },
      pageCurrent: queryParams?.pageCurrent,
      pageSize: queryParams?.pageSize,
    });
  },
  getOne: async (requestId?: number) => {
    return await coreApi.post<BookingRequestResponse>("core/BookingRequest_Details", {
      requestObject: {
        requestId,
      },
    });
  },
  create: async (payload?: BookingRequestPayload) => {
    return await coreApi.post<BookingRequestResponse>("core/BookingRequest_Addnew", {
      requestObject: {
        ...payload,
      },
    });
  },
  update: async (payload?: BookingRequestPayload) => {
    return await coreApi.post<BookingRequestResponse>("core/BookingRequest_Edit", {
      requestObject: {
        ...payload,
      },
    });
  },
  updateStatus: async (payload: BookingRequestUpdateStatusPayload) => {
    return await coreApi.post<BookingRequestResponse>("core/BookingRequest_Edit", {
      requestObject: {
        ...payload,
      },
    });
  },
};
