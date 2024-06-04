import { BaseResponse } from "../common.interface";
import { LangCode } from "./language.interface";
import { PageContentStatus } from "./pageContent.interface";

export interface ICMSTemplate {
    id: number;
    cat: "cms_template";
    type: "DETAILS";
    code: string;
    name: string;
    thumb: string;
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
    includeAndNotes: [];
    itineraries: [];
    slug: string;
    lang: LangCode;
}
export interface CMSTemplateListRs extends BaseResponse<ICMSTemplate[]> {}
export interface CMSTemplatePayload {
    code?: string;
    name?: string;
    thumb?: string;
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

export class CMSTemplateQueryParams {
    pageCurrent?: number;
    pageSize?: number;
    requestObject?: {
        code?: string;
        id?: number;
        lang?: LangCode;
    };
    constructor(
        requestObject:
            | {
                  code?: string;
                  id?: number;
                  lang?: LangCode;
              }
            | undefined,
        pageCurrent: number | undefined,
        pageSize: number | undefined,
    ) {
        this.pageCurrent = pageCurrent;
        this.pageSize = pageSize;
        this.requestObject = requestObject;
    }
}
