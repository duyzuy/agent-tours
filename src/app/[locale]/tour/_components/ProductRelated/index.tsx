import classNames from "classnames";
import { getTranslations } from "next-intl/server";
import { FeProductItem } from "@/models/fe/productItem.interface";
import { getProductListByTemplateCMSIdentity } from "@/app/[locale]/_actions/searchProduct";
import ProductListSlider, { ProductListSliderProps } from "@/components/frontend/ProductListSlider";
import { getLocale } from "next-intl/server";
import { formatDate } from "@/utils/date";
import { moneyFormatVND } from "@/utils/helper";
import { mediaConfig } from "@/configs";

export async function ProductRelated({
  className = "",
  cmsIdentityCode,
}: {
  className?: string;
  cmsIdentityCode: string;
}) {
  const t = await getTranslations("String");
  const locale = await getLocale();
  const productRelatedList = await getProductListByTemplateCMSIdentity(cmsIdentityCode, 20);

  const getLowestAdultPrice = (priceConfigs: FeProductItem["configs"]) => {
    if (!priceConfigs.length) {
      return;
    }
    let minPrice = priceConfigs[0].adult;
    priceConfigs.forEach((item) => {
      if (item.open > 0 && item.adult < minPrice) {
        minPrice = item.adult;
      }
    });

    return minPrice;
  };

  const productListFormated = productRelatedList?.reduce<Required<ProductListSliderProps>["items"]>(
    (acc, { template, configs, recId, sellableTemplateId, startDate, code, open }) => {
      const cmsContent = template.cms.find((item) => item.lang === locale);

      const lowestPrice = getLowestAdultPrice(configs);

      acc = [
        ...acc,
        {
          name: cmsContent?.name,
          thumbnail: `${mediaConfig.rootApiPath}/${cmsContent?.thumbnail.original}`,
          recId: recId,
          departDate: formatDate(startDate, "dd/MM/yyyy"),
          price: lowestPrice ? moneyFormatVND(lowestPrice) : undefined,
          href: cmsContent ? `/tour/${sellableTemplateId}/${recId}/${cmsContent.slug}` : "/",
          code: code,
          openAmount: open,
        },
      ];
      return acc;
    },
    [],
  );

  if (!productListFormated) {
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
      <ProductListSlider items={productListFormated} />
    </div>
  );
}
