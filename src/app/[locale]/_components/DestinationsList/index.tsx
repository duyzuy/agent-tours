import { LangCode } from "@/models/management/cms/language.interface";
import { getDestinationContentList } from "../../../../actions/destination";
import { FeDestinationContentQueryParams } from "@/models/fe/destination.interface";
import { getLocale } from "next-intl/server";
import Title from "@/components/frontend/Title";
import DestinationsSlider from "./DestinationSlider";

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
      <div className="container mx-auto lg:px-8 md:px-6 px-4">
        <div className="section__head pt-3 pb-3 lg:pb-6">
          <Title as="h3" className="uppercase">
            {label}
          </Title>
        </div>
        <div className="section__body">
          <DestinationsSlider items={itemList || []} />
        </div>
      </div>
    </div>
  );
}
