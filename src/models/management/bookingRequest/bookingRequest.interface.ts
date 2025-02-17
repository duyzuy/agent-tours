import { BaseQueryParams, BaseResponse } from "@/models/common.interface";

export interface IBookingRequestDetail {
  requestId: number;
  sellableId: number;
  sellable: string;
  requestName: "";
  startDate: string;
  endDate: string;
  custName: string;
  custPhoneNumber: string;
  custEmail: string;
  custAddress: string;
  custInfoJson: string;
  invoiceName: string;
  invoiceCompanyName: string;
  invoiceAddress: string;
  invoiceTaxCode: string;
  invoiceEmail: string;
  rmk: string;
  referenceId: string;
  referenceName: string;
  tourPrice: number;
  extraPrice: number;
  totalAmount: number;
  status: "NEW" | "CONFIRMED" | "WIN" | "LOST" | "CANCELLED";
  sysFstUser: string;
  sysFstUpdate: string;
}
export type IBookingRequest = Pick<
  IBookingRequestDetail,
  | "requestId"
  | "sellableId"
  | "requestName"
  | "startDate"
  | "endDate"
  | "custName"
  | "tourPrice"
  | "extraPrice"
  | "totalAmount"
  | "status"
  | "sysFstUser"
  | "sysFstUpdate"
>;

export interface BookingRequestListResponse extends BaseResponse<IBookingRequest[]> {}
export interface BookingRequestResponse extends BaseResponse<IBookingRequestDetail> {}
export class BookingRequestQueryParams
  implements BaseQueryParams<{ status: ("NEW" | "CONFIRMED" | "WIN" | "LOST" | "CANCELLED")[] }>
{
  requestObject?: { status: ("NEW" | "CONFIRMED" | "WIN" | "LOST" | "CANCELLED")[] } | undefined;
  pageCurrent?: number | undefined;
  pageSize?: number | undefined;
  orderBy?: { sortColumn?: string; direction?: "asc" | "desc" } | undefined;

  constructor(
    requestObject: {
      status: ("NEW" | "CONFIRMED" | "WIN" | "LOST" | "CANCELLED")[];
    },
    pageCurrent: number,
    pageSize: number,
  ) {
    this.pageCurrent = pageCurrent;
    this.pageSize = pageSize;
    this.requestObject = requestObject;
    this.orderBy = { sortColumn: "requestId", direction: "desc" };
  }
}

export interface BookingRequestPayload {
  requestId?: number;
  requestName?: string;
  startDate?: string;
  endDate?: string;

  custName?: string; //name + phone bắt buộc
  custPhoneNumber?: string; //name + phone bắt buộc
  custEmail?: string;
  custAddress?: string;

  referenceId?: string;
  referenceName?: string; //chưa dùng tới

  tourPrice?: number;
  extraPrice?: number;

  invoiceName?: string;
  invoiceCompanyName?: string;
  invoiceAddress?: string;
  invoiceTaxCode?: string;
  invoiceEmail?: string;
  rmk?: string; //yêu cầu + ghi chu BẮT BUỘC
}

export interface BookingRequestUpdateStatusPayload {
  requestId?: number;
  status: IBookingRequestDetail["status"];
}
