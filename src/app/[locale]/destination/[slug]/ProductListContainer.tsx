import { FeSearchTourQueryParams } from "@/models/fe/searchTour.interface";
import { EProductType } from "@/models/management/core/productType.interface";
import { ILocalSeachDestination } from "@/models/management/localSearchDestination.interface";
import { getTemplateProductList } from "../../_actions/searchProduct";
import TourCardTemplateItem from "../../_components/TourListContainer/TourCardTemplateItem";
import { getLocale } from "next-intl/server";
import { LangCode } from "@/models/management/cms/language.interface";
import IconEmptyBox from "@/assets/icons/IconEmptyBox";
import { IconPlanet } from "@/assets/icons";
import { Link } from "@/utils/navigation";
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
      {productList?.map((prd) => (
        <TourCardTemplateItem key={prd.recId} data={prd} lang={locale as LangCode} />
      ))}
    </div>
  );
}
