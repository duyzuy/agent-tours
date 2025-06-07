import { ESellChannel } from "@/constants/channel.constant";
import { IProductService } from "@/models/management/booking/product.interface";
import { SearchProductExtraFormData } from "@/modules/admin/booking/searchProduct.interface";
import { PortalBookingServiceFormData } from "./bookingService.type";

export type PortalBookingServiceActions =
  | {
      type: "INIT_SERVICE_LIST";
      payload: IProductService[];
    }
  | {
      type: "SET_SEARCH_PRODUCT_EXTRA_INFO";
      payload: SearchProductExtraFormData;
    }
  | {
      type: "SELECT_PRODUCT_EXTRA_QUANTITY";
      payload: SearchProductExtraFormData;
    }
  | {
      type: "SELECT_SERVICES_FARE_CLASS";
      payload: {
        product: IProductService;
        channel: ESellChannel;
        configItems: PortalBookingServiceFormData["bookingInfo"]["bookingSsr"];
      };
    };
