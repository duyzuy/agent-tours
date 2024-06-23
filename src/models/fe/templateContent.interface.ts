import { BaseResponse } from "../common.interface";
import { ICMSTemplate } from "../management/cms/cmsTemplate.interface";
import { ICMSTemplateContent } from "../management/cms/cmsTemplateContent.interface";
import { LangCode } from "../management/cms/language.interface";

export interface FeTemplateContentPayload {
    slug: string;
    lang: LangCode;
}

export class FeTemplateContentQueryParams {
    requestObject?: FeTemplateContentPayload;
    pageCurrent?: number;
    pageSize?: number;
    constructor(
        requestObject: FeTemplateContentPayload | undefined,
        pageCurrent?: number | undefined,
        pageSize?: number | undefined,
    ) {
        this.requestObject = requestObject;
        this.pageCurrent = pageCurrent;
        this.pageSize = pageSize;
    }
}

export interface FeTemplateContentResponse
    extends BaseResponse<
        (ICMSTemplateContent & {
            languages: {
                lang: LangCode;
                name: string;
                slug: string;
                thumb: string;
            }[];
        })[]
    > {}
