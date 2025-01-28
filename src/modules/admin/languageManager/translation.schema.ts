import { ObjectSchema, object, string, array, number, mixed } from "yup";
import { TranslationFormData } from "./translation.interface";
import { LangCode } from "@/models/management/cms/language.interface";

export const translationSchema: ObjectSchema<TranslationFormData & { action: "create" | "edit" }> = object({
  action: string().oneOf<"create" | "edit">(["create", "edit"]).required("Thiếu Action"),
  id: number().when("action", {
    is: "edit",
    then: (schema) => schema.required("Thiếu ID bản dịch."),
    otherwise: (schema) => schema.optional(),
  }),
  keyName: string().required("Keyname không bỏ trống"),
  note: string().default(""),
  languages: array()
    .of(
      object({
        name: string().required("Tên không bỏ trống.").min(3, "Tối thiểu 3 ký tự"),
        lang: string().oneOf<LangCode>([LangCode.VI, LangCode.EN]).required("Thiếu Language code."),
      }),
    )
    .default([]),
});
