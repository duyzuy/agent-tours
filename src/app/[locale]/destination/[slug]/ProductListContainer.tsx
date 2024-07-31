import { FeSearchTourQueryParams } from "@/models/fe/searchTour.interface";
import { EProductType } from "@/models/management/core/productType.interface";
import { ILocalSeachDestination } from "@/models/management/localSearchDestination.interface";
import { getTemplateProductList } from "../../_actions/searchProduct";
import TourCardTemplateItem from "../../_components/TourListContainer/TourCardTemplateItem";
import { getLocale } from "next-intl/server";
import { LangCode } from "@/models/management/cms/language.interface";
interface ProductListContainerProps {
  destinations?: ILocalSeachDestination[];
}
export default async function ProductListContainer({ destinations }: ProductListContainerProps) {
  const locale = await getLocale();

  const destList = destinations?.reduce<Required<Required<FeSearchTourQueryParams>["requestObject"]>["byDest"]>(
    (acc, item) => {
      acc = [
        ...acc,
        {
          countryKey: item.countryKey,
          stateProvinceKey: item.stateProvinceKey,
          keyType: item.keyType,
          regionKey: item.regionKey,
          subRegionKey: item.subRegionKey,
        },
      ];
      return acc;
    },
    [],
  );

  const initQueryParams = new FeSearchTourQueryParams(
    {
      byProductType: [EProductType.TOUR],
      byDest: destList,
    },
    1,
    20,
  );

  const productList = await getTemplateProductList(initQueryParams);

  return (
    <div className="product-list grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
      {productList?.map((prd) => (
        <TourCardTemplateItem key={prd.recId} data={prd} lang={locale as LangCode} />
      ))}
    </div>
  );
}
