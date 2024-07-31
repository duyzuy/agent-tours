import classNames from "classnames";
import { getTranslations } from "next-intl/server";
import { FeProductItem, IFeTemplateProductItem } from "@/models/fe/productItem.interface";
import { getTemplateProductList } from "@/app/[locale]/_actions/searchProduct";
import ProductListSlider, { ProductListSliderProps } from "@/components/frontend/ProductListSlider";
import { getLocale } from "next-intl/server";
import { formatDate } from "@/utils/date";
import { moneyFormatVND } from "@/utils/helper";
import { mediaConfig } from "@/configs";
import { FeSearchTourQueryParams } from "@/models/fe/searchTour.interface";
import { EProductType } from "@/models/management/core/productType.interface";
import dayjs from "dayjs";

export async function ProductRelated({
  className = "",
  cmsIdentityCode,
}: {
  className?: string;
  cmsIdentityCode: string;
}) {
  const t = await getTranslations("String");
  const locale = await getLocale();
  // const productRelatedList = await getProductListByTemplateCMSIdentity(cmsIdentityCode, 20);

  const queryParams = new FeSearchTourQueryParams(
    { byTemplateCmsIdentity: cmsIdentityCode, byProductType: [EProductType.TOUR] },
    1,
    6,
  );

  const productRelatedList = await getTemplateProductList(queryParams);

  // const getLowestAdultPrice = (priceConfigs: FeProductItem["configs"]) => {
  //   if (!priceConfigs.length) {
  //     return;
  //   }
  //   let minPrice = priceConfigs[0].adult;
  //   priceConfigs.forEach((item) => {
  //     if (item.open > 0 && item.adult < minPrice) {
  //       minPrice = item.adult;
  //     }
  //   });

  //   return minPrice;
  // };

  const getMinAdultPrice = (configPrices: IFeTemplateProductItem["sellables"][0]["configs"]) => {
    if (!configPrices.length) return;
    let minPrice = configPrices[0].adult;
    configPrices.forEach((item) => {
      if (item.open > 0 && item.adult < minPrice) {
        minPrice = item.adult;
      }
    });

    return minPrice;
  };

  const getSellableItem = (sellables: IFeTemplateProductItem["sellables"]) => {
    if (!sellables.length) return;

    let sellableItem = sellables[0];

    sellables.forEach((item) => {
      if (dayjs(item.startDate).isBefore(sellableItem.startDate)) {
        sellableItem = item;
      }
      if (dayjs(item.startDate).isSame(sellableItem.startDate)) {
        if (dayjs(item.validFrom).isBefore(sellableItem.validFrom)) {
          sellableItem = item;
        }
      }
    });
    return sellableItem;
  };

  const productListFormated = productRelatedList?.reduce<Required<ProductListSliderProps>["items"]>(
    (acc, { cms, code, sellables, recId }) => {
      const cmsContent = cms.find((item) => item.lang === locale);

      const sellableItem = getSellableItem(sellables);

      const lowestPrice = sellableItem ? getMinAdultPrice(sellableItem.configs) : undefined;
      acc = [
        ...acc,
        {
          name: cmsContent?.name,
          thumbnail: `${mediaConfig.rootApiPath}/${cmsContent?.thumbnail.original}`,
          recId: recId,
          departDate: sellableItem ? formatDate(sellableItem.startDate, "dd/MM/yyyy") : undefined,
          price: lowestPrice ? moneyFormatVND(lowestPrice) : undefined,
          href: cmsContent && sellableItem ? `/tour/${recId}/${sellableItem.recId}/${cmsContent.slug}` : "/",
          code: code,
          openAmount: sellableItem?.open,
        },
      ];
      return acc;
    },
    [],
  );
  // const productListFormated = productRelatedList?.reduce<Required<ProductListSliderProps>["items"]>(
  //   (acc, { template, configs, recId, sellableTemplateId, startDate, code, open }) => {
  //     const cmsContent = template.cms.find((item) => item.lang === locale);

  //     const lowestPrice = getLowestAdultPrice(configs);

  //     acc = [
  //       ...acc,
  //       {
  //         name: cmsContent?.name,
  //         thumbnail: `${mediaConfig.rootApiPath}/${cmsContent?.thumbnail.original}`,
  //         recId: recId,
  //         departDate: formatDate(startDate, "dd/MM/yyyy"),
  //         price: lowestPrice ? moneyFormatVND(lowestPrice) : undefined,
  //         href: cmsContent ? `/tour/${sellableTemplateId}/${recId}/${cmsContent.slug}` : "/",
  //         code: code,
  //         openAmount: open,
  //       },
  //     ];
  //     return acc;
  //   },
  //   [],
  // );

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
