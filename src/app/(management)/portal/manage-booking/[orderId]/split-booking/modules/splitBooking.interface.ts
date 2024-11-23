import { IInvoice } from "@/models/management/booking/invoice.interface";
import { IOrderDetail } from "@/models/management/booking/order.interface";
import { EFopType } from "@/models/management/core/formOfPayment.interface";

export type TourBookingItemType = IOrderDetail["tourBookings"][number] & { pax: IOrderDetail["passengers"][number] };
export interface ISplitBookingBase {
  bookingDetails: {
    booking?: {
      recId?: number;
    };
  }[];
  custName?: string; //name + phone bắt buộc
  custPhoneNumber?: string; //name + phone bắt buộc
  custEmail?: string;
  custAddress?: string;
  invoiceName?: string;
  invoiceCompanyName?: string;
  invoiceAddress?: string;
  invoiceTaxCode?: string;
  invoiceEmail?: string;
  rmk?: string; //ghi chu.
}
export interface SplitBookingOrder {
  recId?: number;
  rmk3?: string;
  fop: {
    type: EFopType.CHARGE_SPLIT | EFopType.SPLIT; //important
    amount: number;
    rmk: string;
  }[];
}
export interface ISplitBookingPayload extends ISplitBookingBase {
  bookingOrder: SplitBookingOrder;
}

export class SplitBookingFormData {
  bookingOrder: SplitBookingOrder;
  bookingDetails: TourBookingItemType[];
  customerInfo: {
    custName?: string;
    custPhoneNumber?: string;
    custEmail?: string;
    custAddress?: string;
    rmk?: string;
  };
  invoiceInfo: Partial<IInvoice>;
  constructor(
    bookingOrder: SplitBookingOrder,
    customerInfo: {
      custName?: string;
      custPhoneNumber?: string;
      custEmail?: string;
      custAddress?: string;
      rmk?: string;
    },

    invoiceInfo: Partial<IInvoice>,
  ) {
    this.bookingOrder = bookingOrder;
    this.bookingDetails = [];
    this.customerInfo = customerInfo;
    this.invoiceInfo = invoiceInfo;
  }
}
