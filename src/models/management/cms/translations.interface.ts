import { BaseResponse } from "../common.interface";

export interface ITransation {
    cat: string;
    keyName: string;
    _languages: string;
    languages: { name?: string; lang?: string }[];
    note: string;
    id: number;
    lang: string;
}

export interface ITranslationPayload {
    id?: number;
    keyName?: string;
    languages: { name?: string; lang?: string }[];
    note?: string;
}

export interface ITranslationRs extends BaseResponse<ITransation[]> {}
export interface ITranslationListFeRs
    extends BaseResponse<{ keyName: string; name: string }[]> {}
