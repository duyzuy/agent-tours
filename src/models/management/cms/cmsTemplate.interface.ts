import { BaseResponse, Status } from "../../common.interface";
import { LangCode } from "./language.interface";
import { PageContentStatus } from "./pageContent.interface";
import { ICMSTemplateContent } from "./cmsTemplateContent.interface";
import { IThumbnail } from "@/models/thumbnail.interface";

export interface ICMSTemplate {
  id: number;
  cat: "cms_template";
  type: "DETAILS";
  code: string;
  codeName: string;
  codeImage: IThumbnail;
  descriptions: string;
  visaTemplates: { code: string }[];
  templates: ICMSTemplateContent[];
}

export interface ICMSTemplateMinimal {
  id: number;
  cat: "cms_template";
  type: "DETAILS";
  code: string;
  codeName: string;
  codeImage: IThumbnail;
  descriptions: string;
  visaTemplates: { code: string }[];
  templates: ICMSTemplateContent[];
  templatesMinimal: {
    name: string;
    lang: LangCode;
    slug: string;
    status: PageContentStatus;
  }[];
  visaTemplatesMinimal: {
    code: string;
    name: string;
  }[];
}

export interface CMSTemplateListRs extends BaseResponse<ICMSTemplate[]> {}
export interface CMSTemplateMinimalListRs extends BaseResponse<ICMSTemplateMinimal[]> {}
export interface CMSTemplateRs extends BaseResponse<ICMSTemplate> {}
export interface CMSTemplateContentRs extends BaseResponse<ICMSTemplateContent> {}

export interface CMSTemplatePayload {
  code?: string;
  codeName?: string;
  codeImage?: Partial<IThumbnail>;
  descriptions?: string;
  visaTemplates: { code: string }[];
  templates: {
    name?: string;
    slug?: string;
    lang?: LangCode;
  }[];
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
