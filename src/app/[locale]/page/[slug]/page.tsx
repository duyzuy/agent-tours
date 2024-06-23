import type { Metadata, ResolvingMetadata } from "next";
import { LangCode } from "@/models/management/cms/language.interface";
import { notFound } from "next/navigation";
import { getPageContentDetail } from "../_actions/getPageContentDetail";
import { mediaConfig } from "@/configs";
import PageContainer from "../_components/PageContainer";

type PageParams = { slug: string; locale: LangCode };

export async function generateMetadata(
    { params }: { params: PageParams },
    parent: ResolvingMetadata,
): Promise<Metadata> {
    // read route params
    const slug = params.slug;

    // fetch data
    const pageContent = await getPageContentDetail({
        lang: params.locale,
        slug: params.slug,
    });

    // optionally access and extend (rather than replace) parent metadata
    const previousImages = (await parent).openGraph?.images || [];
    const nextImage =
        pageContent && pageContent.result
            ? [
                  `${mediaConfig.rootApiPath}/${pageContent.result.thumbnail}`,
                  ...previousImages,
              ]
            : previousImages;

    const title = pageContent?.result?.metaTitle ?? "404";
    return {
        title: `${title}`,
        keywords: pageContent?.result?.metaKeyword,
        description: pageContent?.result?.metaDescription,
        openGraph: {
            images: nextImage,
            description: pageContent?.result?.metaDescription,
        },
    };
}

export default async function PageContentDetail({
    params,
}: {
    params: PageParams;
}) {
    const pageContent = await getPageContentDetail({
        lang: params.locale,
        slug: params.slug,
    });

    if (!pageContent) {
        notFound();
    } else {
        return (
            <div className="post__page">
                <div className="post__page-inner container mx-auto py-8 max-w-[1040px] px-4">
                    <div className="breadcrumbs">
                        <ul className="flex">
                            <li>Trang chủ</li>
                            <li className="mx-2 flex justify-center items-center">
                                <span className="w-[1px] bg-slate-800 h-[8px] block"></span>
                            </li>
                            <li>{pageContent.result.name}</li>
                        </ul>
                    </div>
                    <div className="post__page-head py-4">
                        <h1 className="text-xl">{pageContent.result.name}</h1>
                    </div>
                    <PageContainer data={pageContent.result} />
                    <div className="post__page-body">
                        {/* <div className="page__thumbnail">
                            {pageContent.result.thumbnail ? (
                                <Image
                                    src={`${mediaConfig.rootApiPath}/${pageContent.result.thumbnail}`}
                                    alt="thumbnail"
                                    width={1000}
                                    height={400}
                                />
                            ) : null}
                        </div> */}
                        <div
                            className="page__description"
                            dangerouslySetInnerHTML={{
                                __html: pageContent.result.descriptions,
                            }}
                        ></div>
                    </div>
                </div>
            </div>
        );
    }
}
