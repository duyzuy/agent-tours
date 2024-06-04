import { CMSTemplatePayload } from "@/models/management/cms/cmsTemplate.interface";
import { LangCode } from "@/models/management/cms/language.interface";
import { PageContentStatus } from "@/models/management/cms/pageContent.interface";
import { IMediaFile } from "@/models/management/media.interface";

export class CMSTemplateFormData {
    id?: number;
    code?: string;
    name?: string;
    thumb?: string;
    images?: {
        listImage: IMediaFile[];
    };
    content?: string;
    subContent?: string;
    metaData?: {
        key?: string;
        value?: string;
        icon?: string;
    }[];
    metaTitle?: string;
    metaDescription?: string;
    metaKeyword?: string;
    publishDate?: string;
    status?: PageContentStatus;
    slug?: string;
    lang?: LangCode;

    constructor(
        id: number | undefined,
        code: string | undefined,
        name: string | undefined,
        slug: string | undefined,
        thumb: string | undefined,
        images:
            | {
                  listImage: IMediaFile[];
              }
            | undefined,
        content: string | undefined,
        subContent: string | undefined,
        metaData: {
            key: string | undefined;
            value: string | undefined;
            icon: string | undefined;
        }[],
        metaTitle: string | undefined,
        metaDescription: string | undefined,
        metaKeyword: string | undefined,
        publishDate: string | undefined,
        status: PageContentStatus | undefined,
        lang: LangCode | undefined,
    ) {
        this.id = id;
        this.code = code;
        this.name = name;
        this.thumb = thumb;
        this.images = images;
        this.content = content;
        this.subContent = subContent;
        this.metaData = metaData;
        this.metaTitle = metaTitle;
        this.metaDescription = metaDescription;
        this.metaKeyword = metaKeyword;
        this.publishDate = publishDate;
        this.status = status;
        this.slug = slug;
        this.lang = lang;
    }
}
