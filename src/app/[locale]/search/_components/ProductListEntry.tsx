import { FeProductItem, IFeTemplateProductItem } from "@/models/fe/productItem.interface";

import { useLocale } from "next-intl";
import React from "react";
import TourCardTemplateItem from "../../_components/TourListContainer/TourCardTemplateItem";
import { LangCode } from "@/models/management/cms/language.interface";

interface ProductListEntryProps {
  items?: IFeTemplateProductItem[];
}
const ProductListEntry: React.FC<ProductListEntryProps> = ({ items }) => {
  const locale = useLocale();

  return (
    <>
      <div className="grid md:grid-cols-4 grid-cols-2 gap-4 lg:gap-6">
        {items?.map((product) => (
          <TourCardTemplateItem key={product.recId} data={product} lang={locale as LangCode} />
        ))}
      </div>
    </>
  );
};
export default ProductListEntry;
