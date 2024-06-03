import {
    BaseResponse,
    PassengerType,
    Status,
    PaymentStatus,
} from "../common.interface";
import { IBookingTimeLitmit } from "../core/bookingTimeLimit.interface";
import { IFormOfPayment } from "../core/formOfPayment.interface";
import { PriceConfig } from "../core/priceConfig.interface";
import { ISellable } from "../core/sellable.interface";
import { ITemplateSellable } from "../core/templateSellable.interface";
import { IPassengerInformation } from "./passengerInformation.interface";

interface IBookingDetailItem {
    index: number;
    bookingId: number;
    sellableConfigId: number;
    qty: number;
    amount: number;
    type: string;
    ssr: any;
    booking: {
        recId: number;
        orderId: number;
        sellableId: number;
        bookingRefId: number;
        sellableConfigId: number;
        configJson: string;
        config: PriceConfig;
        channel: string;
        class: string;
        type: PassengerType;
        quantity: number;
        amount: number;
        status: Status;
        sysFstUser: string;
        sysFstUpdate: string;
        sysLstUser: string;
        sysLstUpdate: string;
        sysBelongTo: string;
        logStatus: string;
        pax: IPassengerInformation;
        paxId: number;
        qty: number;
        ssr: IBookingDetailItem["booking"][];
    };
}

export interface IReservation {
    recId: number;
    bookingOrder: {
        recId: number;
        sellableId: number;
        sellableTemplateId: number;
        custName: string;
        custPhoneNumber: string;
        custEmail: string;
        custAddress: string;
        custInfoJson: string;
        paymentStatus: PaymentStatus;
        totalAmount: number;
        tourPrice: number;
        extraPrice: number;
        totalFop: number;
        totalPaid: number;
        totalRefunded: number;
        charge: number;
        invoiceName: string;
        invoiceCompanyName: string;
        invoiceAddress: string;
        invoiceTaxCode: string;
        invoiceEmail: string;
        rmk: string;
        rmk1: string;
        rmk2: string;
        rmk3: string;
        rmk4: string;
        status: Status;
        sysFstUser: string;
        sysFstUpdate: string;
        sysLstUser: string;
        sysLstUpdate: string;
        sysBelongTo: string;
        logStatus: string;
        template: ITemplateSellable;
        sellable: ISellable & {
            configs: PriceConfig[] | null;
        };
        fops: IFormOfPayment[];
        rulesAndPolicies: IBookingTimeLitmit[];
        referenceId: string;
        referenceName: string;
    };
    bookingDetails: IBookingDetailItem[];
    bookingSsr: any[];
    passengers: IPassengerInformation[];
    ssr: IBookingDetailItem[];
}
export class BookingOrderListQueryParams {
    requestObject?: {
        createdFrom?: string;
        createdTo?: string;
        status?: Status;
    };
    pageCurrent: number;
    pageSize: number;
    constructor(
        requestObject:
            | {
                  createdFrom?: string;
                  createdTo?: string;
                  status?: Status;
              }
            | undefined,
        pageCurrent: number,
        pageSize: number,
    ) {
        this.requestObject = requestObject;
        this.pageCurrent = pageCurrent;
        this.pageSize = pageSize;
    }
}

export interface ReservationRs extends BaseResponse<IReservation> {}
