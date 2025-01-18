import { FeSearchTourQueryParams } from "@/models/fe/searchTour.interface";
import { getTemplateProductList } from "../../../actions/searchProduct";

import dynamic from "next/dynamic";
import { TourCardSkeleton } from "@/components/frontend/TourCard";

const DynamicTourCard = dynamic(() => import("@/components/frontend/TourCard"), {
  loading: () => <TourCardSkeleton />,
  ssr: false,
});

interface TourCardListContainerProps {
  querySearch: FeSearchTourQueryParams;
  title?: string;
}
const TourCardListContainer: React.FC<TourCardListContainerProps> = async ({ querySearch, title }) => {
  const productList = await getTemplateProductList(querySearch);

  return (
    <section className="tour__list-wraper">
      <div className="container mx-auto px-3 md:px-6 lg:px-8">
        <div className="section__head pb-3 lg:pb-6">
          <h3 className="text-xl lg:text-2xl font-[500] uppercase">{title}</h3>
        </div>
        {productList ? (
          <div className="tour__list-items grid lg:grid-cols-4 md:grid-cols-2 grid-cols-2 gap-3 lg:gap-4">
            {productList.map((tourItem) => (
              <DynamicTourCard
                key={tourItem.recId}
                templateId={tourItem.recId}
                tourCode={tourItem.code}
                sellables={tourItem.sellables}
                depart={tourItem.depart}
                cms={tourItem.cms}
                bordered={false}
              />
            ))}
          </div>
        ) : (
          <div>Không có tour nào khả dụng.</div>
        )}
      </div>
    </section>
  );
};
export default TourCardListContainer;
