import { SearchBookingFormData } from "../searchBooking.interface";
import { PortalBookingServiceFormData } from "../bookingInformation.interface";
import dayjs from "dayjs";
import { MONTH_FORMAT } from "@/constants/common";
import { ESellChannel } from "@/constants/channel.constant";
const initSearchFormData = new SearchBookingFormData(dayjs().locale("en").format(MONTH_FORMAT), undefined, [], [], []);

const initPortalBookingServiceManagerState = new PortalBookingServiceFormData(
  {
    bookingSsr: [],
    customerInformation: undefined,
    invoiceInfo: undefined,
    product: undefined,
  },
  {
    byCode: undefined,
    byDest: undefined,
    byInventoryType: undefined,
    byMonth: undefined,
    byProductType: undefined,
  },
  [],
  [],
  undefined,
  ESellChannel.B2B,
  undefined,
);

const portalBookingServiceReducer = (state: any, action: any) => {
  return state;
};
export { initPortalBookingServiceManagerState, portalBookingServiceReducer, initSearchFormData };
