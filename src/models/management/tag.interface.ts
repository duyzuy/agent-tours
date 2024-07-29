import { BaseResponse } from "../common.interface";
import { LangCode } from "./cms/language.interface";
import { PageContentStatus } from "./cms/pageContent.interface";

export interface ITag {
  cat: string;
  id: number;
  originId: number;
  name: string;
  slug: string;
  descriptions: string;
  metaTitle: string;
  metaDescription: string;
  metaKeyword: string;
  lang: LangCode;
  languages: {
    id: number;
    lang: LangCode;
    name: string;
    slug: string;
    status: PageContentStatus;
  }[];
  status: PageContentStatus;
}

export interface TagPayload {
  id?: number;
  originId?: number;
  lang?: LangCode;
  slug?: string;
  status?: PageContentStatus;
  name?: string;
  descriptions?: string;
  metaTitle?: string;
  metaDescription?: string;
  metaKeyword?: string;
}

export interface TagQueryParams {
  requestObject?: { lang?: LangCode; status?: PageContentStatus };
  pageSize?: number;
  pageCurrent?: number;
}
export interface ITagMinimal {
  originId: number;
  id: number;
  lang: LangCode;
  slug: string;
  name: string;
  status: PageContentStatus;
  languages: {
    id: number;
    lang: LangCode;
    name: string;
    slug: string;
    status: PageContentStatus;
  }[];
}

export interface TagListResponse extends BaseResponse<ITagMinimal[]> {}
export interface TagItemResponse extends BaseResponse<ITag> {}
