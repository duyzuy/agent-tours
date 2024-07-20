import { LangCode } from "@/models/management/cms/language.interface";
import { IDestinationContentPayload } from "@/models/management/region.interface";
import { IThumbnail } from "@/models/thumbnail.interface";

export class DestinationContentFormData implements IDestinationContentPayload {
  id?: number;
  codeKey?: string;
  title?: string;
  descriptions?: string;
  shortDescriptions?: string;
  thumbnail?: Partial<IThumbnail>;
  images?: Partial<IThumbnail>[];
  metaTitle?: string;
  metaDescription?: string;
  metaKeyword?: string;
  slug?: string;
  lang?: LangCode;

  constructor(
    id: number | undefined,
    title: string | undefined,
    descriptions: string | undefined,
    shortDescriptions: string | undefined,
    thumbnail: Partial<IThumbnail> | undefined,
    images: Partial<IThumbnail>[] | undefined,
    metaTitle: string | undefined,
    metaDescription: string | undefined,
    metaKeyword: string | undefined,
    slug: string | undefined,
    codeKey: string | undefined,
    lang: LangCode | undefined,
  ) {
    this.title = title;
    this.descriptions = descriptions;
    this.shortDescriptions = shortDescriptions;
    this.thumbnail = thumbnail;
    this.images = images;
    this.metaTitle = metaTitle;
    this.metaDescription = metaDescription;
    this.metaKeyword = metaKeyword;
    this.title = title;
    this.slug = slug;
    this.lang = lang;
    this.codeKey = codeKey;
  }
}
