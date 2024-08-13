import { BaseResponse } from "../common.interface";
import { ICMSTemplateContent } from "../management/cms/cmsTemplateContent.interface";
import { LangCode } from "../management/cms/language.interface";
import { IThumbnail } from "../thumbnail.interface";

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

export type FeCMSTemplateContent = ICMSTemplateContent & {
  templateCodes: string[];
  codeImage: IThumbnail | null;
  codeName: string;
  languages: {
    id: number;
    lang: LangCode;
    name: string;
    slug: string;
    thumb: string;
  }[];
  visaTemplates: {
    id: number;
    code: string;
    name: string;
    lang: LangCode;
    slug: string;
    status: string;
    thumbnail: IThumbnail;
    metaData: {
      key: string;
      value: string;
      icon: string;
    }[];
  }[];
};
export interface FeTemplateContentResponse extends BaseResponse<FeCMSTemplateContent[]> {}
