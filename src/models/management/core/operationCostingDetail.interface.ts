import { BaseResponse } from "@/models/common.interface";
import { RoomingType } from "../booking/rooming.interface";
import { EInventoryType, EStockType } from "./inventoryType.interface";
import { ISellable } from "./sellable.interface";
import { ITemplateSellable } from "./templateSellable.interface";
import { InventoryStockTypes } from "@/constants/inventory.constant";

export interface OperationCostingParams {
  supplierId: number;
  type: EInventoryType; //INVENTORYTYPE: AIR VISA HOTEL GUIDE TRANSPORT RESTAURANT LANDPACKAGE INSURANCE
}
interface BaseCostingDetail {
  specialRequest?: string;
  remark?: string;
}

export interface AirCostingDetail extends BaseCostingDetail {
  classOfService?: string;
  tripType?: "ONEWAY" | "ROUNDTRIP" | "MULTICITY";
  adult?: number;
  child?: number;
  infant?: number;
  fullItinerary?: string;
  departureDate?: string;
  arrivalDate?: string;
}

export interface HotelCostingDetail extends BaseCostingDetail {
  roomType?: RoomingType;
  quantity?: number;
  checkIn?: string;
  checkOut?: string;
}

export interface TransportCostingDetail extends BaseCostingDetail {
  carType?: string;
  carModel?: string;
  quantity?: number;
  pickUpDate?: string;
  pickUpLocation?: string;
  dropOffLocation?: string;
}

export interface GuideCostingDetail extends BaseCostingDetail {
  guideType?: "DOMESTIC" | "OUTBOUND" | "INBOUND";
  quantity?: number;
  destination?: string;
}

export interface VisaCostingDetail extends BaseCostingDetail {}
export interface InsuranceCostingDetail extends BaseCostingDetail {}

export type OperationCostingDetailAir = {
  type?: InventoryStockTypes["AIR"];
  details?: AirCostingDetail;
};

export type OperationCostingDetailHotel = {
  type?: InventoryStockTypes["HOTEL"];
  details?: HotelCostingDetail;
};

export type OperationCostingDetailGuide = {
  type?: InventoryStockTypes["GUIDE"];
  details?: GuideCostingDetail;
};

export type OperationCostingDetailInsurance = {
  type?: InventoryStockTypes["INSURANCE"];
  details?: InsuranceCostingDetail;
};

export type OperationCostingDetailLandPackage = {
  type?: InventoryStockTypes["LANDPACKAGE"];
  details?: { [key: string]: any };
};

export type OperationCostingDetailRestaurance = {
  type?: InventoryStockTypes["RESTAURANT"];
  details?: { [key: string]: any };
};

export type OperationCostingDetailTransport = {
  type?: InventoryStockTypes["TRANSPORT"];
  details?: TransportCostingDetail;
};

export type OperationCostingDetailVisa = {
  type?: InventoryStockTypes["VISA"];
  details?: VisaCostingDetail;
};

export type OperationCostingDetailPayload =
  | (OperationCostingDetailAir & {
      costingId?: number;
      paymentQuantity?: number;
      amount?: number;
    })
  | (OperationCostingDetailHotel & {
      costingId?: number;
      paymentQuantity?: number;
      amount?: number;
    })
  | (OperationCostingDetailGuide & {
      costingId?: number;
      paymentQuantity?: number;
      amount?: number;
    })
  | (OperationCostingDetailInsurance & {
      costingId?: number;
      paymentQuantity?: number;
      amount?: number;
    })
  | (OperationCostingDetailLandPackage & {
      costingId?: number;
      paymentQuantity?: number;
      amount?: number;
    })
  | (OperationCostingDetailRestaurance & {
      costingId?: number;
      paymentQuantity?: number;
      amount?: number;
    })
  | (OperationCostingDetailTransport & {
      costingId?: number;
      paymentQuantity?: number;
      amount?: number;
    })
  | (OperationCostingDetailVisa & {
      costingId?: number;
      paymentQuantity?: number;
      amount?: number;
    });

