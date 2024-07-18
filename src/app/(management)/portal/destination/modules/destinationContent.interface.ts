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
  slug?: string;
  lang?: LangCode;

  constructor(
    id: number | undefined,
    title: string | undefined,
    descriptions: string | undefined,
    shortDescriptions: string | undefined,
    thumbnail: Partial<IThumbnail> | undefined,
    slug: string | undefined,
    codeKey: string | undefined,
    lang: LangCode | undefined,
  ) {
    this.title = title;
    this.descriptions = descriptions;
    this.shortDescriptions = shortDescriptions;
    this.thumbnail = thumbnail;
    this.title = title;
    this.slug = slug;
    this.lang = lang;
    this.codeKey = codeKey;
  }
}
