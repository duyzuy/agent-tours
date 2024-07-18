import type { Metadata, ResolvingMetadata } from "next";
import { LangCode } from "@/models/management/cms/language.interface";
import { notFound } from "next/navigation";
import { getDestinationContentList } from "../_actions/destination";

import { mediaConfig } from "@/configs";
import { FeDestinationContentQueryParams } from "@/models/fe/destination.interface";
import { BreadCrumb } from "@/components/frontend/BreadCrumb";
import Image from "next/image";
import dynamic from "next/dynamic";
import BoxSearchSkeleton from "../_components/BoxSearchTourFe/BoxSearchSkeleton";
import DestinationSearch from "./_components/DestinationSearch";
import { Link } from "@/utils/navigation";
import Title from "@/components/frontend/Title";
import { IconChevronRight } from "@/assets/icons";

type PageProps = { locale: LangCode };

const initQueryParams = new FeDestinationContentQueryParams(undefined, 1, 10, { sortColumn: "id", direction: "desc" });

export async function generateMetadata(
  { params }: { params: PageProps },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  // read route params

  // // optionally access and extend (rather than replace) parent metadata
  // const previousImages = (await parent).openGraph?.images || [];
  // const nextImage =
  //   pageContent && pageContent.result
  //     ? [`${mediaConfig.rootApiPath}/${pageContent.result.thumbnail}`, ...previousImages]
  //     : previousImages;

  // const title = pageContent?.result?.metaTitle ?? "404";
  return {
    title: "Điểm du lịch hấp hẫn",
    // keywords: pageContent?.result?.metaKeyword,
    // description: pageContent?.result?.metaDescription,
    // openGraph: {
    //   images: nextImage,
    //   description: pageContent?.result?.metaDescription,
    // },
  };
}

export default async function DestinationPage({ params }: { params: PageProps }) {
  const destinationContentList = await getDestinationContentList({
    ...initQueryParams,
    requestObject: {
      lang: params.locale,
    },
  });

  if (!destinationContentList) {
    notFound();
  } else {
    return (
      <div className="page-destination mb-12">
        <DestinationSearch />
        <BreadCrumb
          items={[{ title: "Điểm đến hấp dẫn" }]}
          classname="container mx-auto py-4 lg:px-8 md:px-6 px-4 mb-8"
        />
        <div className="page-destination__head mb-6">
          <div className="container mx-auto lg:px-8 md:px-6 px-4">
            <Title>Điểm đến hấp dẫn</Title>
          </div>
        </div>
        <div className="container mx-auto lg:px-8 md:px-6 px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {destinationContentList.map((dest) => (
              <div className="destination-card rounded-lg overflow-hidden" key={dest.id}>
                <div className="destination-card__inner relative">
                  <div className="desctination-card__thumbnail relative w-full pt-[150%]">
                    {dest.thumbnail ? (
                      <Image
                        src={`${mediaConfig.rootApiPath}/${dest.thumbnail?.original}`}
                        alt={dest.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center absolute top-0 left-0 w-full h-full">
                        no image
                      </div>
                    )}
                  </div>
                  <div className="desctination-card__content absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900/80 via-[60%] via-gray-900/40 to-transparent px-3 py-4">
                    <Link href={`/destination/${dest.slug}`}>
                      <h3 className="text-white text-base font-[500] line-clamp-2">{dest.title}</h3>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
