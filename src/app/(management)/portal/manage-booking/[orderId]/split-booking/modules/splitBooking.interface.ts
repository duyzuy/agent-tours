import { IInvoice } from "@/models/management/booking/invoice.interface";
import { IOrderDetail } from "@/models/management/booking/order.interface";
import { EFopType } from "@/models/management/core/formOfPayment.interface";

export type TourBookingDetailItem = IOrderDetail["tourBookings"][number] & { pax: IOrderDetail["passengers"][number] };
export interface ISplitBookingPayload {
  bookingDetails: {
    booking?: {
      recId?: number;
    };
  }[];
  custName?: string;
  custPhoneNumber?: string;
  custEmail?: string;
  custAddress?: string;
  invoiceName?: string;
  invoiceCompanyName?: string;
  invoiceAddress?: string;
  invoiceTaxCode?: string;
  invoiceEmail?: string;
  rmk?: string;
  bookingOrder: {
    recId?: number;
    rmk3?: string;
    fops: {
      type: EFopType.CHARGE_SPLIT | EFopType.SPLIT;
      amount: number;
      rmk: string;
    }[];
  };
}

export class SplitBookingFormData {
  bookingOrder: {
    recId?: number;
    rmk3?: string;
    fops: {
      type: EFopType.CHARGE_SPLIT | EFopType.SPLIT;
      amount: number;
      rmk: string;
    }[];
  };
  bookingDetails: TourBookingDetailItem[];
  customerInfo: {
    custName?: string;
    custPhoneNumber?: string;
    custEmail?: string;
    custAddress?: string;
    rmk?: string;
  };
  invoiceInfo: Partial<IInvoice>;
  constructor(
    bookingOrder: {
      recId?: number;
      rmk3?: string;
      fops: {
        type: EFopType.CHARGE_SPLIT | EFopType.SPLIT;
        amount: number;
        rmk: string;
      }[];
    },
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
