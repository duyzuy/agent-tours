import { TranslationPayload, TranslationQueryParams } from "@/models/management/cms/translations.interface";

export class TranslationFormDataQeryParams implements TranslationQueryParams {
  requestObject?: { keyName?: string; name?: string } | undefined;
  pageCurrent?: number | undefined;
  pageSize?: number | undefined;
  orderBy?: { sortColumn?: string; direction?: "asc" | "desc" } | undefined;
  constructor(
    requestObject?: { keyName?: string; name?: string } | undefined,
    pageCurrent?: number | undefined,
    pageSize?: number | undefined,
  ) {
    this.orderBy = { sortColumn: "id", direction: "desc" };
    this.pageCurrent = pageCurrent;
    this.pageSize = pageSize;
    this.requestObject = requestObject;
  }
}

export class TranslationFormData implements TranslationPayload {
  id?: number | undefined;
  keyName?: string | undefined;
  languages: { name?: string; lang?: string }[];
  note?: string | undefined;
  constructor(
    id: number | undefined,
    keyName: string | undefined,
    languages: { name?: string; lang?: string }[],
    note: string | undefined,
  ) {
    this.languages = languages;
    this.id = id;
    this.keyName = keyName;
    this.note = note;
  }
}
