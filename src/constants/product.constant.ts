import { EVendorPaymentType } from "@/models/management/vendor.interface";

export const VENDOR_PAYMENT_TYPES = [
  { label: EVendorPaymentType.CASH, value: EVendorPaymentType.CASH },
  { label: EVendorPaymentType.POSTPAID, value: EVendorPaymentType.POSTPAID },
  { label: EVendorPaymentType.PREPAID, value: EVendorPaymentType.PREPAID },
];
