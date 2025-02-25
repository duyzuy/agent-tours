import { LangCode } from "@/models/management/cms/language.interface";
import { IPageContentPayload, PageContentStatus } from "@/models/management/cms/pageContent.interface";
import { IThumbnail } from "@/models/thumbnail.interface";

export class PageContentFormData implements IPageContentPayload {
  id?: number;
  originId?: number;
  name?: string;
  slug?: string;
  excerpt?: string;
  thumbnail?: Partial<IThumbnail>;
  heroBanner?: string;
  descriptions?: string;
  parentId?: number;
  templateId?: string;
  lang?: LangCode;
  metaTitle?: string;
  metaDescription?: string;
  publishDate?: string;
  metaKeyword?: string;
  status?: PageContentStatus;

  constructor(
    id: number | undefined,
    originId: number | undefined,
    name: string | undefined,
    slug: string | undefined,
    excerpt: string | undefined,
    thumbnail: Partial<IThumbnail> | undefined,
    heroBanner: string | undefined,
    descriptions: string | undefined,
    parentId: number | undefined,
    templateId: string | undefined,
    lang: LangCode | undefined,
    metaTitle: string | undefined,
    metaDescription: string | undefined,
    metaKeyword: string | undefined,
    publishDate: string | undefined,
    status: PageContentStatus,
  ) {
    this.id = id;
    this.originId = originId;
    this.name = name;
    this.slug = slug;
    this.excerpt = excerpt;
    this.thumbnail = thumbnail;
    this.heroBanner = heroBanner;
    this.descriptions = descriptions;
    this.parentId = parentId;
    this.templateId = templateId;
    this.lang = lang;
    this.metaTitle = metaTitle;
    this.metaDescription = metaDescription;
    this.metaKeyword = metaKeyword;
    this.publishDate = publishDate;
    this.status = status;
  }
}
