import { BaseResponse } from "@/models/common.interface";
import { coreApi } from "../coreApi";
import { BookingOrderListQueryParams, ReservationRs } from "@/models/management/booking/reservation.interface";
import { IOrderListRs, IOrderDetailRs } from "@/models/management/booking/order.interface";
import {
  IBookingOrderCustomerPayload,
  IBookingOrderPassengersPayload,
  IBookingOrderCancelPayload,
  IBookingOrderInvoiceInfoPayload,
} from "@/app/(management)/portal/manage-booking/modules/bookingOrder.interface";
import { ISplitBookingPayload } from "@/app/(management)/portal/manage-booking/[orderId]/split-booking/modules/splitBooking.interface";
import { IRuleAndPolicy } from "@/models/ruleAndPolicy.interface";
import { FormOfPaymmentQueryParams, IFormOfPaymentListRs } from "@/models/management/core/formOfPayment.interface";
// import { IBookingSSRPayload } from "@/app/portal/manage-booking/[orderId]/addon-service/modules/bookingSSR.interface";
import { IEditOrderSSRPayload } from "@/app/(management)/portal/manage-booking/[orderId]/modules/manageBooking.interface";
import { RoomingPayload, RoomingListResponse } from "@/models/management/booking/rooming.interface";

export const manageBookingAPIs = {
  getOrderList: async (queryParams: BookingOrderListQueryParams, localRuleAndPolicies?: IRuleAndPolicy[]) => {
    return await coreApi.post<IOrderListRs>("core/BookingOrder_List", {
      requestObject: {
        ...queryParams?.requestObject,
        localRuleAndPolicies,
      },
      pageCurrent: queryParams.pageCurrent,
      pageSize: queryParams.pageSize,
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
    return await coreApi.post<any>("core/BookingOrder_EditContactInfo", {
      requestObject: {
        ...payload,
      },
    });
  },
  updateInvoiceInfo: async (payload?: IBookingOrderInvoiceInfoPayload) => {
    return await coreApi.post<any>("core/BookingOrder_EditInvoiceInfo", {
      requestObject: {
        ...payload,
      },
    });
  },

  updatePassengers: async (payload?: IBookingOrderPassengersPayload) => {
    return await coreApi.post<any>("core/BookingOrder_EditBookingPaxInfo", {
      requestObject: {
        ...payload,
      },
    });
  },
  splitBooking: async (payload?: ISplitBookingPayload) => {
    return await coreApi.post<ReservationRs>("core/BookingOrder_SplitInTwoOrder", {
      requestObject: {
        ...payload,
      },
    });
  },
  splitBookingAndCancel: async (payload?: ISplitBookingPayload) => {
    return await coreApi.post<ReservationRs>("core/BookingOrder_SplitAndCancel", {
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
  getFOPListByOrderId: async (queryParams?: FormOfPaymmentQueryParams) => {
    return await coreApi.post<IFormOfPaymentListRs>("core/BookingOrder_Fop_List", {
      requestObject: {
        ...queryParams?.requestObject,
      },
      pageSize: queryParams?.pageSize,
      pageCurrent: queryParams?.pageCurrent,
    });
  },
  updateSSRByPassenger: async (payload?: IEditOrderSSRPayload) => {
    return await coreApi.post<ReservationRs>("core/BookingOrder_EditBookingDetailsSSR", {
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
  getRoomingList: async (sellableId: number) => {
    return await coreApi.post<RoomingListResponse>("core/Operation_RoomingList_List", {
      requestObject: {
        sellableId,
      },
    });
  },
  updateRoomingList: async (payload: RoomingPayload) => {
    return await coreApi.post<RoomingListResponse>("core/Operation_RoomingList_Assign", {
      requestObject: {
        roomingList: payload.roomingList,
      },
    });
  },
};
