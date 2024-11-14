import { Status } from "@/models/common.interface";
import { EInventoryType } from "@/models/management/core/inventoryType.interface";
import { EVendorPaymentType, IVendor } from "@/models/management/vendor.interface";

export class SupplierFormData {
  recId?: number;
  vendorId?: number;
  shortName?: string;
  fullName?: string;
  contact?: string;
  address?: string;
  email?: string;
  taxCode?: string;
  typeList?: EInventoryType[];
  rmk?: string;
  bankName?: string;
  bankAccountNumber?: string;
  bankAddress?: string;
  bankSwiftcode?: string;
  paymentTerm?: string;
  paymentType?: EVendorPaymentType;
  status: Status;

  constructor(
    recId: number | undefined,
    vendorId: number | undefined,
    typeList: EInventoryType[] | undefined,
    shortName: string | undefined,
    fullName: string | undefined,
    contact: string | undefined,
    address: string | undefined,
    email: string | undefined,
    taxCode: string | undefined,
    rmk: string | undefined,
    bankName: string | undefined,
    bankAccountNumber: string | undefined,
    bankAddress: string | undefined,
    bankSwiftcode: string | undefined,
    paymentTerm: string | undefined,
    paymentType: EVendorPaymentType,
    status: Status | undefined,
  ) {
    this.recId = recId;
    this.vendorId = vendorId;
    this.shortName = shortName;
    this.fullName = fullName;
    this.contact = contact;
    this.address = address;
    this.email = email;
    this.taxCode = taxCode;
    this.rmk = rmk;
    this.bankName = bankName;
    this.bankAccountNumber = bankAccountNumber;
    this.bankAddress = bankAddress;
    this.bankSwiftcode = bankSwiftcode;
    this.paymentTerm = paymentTerm;
    this.paymentType = paymentType;
    this.typeList = typeList;
    this.status = status ? status : Status.OK;
  }
}
