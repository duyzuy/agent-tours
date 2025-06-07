import dayjs from "dayjs";
import { PortalBookingServiceFormData } from "./bookingService.type";
import { MONTH_FORMAT } from "@/constants/common";
import { ESellChannel } from "@/constants/channel.constant";
import { SearchProductExtraFormData } from "@/modules/admin/booking/searchProduct.interface";
import { PortalBookingServiceActions } from "./bookingServiceAction";

const initSearchFormData = new SearchProductExtraFormData(dayjs().locale("en").format(MONTH_FORMAT), undefined, [], []);
const initPortalBookingServices = new PortalBookingServiceFormData(
  {
    bookingSsr: [],
    customerInformation: undefined,
    invoiceInfo: undefined,
    product: undefined,
  },
  initSearchFormData,
  [],
  undefined,
  ESellChannel.B2B,
  undefined,
);

const portalBookingServiceReducer = (
  state: PortalBookingServiceFormData,
  action: PortalBookingServiceActions,
): PortalBookingServiceFormData => {
  switch (action.type) {
    case "INIT_SERVICE_LIST": {
      const serviceList = action.payload;

      return {
        ...state,
        serviceList: [...serviceList],
      };
    }
    case "SET_SEARCH_PRODUCT_EXTRA_INFO": {
      const searchBookingInfo = action.payload;

      return {
        ...state,
        searchBooking: searchBookingInfo,
      };
    }

    case "SET_SEARCH_PRODUCT_EXTRA_INFO": {
      const searchBookingInfo = action.payload;

      return {
        ...state,
        searchBooking: searchBookingInfo,
      };
    }

    case "SELECT_SERVICES_FARE_CLASS": {
      const { product, channel, configItems } = action.payload;

      return {
        ...state,
        bookingInfo: {
          product: product,
          bookingSsr: configItems,
        },
        channel,
      };
    }

    default:
      return state;
  }
};
export { initPortalBookingServices, portalBookingServiceReducer, initSearchFormData };
