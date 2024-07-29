import { LangCode } from "@/models/management/cms/language.interface";
import { PageContentStatus } from "@/models/management/cms/pageContent.interface";
import { TagPayload } from "@/models/management/tag.interface";
import { TagQueryParams } from "@/models/management/tag.interface";
export class TagFormData implements TagPayload {
  id?: number;
  originId?: number;
  lang?: LangCode;
  slug?: string;
  status?: PageContentStatus;
  name?: string;
  descriptions?: string;
  metaTitle?: string;
  metaDescription?: string;
  metaKeyword?: string;
  constructor(
    id: number | undefined,
    originId: number | undefined,
    name: string,
    slug: string,
    descriptions: string,
    metaTitle: string,
    metaDescription: string,
    metaKeyword: string,
    lang: LangCode,
    status: PageContentStatus,
  ) {
    this.id = id;
    this.originId = originId;
    this.lang = lang;
    this.slug = slug;
    this.status = status;
    this.name = name;
    this.descriptions = descriptions;
    this.metaTitle = metaTitle;
    this.metaDescription = metaDescription;
    this.metaKeyword = metaKeyword;
  }
}

export class TagQueryParamsData implements TagQueryParams {
  requestObject?: { lang?: LangCode; status?: PageContentStatus } | undefined;
  pageCurrent?: number | undefined;
  pageSize?: number | undefined;

  constructor(
    requestObject: { lang?: LangCode; status?: PageContentStatus } | undefined,
    pageCurrent: number | undefined,
    pageSize: number | undefined,
  ) {
    this.requestObject = requestObject;
    this.pageCurrent = pageCurrent;
    this.pageSize = pageSize;
  }
}
