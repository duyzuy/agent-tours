"use client";
import React, { createContext, PropsWithChildren, useContext, useMemo } from "react";
import Image from "next/image";

import classNames from "classnames";
import { useLocale, useTranslations } from "next-intl";

import { getLabelHotDealIcon } from "@/constants/icons.constant";
import { Space, Tag } from "antd";

import { mediaConfig } from "@/configs";
import duration from "dayjs/plugin/duration";

import dayjs from "dayjs";
import { IconCalendarRange, IconImage, IconStar, IconHeart, IconShare, IconMapPin, IconPlane } from "@/assets/icons";
import { getLowestPriceAvailable } from "@/utils/product";
import { formatDate, stringToDate } from "@/utils/date";
import { Link } from "@/utils/navigation";

import { moneyFormatVND } from "@/utils/helper";
import { IFeTemplateProductItem } from "@/models/fe/productItem.interface";
import { LangCode } from "@/models/management/cms/language.interface";

dayjs.extend(duration);
dayjs.duration(100);

type TourCardBase = {
  children?: React.ReactNode;
  className?: string;
};
interface TourCardCompound {
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
interface TourCardDataContext {
  recId?: number;
  name?: string;
  thumbnailUrl?: string;
  href: string;
  tourCode: string;
  startDate?: string;
  endDate?: string;
  openAmount?: number;
  price?: number;
  otherDepartDate?: string[];
  departLocation?: string;
  promotion?: {
    promotionImage?: string;
    promotionLabel?: string;
    promotionLabelType?: "text" | "image" | "";
    promotionReferencePrice?: number;
    promotionValidFrom?: string;
    promotionValidTo?: string;
  };
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

const TourCardContext = createContext<TourCardDataContext | undefined>(undefined);

const useTourCardContext = () => {
  const context = useContext(TourCardContext);
  if (!context) {
    throw new Error("Hook must use in TourCardContext Provider");
  }
  return context;
};

const TourCard = ({
  sellables,
  cms,
  templateId,
  depart,
  tourCode,
  bordered = true,
  shadow = "none",
  className,
}: TourCardProps) => {
  const locale = useLocale();
  const sellableItem = [...sellables].shift();

  const tourCardContentByLanguage = useMemo(() => {
    return cms.find((item) => item.lang === locale);
  }, [cms]);

  const otherDeparts = useMemo(() => {
    return sellables.map((item) => {
      const dateStr = stringToDate(item.startDate)?.format("DD/MM");
      return dateStr ?? "";
    });
  }, [sellables]);

  const tourCardProps: TourCardWraperProps = {
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
    <TourCardWraper bordered={bordered} shadow={shadow} className={className} {...tourCardProps}>
      <div className="tour-card__head relative">
        <TourCardWraper.Thumbnail />
        <TourCardWraper.Badget />
      </div>
      <div className="tour-card__body px-3 lg:px-4 py-3 rounded-bl-xl rounded-br-xl bg-white flex flex-col">
        <TourCardWraper.Title />
        <TourCardWraper.Price className="mb-2" />
        <TourCardWraper.Days className="mb-3" />
        <TourCardWraper.Information />
      </div>
    </TourCardWraper>
  );
};

type TourCardWraperProps = TourCardDataContext & {
  children?: React.ReactNode;
  className?: string;
  shadow?: "none" | "sm" | "md" | "lg";
  bordered?: boolean;
};
const TourCardWraper = ({ shadow, bordered, className = "", children, ...rest }: TourCardWraperProps) => {
  return (
    <TourCardContext.Provider value={{ ...rest }}>
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
          {children}
        </div>
      </div>
    </TourCardContext.Provider>
  );
};

const CardFooter: TourCardCompound["Footer"] = () => {
  return (
    <div className="article-bottom py-2 text-[11px] border-t mt-2">
      <div className="flex items-center justify-between">
        <div className="left flex items-center">
          <IconStar fill="#F2C94C" stroke="#F2C94C" className="w-[14px]" />
          <span className="mx-2 w-[1px] h-[8px] block bg-gray-400"></span>
          <span className="text-main-400">Tuyệt vời</span>
        </div>
        <div className="right flex items-center">
          {/* <span>634 quan tâm</span>
          <span className="mx-2 w-[1px] h-[8px] block bg-gray-400"></span> */}
          <div className="flex items-center gap-x-2">
            <span>
              <IconHeart className="w-[14px]" />
            </span>
            <span>
              <IconShare className="w-[14px]" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const CardDurationDays: TourCardCompound["Days"] = ({ className = "" }) => {
  const { startDate, endDate, departLocation } = useTourCardContext();
  const t = useTranslations("String");

  const durationDays = useMemo(() => {
    if (!startDate || !endDate) return;
    return stringToDate(endDate)?.diff(stringToDate(startDate), "day");
  }, [startDate, endDate]);

  return (
    <div
      className={classNames("flex flex-wrap gap-x-3 gap-y-1", {
        [className]: className,
      })}
    >
      {departLocation ? (
        <Space>
          <IconPlane className="w-4 h-4" />
          {departLocation}
        </Space>
      ) : null}
      {durationDays ? (
        <Space>
          <IconCalendarRange className="w-4 h-4" />
          {t("card.durationDayValues", { day: durationDays, night: durationDays - 1 })}
        </Space>
      ) : null}
    </div>
  );
};

const CardPrice: TourCardCompound["Price"] = ({ className = "" }) => {
  const t = useTranslations("String");
  const { promotion, price } = useTourCardContext();

  const { promotionValidTo, promotionValidFrom, promotionReferencePrice } = promotion || {};
  const now = dayjs();

  const showPromotion = useMemo(() => {
    if (!promotionValidTo || !promotionValidFrom) return false;
    if (now.isBefore(stringToDate(promotionValidFrom)) || now.isAfter(stringToDate(promotionValidTo))) {
      return false;
    }
    return true;
  }, [promotionValidTo, promotionValidFrom]);

  return (
    <div
      className={classNames("price no-price", {
        [className]: className,
      })}
    >
      {!price ? (
        <p className="text-[16px] lg:text-lg">{t("card.contact")}</p>
      ) : promotionReferencePrice && promotionReferencePrice > price && showPromotion ? (
        <>
          <span className="text-red-600 text-[16px] lg:text-lg font-[500] block">{moneyFormatVND(price)}</span>
          <span className="line-through text-[12px] lg:text-[14px] opacity-60 block">
            {moneyFormatVND(promotionReferencePrice)}
          </span>
        </>
      ) : (
        <p className="text-red-600 text-[16px] lg:text-lg font-[500]">{moneyFormatVND(price)}</p>
      )}
    </div>
  );
};

const CardBadgetPromotion: TourCardCompound["Badget"] = () => {
  const { promotion } = useTourCardContext();

  const { promotionLabelType, promotionLabel, promotionImage, promotionValidTo, promotionValidFrom } = promotion || {};
  const now = dayjs();
  const IconEl = getLabelHotDealIcon(promotionImage)?.icon;

  const showPromotion = useMemo(() => {
    if (!promotionValidTo || !promotionValidFrom) return false;
    if (now.isBefore(stringToDate(promotionValidFrom)) || now.isAfter(stringToDate(promotionValidTo))) {
      return false;
    }
    return true;
  }, [promotionValidFrom, promotionValidTo]);

  return (
    <>
      {showPromotion && promotionLabelType === "text" ? (
        <span className="absolute z-10 w-24 h-24 -top-12 -right-6 bg-rose-600 rounded-full">
          <span className="w-12 h-12 absolute left-4 bottom-0 flex items-center bg-rose-600 text-[13px] leading-[16px] rounded-full text-white text-center">
            {promotionLabel}
          </span>
        </span>
      ) : showPromotion && promotionLabelType === "image" ? (
        <span className="absolute z-10 top-1 right-1">{IconEl ? <IconEl className="w-8 h-8" /> : ""}</span>
      ) : null}
    </>
  );
};

const CardThumbnail: TourCardCompound["Thumbnail"] = () => {
  const { thumbnailUrl, name } = useTourCardContext();
  return (
    <div className="thumbnail w-full pt-[66.67%] relative italic bg-slate-50">
      {thumbnailUrl ? (
        <Image src={thumbnailUrl} alt={name ?? ""} fill className="rounded-tl-lg rounded-tr-lg object-cover" />
      ) : (
        <div className="w-full h-full absolute left-0 top-0 flex items-center justify-center">
          <span className="text-center text-gray-500 block opacity-60">
            <IconImage className="mx-auto mb-1" />
            <span className="block text-xs">no image</span>
          </span>
        </div>
      )}
    </div>
  );
};

const CardTitle: TourCardCompound["Title"] = () => {
  const { href, name } = useTourCardContext();
  return (
    <Link href={href} className="text-main-400 text-[15px]">
      <h3 className="line-clamp-2 h-10 lg:h-12 leading-5 lg:leading-6 font-[500] text-main-400 text-sm lg:text-[16px]">
        {name}
      </h3>
    </Link>
  );
};

const CardInformation: TourCardCompound["Information"] = ({ children }) => {
  const { tourCode, startDate, openAmount, otherDepartDate } = useTourCardContext();
  const t = useTranslations("String");
  return (
    <div className="tour-card__info-list grid lg:grid-cols-3 gap-2">
      <InformationItem label={t("card.tourCode")} value={tourCode} />
      <InformationItem
        label={t("card.departDate")}
        value={<>{startDate ? formatDate(startDate, "MM/DD/YYYY") : null}</>}
      />
      <InformationItem
        label={t("card.amountRemaining")}
        value={<span className="text-red-600">{openAmount?.toString()}</span>}
      />
      <InformationItem
        label={t("card.otherDepart")}
        value={
          <>
            {otherDepartDate?.length ? (
              <div className="flex-1 w-full pt-2">
                {otherDepartDate.map((departStr, _index) => (
                  <Tag key={_index} className="text-xs !rounded-full !mr-1" color="blue" bordered={false}>
                    {departStr}
                  </Tag>
                ))}
              </div>
            ) : (
              <span className="text-xs">--</span>
            )}
          </>
        }
        className="col-span-3"
      />
    </div>
  );
};

interface TourCardInfoItemProps {
  className?: string;
  label: string;
  value?: React.ReactNode;
}
function InformationItem({ label, value, className = "" }: TourCardInfoItemProps) {
  return (
    <div className={classNames(className)}>
      <div className="text-gray-500 block text-[10px] lg:text-xs">{label}</div>
      <div className="text-gray-800 text-[13px] lg:text-sm">{value}</div>
    </div>
  );
}

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
TourCardWraper.Price = CardPrice;
TourCardWraper.Badget = CardBadgetPromotion;
TourCardWraper.Thumbnail = CardThumbnail;
TourCardWraper.Title = CardTitle;
TourCardWraper.Information = CardInformation;
TourCardWraper.Footer = CardFooter;
TourCardWraper.Days = CardDurationDays;

export { TourCardSkeleton };
export default TourCard;
