import { Status } from "../common.interface";
import { BaseResponse } from "../common.interface";
import { LangCode } from "../management/cms/language.interface";
import { ILocalSearchDestination } from "../management/localSearchDestination.interface";
import { IThumbnail } from "../thumbnail.interface";

export interface FeDestinationSearchConfig {
  id: number;
  cat: "SEARCHCONFIG_LIST";
  name: string;
  engName: string;
  keyType: string;
  regionKey: string;
  subRegionKey: string;
  countryKey: string;
  stateProvinceKey: string;
  order: number;
  status: Status;
}

export interface FeDestinationSearchConfigResponse extends BaseResponse<FeDestinationSearchConfig[]> {}

/**
 *
 * destination content
 */

export class FeDestinationContentQueryParams {
  requestObject?: {
    lang: LangCode;
  };
  pageCurrent?: number;
  pageSize?: number;

  orderBy?: {
    sortColumn: string;
    direction: "desc" | "asc";
  };
  constructor(
    requestObject:
      | {
          lang: LangCode;
        }
      | undefined,
    pageCurrent: number | undefined,
    pageSize: number | undefined,
    orderBy:
      | {
          sortColumn: string;
          direction: "desc" | "asc";
        }
      | undefined,
  ) {
    this.requestObject = requestObject;
    this.pageCurrent = pageCurrent;
    this.pageSize = pageSize;
    this.orderBy = orderBy;
  }
}
export interface FeDestinationContentItem {
  id: number;
  codeKey: string;
  title: string;
  shortDescriptions: string;
  thumbnail: IThumbnail | null;
  slug: string;
  lang: LangCode;
  status: Status;
}
export interface FeDestinationContentListResponse extends BaseResponse<FeDestinationContentItem[]> {}

export interface FeDestinationContentDetail {
  cat: string;
  type: string;
  id: number;
  codeKey: string;
  title: string;
  descriptions: string;
  shortDescriptions: string;
  thumbnail: IThumbnail | null;
  images: IThumbnail[] | null;
  metaTitle: string;
  metaDescription: string;
  metaKeyword: string;
  slug: string;
  lang: LangCode;
  status: Status;
  searchConfigs: ILocalSearchDestination[];
  languages: { lang: LangCode; slug: string; title: string }[];
}
export interface FeDestinationContentDetailResponse extends BaseResponse<FeDestinationContentDetail> {}
