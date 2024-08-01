import { BaseResponse } from "@/models/common.interface";
import { LangCode } from "./language.interface";
import { IVisaTemplateContent } from "./visaTemplateContent.interface";
import { PageContentStatus } from "./pageContent.interface";
import { IThumbnail } from "@/models/thumbnail.interface";

export interface IVisaTemplateKey {
  id: number;
  cat: "cms_template";
  type: "DETAILS";
  code: string;
  codeName: string;
  codeImage: IThumbnail | null;
  visaTemplates: IVisaTemplateContent[];
}

export interface IVisaTemplateKeyMinimalItem {
  code: string;
  codeName: string;
  codeImage: IThumbnail | null;
  amount: number;
  visaTemplates: any[];
  visaTemplatesMinimal: {
    code: string;
    name: string;
    lang: LangCode;
    slug: string;
    status: PageContentStatus;
    thumbnail: IThumbnail;
    metaData: {
      key: string;
      value: string;
      icon: string;
    }[];
  }[];
}
export interface VisaTemplateKeyListResponse extends BaseResponse<IVisaTemplateKey[]> {}
export interface VisaTemplateKeyShortListResponse extends BaseResponse<IVisaTemplateKeyMinimalItem[]> {}
export interface VisaTemplateKeyResponse extends BaseResponse<IVisaTemplateKey> {}
export interface VisaTemplateKeyDetailResponse extends BaseResponse<IVisaTemplateContent[]> {}
export interface VisaTemplateKeyPayload {
  code?: string;
  codeName?: string;
  codeImage?: Partial<IThumbnail>;
  visaTemplates: {
    name: string;
    slug: string;
    lang: LangCode;
  }[];
}

export class VisaTemplateQueryParams {
  requestObject?: {
    code?: string;
    id?: number;
    lang?: LangCode;
  };
  pageCurrent?: number;
  pageSize?: number;

  constructor(
    requestObject:
      | {
          code: string;
          id: number;
          lang: LangCode;
        }
      | undefined,
    pageCurrent: number | undefined,
    pageSize: number | undefined,
  ) {
    this.requestObject = requestObject;
    this.pageCurrent = pageCurrent;
    this.pageSize = pageSize;
  }
}
