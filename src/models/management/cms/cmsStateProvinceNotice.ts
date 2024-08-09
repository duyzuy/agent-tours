import { BaseResponse } from "@/models/common.interface";
import { PageContentStatus } from "./pageContent.interface";
import { LangCode } from "./language.interface";

export interface ITravelInformationNotice {
  id: number;
  originId: number;
  cat: "cms_travelinfo_mustknow";
  name: string;
  descriptions: string;
  status: PageContentStatus;
  country: {
    keyType: "REGIONLIST" | "SUBREGIONLIST" | "COUNTRYLIST" | "STATEPROVINCELIST";
    regionKey: string;
    subRegionKey: string;
    countryKey: string;
    stateProvinceKey: string;
  };
  lang: LangCode;
  languages: { id: number; lang: LangCode; name: string; originId: number; status: PageContentStatus }[];
}

export interface TravelInformationNoticePayload {
  id?: number;
  originId?: number;
  name?: string;
  descriptions?: string;
  status?: PageContentStatus;
  lang?: LangCode;
  country?: {
    keyType?: "REGIONLIST" | "SUBREGIONLIST" | "COUNTRYLIST" | "STATEPROVINCELIST";
    regionKey?: string;
    subRegionKey?: string;
    countryKey?: string;
    stateProvinceKey?: string;
  };
}
export class TravelInformationNoticeQueryParams {
  requestObject?: { [key: string]: any };
  pageCurrent?: number;
  pageSize?: number;
  constructor(
    requestObject: { [key: string]: any } | undefined,
    pageCurrent: number | undefined,
    pageSize: number | undefined,
  ) {
    this.requestObject = requestObject;
    this.pageCurrent = pageCurrent;
    this.pageSize = pageSize;
  }
}
export interface TravelInformationNoticeListResponse extends BaseResponse<ITravelInformationNotice[]> {}
export interface TravelInformationNoticeResponse extends BaseResponse<ITravelInformationNotice> {}
