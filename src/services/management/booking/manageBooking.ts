import { coreApi } from "../coreApi";
import { IOrderListRs, IOrderDetailRs } from "@/models/management/booking/order.interface";
import {
  IBookingOrderCustomerPayload,
  IOrderPassengerEditPayload,
  IBookingOrderCancelPayload,
  IBookingOrderInvoiceInfoPayload,
} from "@/app/(management)/portal/manage-booking/modules/bookingOrder.interface";
import { ISplitBookingPayload } from "@/app/(management)/portal/manage-booking/[orderId]/split-booking/modules/splitBooking.interface";
import { IRuleAndPolicy } from "@/models/ruleAndPolicy.interface";
import {
  AddNewSSRByPaxPayload,
  AddNewSSRNoPaxPayload,
  DeleteSSRPayload,
} from "@/models/management/booking/order.interface";
import { BookingOrderListQueryParams } from "@/models/management/booking/order.interface";

export const manageBookingAPIs = {
  getOrderList: async (queryParams: BookingOrderListQueryParams, localRuleAndPolicies?: IRuleAndPolicy[]) => {
    return await coreApi.post<IOrderListRs>("core/BookingOrder_List", {
      requestObject: {
        ...queryParams?.requestObject,
        localRuleAndPolicies,
      },
      pageCurrent: queryParams.pageCurrent,
      pageSize: queryParams.pageSize,
      orderBy: queryParams.orderBy,
    });
  },
  getOrderDetail: async (reservationId?: number, localRuleAndPolicies?: IRuleAndPolicy[]) => {
    return await coreApi.post<IOrderDetailRs>("core/BookingOrder_Details", {
      requestObject: {
        recId: reservationId,
        localRuleAndPolicies,
      },
    });
  },
  updateCustomer: async (payload?: IBookingOrderCustomerPayload) => {
    return await coreApi.post<IOrderDetailRs>("core/BookingOrder_EditContactInfo", {
      requestObject: {
        ...payload,
      },
    });
  },
  updateInvoiceInfo: async (payload?: IBookingOrderInvoiceInfoPayload) => {
    return await coreApi.post<IOrderDetailRs>("core/BookingOrder_EditInvoiceInfo", {
      requestObject: {
        ...payload,
      },
    });
  },

  updatePassengers: async (payload?: IOrderPassengerEditPayload) => {
    return await coreApi.post<IOrderDetailRs>("core/BookingOrder_EditBookingPaxInfo", {
      requestObject: {
        ...payload,
      },
    });
  },
  splitBooking: async (payload?: ISplitBookingPayload) => {
    return await coreApi.post<IOrderDetailRs>("core/BookingOrder_SplitInTwoOrder", {
      requestObject: {
        ...payload,
      },
    });
  },
  splitBookingAndCancel: async (payload?: ISplitBookingPayload) => {
    return await coreApi.post<IOrderDetailRs>("core/BookingOrder_SplitAndCancel", {
      requestObject: {
        ...payload,
      },
    });
  },
  cancelBookingOrder: async (payload?: IBookingOrderCancelPayload) => {
    return await coreApi.post<any>("core/BookingOrder_Cancel", {
      requestObject: {
        ...payload,
      },
    });
  },
  addComment: async (payload?: { orderId: number; comment: string }) => {
    return await coreApi.post<IOrderDetailRs>("core/BookingOrder_AddComment", {
      requestObject: {
        ...payload,
      },
    });
  },
  addNewSSRNoPax: async (payload?: AddNewSSRNoPaxPayload) => {
    return await coreApi.post<IOrderDetailRs>("core/BookingOrder_EditBooking_AddNewSSR", {
      requestObject: {
        ...payload,
      },
    });
  },
  addNewSSRByPax: async (payload?: AddNewSSRByPaxPayload) => {
    return await coreApi.post<IOrderDetailRs>("core/BookingOrder_EditBooking_AddNewSSRWithPax", {
      requestObject: {
        ...payload,
      },
    });
  },
  deleteSSR: async (payload?: DeleteSSRPayload) => {
    return await coreApi.post<IOrderDetailRs>("core/BookingOrder_DeleteSSR", {
      requestObject: {
        ...payload,
      },
    });
  },
  extendBookingTimeLimit: async (payload?: { orderId: number; postponeHours: number }) => {
    return await coreApi.post<IOrderDetailRs>("core/BookingOrder_PostponeBookingTimelimit", {
      requestObject: {
        ...payload,
      },
    });
  },
};
