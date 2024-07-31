import { FeSearchTourQueryParams } from "@/models/fe/searchTour.interface";
import { getTemplateProductList } from "../../_actions/searchProduct";
import { LangCode } from "@/models/management/cms/language.interface";
import { localeDefault } from "@/constants/locale.constant";
import DispatchProductItem from "./DispatchProductItem";
import TourCardTemplateItem from "./TourCardTemplateItem";
interface TourListContainerProps {
  lang?: LangCode;
  querySearch: FeSearchTourQueryParams;
  title?: string;
}
const TourListContainer: React.FC<TourListContainerProps> = async ({
  lang = localeDefault.key,
  querySearch,
  title,
}) => {
  const productList = await getTemplateProductList(querySearch);

  return (
    <section className="tour__list-wraper">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="tour__list-head pt-8 pb-4">
          <h3 className="text-xl lg:text-2xl font-[500]">{title}</h3>
        </div>
        {/* <DispatchProductItem data={productList} /> */}
        <div className="tour__list-items grid lg:grid-cols-4 grid-cols-2 gap-3 lg:gap-6">
          {productList?.map((prd) => (
            <TourCardTemplateItem key={prd.recId} data={prd} lang={lang} />
          ))}
        </div>
      </div>
    </section>
  );
};
export default TourListContainer;
