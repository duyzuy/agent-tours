import { BaseResponse } from "../common.interface";
import { LangCode } from "./language.interface";

export interface IPageContent {
    id: number;
    name: string;
    slug: string;
    excerpt: string;
    thumbnail: string;
    heroBanner: string;
    descriptions: string;
    parentId: number;
    templateId: string;
    language: LangCode;
    metaTitle: string;
    metaDescription: string;
    metaKeyword: string;
}
export interface IPageContentPayload {
    name?: string;
    slug?: string;
    excerpt?: string;
    thumbnail?: string;
    heroBanner?: string;
    descriptions?: string;
    parentId?: number;
    templateId?: string;
    lang?: string;
    metaTitle?: string;
    metaDescription?: string;
    metaKeyword?: string;
    originId?: number;
}

export interface IPageContentListRs extends BaseResponse<IPageContent[]> {}
export interface IPageContentRs extends BaseResponse<IPageContent[]> {}
