import { SearchBookingFormData } from "./searchBooking.interface";
import { PassengerType } from "@/models/management/common.interface";
import { CustomerInformation } from "@/models/management/booking/customer.interface";
import { IProductItem } from "@/models/management/booking/productItem.interface";
import { IReservation } from "@/models/management/booking/reservation.interface";
export interface PassengerSelectedItem {
    item: IProductItem["configs"][0];
    quantity: number;
    type: PassengerType;
}

export class BookingInfo {
    product?: IProductItem;
    passengerSelections?: PassengerSelectedItem[];
    customerInformation?: CustomerInformation;
    rmk?: string;
    constructor(
        product: IProductItem | undefined,
        passengerSelections: PassengerSelectedItem[] | undefined,
        customerInformation: CustomerInformation | undefined,
        rmk: string | undefined,
    ) {
        this.product = product;
        this.passengerSelections = passengerSelections;
        this.customerInformation = customerInformation;
        this.rmk = rmk;
    }
}

export class BookingInformation {
    bookingInfo?: BookingInfo;
    searchBooking?: SearchBookingFormData;
    productList?: IProductItem[];
    reservation?: IReservation;

    constructor(
        bookingInfo: BookingInfo | undefined,
        searchBooking: SearchBookingFormData | undefined,
        productList: IProductItem[],
        reservation: IReservation | undefined,
    ) {
        this.bookingInfo = bookingInfo;
        this.searchBooking = searchBooking;
        this.productList = productList;
        this.reservation = reservation;
    }
}
