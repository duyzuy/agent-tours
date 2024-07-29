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

// "id": 726,
// "originId": 726,
// "tags": [
//     {
//         "originId": 0,
//         "id": 704,
//         "lang": "vi",
//         "slug": "tag-1-update-2",
//         "name": "tag 1 update 2",
//         "status": "",
//         "languages": []
//     },
//     {
//         "originId": 0,
//         "id": 715,
//         "lang": "vi",
//         "slug": "tag-2",
//         "name": "Tag 2",
//         "status": "",
//         "languages": []
//     }
// ],
// "category": {
//     "parentId": 0,
//     "originId": 0,
//     "id": 701,
//     "lang": "vi",
//     "slug": "string-1",
//     "name": "test string 1",
//     "thumbnail": {
//         "id": 0,
//         "original": "",
//         "small": ""
//     },
//     "status": "",
//     "children": [],
//     "languages": []
// },
// "name": "bai viet so 1",
// "thumbnail": {
//     "id": 196,
//     "original": "header-banner-1711883565702.jpeg",
//     "small": "thumb-header-banner-1711883565702.jpeg"
// },
// "slug": "bai-viet-so-1",
// "lang": null,
// "status": null,
// "languages": [
//     {
//         "id": 726,
//         "name": "bai viet so 1",
//         "lang": null,
//         "slug": "bai-viet-so-1",
//         "status": "publish"
//     }
// ]

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
