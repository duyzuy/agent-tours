import { LangCode } from "@/models/management/cms/language.interface";
import { getDestinationContentList } from "../../../../actions/destination";
import { FeDestinationContentQueryParams } from "@/models/fe/destination.interface";
import { getLocale } from "next-intl/server";
import Title from "@/components/frontend/Title";
import DestinationsSlider from "./DestinationSlider";
import dynamic from "next/dynamic";
import Image from "next/image";
import { mediaConfig } from "@/configs";
import Link from "next/link";

const DynamicDestinationsSlider = dynamic(() => import("./DestinationSlider"), {
  ssr: false,
  loading: () => <div className="h-64 w-full bg-gray-200 animate-pulse"></div>,
});
export interface DestinationsListProps {
  label?: string;
}
export default async function DestinationsList({ label }: DestinationsListProps) {
  const locale = await getLocale();
  const initQueryParams = new FeDestinationContentQueryParams(undefined, 1, 10, {
    sortColumn: "id",
    direction: "desc",
  });

  const destinationContentList = await getDestinationContentList({
    ...initQueryParams,
    requestObject: {
      lang: locale as LangCode,
    },
  });
  type DestinationContentItem = { id: number; thumb?: string; title: string; slug: string };
  const itemList = destinationContentList?.reduce<DestinationContentItem[]>(
    (acc, item) => [
      ...acc,
      {
        id: item.id,
        title: item.title,
        thumb: item.thumbnail ? item.thumbnail.original : undefined,
        slug: item.slug,
      },
    ],
    [],
  );

  return (
    <div className="page-destination mb-12">
      <div className="container mx-auto lg:px-8 md:px-6 px-3">
        <div className="section__head pt-3 pb-3 lg:pb-6">
          <Title as="h3" className="uppercase">
            {label}
          </Title>
        </div>
        <div className="section__body">
          {itemList?.length ? (
            <DestinationsSlider>
              {itemList?.map((item) => (
                <div className="destination-card rounded-lg overflow-hidden">
                  <div className="destination-card__inner relative">
                    <div className="desctination-card__thumbnail relative w-full pt-[135%]">
                      {item.thumb ? (
                        <Image
                          src={`${mediaConfig.rootApiPath}/${item.thumb}`}
                          alt={item.title}
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
                      <Link href={`/destination/${item.slug}`}>
                        <h3 className="text-white text-base font-[500] line-clamp-2">{item.title}</h3>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </DestinationsSlider>
          ) : null}
        </div>
      </div>
    </div>
  );
}
