import { ObjectSchema, object, string, array, number, mixed } from "yup";

import { TranslationFormData } from "../modules/language.interface";
import { LangCode } from "@/models/management/cms/language.interface";

export const translationSchema: ObjectSchema<TranslationFormData> = object({
    keyName: string().required("Keyname không bỏ trống"),
    note: string().default(""),
    languages: array()
        .of(
            object({
                name: string(),
                lang: string()
                    .oneOf<LangCode>([LangCode.VI, LangCode.EN])
                    .required("Thiếu Language code."),
            }),
        )
        .default([]),
});
