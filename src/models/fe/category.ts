import { BaseResponse } from "../common.interface";
import { ICategory } from "../management/category.interface";
import { LangCode } from "../management/cms/language.interface";
import { PageContentStatus } from "../management/cms/pageContent.interface";
import { IThumbnail } from "../thumbnail.interface";

export interface IFeCategory {
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
    id: number;
    lang: LangCode;
    slug: string;
    name: string;
    status: PageContentStatus;
  }[];
}

export interface FeCategoryResponse extends BaseResponse<IFeCategory> {}
export interface CategoryQueryParams {
  requestObject?: {
    lang: LangCode;
    slug?: string;
  };
  pageCurrent?: number;
  pageSize?: number;
  orderBy?: {
    sortColumn: "title" | "id";
    direction: "desc" | "asc";
  };
}
