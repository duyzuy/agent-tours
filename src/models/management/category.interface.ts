import { BaseResponse } from "../common.interface";
import { IThumbnail } from "../thumbnail.interface";
import { LangCode } from "./cms/language.interface";
import { PageContentStatus } from "./cms/pageContent.interface";

export interface ICategory {
  cat: "cms_post_category";
  id: number;
  originId: number;
  parentId: number;
  name: string;
  slug: string;
  descriptions: string;
  metaTitle: string;
  metaDescription: string;
  metaKeyword: string;
  status: PageContentStatus;
  thumbnail: IThumbnail | null;
  lang: LangCode;

  children: ICategory[];
  languages: {
    parentId: number;
    id: number;
    lang: LangCode;
    descriptions: string;
    slug: string;
    name: string;
    status: PageContentStatus;
  }[];
}

export interface ICategoryMinimal {
  parentId: number;
  originId: number;
  id: number;
  lang: LangCode;
  slug: string;
  name: string;
  thumbnail: IThumbnail | null;
  status: PageContentStatus;
  children: ICategoryMinimal[];
  languages: { id: number; lang: LangCode; slug: string; name: string; status: PageContentStatus }[];
}

export interface CategoryPayload {
  id?: number;
  originId?: number;
  parentId?: number;
  lang?: LangCode;
  slug?: string;
  status?: PageContentStatus;
  thumbnail?: Partial<IThumbnail>;
  name?: string;
  descriptions?: string;
  metaTitle?: string;
  metaDescription?: string;
  metaKeyword?: string;
}

export interface CategoryQueryParams {
  requestObject?: { lang?: LangCode; status?: PageContentStatus; excludes?: number[] };
  pageSize?: number;
  pageCurrent?: number;
}
export interface ITagMinimal {
  id: number;
  lang: LangCode;
  slug: string;
  name: string;
  status: PageContentStatus;
}

export interface CategoryListResponse extends BaseResponse<ICategoryMinimal[]> {}
export interface CategoryListLangResponse extends BaseResponse<ICategory[]> {}
export interface CategoryItemResponse extends BaseResponse<ICategory> {}
export interface TagMinimalListResponse extends BaseResponse<ITagMinimal[]> {}
