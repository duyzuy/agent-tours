import { BaseResponse, Status } from "../../common.interface";
import { LangCode } from "./language.interface";
import { PageContentStatus } from "./pageContent.interface";

export interface IVisatemplateContentMetaData {
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

export interface IVisaTemplateContent {
  id: number;
  cat: "cms_visatemplate";
  type: "DETAILS";
  code: string;
  codeImage: string;
  codeName: string;
  name: string;
  thumb: string;
  downloads: { title: string; link: string }[];
  content: string;
  subContent: string;
  metaData: { key: string; value: string; icon: string }[];
  metaTitle: string;
  metaDescription: string;
  metaKeyword: string;
  publishDate: string;
  status: PageContentStatus;
  slug: string;
  lang: LangCode;
  languages: {
    lang: LangCode;
    name: string;
    slug: string;
    thumb: string;
    metaData: { key: string; value: string; icon: string }[];
  }[];
  visaContent: {
    cat: "cms_visatemplate";
    type: "CONTENT";
    content: string;
    metaContent: any[];
    status: string;
    id: number;
    refId: number;
    lang: string;
    slug: string;
  } | null;
}

export interface VisaTemplateContentListResponse extends BaseResponse<IVisaTemplateContent[]> {}
export interface VisaTemplateContentResponse extends BaseResponse<IVisaTemplateContent> {}

export interface VisaTemplateContentMetaDataResponse extends BaseResponse<IVisatemplateContentMetaData> {}

export interface VisaTemplateContentPayload {
  id?: number;
  code?: string;
  name?: string;
  thumb?: string;
  downloads?: { title: string; link: string }[];
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
export interface VisaTemplateContentMetaBlockPayload {
  id?: number;
  refId?: number;
  content?: string;
  metaContent: { title?: string; content?: string }[];
}
