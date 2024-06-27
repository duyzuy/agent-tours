import { BaseResponse, Status } from "../../common.interface";
import { LangCode } from "./language.interface";
import { PageContentStatus } from "./pageContent.interface";

export interface ICMSTemplateContentMetaData {
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

export interface ICMSTemplateContent {
    id: number;
    cat: "cms_template";
    type: "DETAILS";
    code: string;
    name: string;
    thumb: string;
    downloads: { title: string; link: string }[];
    images: {
        listImage: string[];
    };
    content: string;
    subContent: string;
    metaData: { key?: string; value?: string; icon?: string }[];
    metaTitle: string;
    metaDescription: string;
    metaKeyword: string;
    publishDate: string;
    status: PageContentStatus;
    includeAndNotes: ICMSTemplateContentMetaData | null;
    itineraries: ICMSTemplateContentMetaData | null;
    slug: string;
    lang: LangCode;
}

export interface CMSTemplateContentListRs
    extends BaseResponse<ICMSTemplateContent[]> {}
export interface CMSTemplateContentMetaDataRs
    extends BaseResponse<ICMSTemplateContentMetaData> {}

export interface CMSTemplateContentPayload {
    id?: number;
    code?: string;
    name?: string;
    thumb?: string;
    downloads?: { title: string; link: string }[];
    images?: {
        listImage: string[];
    };
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
export interface CMSTemplateContentMetaDataPayload {
    id?: number;
    refId?: number;
    content?: string;
    metaContent: { title?: string; content?: string }[];
    status?: PageContentStatus;
    lang?: LangCode;
}
