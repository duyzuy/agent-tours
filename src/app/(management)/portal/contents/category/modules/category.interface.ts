import { CategoryPayload, CategoryQueryParams } from "@/models/management/category.interface";
import { LangCode } from "@/models/management/cms/language.interface";
import { PageContentStatus } from "@/models/management/cms/pageContent.interface";
import { IThumbnail } from "@/models/thumbnail.interface";

export class CategoryFormData implements CategoryPayload {
  id?: number;
  originId?: number;
  lang?: LangCode;
  slug?: string;
  parentId?: number;
  status?: PageContentStatus;
  thumbnail?: Partial<IThumbnail>;
  name?: string;
  descriptions?: string;
  metaTitle?: string;
  metaDescription?: string;
  metaKeyword?: string;

  constructor(
    id: number | undefined,
    originId: number | undefined,
    name: string | undefined,
    slug: string | undefined,
    parentId: number | undefined,
    thumbnail: Partial<IThumbnail> | undefined,
    descriptions: string | undefined,
    metaTitle: string | undefined,
    metaDescription: string | undefined,
    metaKeyword: string | undefined,
    lang: LangCode | undefined,
    status: PageContentStatus,
  ) {
    this.id = id;
    this.originId = originId;
    this.name = name;
    this.slug = slug;

    this.thumbnail = thumbnail;

    this.descriptions = descriptions;
    this.parentId = parentId;

    this.lang = lang;
    this.metaTitle = metaTitle;
    this.metaDescription = metaDescription;
    this.metaKeyword = metaKeyword;

    this.status = status;
  }
}

export class CategoryQueryParamsData implements CategoryQueryParams {
  requestObject?: { lang?: LangCode; status?: PageContentStatus; excludes?: number[] } | undefined;
  pageCurrent?: number | undefined;
  pageSize?: number | undefined;

  constructor(
    requestObject: { lang?: LangCode; status?: PageContentStatus; excludes?: number[] } | undefined,
    pageCurrent?: number | undefined,
    pageSize?: number | undefined,
  ) {
    this.requestObject = requestObject;
    this.pageCurrent = pageCurrent;
    this.pageSize = pageSize;
  }
}
