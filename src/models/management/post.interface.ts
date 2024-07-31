import { BaseResponse } from "../common.interface";
import { IThumbnail } from "../thumbnail.interface";
import { ICategory } from "./category.interface";
import { LangCode } from "./cms/language.interface";
import { PageContentStatus } from "./cms/pageContent.interface";
import { ITag } from "./tag.interface";

export interface IPostContent {
  cat: "cms_post";
  name: string;
  content: string;
  excerpt: string;
  metaTitle: string;
  metaDescription: string;
  metaKeyword: string;
  status: PageContentStatus;
  thumbnail: IThumbnail | null;
  heroBanner: IThumbnail | null;
  images: IThumbnail[];
  category: ICategory;
  postMeta: string;
  tags: ITag[];
  id: number;
  originId: number;
  lang: LangCode;
  slug: string;
  children: IPostContent[];
  languages: {
    id: number;
    lang: LangCode;
    content: string;
    slug: string;
    name: string;
    status: PageContentStatus;
  }[];
  publishDate: string;
}

export interface IPostMinimalContent {
  id: number;
  originId: number;
  name: string;
  tags: ITag[];
  thumbnail: IThumbnail | null;
  category: ICategory;
  status: PageContentStatus;
  images: IThumbnail[];
  lang: LangCode;
  slug: string;
  languages: {
    id: number;
    lang: LangCode;
    slug: string;
    name: string;
    status: PageContentStatus;
  }[];
}

export interface PostContentPayload {
  id?: number;
  originId?: number;
  lang?: LangCode;
  slug?: string;
  status?: PageContentStatus;
  category?: {
    id?: number;
  };
  tags?: { id?: number }[];
  name?: string;
  content?: string;
  excerpt?: string;
  heroBanner?: {
    id?: number;
  };
  thumbnail?: {
    id?: number;
  };
  images?: {
    id?: number;
  }[];
  postMeta?: string;
  metaTitle?: string;
  metaDescription?: string;
  metaKeyword?: string;
  publishDate?: string;
}

export interface PostQueryParams {
  requestObject?: {
    lang?: LangCode;
    status?: PageContentStatus;
  };
  pageCurrent?: number;
  pageSize?: number;
}

export interface PostListResponse extends BaseResponse<IPostMinimalContent[]> {}
export interface PostDetailsResponse extends BaseResponse<IPostContent[]> {}
export interface PostItemResponse extends BaseResponse<IPostContent> {}
