import {
    ITransation,
    ITranslationPayload,
} from "@/models/management/cms/translations.interface";
export class TranslationFormData implements ITranslationPayload {
    keyName?: string;
    languages: { name?: string; lang?: string }[];
    note?: string;

    constructor(
        keyName: string | undefined,
        languages: { name?: string; lang?: string }[],
        note: string | undefined,
    ) {
        this.keyName = keyName;
        this.languages = languages;
        this.note = note;
    }
}
