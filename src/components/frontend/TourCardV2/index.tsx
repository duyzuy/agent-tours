import React, { PropsWithChildren } from "react";
import classNames from "classnames";
import { useLocale } from "next-intl";
import { mediaConfig } from "@/configs";
import { getLowestPriceAvailable } from "@/utils/product";

import { IFeTemplateProductItem } from "@/models/fe/productItem.interface";
import { LangCode } from "@/models/management/cms/language.interface";
import TourCardDurationDays from "./TourCardDuration";
import TourCardThumbnail from "./TourCardThumbnail";
import TourCardPricing, { TourCardPricingProps } from "./TourCardPricing";
import TourCardBadgetPromotion from "./TourCardBadgetPromotion";
import TourCardInformation from "./TourCardInformation";
import { stringToDate } from "@/utils/date";
import { TourCardDataContextApi } from "./TourCard.context";
import TourCardTitle from "./TourCardTitle";

export type TourCardV2Props = PropsWithChildren & {
  data: IFeTemplateProductItem;
  className?: string;
  shadow?: "none" | "sm" | "md" | "lg";
  bordered?: boolean;
};

const TourCardV2 = ({ data, bordered = true, shadow = "none", className = "" }: TourCardV2Props) => {
  const { cms, sellables, depart, recId, code } = data;

  const locale = useLocale();
  const sellableItem = [...sellables].shift();

  const tourCardContentByLanguage = cms.find((item) => item.lang === locale);

  const otherDeparts = sellables.map((item) => {
    const dateStr = stringToDate(item.startDate)?.format("DD/MM");
    return dateStr ?? "";
  });

  const promotionContent: TourCardPricingProps["promotion"] = {
    promotionImage: tourCardContentByLanguage?.promotionImage,
    promotionLabel: tourCardContentByLanguage?.promotionLabel,
    promotionLabelType: tourCardContentByLanguage?.promotionLabelType,
    promotionReferencePrice: tourCardContentByLanguage?.promotionReferencePrice,
    promotionValidTo: tourCardContentByLanguage?.promotionValidTo,
    promotionValidFrom: tourCardContentByLanguage?.promotionValidFrom,
  };
  const tourPrice = sellableItem?.configs ? getLowestPriceAvailable(sellableItem.configs)?.adult : undefined;

  const tourCardProps: TourCardDataContextApi = {
    tourCode: code,
    thumbnailUrl:
      tourCardContentByLanguage && tourCardContentByLanguage.thumbnail
        ? `${mediaConfig.rootApiPath}/${tourCardContentByLanguage?.thumbnail.original}`
        : undefined,
    name: tourCardContentByLanguage?.name || "",
    openAmount: sellableItem?.open,
    href: sellableItem?.recId ? `/tour/${recId}/${sellableItem.recId}/${tourCardContentByLanguage?.slug}` : "/",
    otherDepartDate: otherDeparts,
    startDate: sellableItem?.startDate,
    endDate: sellableItem?.endDate,
    departLocation: locale === LangCode.VI ? depart?.name_vi : depart?.name_en,
  };

  return (
    <div
      className={classNames("tour-card", {
        [className]: className,
      })}
    >
      <div
        className={classNames("inner bg-white rounded-2xl overflow-hidden h-full", {
          "shadow-sm": shadow === "sm",
          "shadow-md": shadow === "md",
          "shadow-lg": shadow === "lg",
          border: bordered,
        })}
      >
        <div className="tour-card__head relative p-2">
          <TourCardThumbnail thumbnailUrl={tourCardProps.thumbnailUrl} alt={tourCardProps.name} />
          <TourCardBadgetPromotion promotion={promotionContent} />
        </div>
        <div className="tour-card__body px-3 lg:px-4 py-3 rounded-bl-xl rounded-br-xl bg-white flex flex-col">
          <TourCardTitle name={tourCardProps.name} href={tourCardProps.href} className="mb-3" />
          <TourCardPricing promotion={promotionContent} price={tourPrice} className="mb-2" />
          <TourCardDurationDays
            startDate={tourCardProps.startDate}
            endDate={tourCardProps.endDate}
            departLocation={tourCardProps.departLocation}
            className="mb-3"
          />
          <TourCardInformation
            tourCode={tourCardProps.tourCode}
            startDate={tourCardProps.startDate}
            openAmount={tourCardProps.openAmount}
            otherDepartDate={tourCardProps.otherDepartDate}
          />
        </div>
      </div>
    </div>
  );
};

function TourCardSkeleton() {
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

export { TourCardSkeleton };
export default TourCardV2;
