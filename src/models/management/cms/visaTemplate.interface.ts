import { BaseResponse } from "@/models/common.interface";
import { LangCode } from "./language.interface";
import { IVisaTemplateContent } from "./visaTemplateContent.interface";

export interface IVisaTemplate {
    id: number;
    cat: "cms_template";
    type: "DETAILS";
    code: string;
    codeName: string;
    codeImage: string;
    descriptions: string;
    templates: IVisaTemplateContent[];
}
export interface VisaTemplateKeyListResponse
    extends BaseResponse<IVisaTemplate> {}
export interface VisaTemplateKeyPayload {
    code?: string;
    codeName?: string;
    codeImage?: string;
    visaTemplates: {
        name: string;
        slug: string;
        lang: LangCode;
    }[];
}

export class VisaTemplateQueryParams {
    requestObject?: {
        code: string;
        id: number;
        lang: LangCode;
    };
    pageCurrent: number;
    pageSize: number;

    constructor(
        requestObject:
            | {
                  code: string;
                  id: number;
                  lang: LangCode;
              }
            | undefined,
        pageCurrent: number,
        pageSize: number,
    ) {
        this.requestObject = requestObject;
        this.pageCurrent = pageCurrent;
        this.pageSize = pageSize;
    }
}

export interface IVisaTemplateKey {
    code: string;
    codeName: string;
    codeImage: string;
    visaTemplates: [];
}
