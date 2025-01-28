import { BaseQueryParams, BaseResponse } from "../../common.interface";

export interface ITransation {
  cat: string;
  keyName: string;
  _languages: string;
  languages: { name?: string; lang?: string }[];
  note: string;
  id: number;
  lang: string;
}

export interface TranslationPayload {
  id?: number;
  keyName?: string;
  languages: { name?: string; lang?: string }[];
  note?: string;
}
export interface TranslationQueryParams extends BaseQueryParams<{ keyName?: string; name?: string }> {}
export interface TranslationListResponse extends BaseResponse<ITransation[]> {}
export interface ITranslationRs extends BaseResponse<ITransation> {}
export interface ITranslationListFeRs extends BaseResponse<{ keyName: string; name: string }[]> {}
