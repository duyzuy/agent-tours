import { ObjectSchema, object, string, array, number, mixed } from "yup";

import { PageContentStatus } from "@/models/management/cms/pageContent.interface";
import { LangCode } from "@/models/management/cms/language.interface";
import { CMSTemplateFormData } from "../modules/cmsTemplate.interface";
import { Status } from "@/models/management/common.interface";

export const cmsTemplateSchema: ObjectSchema<CMSTemplateFormData> = object({
    id: number().default(0),
    code: string().required("Code không bỏ trống."),
    name: string().required("Tiêu đề không bỏ trống"),
    slug: string().required("Slug không bỏ trống."),
    thumb: string().required("Ảnh bài viết không bỏ trống."),
    images: object({
        listImage: array().required(),
    }),
    content: string(),
    subContent: string(),
    metaData: array().of(
        object({
            key: string().default(""),
            value: string().default(""),
            icon: string().default(""),
        }).required(),
    ),
    metaTitle: string().default(""),
    metaDescription: string().default(""),
    metaKeyword: string().default(""),
    publishDate: string().required("Ngày đăng bài không bỏ trống."),
    lang: string()
        .oneOf<LangCode>([LangCode.VI, LangCode.EN])
        .required("Chưa chọn ngôn ngữ"),
    status: string().oneOf<PageContentStatus>([
        PageContentStatus.PENDING,
        PageContentStatus.PUBLISH,
        PageContentStatus.UNPUBLISH,
    ]),
});

// code?: string;
// name?: string;
// thumb?: string;
// images?: {
//     listImage: string[];
// };
// content?: string;
// subContent?: string;
// metaData?: {
//     key?: string;
//     value?: string;
//     icon?: string;
// }[];
// metaTitle?: string;
// metaDescription?: string;
// metaKeyword?: string;
// publishDate?: string;
// status?: Status;
// slug?: string;
// lang?: LangCode;

// id: number(),
//     originId: number(),
//     name: string().required("Tiêu đề không bỏ trống"),
//     slug: string().required("Slug không bỏ trống."),
//     excerpt: string(),
//     thumbnail: string().required("Ảnh bài viết không bỏ trống."),
//     heroBanner: string(),
//     descriptions: string(),
//     parentId: number().default(0),
//     templateId: string().default("PAGE_FULL_WIDTH"),
//     lang: string()
//         .oneOf<LangCode>([LangCode.VI, LangCode.EN])
//         .required("Chưa chọn ngôn ngữ"),
//     metaTitle: string().default(""),
//     metaDescription: string().default(""),
//     publishDate: string().required("Ngày đăng bài không bỏ trống."),
//     metaKeyword: string().default(""),
//     status: string()
//         .oneOf<PageContentStatus>([
//             PageContentStatus.PENDING,
//             PageContentStatus.PUBLISH,
//             PageContentStatus.UNPUBLISH,
//         ])
//         .required("Chưa chọn ngôn ngữ"),
