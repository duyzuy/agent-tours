import { ObjectSchema, object, string, array, number, mixed } from "yup";

import { PageContentStatus } from "@/models/management/cms/pageContent.interface";
import { LangCode } from "@/models/management/cms/language.interface";

import { VisaTemplateContentFormData, VisaTemplateKeyFormData } from "../modules/visaTemplate.interface";
export const visaTemplateContentSchema: ObjectSchema<VisaTemplateContentFormData> = object({
  id: number().default(0),
  code: string().required("Code không bỏ trống."),
  name: string().required("Tiêu đề không bỏ trống"),
  slug: string().required("Slug không bỏ trống."),
  thumbnail: object({
    id: number().required("Thiếu ID thumbnail"),
  }).required("Ảnh bài viết không bỏ trống"),
  downloads: array().of(
    object({
      title: string().required("Không bỏ trống tên."),
      link: string().required("Không bỏ trống đường dẫn file."),
    }),
  ),
  content: string(),
  subContent: string(),
  metaData: array().of(
    object({
      key: string().default(""),
      value: string().default(""),
      icon: string().default(""),
    }),
  ),
  metaTitle: string().default(""),
  metaDescription: string().default(""),
  metaKeyword: string().default(""),
  publishDate: string().required("Ngày đăng bài không bỏ trống."),
  lang: string().oneOf<LangCode>([LangCode.VI, LangCode.EN]).required("Chưa chọn ngôn ngữ"),
  status: string().oneOf<PageContentStatus>([
    PageContentStatus.PENDING,
    PageContentStatus.PUBLISH,
    PageContentStatus.UNPUBLISH,
  ]),
});

export const visaTemplateSchema: ObjectSchema<VisaTemplateKeyFormData> = object({
  code: string().required("Code không bỏ trống."),
  codeName: string().required("Tên không bỏ trống"),
  descriptions: string(),
  codeImage: object({
    id: number().required("Thiếu ID ảnh."),
  }).required("Vui lòng chọn ảnh"),
  visaTemplates: array()
    .of(
      object({
        name: string().default(""),
        slug: string().default(""),
        lang: string().oneOf<LangCode>([LangCode.VI, LangCode.EN]).required("Chưa chọn ngôn ngữ"),
      }).required(),
    )
    .required(),
});
