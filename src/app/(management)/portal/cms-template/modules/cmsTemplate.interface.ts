import { CMSTemplateContentPayload } from "@/models/management/cms/cmsTemplateContent.interface";
import { LangCode } from "@/models/management/cms/language.interface";
import { PageContentStatus } from "@/models/management/cms/pageContent.interface";
import { IThumbnail } from "@/models/thumbnail.interface";

export class CMSTemplateContentFormData implements CMSTemplateContentPayload {
  id?: number;
  code?: string;
  name?: string;
  thumbnail?: Partial<IThumbnail>;
  images?: Partial<IThumbnail>[];
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
  promotionReferencePrice?: number;
  promotionLabel?: string;
  promotionLabelType?: "text" | "image";
  promotionValidFrom?: string;
  promotionValidTo?: string;
  promotionImage?: string;
  lang?: LangCode;

  constructor(
    id: number | undefined,
    code: string | undefined,
    name: string | undefined,
    slug: string | undefined,
    thumbnail: Partial<IThumbnail> | undefined,
    images: Partial<IThumbnail>[] | undefined,
    downloads: { title: string; link: string }[] | undefined,
    content: string | undefined,
    subContent: string | undefined,
    metaData: {
      key?: string;
      value?: string;
      icon?: string;
    }[],
    metaTitle: string | undefined,
    metaDescription: string | undefined,
    metaKeyword: string | undefined,
    publishDate: string | undefined,
    promotionReferencePrice: number | undefined,
    promotionLabel: string | undefined,
    promotionImage: string | undefined,
    promotionLabelType: "text" | "image",
    promotionValidFrom: string | undefined,
    promotionValidTo: string | undefined,
    status: PageContentStatus | undefined,
    lang: LangCode | undefined,
  ) {
    this.id = id;
    this.code = code;
    this.name = name;
    this.thumbnail = thumbnail;
    this.images = images;
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
    this.promotionLabel = promotionLabel;
    this.promotionReferencePrice = promotionReferencePrice;
    this.promotionLabelType = promotionLabelType;
    this.promotionValidFrom = promotionValidFrom;
    this.promotionValidTo = promotionValidTo;
    this.promotionImage = promotionImage;
  }
}

export class CMSTemplateFormData {
  codeName?: string;
  code?: string;
  codeImage?: Partial<IThumbnail>;
  descriptions?: string;
  visaTemplates: { code: string }[];
  templates: {
    name?: string;
    slug?: string;
    lang?: LangCode;
  }[];

  constructor(
    codeName: string | undefined,
    code: string | undefined,
    codeImage: Partial<IThumbnail> | undefined,
    descriptions: string | undefined,
    visaTemplates: { code: string }[],
    templates: {
      name?: string;
      slug?: string;
      lang?: LangCode;
    }[],
  ) {
    this.codeName = codeName;
    this.code = code;
    this.codeImage = codeImage;
    this.descriptions = descriptions;
    this.visaTemplates = visaTemplates;
    this.templates = templates;
  }
}

export class CMSTemplateContentMetaDataForm {
  id?: number;
  refId?: number;
  content?: string;
  metaContent: {
    title?: string;
    content?: string;
  }[];
  status?: PageContentStatus;
  lang?: LangCode;
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
