import { EInventoryType } from "../management/core/inventoryType.interface";
import { EProductType } from "../management/core/productType.interface";
import { FeDestinationSearchConfig } from "./destination.interface";

export interface FeSearchTourPayload {
  byCode?: string;
  byDest?: {
    countryKey: string;
    stateProvinceKey: string;
    keyType: string;
    regionKey: string;
    subRegionKey: string;
  }[];
  byInventoryType?: EInventoryType[];
  byMonth?: string;
  byProductType: EProductType[];
  byTemplateCode?: string;
  byTemplateCmsIdentity?: string;
}

export class FeSearchTourQueryParams {
  requestObject?: FeSearchTourPayload;
  pageCurrent?: number;
  pageSize?: number;
  constructor(
    requestObject: FeSearchTourPayload | undefined,
    pageCurrent?: number | undefined,
    pageSize?: number | undefined,
  ) {
    (this.requestObject = requestObject), (this.pageCurrent = pageCurrent);
    this.pageSize = pageSize;
  }
}

/**
 * using for search form
 */
export class FeSearchProductFormData implements FeSearchTourPayload {
  byCode?: string;
  byDest?: FeDestinationSearchConfig[];
  byInventoryType?: EInventoryType[];
  byMonth?: string;
  byProductType: EProductType[];
  byTemplateCode?: string;
  byTemplateCmsIdentity?: string;

  constructor(
    byCode: string | undefined,
    byDest: FeDestinationSearchConfig[] | undefined,
    byInventoryType: EInventoryType[] | undefined,
    byMonth: string | undefined,
    byProductType: EProductType[],
    byTemplateCode: string | undefined,
    byTemplateCmsIdentity: string | undefined,
  ) {
    this.byCode = byCode;
    this.byDest = byDest;
    this.byInventoryType = byInventoryType;
    this.byMonth = byMonth;
    this.byProductType = byProductType;
    this.byTemplateCode = byTemplateCode;
    this.byTemplateCmsIdentity = byTemplateCmsIdentity;
  }
}
