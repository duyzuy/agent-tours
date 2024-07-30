import { BaseResponse } from "../common.interface";
import { ICategory } from "../management/category.interface";
import { LangCode } from "../management/cms/language.interface";
import { PageContentStatus } from "../management/cms/pageContent.interface";
import { ITag } from "../management/tag.interface";
import { IThumbnail } from "../thumbnail.interface";

export interface IFePostItem {
  id: number;
  cat: "cms_post";
  tags: ITag[] | null;
  category: ICategory;
  name: string;
  content: string;
  heroBanner: IThumbnail | null;
  thumbnail: IThumbnail | null;
  images: IThumbnail[];
  postFormat: string;
  metaTitle: string;
  metaDescription: string;
  metaKeyword: string;
  author: string;
  publishDate: string;
  status: PageContentStatus;
  originId: number;
  lang: LangCode;
  slug: string;
  languages: [
    {
      id: number;
      name: string;
      lang: LangCode;
      slug: string;
      status: PageContentStatus;
    },
    {
      id: number;
      name: string;
      lang: LangCode;
      slug: string;
      status: PageContentStatus;
    },
  ];
}

export interface FePostListResponse extends BaseResponse<IFePostItem[]> {}

export interface FePostDetailResponse extends BaseResponse<IFePostItem> {}

export interface PostsQueryParams {
  requestObject?: {
    lang: LangCode;
    categorySlug?: string;
    tagSlug?: string;
    status: PageContentStatus;
  };
  pageCurrent?: number;
  pageSize?: number;
  orderBy?: {
    sortColumn: "title" | "id";
    direction: "desc" | "asc";
  };
}

export class PostsQueryParamsData {
  requestObject: {
    lang: LangCode;
    categorySlug?: string;
    tagSlug?: string;
    status?: PageContentStatus;
  };
  pageCurrent?: number;
  pageSize?: number;
  orderBy?: {
    sortColumn: "title" | "id";
    direction: "desc" | "asc";
  };
  constructor(
    requestObject: {
      lang: LangCode;
      categorySlug?: string;
      tagSlug?: string;
      status?: PageContentStatus;
    },
    pageCurrent: number,
    pageSize: number,
    orderBy:
      | {
          sortColumn: "title" | "id";
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
