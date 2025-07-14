import { ESellChannel } from "@/constants/channel.constant";
import { IProductService } from "@/models/management/booking/product.interface";
import { SearchProductFormData } from "@/modules/admin/booking/searchProduct.interface";
import { PortalBookingServiceFormData } from "./bookingService.type";
import { ReservationRs } from "@/models/management/booking/reservation.interface";

export type PortalBookingServiceActions =
  | {
      type: "INIT_SERVICE_LIST";
      payload: IProductService[];
    }
  | {
      type: "SET_SEARCH_PRODUCT_EXTRA_INFO";
      payload: SearchProductFormData;
    }
  | {
      type: "SELECT_PRODUCT_EXTRA_QUANTITY";
      payload: SearchProductFormData;
    }
  | {
      type: "SELECT_SERVICES_FARE_CLASS";
      payload: {
        product: IProductService;
        channel: ESellChannel;
        configItems: PortalBookingServiceFormData["bookingInfo"]["bookingSsr"];
      };
    }
  | {
      type: "SET_RESERVATION";
      payload: {
        customerInformation: PortalBookingServiceFormData["bookingInfo"]["customerInformation"];
        reservation: ReservationRs["result"];
      };
    };
