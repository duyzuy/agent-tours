import { FeSearchTourQueryParams } from "@/models/fe/searchTour.interface";
import TourCard from "@/components/frontend/TourCard";

import { mediaConfig } from "@/configs";
import { FeProductItem } from "@/models/fe/productItem.interface";
import { moneyFormatVND } from "@/utils/helper";
import { formatDate } from "@/utils/date";
import { getProductList } from "../../_actions/searchProduct";
import { LangCode } from "@/models/management/cms/language.interface";
import { localeDefault } from "@/constants/locale.constant";
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
    const productResponse = await getProductList(querySearch);

    const { result: productList } = productResponse || {};

    const getCmsContentByLang = (item: FeProductItem) => {
        return item.template.cms.find((cmsItem) => cmsItem.lang === lang);
    };

    const getMinAdultPrice = (pricingList: FeProductItem["configs"]) => {
        let minPrice = 99999999999;
        pricingList.forEach((item) => {
            if (item.open > 0 && item.adult < minPrice) {
                minPrice = item.adult;
            }
        });

        return minPrice;
    };
    return (
        <section className="tour__list-wraper">
            <div className="container mx-auto px-3 md:px-6 lg:px-8">
                <div className="tour__list-head mb-6 font-[500]">
                    <h3 className="text-2xl">{title}</h3>
                </div>
                <div className="tour__list-items grid lg:grid-cols-4 grid-cols-2 gap-3 lg:gap-6">
                    {productList?.map((product) => (
                        <TourCard
                            key={product.recId}
                            thumbnail={`${mediaConfig.rootApiPath}/${
                                getCmsContentByLang(product)?.thumb
                            }`}
                            name={getCmsContentByLang(product)?.name}
                            price={
                                product.configs.length
                                    ? moneyFormatVND(
                                          getMinAdultPrice(product.configs),
                                      )
                                    : undefined
                            }
                            departDate={formatDate(
                                product.startDate,
                                "dd/MM/yyyy",
                            )}
                            tourCode={product.template.code}
                            openAmount={product.open}
                            href={`/tour/${product.sellableTemplateId}/${
                                product.recId
                            }/${getCmsContentByLang(product)?.slug}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};
export default TourListContainer;
