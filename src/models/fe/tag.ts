import { LangCode } from "../management/cms/language.interface";

export interface TagQueryParams {
  requestObject?: {
    lang: LangCode;
    slug?: string;
  };
  pageCurrent?: number;
  pageSize?: number;
  orderBy?: {
    sortColumn: "title" | "id";
    direction: "desc" | "asc";
  };
}
