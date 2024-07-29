import { ObjectSchema, object, string, array, number, mixed } from "yup";
import { PageContentStatus } from "@/models/management/cms/pageContent.interface";
import { LangCode } from "@/models/management/cms/language.interface";
import { TagFormData } from "../module/tag.interface";

export const tagContentSchema: ObjectSchema<TagFormData> = object({
  id: number(),
  originId: number(),
  name: string().required("Tiêu đề không bỏ trống"),
  slug: string().required("Slug không bỏ trống."),
  descriptions: string(),
  lang: string().oneOf<LangCode>([LangCode.VI, LangCode.EN]).required("Chưa chọn ngôn ngữ"),
  metaTitle: string().default(""),
  metaDescription: string().default(""),
  metaKeyword: string().default(""),
  status: string()
    .oneOf<PageContentStatus>([PageContentStatus.PENDING, PageContentStatus.PUBLISH, PageContentStatus.UNPUBLISH])
    .required("Chưa chọn status"),
});
