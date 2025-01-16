import { FeSearchTourQueryParams } from "@/models/fe/searchTour.interface";
import { getTemplateProductList } from "../../../../actions/searchProduct";
import { LangCode } from "@/models/management/cms/language.interface";
import { localeDefault } from "@/constants/locale.constant";
import TourCardTemplateItem, { TourCardTemplateItemSkeleton } from "./TourCardTemplateItem";
import dynamic from "next/dynamic";

const DynamicTourCardItem = dynamic(() => import("./TourCardTemplateItem"), {
  loading: () => <TourCardTemplateItemSkeleton />,
  ssr: false,
});

interface TourListContainerProps {
  querySearch: FeSearchTourQueryParams;
  title?: string;
}
const TourListContainer: React.FC<TourListContainerProps> = async ({ querySearch, title }) => {
  const productList = await getTemplateProductList(querySearch);
  return (
    <section className="tour__list-wraper">
      <div className="container mx-auto px-3 md:px-6 lg:px-8">
        <div className="section__head pb-3 lg:pb-6">
          <h3 className="text-xl lg:text-2xl font-[500] uppercase">{title}</h3>
        </div>
        {productList ? (
          <div className="tour__list-items grid lg:grid-cols-4 md:grid-cols-2 grid-cols-2 gap-3 lg:gap-4">
            {productList.map((prd) => (
              <DynamicTourCardItem key={prd.recId} data={prd} />
            ))}
          </div>
        ) : (
          <div>Không có tour nào khả dụng.</div>
        )}
      </div>
    </section>
  );
};
export default TourListContainer;
