import { BaseQueryParams, BaseResponse } from "../common.interface";

export interface ILocalSeachDestination {
  id: number;
  cat: string;
  name: string;
  engName: string;
  keyType: string;
  regionKey: string;
  subRegionKey: string;
  countryKey: string;
  stateProvinceKey: string;
  order: number;
  status: "OK" | "OX" | "XX";
}
export interface LocalSearchDestinationListRs extends BaseResponse<ILocalSeachDestination[]> {}

export interface LocalSearchPayload {
  name?: string;
  engName?: string;
  regionKey?: string;
  keyType?: string;
  subRegionKey?: string;
  countryKey?: string;
  stateProvinceKey?: string;
  order?: number;
  status?: "OK" | "OX" | "XX";
}
export class LocalSearchFormData implements LocalSearchPayload {
  name?: string;
  engName?: string;
  regionKey?: string;
  keyType?: string;
  subRegionKey?: string;
  countryKey?: string;
  stateProvinceKey?: string;
  order?: number;
  status: "OK" | "OX" | "XX";

  constructor(
    name: string | undefined,
    engName: string | undefined,
    regionKey: string | undefined,
    subRegionKey: string | undefined,
    countryKey: string | undefined,
    keyType: string | undefined,
    stateProvinceKey: string | undefined,
    order: number | undefined,
    status: "OK" | "OX",
  ) {
    this.name = name;
    this.engName = engName;
    this.regionKey = regionKey;
    this.subRegionKey = subRegionKey;
    this.keyType = keyType;
    this.countryKey = countryKey;
    this.stateProvinceKey = stateProvinceKey;
    this.order = order;
    this.status = status;
  }
}

export class LocalSearchQueryParams
  implements
    BaseQueryParams<{
      recId?: number;
      regionKey?: string;
      subRegionKey?: string;
      countryKey?: string;
      stateProvinceKey?: string;
      status?: "OK" | "OX" | "XX";
    }>
{
  requestObject?:
    | {
        recId?: number;
        regionKey?: string;
        subRegionKey?: string;
        countryKey?: string;
        stateProvinceKey?: string;
        status?: "OK" | "OX" | "XX";
      }
    | undefined;
  pageCurrent?: number | undefined;
  pageSize?: number | undefined;
  orderBy?: { sortColumn?: string; direction?: "asc" | "desc" } | undefined;
  constructor(
    requestObject:
      | {
          recId?: number;
          regionKey?: string;
          subRegionKey?: string;
          countryKey?: string;
          stateProvinceKey?: string;
          status?: "OK" | "OX" | "XX";
        }
      | undefined,
    pageCurrent: number | undefined,
    pageSize: number | undefined,
    orderBy: { sortColumn?: string; direction?: "asc" | "desc" } | undefined,
  ) {
    this.requestObject = requestObject;
    this.pageCurrent = pageCurrent;
    this.pageSize = pageSize;
    this.orderBy = orderBy;
  }
}
