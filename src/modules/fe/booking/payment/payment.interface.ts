import { CustomerInformation } from "@/models/management/booking/customer.interface";
import { IInvoice } from "@/models/management/booking/invoice.interface";
import { InvoiceFormData } from "@/models/management/booking/invoice.interface";

export class FeInvoiceFormData extends InvoiceFormData {}
export class FeCustomerInformationFormData extends CustomerInformation {}
export interface IPaymentInformation {
  customerInformation: FeCustomerInformationFormData;
  invoice: FeInvoiceFormData;
}
