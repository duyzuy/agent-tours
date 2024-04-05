import { IPageContentPayload } from "@/models/management/cms/pageContent.interface";
export class PageContentFormData implements IPageContentPayload {
    name?: string;
    slug?: string;
    excerpt?: string;
    thumbnail?: string;
    heroBanner?: string;
    descriptions?: string;
    parentId?: number;
    templateId?: string;
    language?: string;
    metaTitle?: string;
    metaDescription?: string;
    metaKeyword?: string;

    constructor(
        name: string | undefined,
        slug: string | undefined,
        excerpt: string | undefined,
        thumbnail: string | undefined,
        heroBanner: string | undefined,
        descriptions: string | undefined,
        parentId: number | undefined,
        templateId: string | undefined,
        language: string | undefined,
        metaTitle: string | undefined,
        metaDescription: string | undefined,
        metaKeyword: string | undefined,
    ) {
        this.name = name;
        this.slug = slug;
        this.excerpt = excerpt;
        this.thumbnail = thumbnail;
        this.heroBanner = heroBanner;
        this.descriptions = descriptions;
        this.parentId = parentId;
        this.templateId = templateId;
        this.language = language;
        this.metaTitle = metaTitle;
        this.metaDescription = metaDescription;
        this.metaKeyword = metaKeyword;
    }
}