type BaseDetailType = {
  id: number;
  costingId: number;
  supplierId: number;
  operationId: number;
  sellableId: number;
  sellableCode: string;
  paymentQuantity: number;
  amount: number;
  totalAmount: number;
  isLocked: boolean;
  lockedUpdate: string | null;
  isFinalized: boolean;
  finalizedUpdate: string | null;
  status: "NEW" | "DONE";
};
export type AirDetailType = {
  type: EStockType.AIRTICKET | EStockType.INSURANCE | EStockType.OTHER;
  details: {
    classOfService: string;
    tripType: "ONEWAY" | "ROUNDTRIP" | "MULTICITY";
    adult: number;
    child: number;
    infant: number;
    fullItinerary: string;
    departureDate: string;
    arrivalDate: string;
    specialRequest: string;
    remark: string;
  } | null;
};
export type VisaDetailType = {
  type: EStockType.VISASERVICES | EStockType.OTHER;
  details: {
    specialRequest: string;
    remark: string;
  } | null;
};
export type LandPackageDetailType = {
  type: EStockType.PACKAGE | EStockType.TOURPACKAGE | EStockType.GUIDE | EStockType.OTHER;
  details: {
    specialRequest: string;
    remark: string;
  } | null;
};
export type GuideDetailType = {
  type: EStockType.OTHER;
  details: {
    guideType: "DOMESTIC" | "OUTBOUND" | "INBOUND";
    destination: string;
    quantity: number;
    specialRequest: string;
    remark: string;
  } | null;
};
export type HotelDetailType = {
  type: EStockType.ROOM | EStockType.OTHER;
  details: {
    roomType: RoomingType;
    checkIn: string;
    checkOut: string;
    quantity: number;
    specialRequest: string;
    remark: string;
  } | null;
};
export type RestaurantDetailType = {
  type: EStockType.TABLE | EStockType.OTHER;
  details: {
    guideType: "DOMESTIC" | "OUTBOUND" | "INBOUND";
    destination: string;
    quantity: number;
    specialRequest: string;
    remark: string;
  } | null;
};
export type TransportDetailType = {
  type: EStockType.CRUISE | EStockType.VEHICLE | EStockType.OTHER;
  details: {
    pickUpDate: string;
    pickUpLocation: string;
    dropOffLocation: string;
    quantity: number;
    carType: string;
    carModel: string;
    specialRequest: string;
    remark: string;
  } | null;
};
export type InsuranceDetailType = {
  type: EStockType.OTHER;
  details: {
    specialRequest: string;
    remark: string;
  } | null;
};

export type ICostingDetailItem<T = void> = T & BaseDetailType;

export interface IOperationCostingDetail {
  id: number;
  type: EInventoryType;
  supplierId: number;
  operationId: number;
  sellableId: number;
  sellableCode: string;
  totalCost: number;
  status: "NEW" | "DONE";
  sellableMinimal: Pick<
    ISellable,
    | "recId"
    | "sellableTemplateId"
    | "type"
    | "code"
    | "cap"
    | "open"
    | "used"
    | "avaiable"
    | "closeDate"
    | "validFrom"
    | "validTo"
    | "startDate"
    | "endDate"
  > & {
    sellableTemplateCode: null;
    configs: null;
    sellableDetails: null;
    promotions: null;
  };
  templateMinimal: Pick<ITemplateSellable, "recId" | "cmsIdentity" | "type" | "code" | "name" | "inventoryTypeList"> & {
    cms: null;
    sellables: null;
    cmsMustKnow: null;
  };
  details: ICostingDetailItem<
    | AirDetailType
    | RestaurantDetailType
    | InsuranceDetailType
    | VisaDetailType
    | GuideDetailType
    | HotelDetailType
    | LandPackageDetailType
    | TransportDetailType
  >[];
}

export interface OperationCostingListDetailResponse extends BaseResponse<IOperationCostingDetail> {}
