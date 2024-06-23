import { VendorPayload } from "@/models/management/vendor.interface";
import { Status } from "@/models/common.interface";
import { EInventoryType } from "@/models/management/core/inventoryType.interface";

export class VendorFormData {
    recId?: number;
    shortName?: string;
    typeList: EInventoryType[];
    fullName?: string;
    contact?: string;
    address?: string;
    email?: string;
    taxCode?: string;
    rmk?: string;
    bankName?: string;
    bankAccountNumber?: string;
    bankAddress?: string;
    paymentType: "CASH";
    createDefaultSupplier: boolean;
    status: Status;

    constructor(
        recId: number | undefined,
        shortName: string | undefined,
        typeList: EInventoryType[],
        fullName: string | undefined,
        contact: string | undefined,
        address: string | undefined,
        email: string | undefined,
        taxCode: string | undefined,
        rmk: string | undefined,
        bankName: string | undefined,
        bankAccountNumber: string | undefined,
        bankAddress: string | undefined,
        paymentType: "CASH",
        createDefaultSupplier: boolean,
        status: Status | undefined,
    ) {
        this.recId = recId;
        this.shortName = shortName;
        this.typeList = typeList;
        this.fullName = fullName;
        this.contact = contact;
        this.address = address;
        this.email = email;
        this.taxCode = taxCode;
        this.rmk = rmk;
        this.bankName = bankName;
        this.bankAccountNumber = bankAccountNumber;
        this.bankAddress = bankAddress;
        this.paymentType = paymentType;
        this.createDefaultSupplier = createDefaultSupplier;
        this.status = status ? status : Status.OK;
    }
}
