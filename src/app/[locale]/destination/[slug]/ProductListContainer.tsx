import { FeSearchTourQueryParams } from "@/models/fe/searchTour.interface";
import { EProductType } from "@/models/management/core/productType.interface";
import { ILocalSearchDestination } from "@/models/management/localSearchDestination.interface";
import { getTemplateProductList } from "../../../../actions/searchProduct";
import { TourCardSkeleton } from "@/components/frontend/TourCard";

import { getLocale } from "next-intl/server";
import { LangCode } from "@/models/management/cms/language.interface";
import { IconPlanet } from "@/assets/icons";
import { Link } from "@/utils/navigation";
import dynamic from "next/dynamic";

const DynamicTourCardItem = dynamic(() => import("@/components/frontend/TourCard"), {
  loading: () => <>loading</>,
  ssr: true,
});

interface ProductListContainerProps {
  destinations?: ILocalSearchDestination[];
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

  return !productList || !productList.length ? (
    <div className="empty py-6 flex items-center justify-center">
      <div className="inner text-center">
        <IconPlanet className="w-36 h-36 mx-auto" />
        <p>Hiện chưa có tour nào cho điểm đến này</p>
        <Link href={"/"}>Về trang chủ</Link>
      </div>
    </div>
  ) : (
    <div className="product-list grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
      {productList?.map((product) => (
        <DynamicTourCardItem
          key={product.recId}
          templateId={product.recId}
          tourCode={product.code}
          sellables={product.sellables}
          depart={product.depart}
          cms={product.cms}
        />
      ))}
    </div>
  );
}
