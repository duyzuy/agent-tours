"use client";
import TourCard, { TourCardProps } from "@/components/frontend/TourCard";
import { mediaConfig } from "@/configs";
import { IFeTemplateProductItem } from "@/models/fe/productItem.interface";
import { LangCode } from "@/models/management/cms/language.interface";
import { formatDate, stringToDate } from "@/utils/date";
import { useMemo } from "react";
import duration from "dayjs/plugin/duration";
import dayjs from "dayjs";
import { getLowestPriceAvailable } from "@/utils/product";
dayjs.extend(duration);
dayjs.duration(100);

interface TourCardTemplateItemProps {
  data: IFeTemplateProductItem;
  lang?: LangCode;
}
const TourCardTemplateItem: React.FC<TourCardTemplateItemProps> = ({ data, lang }) => {
  const { sellables, cms } = data;

  const tourCMSContent = useMemo(() => {
    return cms.find((cmsItem) => cmsItem.lang === lang);
  }, [cms]);

  const sellableItem = useMemo(() => {
    return sellables[0];
  }, [sellables]);

  const otherDeparts = useMemo(() => {
    return sellables.map((item) => stringToDate(item.startDate).format("DD/MM")).splice(1);
  }, [sellables]);

  const durationDays = useMemo(() => {
    if (!sellableItem) return;
    return stringToDate(sellableItem.endDate).diff(stringToDate(sellableItem.startDate), "day");
  }, [sellableItem]);

  const isShowPromotion = useMemo(() => {
    const now = dayjs();
    if (!tourCMSContent || !tourCMSContent?.promotionValidTo || !tourCMSContent?.promotionValidFrom) return false;

    if (
      now.isBefore(stringToDate(tourCMSContent.promotionValidFrom)) ||
      now.isAfter(stringToDate(tourCMSContent.promotionValidTo))
    ) {
      return false;
    }
    return true;
  }, [tourCMSContent]);

  const cardDataProps: TourCardProps["data"] = {
    tourCode: data.code,
    thumbnail:
      tourCMSContent && tourCMSContent.thumbnail
        ? `${mediaConfig.rootApiPath}/${tourCMSContent?.thumbnail.original}`
        : undefined,
    name: tourCMSContent?.name,
    price: sellableItem?.configs ? getLowestPriceAvailable(sellableItem.configs)?.adult : undefined,
    departDate: sellableItem ? formatDate(sellableItem.startDate, "DD/MM/YYYY") : undefined,
    openAmount: sellableItem?.open,
    href: sellableItem?.recId ? `/tour/${data.recId}/${sellableItem.recId}/${tourCMSContent?.slug}` : "/",
    otherDepartDate: otherDeparts,
    durationDays: durationDays,
    showPromotion: isShowPromotion,
    promotion: {
      promotionImage: tourCMSContent?.promotionImage,
      promotionLabel: tourCMSContent?.promotionLabel,
      promotionLabelType: tourCMSContent?.promotionLabelType,
      promotionReferencePrice: tourCMSContent?.promotionReferencePrice,
      promotionValidTo: tourCMSContent?.promotionValidTo,
      promotionValidFrom: tourCMSContent?.promotionValidFrom,
    },
  };

  return (
    <TourCard data={cardDataProps} shadow="none">
      <TourCard.Head>
        <TourCard.Thumbnail />
        <TourCard.Badget />
      </TourCard.Head>
      <TourCard.Body>
        <TourCard.Title />
        <TourCard.Price className="mb-2" />
        <TourCard.Days className="mb-3" />
        <TourCard.Information />
      </TourCard.Body>
    </TourCard>
  );
};
export default TourCardTemplateItem;
