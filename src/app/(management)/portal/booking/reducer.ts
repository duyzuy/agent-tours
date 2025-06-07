import { PortalBookingInformation } from "./modules/bookingInformation.interface";
import { SearchBookingFormData } from "./modules/searchBooking.interface";
import { PortalBookingManagerFormData } from "./modules/bookingInformation.interface";
import dayjs from "dayjs";
import { MONTH_FORMAT } from "@/constants/common";
import { ESellChannel } from "@/constants/channel.constant";
const initSearchFormData = new SearchBookingFormData(dayjs().locale("en").format(MONTH_FORMAT), undefined, [], []);
const initPortalBookingInformation = new PortalBookingInformation(undefined, [], undefined, undefined, [], []);

const initPortalBookingManagerState = new PortalBookingManagerFormData(
  initPortalBookingInformation,
  { adult: [], child: [], infant: [] },
  initSearchFormData,
  [],
  [],
  undefined,
  ESellChannel.B2B,
  undefined,
);

const portalBookingReducer = (state: any, action: any) => {
  return state;
};
export { initPortalBookingManagerState, portalBookingReducer, initSearchFormData, initPortalBookingInformation };
