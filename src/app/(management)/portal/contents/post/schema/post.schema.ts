import { ObjectSchema, object, string, array, number, mixed } from "yup";

import { PostContentFormData } from "../module/postModule.interface";
import { PageContentStatus } from "@/models/management/cms/pageContent.interface";
import { LangCode } from "@/models/management/cms/language.interface";

export const postContentSchema: ObjectSchema<PostContentFormData> = object({
  id: number(),
  originId: number(),
  name: string().required("Tiêu đề không bỏ trống"),
  slug: string().required("Slug không bỏ trống."),
  excerpt: string(),
  thumbnail: object({
    id: number().required("Ảnh bài viết không bỏ trống."),
    origin: string(),
  }),
  images: array()
    .of(
      object({
        id: number().required("Thiếu ID thumbnail."),
      }),
    )
    .default([]),
  heroBanner: object({
    id: number().required("Herobanner đang bỏ trống."),
  }),
  content: string(),
  category: object({
    id: number().required("Chưa chọn danh mục"),
  }),
  tags: array()
    .of(
      object({
        id: number().required("Thiếu ID tag"),
      }),
    )
    .default([]),
  postMeta: string(),
  lang: string().oneOf<LangCode>([LangCode.VI, LangCode.EN]).required("Chưa chọn ngôn ngữ"),
  metaTitle: string().default(""),
  metaDescription: string().default(""),
  publishDate: string().required("Ngày đăng bài không bỏ trống."),
  metaKeyword: string().default(""),
  status: string()
    .oneOf<PageContentStatus>([PageContentStatus.PENDING, PageContentStatus.PUBLISH, PageContentStatus.UNPUBLISH])
    .required("Chưa chọn ngôn ngữ"),
});
