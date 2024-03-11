import { Status } from "@/models/management/common.interface";

interface IBookingOrderCustomerPayload {
    recId?: number;
    custName?: string;
    custPhoneNumber?: string;
    custEmail?: string;
    custAddress?: string;
    custInfoJson?: string;
    rmk?: string;
    status?: Status;
}

export class BookingOrderCustomerFormData
    implements IBookingOrderCustomerPayload
{
    recId?: number;
    custName?: string;
    custPhoneNumber?: string;
    custEmail?: string;
    custAddress?: string;
    custInfoJson?: string;
    rmk?: string;
    status?: Status;
    constructor(
        recId: number,
        custName: string,
        custPhoneNumber: string,
        custEmail: string,
        custAddress: string,
        custInfoJson: string,
        rmk: string,
        status: Status,
    ) {
        this.recId = recId;
        this.custName = custName;
        this.custPhoneNumber = custPhoneNumber;
        this.custEmail = custEmail;
        this.custAddress = custAddress;
        this.custInfoJson = custInfoJson;
        this.rmk = rmk;
        this.status = status;
    }
}

interface IBookingOrderPassengerPayload {
    recId?: number;
    bookingRefId?: number;
    pax: {
        recId?: number;
        paxTitle?: string;
        paxLastname?: string;
        paxMiddleFirstName?: string;
        paxGender?: string;
        paxBirthDate?: string;
        paxBirthYear?: number;
        paxPhoneNumber?: string;
        paxAddress?: string;
        paxIdNumber?: string;
        paxNationality?: string;
        paxPassportNumber?: string;
        paxPassortExpiredDate?: string;
        paxInfoJson?: string;
    };
}

export class BookingOrderPassengerFormData {
    recId?: number;
    paxTitle?: string;
    paxLastname?: string;
    paxMiddleFirstName?: string;
    paxGender?: string;
    paxBirthDate?: string;
    paxBirthYear?: number;
    paxPhoneNumber?: string;
    paxAddress?: string;
    paxIdNumber?: string;
    paxNationality?: string;
    paxPassportNumber?: string;
    paxPassortExpiredDate?: string;
    paxInfoJson?: string;
    constructor(
        recId: number | undefined,
        paxTitle: string | undefined,
        paxLastname: string | undefined,
        paxMiddleFirstName: string | undefined,
        paxGender: string | undefined,
        paxBirthDate: string | undefined,
        paxBirthYear: number | undefined,
        paxPhoneNumber: string | undefined,
        paxAddress: string | undefined,
        paxIdNumber: string | undefined,
        paxNationality: string | undefined,
        paxPassportNumber: string | undefined,
        paxPassortExpiredDate: string | undefined,
        paxInfoJson: string | undefined,
    ) {
        this.recId = recId;
        this.paxTitle = paxTitle;
        this.paxLastname = paxLastname;
        this.paxMiddleFirstName = paxMiddleFirstName;
        this.paxGender = paxGender;
        this.paxBirthDate = paxBirthDate;
        this.paxBirthYear = paxBirthYear;
        this.paxPhoneNumber = paxPhoneNumber;
        this.paxAddress = paxAddress;
        this.paxIdNumber = paxIdNumber;
        this.paxNationality = paxNationality;
        this.paxPassportNumber = paxPassportNumber;
        this.paxPassortExpiredDate = paxPassortExpiredDate;
        this.paxInfoJson = paxInfoJson;
    }
}

export interface IBookingOrderCustomerAndPassengerPayload {
    bookingOrder?: IBookingOrderCustomerPayload;
    bookingDetails?: { booking: IBookingOrderPassengerPayload }[];
}
