import { BaseResponse } from "../common.interface";
import { LangCode } from "../management/cms/language.interface";
import { PageContentStatus } from "../management/cms/pageContent.interface";

export interface FeVisaDetail {
  cat: "cms_visatemplate";
  type: "DETAILS";
  code: string;
  codeImage: string;
  codeName: string;
  downloads: string[];
  name: string;
  thumb: string;
  content: string;
  subContent: string;
  metaData: { key: string; value: string; icon: string }[];
  metaTitle: string;
  metaDescription: string;
  metaKeyword: string;
  publishDate: string;
  status: PageContentStatus;
  languages: {
    name: string;
    thumb: string;
    metaData: { key: string; value: string; icon: string }[];
    slug: string;
    lang: LangCode;
  }[];
  visaContent: {
    cat: "cms_visatemplate";
    type: "CONTENT";
    content: string;
    metaContent: { title: string; content: string }[];
    status: PageContentStatus;
    id: number;
    refId: number;
    lang: LangCode;
    slug: string;
  };
  id: number;
  slug: string;
  lang: LangCode;
}
export interface VisaDetailsByLangResponse extends BaseResponse<FeVisaDetail[]> {}
