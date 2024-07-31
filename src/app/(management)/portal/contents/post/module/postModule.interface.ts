import { ICategory } from "@/models/management/category.interface";
import { LangCode } from "@/models/management/cms/language.interface";
import { PageContentStatus } from "@/models/management/cms/pageContent.interface";
import { PostContentPayload } from "@/models/management/post.interface";
import { ITag } from "@/models/management/tag.interface";
import { IThumbnail } from "@/models/thumbnail.interface";

export class PostContentFormData implements PostContentPayload {
  id?: number;
  originId?: number;
  lang?: LangCode;
  slug?: string;
  status?: PageContentStatus;
  category?: Partial<Pick<ICategory, "id" | "name" | "slug">>;
  tags?: Partial<Pick<ITag, "id" | "name" | "slug">>[];
  name?: string;
  excerpt?: string;
  content?: string;
  heroBanner?: Partial<IThumbnail>;
  thumbnail?: Partial<IThumbnail>;
  images?: Partial<IThumbnail>[];
  postMeta?: string;
  metaTitle?: string;
  metaDescription?: string;
  metaKeyword?: string;
  publishDate?: string;

  constructor(
    id: number | undefined,
    originId: number | undefined,
    lang: LangCode | undefined,
    slug: string | undefined,
    name: string | undefined,
    content: string | undefined,
    excerpt: string | undefined,
    heroBanner: Partial<IThumbnail> | undefined,
    thumbnail: Partial<IThumbnail> | undefined,
    images: Partial<IThumbnail>[] | undefined,
    postMeta: string | undefined,
    category: Partial<Pick<ICategory, "id" | "name" | "slug">> | undefined,
    tags: Partial<Pick<ITag, "id" | "name" | "slug">>[] | undefined,
    metaTitle: string | undefined,
    metaDescription: string | undefined,
    metaKeyword: string | undefined,
    publishDate: string | undefined,
    status: PageContentStatus | undefined,
  ) {
    this.id = id;
    this.originId = originId;
    this.lang = lang;
    this.slug = slug;
    this.status = status;
    this.category = category;
    this.tags = tags;
    this.name = name;
    this.content = content;
    this.excerpt = excerpt;
    this.heroBanner = heroBanner;
    this.thumbnail = thumbnail;
    this.images = images;
    this.postMeta = postMeta;
    this.metaTitle = metaTitle;
    this.metaDescription = metaDescription;
    this.metaKeyword = metaKeyword;
    this.publishDate = publishDate;
  }
}
