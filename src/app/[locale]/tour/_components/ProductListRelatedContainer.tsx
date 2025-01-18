import classNames from "classnames";
import { getTranslations } from "next-intl/server";
import { getTemplateProductList } from "@/actions/searchProduct";
import ProductListSlider, { ProductListSliderProps } from "@/components/frontend/ProductListSlider";
import { getLocale } from "next-intl/server";

import { FeSearchTourQueryParams } from "@/models/fe/searchTour.interface";
import { EProductType } from "@/models/management/core/productType.interface";

export async function ProductListRelatedContainer({
  className = "",
  cmsIdentityCode,
}: {
  className?: string;
  cmsIdentityCode: string;
}) {
  const t = await getTranslations("String");

  const queryParams = new FeSearchTourQueryParams(
    { byTemplateCmsIdentity: cmsIdentityCode, byProductType: [EProductType.TOUR] },
    1,
    8,
  );

  const productList = await getTemplateProductList(queryParams);

  if (!productList || !productList.length) {
    return null;
  }
  return (
    <div
      className={classNames("product-related", {
        [className]: className,
      })}
    >
      <div className="header py-3 mb-3">
        <h4 className="text-2xl font-semibold text-primary-default">{t("productRelated.title")}</h4>
      </div>
      <ProductListSlider items={productList} />
    </div>
  );
}
