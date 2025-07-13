import React, { PropsWithChildren } from "react";
import classNames from "classnames";
import { useLocale } from "next-intl";
import { mediaConfig } from "@/configs";
import duration from "dayjs/plugin/duration";

import dayjs from "dayjs";
import { getLowestPriceAvailable } from "@/utils/product";
import { Link } from "@/utils/navigation";

import { IFeTemplateProductItem } from "@/models/fe/productItem.interface";
import { LangCode } from "@/models/management/cms/language.interface";
import TourCardDurationDays from "./TourCardDuration";
import TourCardThumbnail from "./TourCardThumbnail";
import TourCardFooter from "./TourCardFooter";
import TourCardPricing from "./TourCardPricing";
import TourCardBadgetPromotion from "./TourCardBadgetPromotion";
import TourCardInformation from "./TourCardInformation";
import { stringToDate } from "@/utils/date";
import { TourCardContextProvider, TourCardDataContextApi } from "./TourCard.context";

dayjs.extend(duration);
dayjs.duration(100);

type TourCardBase = {
  children?: React.ReactNode;
  className?: string;
};
export interface TourCardCompound {
  Head: React.FC<TourCardBase>;
  Body: React.FC<TourCardBase>;
  Footer: React.FC<TourCardBase>;
  Price: React.FC<TourCardBase>;
  Title: React.FC<TourCardBase>;
  Badget: React.FC<TourCardBase>;
  Thumbnail: React.FC<TourCardBase>;
  Information: React.FC<TourCardBase>;
  Days: React.FC<TourCardBase>;
}

export type TourCardProps = PropsWithChildren & {
  templateId: number;
  tourCode: string;
  sellables: IFeTemplateProductItem["sellables"];
  cms: IFeTemplateProductItem["cms"];
  depart?: IFeTemplateProductItem["depart"];
  className?: string;
  shadow?: "none" | "sm" | "md" | "lg";
  bordered?: boolean;
};

const TourCard = ({
  sellables,
  cms,
  templateId,
  depart,
  tourCode,
  bordered = true,
  shadow = "none",
  className = "",
}: TourCardProps) => {
  const locale = useLocale();
  const sellableItem = [...sellables].shift();

  const tourCardContentByLanguage = cms.find((item) => item.lang === locale);

  const otherDeparts = sellables.map((item) => {
    const dateStr = stringToDate(item.startDate)?.format("DD/MM");
    return dateStr ?? "";
  });
  const tourCardProps: TourCardDataContextApi = {
    tourCode: tourCode,
    thumbnailUrl:
      tourCardContentByLanguage && tourCardContentByLanguage.thumbnail
        ? `${mediaConfig.rootApiPath}/${tourCardContentByLanguage?.thumbnail.original}`
        : undefined,
    name: tourCardContentByLanguage?.name,
    price: sellableItem?.configs ? getLowestPriceAvailable(sellableItem.configs)?.adult : undefined,
    openAmount: sellableItem?.open,
    href: sellableItem?.recId ? `/tour/${templateId}/${sellableItem.recId}/${tourCardContentByLanguage?.slug}` : "/",
    otherDepartDate: otherDeparts,
    startDate: sellableItem?.startDate,
    endDate: sellableItem?.endDate,
    departLocation: locale === LangCode.VI ? depart?.name_vi : depart?.name_en,
    promotion: {
      promotionImage: tourCardContentByLanguage?.promotionImage,
      promotionLabel: tourCardContentByLanguage?.promotionLabel,
      promotionLabelType: tourCardContentByLanguage?.promotionLabelType,
      promotionReferencePrice: tourCardContentByLanguage?.promotionReferencePrice,
      promotionValidTo: tourCardContentByLanguage?.promotionValidTo,
      promotionValidFrom: tourCardContentByLanguage?.promotionValidFrom,
    },
  };

  return (
    <TourCardContextProvider data={{ ...tourCardProps }}>
      <div
        className={classNames("tour-card", {
          [className]: className,
        })}
      >
        <div
          className={classNames("inner bg-white rounded-lg overflow-hidden h-full", {
            "shadow-sm": shadow === "sm",
            "shadow-md": shadow === "md",
            "shadow-lg": shadow === "lg",
            border: bordered,
          })}
        >
          <div className="tour-card__head relative">
            <TourCardThumbnail />
            <TourCardBadgetPromotion />
          </div>
          <div className="tour-card__body px-3 lg:px-4 py-3 rounded-bl-xl rounded-br-xl bg-white flex flex-col">
            <Link href={tourCardProps.href} className="text-main-400 text-[15px]">
              <h3 className="line-clamp-2 h-10 lg:h-12 leading-5 lg:leading-6 font-[500] text-main-400 text-sm lg:text-[16px]">
                {tourCardProps.name}
              </h3>
            </Link>
            <TourCardPricing className="mb-2" />
            <TourCardDurationDays className="mb-3" />
            <TourCardInformation />
          </div>
        </div>
      </div>
    </TourCardContextProvider>
  );
};

// const CardTitle: TourCardCompound["Title"] = () => {
//   const { href, name } = useTourCardContext();
//   return (
//     <Link href={href} className="text-main-400 text-[15px]">
//       <h3 className="line-clamp-2 h-10 lg:h-12 leading-5 lg:leading-6 font-[500] text-main-400 text-sm lg:text-[16px]">
//         {name}
//       </h3>
//     </Link>
//   );
// };

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
// TourCard.Price = TourCardPricing;
// TourCard.Badget = TourCardBadgetPromotion;
// // TourCardWraper.Title = CardTitle;
// TourCard.Information = TourCardInformation;
// TourCard.Footer = TourCardFooter;
// TourCard.Thumbnail = TourCardThumbnail;
// TourCard.Days = TourCardDurationDays;

export { TourCardSkeleton };
export default TourCard;
