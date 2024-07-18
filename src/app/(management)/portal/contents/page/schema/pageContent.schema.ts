import { ObjectSchema, object, string, array, number, mixed } from "yup";

import { PageContentFormData } from "../modules/pageContent.interface";
import { PageContentStatus } from "@/models/management/cms/pageContent.interface";
import { LangCode } from "@/models/management/cms/language.interface";

export const pageContentSchema: ObjectSchema<PageContentFormData> = object({
  id: number(),
  originId: number(),
  name: string().required("Tiêu đề không bỏ trống"),
  slug: string().required("Slug không bỏ trống."),
  excerpt: string(),
  thumbnail: object({
    id: number().required("Thiếu ID thumbnail."),
    origin: string(),
  }).required("Ảnh bài viết không bỏ trống."),
  heroBanner: string(),
  descriptions: string(),
  parentId: number().default(0),
  templateId: string().default("PAGE_FULL_WIDTH"),
  lang: string().oneOf<LangCode>([LangCode.VI, LangCode.EN]).required("Chưa chọn ngôn ngữ"),
  metaTitle: string().default(""),
  metaDescription: string().default(""),
  publishDate: string().required("Ngày đăng bài không bỏ trống."),
  metaKeyword: string().default(""),
  status: string()
    .oneOf<PageContentStatus>([PageContentStatus.PENDING, PageContentStatus.PUBLISH, PageContentStatus.UNPUBLISH])
    .required("Chưa chọn ngôn ngữ"),
});
