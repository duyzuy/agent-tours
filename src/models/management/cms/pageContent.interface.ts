import { IThumbnail } from "@/models/thumbnail.interface";
import { BaseResponse } from "../../common.interface";
import { LangCode } from "./language.interface";
export enum PageContentStatus {
  PUBLISH = "publish",
  PENDING = "pending",
  UNPUBLISH = "unpublish",
}
export interface IPageContentItem {
  id: number;
  originId: number;
  lang: LangCode;
  name: string;
  slug: string;
  excerpt: string;
  thumbnail: IThumbnail | null;
  status: PageContentStatus;
  languages: IPageContentItem[];
  children: IPageContentItem[];
}

export interface IPageContentDetail {
  cat: string;
  id: number;
  originId: number;
  name: string;
  slug: string;
  excerpt: string;
  thumbnail: IThumbnail | null;
  heroBanner: string;
  descriptions: string;
  parentId: number;
  templateId: string;
  lang: LangCode;
  metaTitle: string;
  metaDescription: string;
  metaKeyword: string;
  publishDate: string;
  status: PageContentStatus;
  children: IPageContentDetail[];
  languages: { lang: LangCode; slug: string }[];
}

export interface IPageContentPayload {
  id?: number;
  originId?: number;
  name?: string;
  slug?: string;
  excerpt?: string;
  thumbnail?: Partial<IThumbnail>;
  heroBanner?: string;
  descriptions?: string;
  parentId?: number;
  templateId?: string;
  lang?: LangCode;
  metaTitle?: string;
  metaDescription?: string;
  metaKeyword?: string;
  publishDate?: string;
  status?: PageContentStatus;
}
export class PageContentQueryParams {
  requestObject?: {
    lang: LangCode;
    excludes?: number[];
  };
  pageCurrent?: number;
  pageSize?: number;
  constructor(
    requestObject:
      | {
          lang: LangCode;
          excludes: number[] | undefined;
        }
      | undefined,
    pageCurrent: number,
    pageSize: number,
  ) {
    this.requestObject = requestObject;
    this.pageCurrent = pageCurrent;
    this.pageSize = pageSize;
  }
}

export class PageContentMinimalQueryParams {
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
    pageCurrent: number,
    pageSize: number,
    orderBy?: {
      sortColumn: "id" | "slug";
      direction: "asc" | "desc";
    },
  ) {
    this.requestObject = requestObject;
    this.pageCurrent = pageCurrent;
    this.pageSize = pageSize;
    this.orderBy = orderBy;
  }
}

export interface IPageContentItemMinimal {
  id: number;
  parentId: number;
  templateId: string;
  name: string;
  thumbnail: IThumbnail;
  slug: string;
}

export interface IPageContentListRs extends BaseResponse<IPageContentItem[]> {}
export interface IPageContentMinimalListRs extends BaseResponse<IPageContentItemMinimal[]> {}
export interface IPageContentDetailPerLangRs extends BaseResponse<IPageContentDetail> {}
export interface IPageContentDetailRs extends BaseResponse<IPageContentDetail[]> {}
