import { FeProductItem } from "@/models/fe/productItem.interface";
import TourCard from "@/components/frontend/TourCard";
import { mediaConfig } from "@/configs";
import { moneyFormatVND } from "@/utils/helper";
import { formatDate } from "@/utils/date";
import { useLocale } from "next-intl";
import React from "react";

interface ProductListEntryProps {
  items?: FeProductItem[];
}
const ProductListEntry: React.FC<ProductListEntryProps> = ({ items }) => {
  const locale = useLocale();
  console.log(locale);
  const getCmsContentByLang = (item: FeProductItem) => {
    return item.template.cms.find((cmsItem) => cmsItem.lang === locale);
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
    <>
      <div className="grid md:grid-cols-4 grid-cols-2">
        {items?.map((product) => (
          <TourCard
            key={product.recId}
            thumbnail={`${mediaConfig.rootApiPath}/${getCmsContentByLang(product)?.thumbnail.original}`}
            name={getCmsContentByLang(product)?.name}
            price={product.configs.length ? moneyFormatVND(getMinAdultPrice(product.configs)) : undefined}
            departDate={formatDate(product.startDate, "dd/MM/yyyy")}
            tourCode={product.template.code}
            openAmount={product.open}
            href={`/tour/${product.sellableTemplateId}/${product.recId}/${getCmsContentByLang(product)?.slug}`}
          />
        ))}
      </div>
    </>
  );
};
export default ProductListEntry;
