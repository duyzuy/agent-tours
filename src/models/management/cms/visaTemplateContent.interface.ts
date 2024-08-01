import { IThumbnail } from "@/models/thumbnail.interface";
import { BaseResponse, Status } from "../../common.interface";
import { LangCode } from "./language.interface";
import { PageContentStatus } from "./pageContent.interface";

export interface IVisatemplateContentMetaData {
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

export interface IVisaTemplateContent {
  id: number;
  cat: "cms_visatemplate";
  type: "DETAILS";
  code: string;
  codeImage: IThumbnail | null;
  codeName: string;
  name: string;
  thumbnail: IThumbnail | null;
  amount: number;
  downloads: { title: string; link: string }[];
  content: string;
  subContent: string;
  metaData: { key: string; value: string; icon: string }[];
  metaTitle: string;
  metaDescription: string;
  metaKeyword: string;
  publishDate: string;
  status: PageContentStatus;
  slug: string;
  lang: LangCode;
  languages: {
    lang: LangCode;
    name: string;
    slug: string;
    thumbnail: IThumbnail;
    metaData: { key: string; value: string; icon: string }[];
  }[];
  visaContent: {
    cat: "cms_visatemplate";
    type: "CONTENT";
    content: string;
    metaContent: any[];
    status: string;
    id: number;
    refId: number;
    lang: string;
    slug: string;
  } | null;
}
export interface IVisaTemplateContentMinimal {
  id: number;
  code: string;
  name: string;
  thumbnail: IThumbnail;
  slug: string;
}
export class VisaTemplateContentMinimalQueryParams {
  requestObject?: {
    status?: PageContentStatus;
    lang?: LangCode;
  };
  pageCurrent?: number;
  pageSize?: number;
  orderBy?: {
    sortColumn: "id" | "slug";
    direction: "asc" | "desc";
  };
  constructor(
    requestObject:
      | {
          status: PageContentStatus;
          lang: LangCode;
        }
      | undefined,
    pageCurrent: number | undefined,
    pageSize: number | undefined,
    orderBy:
      | {
          sortColumn: "id" | "slug";
          direction: "asc" | "desc";
        }
      | undefined,
  ) {
    this.requestObject = requestObject;
    this.pageCurrent = pageCurrent;
    this.pageSize = pageSize;
    this.orderBy = orderBy;
  }
}

export interface VisaTemplateContentMinimalListResponse extends BaseResponse<IVisaTemplateContentMinimal[]> {}
export interface VisaTemplateContentListResponse extends BaseResponse<IVisaTemplateContent[]> {}
export interface VisaTemplateContentResponse extends BaseResponse<IVisaTemplateContent> {}

export interface VisaTemplateContentMetaDataResponse extends BaseResponse<IVisatemplateContentMetaData> {}

export interface VisaTemplateContentPayload {
  id?: number;
  code?: string;
  name?: string;
  thumbnail?: Partial<IThumbnail>;
  downloads?: { title: string; link: string }[];
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
export interface VisaTemplateContentMetaBlockPayload {
  id?: number;
  refId?: number;
  content?: string;
  metaContent: { title?: string; content?: string }[];
}
