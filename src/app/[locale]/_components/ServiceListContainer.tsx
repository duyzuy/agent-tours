import { FeSearchTourQueryParams } from "@/models/fe/searchTour.interface";
import { getTemplateServiceList } from "../../../actions/searchProduct";
import { isMobile } from "@/utils/detectMobile";
import TourCardV2 from "@/components/frontend/TourCardV2";
interface ServiceListContainerProps {
  querySearch: FeSearchTourQueryParams;
  title?: string;
}
const ServiceListContainer: React.FC<ServiceListContainerProps> = async ({ querySearch, title }) => {
  const productList = await getTemplateServiceList(querySearch);

  console.log({ productList, querySearch: JSON.stringify(querySearch) });
  if (!productList?.length) return null;

  return (
    <section className="tour__list-wraper">
      <div className="container mx-auto px-3 md:px-6 lg:px-8">
        <div className="section__head pb-3 lg:pb-6">
          <h3 className="text-xl lg:text-2xl font-[500] uppercase">{title}</h3>
        </div>
        {productList ? (
          <TourListWraper isMobile={isMobile()}>
            {productList.map((tourItem) => (
              <TourCardV2
                key={tourItem.recId}
                data={tourItem}
                className={isMobile() ? "w-[280px] min-w-[280px]" : ""}
              />
            ))}
          </TourListWraper>
        ) : (
          <div>Không có tour nào khả dụng.</div>
        )}
      </div>
    </section>
  );
};
export default ServiceListContainer;

const TourListWraper = ({ isMobile, children }: { isMobile: boolean; children?: React.ReactNode }) => {
  return isMobile ? (
    <div className="flex gap-x-3 w-full overflow-x-auto pb-3">{children}</div>
  ) : (
    <div className="tour__list-items grid lg:grid-cols-4 md:grid-cols-2 grid-cols-2 gap-3 lg:gap-4">{children}</div>
  );
};
