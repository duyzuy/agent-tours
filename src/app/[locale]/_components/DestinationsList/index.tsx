import type { Metadata, ResolvingMetadata } from "next";
import { LangCode } from "@/models/management/cms/language.interface";
import { notFound } from "next/navigation";

import { getDestinationContentList } from "../../_actions/destination";

import { mediaConfig } from "@/configs";
import { FeDestinationContentQueryParams } from "@/models/fe/destination.interface";
import { BreadCrumb } from "@/components/frontend/BreadCrumb";
import Image from "next/image";
import dynamic from "next/dynamic";
import { getLocale } from "next-intl/server";
import { Link } from "@/utils/navigation";
import Title from "@/components/frontend/Title";
import DestinationsSlider from "./DestinationSlider";

export default async function DestinationsList() {
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

  const itemList = destinationContentList?.reduce<{ id: number; thumb?: string; title: string; slug: string }[]>(
    (acc, item) => {
      acc = [
        ...acc,
        {
          id: item.id,
          title: item.title,
          thumb: item.thumbnail ? item.thumbnail.original : undefined,
          slug: item.slug,
        },
      ];
      return acc;
    },
    [],
  );

  return (
    <div className="page-destination mb-12">
      <div className="page-destination__head mb-6">
        <div className="container mx-auto lg:px-8 md:px-6 px-4">
          <Title as="h3">Điểm đến hấp dẫn</Title>
        </div>
      </div>
      <div className="container mx-auto lg:px-8 md:px-6 px-4">
        <DestinationsSlider items={itemList || []} />
      </div>
    </div>
  );
}
