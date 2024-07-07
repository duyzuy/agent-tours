import { LangCode } from "@/models/management/cms/language.interface";
import { PageContentStatus } from "@/models/management/cms/pageContent.interface";
import {
  VisaTemplateContentMetaBlockPayload,
  VisaTemplateContentPayload,
} from "@/models/management/cms/visaTemplateContent.interface";

export class VisaTemplateKeyFormData {
  codeName?: string;
  code?: string;
  codeImage?: string;
  visaTemplates: {
    name: string;
    slug: string;
    lang: LangCode;
  }[];

  constructor(
    codeName: string | undefined,
    code: string | undefined,
    codeImage: string | undefined,
    visaTemplates: {
      name: string;
      slug: string;
      lang: LangCode;
    }[],
  ) {
    this.codeName = codeName;
    this.code = code;
    this.codeImage = codeImage;
    this.visaTemplates = visaTemplates;
  }
}

export class VisaTemplateContentFormData implements VisaTemplateContentPayload {
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

  constructor(
    id: number | undefined,
    code: string | undefined,
    name: string | undefined,
    slug: string | undefined,
    thumb: string | undefined,
    downloads: { title: string; link: string }[] | undefined,
    content: string | undefined,
    subContent: string | undefined,
    metaData: {
      key: string | undefined;
      value: string | undefined;
      icon: string | undefined;
    }[],
    metaTitle: string | undefined,
    metaDescription: string | undefined,
    metaKeyword: string | undefined,
    publishDate: string | undefined,
    status: PageContentStatus | undefined,
    lang: LangCode | undefined,
  ) {
    this.id = id;
    this.code = code;
    this.name = name;
    this.thumb = thumb;
    this.content = content;
    this.downloads = downloads;
    this.subContent = subContent;
    this.metaData = metaData;
    this.metaTitle = metaTitle;
    this.metaDescription = metaDescription;
    this.metaKeyword = metaKeyword;
    this.publishDate = publishDate;
    this.status = status;
    this.slug = slug;
    this.lang = lang;
  }
}

export class VisaTemplateContentMetaDataForm implements VisaTemplateContentMetaBlockPayload {
  id?: number;
  refId?: number;
  content?: string;
  metaContent: {
    title?: string;
    content?: string;
  }[];
  constructor(
    id: number | undefined,
    refId: number | undefined,
    content: string | undefined,
    metaContent: {
      title?: string;
      content?: string;
    }[],
  ) {
    this.id = id;
    this.refId = refId;
    this.metaContent = metaContent;
    this.content = content;
  }
}
