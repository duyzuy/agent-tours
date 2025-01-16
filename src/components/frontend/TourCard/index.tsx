"use client";
import React, { createContext, PropsWithChildren, useContext, useMemo } from "react";
import Image from "next/image";
import IconStar from "@/assets/icons/IconStar";
import IconHeart from "@/assets/icons/IconHeart";
import IconShare from "@/assets/icons/IconShare";
import classNames from "classnames";
import { useTranslations } from "next-intl";
import { Link } from "@/utils/navigation";
import { IconCalendarRange, IconImage } from "@/assets/icons";
import { moneyFormatVND } from "@/utils/helper";
import { getLabelHotDealIcon } from "@/constants/icons.constant";
import { Tag } from "antd";

type TourCardBaseType = {
  children?: React.ReactNode;
  className?: string;
};
interface TourCardCompound {
  Head: React.FC<TourCardBaseType>;
  Body: React.FC<TourCardBaseType>;
  Footer: React.FC<TourCardBaseType>;
  Price: React.FC<TourCardBaseType>;
  Title: React.FC<TourCardBaseType>;
  Badget: React.FC<TourCardBaseType>;
  Thumbnail: React.FC<TourCardBaseType>;
  Information: React.FC<TourCardBaseType>;
  Days: React.FC<TourCardBaseType>;
}
interface TourCardContextType {
  recId?: number;
  name?: string;
  thumbnail?: string;
  href?: string;
  tourCode?: string;
  durationDays?: number;
  departDate?: string;
  openAmount?: number;
  price?: number;
  otherDepartDate?: string[];
  showPromotion?: boolean;
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
  data: TourCardContextType;
  className?: string;
  shadow?: "none" | "sm" | "md" | "lg";
};

const TourCardContext = createContext<TourCardContextType | undefined>(undefined);

const useTourCardContext = () => {
  const context = useContext(TourCardContext);
  if (!context) {
    throw new Error("Hook must use in TourCardContext Provider");
  }
  return context;
};

const TourCard = ({ className = "", shadow = "md", children, data }: TourCardProps) => {
  return (
    <TourCardContext.Provider value={{ ...data }}>
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
          })}
        >
          {children}
        </div>
      </div>
    </TourCardContext.Provider>
  );
};
export default TourCard;

const CardHead: TourCardCompound["Head"] = ({ children }) => {
  return <div className="tour-card__head relative">{children}</div>;
};
const CardBody: TourCardCompound["Body"] = ({ children }) => {
  return (
    <div className="tour-card__body px-3 lg:px-4 py-3 rounded-bl-xl rounded-br-xl bg-white flex flex-col">
      {children}
    </div>
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

const CardDurationDays: TourCardCompound["Days"] = ({ className }) => {
  const { durationDays } = useTourCardContext();
  const t = useTranslations("String");

  return (
    <div className={classNames(className)}>
      {durationDays ? (
        <span className="flex items-center">
          <IconCalendarRange className="mr-1 w-5 h-5" />
          {t("card.durationDayValues", { day: durationDays, night: durationDays - 1 })}
        </span>
      ) : null}
    </div>
  );
};
const CardPrice: TourCardCompound["Price"] = ({ className = "" }) => {
  const t = useTranslations("String");
  const { promotion, price, showPromotion } = useTourCardContext();

  return (
    <div
      className={classNames("price no-price", {
        [className]: className,
      })}
    >
      {!price ? (
        <p className="text-[16px] lg:text-lg">{t("card.contact")}</p>
      ) : promotion &&
        promotion.promotionReferencePrice &&
        promotion?.promotionReferencePrice > price &&
        showPromotion ? (
        <>
          <span className="text-red-600 text-[16px] lg:text-lg font-[500] block">{moneyFormatVND(price)}</span>
          <span className="line-through text-[12px] lg:text-[14px] opacity-60 block">
            {moneyFormatVND(promotion.promotionReferencePrice)}
          </span>
        </>
      ) : (
        <p className="text-red-600 text-[16px] lg:text-lg font-[500]">{moneyFormatVND(price)}</p>
      )}
    </div>
  );
};

const CardBadget: TourCardCompound["Badget"] = () => {
  const { promotion, showPromotion } = useTourCardContext();
  const { promotionLabelType, promotionLabel, promotionImage } = promotion || {};
  const IconEl = getLabelHotDealIcon(promotionImage ?? "");

  if (!showPromotion) return null;
  if (promotionLabelType === "text") {
    return (
      <span className="absolute z-10 w-24 h-24 -top-12 -right-6 bg-rose-600 rounded-full">
        <span className="w-12 h-12 absolute left-4 bottom-0 flex items-center bg-rose-600 text-[13px] leading-[16px] rounded-full text-white text-center">
          {promotionLabel}
        </span>
      </span>
    );
  }
  if (promotionLabelType === "image") {
    return IconEl ? (
      <span className="absolute z-10 top-1 right-1">{<IconEl.icon width={32} height={32} />}</span>
    ) : null;
  }

  return null;
};

const CardThumbnail: TourCardCompound["Thumbnail"] = () => {
  const { thumbnail, name } = useTourCardContext();
  return (
    <div className="thumbnail w-full pt-[66.67%] relative italic bg-slate-50">
      {thumbnail ? (
        <Image src={thumbnail} alt={name ?? ""} fill className="rounded-tl-lg rounded-tr-lg object-cover" />
      ) : (
        <div className="w-full h-full absolute left-0 top-0 flex items-center justify-center">
          <span className="text-center text-gray-500 block">
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
    <Link href={href ?? "/"} className="text-main-400 text-[15px] mb-3">
      <h3 className="line-clamp-2 h-10 lg:h-12 leading-5 lg:leading-6 font-[500] text-main-400 text-sm lg:text-[16px]">
        {name}
      </h3>
    </Link>
  );
};

const TourCardInfo: TourCardCompound["Information"] = ({ children }) => {
  const { tourCode, departDate, openAmount, otherDepartDate, durationDays } = useTourCardContext();
  const t = useTranslations("String");
  return (
    <div className="tour-card__info-list grid lg:grid-cols-3 grid-cols-2 gap-2">
      <TourCard.InfoItem label={t("card.tourCode")} value={tourCode} />
      <TourCard.InfoItem label={t("card.departDate")} value={departDate} />
      <TourCard.InfoItem
        label={t("card.amountRemaining")}
        value={<span className="text-red-600">{openAmount?.toString()}</span>}
      />
      <TourCard.InfoItem
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
        className="col-span-2 lg:col-span-3"
      />
    </div>
  );
};

interface TourCardInfoItemProps {
  className?: string;
  label: string;
  value?: React.ReactNode;
}
TourCard.InfoItem = function TourCardInfoItem({ label, value, className = "" }: TourCardInfoItemProps) {
  return (
    <div className={classNames(className)}>
      <div className="text-gray-500 block text-[10px] lg:text-xs">{label}</div>
      <div className="text-gray-800 text-[13px] lg:text-sm">{value}</div>
    </div>
  );
};

TourCard.Head = CardHead;
TourCard.Body = CardBody;
TourCard.Price = CardPrice;
TourCard.Badget = CardBadget;
TourCard.Thumbnail = CardThumbnail;
TourCard.Title = CardTitle;
TourCard.Information = TourCardInfo;
TourCard.Footer = CardFooter;
TourCard.Days = CardDurationDays;
