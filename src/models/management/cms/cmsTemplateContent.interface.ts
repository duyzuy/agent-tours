import { IThumbnail } from "@/models/thumbnail.interface";
import { BaseResponse, Status } from "../../common.interface";
import { LangCode } from "./language.interface";
import { PageContentStatus } from "./pageContent.interface";

export interface ICMSTemplateContentMetaData {
  cat: "cms_template";
  type: "DETAILS_INCLUDE_AND_NOTE";
  content: string;
  metaContent: { title: string; content: string }[];
  status: Status;
  id: number;
  refId: number;
  lang: LangCode;
  slug: string;
}

export interface ICMSTemplateContent {
  id: number;
  cat: "cms_template";
  type: "DETAILS";
  code: string;
  name: string;
  thumbnail: IThumbnail | null;
  downloads: { title: string; link: string }[];
  images: IThumbnail[] | null;
  content: string;
  subContent: string;
  metaData: { key?: string; value?: string; icon?: string }[];
  metaTitle: string;
  metaDescription: string;
  metaKeyword: string;
  publishDate: string;
  status: PageContentStatus;
  includeAndNotes: ICMSTemplateContentMetaData | null;
  itineraries: ICMSTemplateContentMetaData | null;
  slug: string;
  lang: LangCode;
  languages: {
    lang: LangCode;
    name: string;
    slug: string;
    thumb: string;
    metaData: { key: string; value: string; icon: string }[];
  }[];
}

export interface CMSTemplateContentListRs extends BaseResponse<ICMSTemplateContent[]> {}
export interface CMSTemplateContentItemRs extends BaseResponse<ICMSTemplateContent> {}
export interface CMSTemplateContentMetaDataRs extends BaseResponse<ICMSTemplateContentMetaData> {}

export interface CMSTemplateContentPayload {
  id?: number;
  code?: string;
  name?: string;
  thumbnail?: Partial<IThumbnail>;
  downloads?: { title: string; link: string }[];
  images?: Partial<IThumbnail>[];
  content?: string;
  subContent?: string;
  metaData?: {
    key?: string;
    value?: string;
    icon?: string;
  }[];
  metaTitle?: string;
  metaDescription?: string;
  metaKeyword?: string;
  publishDate?: string;
  status?: PageContentStatus;
  slug?: string;
  lang?: LangCode;
}
export interface CMSTemplateContentMetaDataPayload {
  id?: number;
  refId?: number;
  content?: string;
  metaContent: { title?: string; content?: string }[];
  status?: PageContentStatus;
  lang?: LangCode;
}

export class CMSTemplateContentMinimalQueryParams {
  pageCurrent?: number;
  pageSize?: number;
  requestObject?: {
    status?: PageContentStatus;
    lang?: LangCode;
  };
  orderBy: {
    sortColumn: "id" | "slug";
    direction: "asc" | "desc";
  };
  constructor(
    requestObject:
      | {
          status?: PageContentStatus;
          lang?: LangCode;
        }
      | undefined,
    pageCurrent: number | undefined,
    pageSize: number | undefined,
    orderBy: {
      sortColumn: "id" | "slug";
      direction: "asc" | "desc";
    },
  ) {
    this.pageCurrent = pageCurrent;
    this.pageSize = pageSize;
    this.requestObject = requestObject;
    this.orderBy = orderBy;
  }
}

export interface ICMSTemplateContentMinimal {
  id: number;
  code: string;
  name: string;
  thumbnail: IThumbnail;
  slug: string;
}

export interface CMSTemplateContentMinimalListRs extends BaseResponse<ICMSTemplateContentMinimal[]> {}
