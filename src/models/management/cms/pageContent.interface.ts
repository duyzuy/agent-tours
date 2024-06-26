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
    thumbnail: string;
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
    thumbnail: string;
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
    thumbnail?: string;
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
    pageCurrent?: number;
    pageSize?: number;
    constructor(pageCurrent: number, pageSize: number) {
        this.pageCurrent = pageCurrent;
        this.pageSize = pageSize;
    }
}
export interface IPageContentListRs extends BaseResponse<IPageContentItem[]> {}

export interface IPageContentDetailPerLangRs
    extends BaseResponse<IPageContentDetail> {}

export interface IPageContentDetailRs
    extends BaseResponse<IPageContentDetail[]> {}
