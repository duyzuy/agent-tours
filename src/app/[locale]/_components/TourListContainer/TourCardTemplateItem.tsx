"use client";
import TourCard, { TourCardProps } from "@/components/frontend/TourCard";
import { mediaConfig } from "@/configs";
import { IFeTemplateProductItem } from "@/models/fe/productItem.interface";
import { formatDate, stringToDate } from "@/utils/date";
import { useMemo } from "react";
import duration from "dayjs/plugin/duration";
import dayjs from "dayjs";
import { getLowestPriceAvailable } from "@/utils/product";
import { useLocale } from "next-intl";

dayjs.extend(duration);
dayjs.duration(100);

interface TourCardTemplateItemProps {
  data: IFeTemplateProductItem;
}
const TourCardTemplateItem: React.FC<TourCardTemplateItemProps> = ({ data }) => {
  const locale = useLocale();
  const { sellables, cms } = data;

  const tourCMSContent = useMemo(() => {
    return cms.find((cmsItem) => cmsItem.lang === locale);
  }, [cms]);

  const sellableItem = useMemo(() => {
    return sellables[0];
  }, [sellables]);

  const otherDeparts = useMemo(() => {
    return sellables.map((item) => stringToDate(item.startDate).format("DD/MM"));
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

  const tourCardProps: TourCardProps["data"] = {
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
    <TourCard data={tourCardProps} shadow="none">
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

function TourCardTemplateItemSkeleton() {
  return (
    <div className="rounded-lg bg-white overflow-hidden">
      <div className="animate-pulse">
        <div className="bg-slate-100 rounded-sm w-full h-32 lg:h-48"></div>
        <div className="w-full pt-6 px-3 pb-3">
          <div className="h-2 bg-slate-100 rounded w-8 mb-6"></div>
          <div className="space-y-3 mb-8">
            <div className="h-6 bg-slate-100 rounded mb-6"></div>
            <div className="h-2 bg-slate-100 rounded w-24"></div>
            <div className="h-2 bg-slate-100 rounded w-20"></div>
          </div>
          <div className="flex justify-between gap-x-3">
            <div className="h-3 bg-slate-100 rounded w-1/3"></div>
            <div className="h-3 bg-slate-100 rounded flex-1"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default TourCardTemplateItem;
export { TourCardTemplateItemSkeleton };
