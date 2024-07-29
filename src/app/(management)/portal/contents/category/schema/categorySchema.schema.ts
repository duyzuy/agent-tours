import { ObjectSchema, object, string, array, number, mixed } from "yup";

import { CategoryFormData } from "../modules/category.interface";
import { PageContentStatus } from "@/models/management/cms/pageContent.interface";
import { LangCode } from "@/models/management/cms/language.interface";

export const categorySchema: ObjectSchema<CategoryFormData> = object({
  id: number(),
  originId: number(),
  name: string().required("Tiêu đề không bỏ trống"),
  slug: string().required("Slug không bỏ trống."),
  thumbnail: object({
    id: number().required("Thiếu ID thumbnail."),
    origin: string(),
  }).required("Ảnh bài viết không bỏ trống."),
  descriptions: string(),
  parentId: number().default(0),

  metaTitle: string().default(""),
  metaDescription: string().default(""),
  metaKeyword: string().default(""),
  status: string()
    .oneOf<PageContentStatus>([PageContentStatus.PENDING, PageContentStatus.PUBLISH, PageContentStatus.UNPUBLISH])
    .required("Trạng thái bài viết ko đúng"),
  lang: string().oneOf<LangCode>([LangCode.VI, LangCode.EN]).required("Chưa chọn ngôn ngữ"),
});
