import classNames from "classnames";
import { getTranslations } from "next-intl/server";
import { IFeTemplateProductItem } from "@/models/fe/productItem.interface";
import { getTemplateProductList } from "@/actions/searchProduct";
import ProductListSlider, { ProductListSliderProps } from "@/components/frontend/ProductListSlider";
import { getLocale } from "next-intl/server";
import { formatDate, stringToDate } from "@/utils/date";
import { mediaConfig } from "@/configs";
import { FeSearchTourQueryParams } from "@/models/fe/searchTour.interface";
import { EProductType } from "@/models/management/core/productType.interface";
import { isEmpty } from "lodash";
import { getLowestPriceAvailable } from "@/utils/product";
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

  const queryParams = new FeSearchTourQueryParams(
    { byTemplateCmsIdentity: cmsIdentityCode, byProductType: [EProductType.TOUR] },
    1,
    8,
  );

  const productList = await getTemplateProductList(queryParams);

  const productListCard = productList?.reduce<Required<ProductListSliderProps>["items"]>(
    (acc, { cms, code, sellables, recId }) => {
      const cmsContent = cms.find((item) => item.lang === locale);

      const sellableItem = sellables[0];

      const lowestPrice = sellableItem ? getLowestPriceAvailable(sellableItem.configs) : undefined;

      const durationDays = sellableItem
        ? stringToDate(sellableItem.endDate).diff(stringToDate(sellableItem.startDate), "day")
        : undefined;

      acc = [
        ...acc,
        {
          name: cmsContent?.name,
          thumbnail:
            cmsContent && cmsContent.thumbnail && !isEmpty(cmsContent.thumbnail.original)
              ? `${mediaConfig.rootApiPath}/${cmsContent?.thumbnail.original}`
              : undefined,
          recId: recId,
          departDate: sellableItem ? formatDate(sellableItem.startDate, "DD/MM/YYYY") : undefined,
          price: lowestPrice ? lowestPrice.adult : undefined,
          href: cmsContent && sellableItem ? `/tour/${recId}/${sellableItem.recId}/${cmsContent.slug}` : "/",
          tourCode: code,
          openAmount: sellableItem?.open,
          durationDays: durationDays,
          showPromotion: hasShowPromotion({
            promotionValidFrom: cmsContent?.promotionValidFrom,
            promotionValidTo: cmsContent?.promotionValidTo,
          }),
          promotion: {
            promotionImage: cmsContent?.promotionImage,
            promotionLabel: cmsContent?.promotionLabel,
            promotionLabelType: cmsContent?.promotionLabelType,
            promotionReferencePrice: cmsContent?.promotionReferencePrice,
            promotionValidFrom: cmsContent?.promotionValidFrom,
            promotionValidTo: cmsContent?.promotionValidTo,
          },
        },
      ];
      return acc;
    },
    [],
  );

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
      <ProductListSlider items={productListCard} />
    </div>
  );
}

const hasShowPromotion = ({
  promotionValidFrom,
  promotionValidTo,
}: {
  promotionValidFrom?: string;
  promotionValidTo?: string;
}) => {
  const now = dayjs();
  if (!promotionValidTo || !promotionValidFrom) return false;

  if (now.isBefore(stringToDate(promotionValidFrom)) || now.isAfter(stringToDate(promotionValidTo))) {
    return false;
  }
  return true;
};
