"use client";
import React, { useMemo } from "react";
import Image from "next/image";
import IconStar from "@/assets/icons/IconStar";
import IconHeart from "@/assets/icons/IconHeart";
import IconShare from "@/assets/icons/IconShare";
import classNames from "classnames";
import { useTranslations } from "next-intl";
import { Link } from "@/utils/navigation";
import { IconImage } from "@/assets/icons";
import IconHotSaleTwo from "@/assets/icons/label/IconHotSaleTwo";
import { moneyFormatVND } from "@/utils/helper";
import { getLabelHotDealIcon } from "@/constants/icons.constant";
interface Props {
  name?: string;
  thumbnail?: string;
  href?: string;
  tourCode?: string;
  durationDays?: string;
  departDate?: string;
  openAmount?: number;

  price?: number;
  className?: string;
  shadow?: "none" | "sm" | "md" | "lg";
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
const TourCard = ({
  thumbnail,
  name,
  price,

  tourCode,
  durationDays,
  href = "/",
  departDate,
  openAmount,
  className = "",
  shadow = "md",
  otherDepartDate,
  promotion,
  showPromotion,
}: Props) => {
  const t = useTranslations("String");

  const {
    promotionImage,
    promotionLabel,
    promotionLabelType,
    promotionReferencePrice,
    promotionValidFrom,
    promotionValidTo,
  } = promotion || {};

  const iconItem = getLabelHotDealIcon(promotionImage ?? "");
  return (
    <div
      className={classNames("article", {
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
        <div className="thumbnail w-full pt-[66.67%] relative italic bg-slate-50">
          {thumbnail ? (
            <Image src={thumbnail} alt="article" fill className="rounded-tl-lg rounded-tr-lg object-cover" />
          ) : (
            <div className="w-full h-full absolute left-0 top-0 flex items-center justify-center">
              <span className="text-center text-gray-500 block">
                <IconImage className="mx-auto mb-1" />
                <span className="block text-xs">no image</span>
              </span>
            </div>
          )}
          {showPromotion ? (
            <TourCard.Label
              icon={iconItem ? <iconItem.icon width={32} height={32} /> : undefined}
              promotionLabel={promotionLabel}
              promotionLabelType={promotionLabelType}
            />
          ) : null}
        </div>
        <div className="article-content px-2 py-3 rounded-bl-xl rounded-br-xl bg-white flex flex-col">
          <div className="article-content__top flex-1 mb-3 border-b border-[#f1f1f1] pb-3">
            <Link href={href} className="text-main-400 text-[15px]">
              <h3 className="line-clamp-2 mb-2 h-10 lg:h-12 leading-5 lg:leading-6 font-[500] text-main-400 text-sm lg:text-[16px]">
                {name}
              </h3>
            </Link>
            <div className="price lg:flex lg:items-center">
              {price ? (
                <TourCard.Price price={price} referencePrice={promotionReferencePrice} showPromotion={showPromotion} />
              ) : (
                <p className="text-xs h-[22px]">{t("card.contact")}</p>
              )}
            </div>
            {durationDays ? <span className="text-gray-500 text-xs">{durationDays}</span> : null}
          </div>
          <div className="article-content__middle text-[12px] lg:text-[13px]">
            <ul className="flex-1">
              <li className="flex items-center mb-1">
                <span className="text-gray-500 w-[65px] lg:w-[80px] block">{t("card.tourCode")}</span>
                <span>{tourCode}</span>
              </li>
              <li className="flex items-center mb-1">
                <span className="text-gray-500 w-[65px] lg:w-[80px] block">{t("card.departDate")}</span>
                <span>{departDate}</span>
              </li>
              <li className="flex items-center mb-1">
                <span className="text-gray-500 w-[65px] lg:w-[80px] block">{t("card.amountRemaining")}</span>
                <span className="text-red-600">{openAmount}</span>
              </li>
              {otherDepartDate ? (
                <li className="flex mb-1">
                  <span className="text-gray-500 w-[65px] lg:w-[80px] block">{t("card.otherDepart")}</span>
                  {otherDepartDate.length ? (
                    <div className="flex-1 w-full">
                      <span className="flex flex-wrap gap-1">
                        {otherDepartDate.map((departStr, _index) => (
                          <span className="depart text-xs" key={_index}>
                            {_index !== 0 ? <span className="text-[8px] mx-1">|</span> : null}
                            {departStr}
                          </span>
                        ))}
                      </span>
                    </div>
                  ) : (
                    <span>Không có</span>
                  )}
                </li>
              ) : null}
            </ul>
          </div>
          {/* <TourCard.BottomCard /> */}
        </div>
      </div>
    </div>
  );
};
export default TourCard;

TourCard.BottomCard = function TourCardBottom() {
  return (
    <div className="article-bottom py-2 text-[11px] border-t mt-2">
      <div className="flex items-center justify-between">
        <div className="left flex items-center">
          <span>
            <IconStar fill="#F2C94C" stroke="#F2C94C" className="w-[14px]" />
          </span>
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

TourCard.Price = function TourCardPrice({
  price,
  referencePrice,
  showPromotion = false,
}: {
  price: number;
  referencePrice?: number;
  showPromotion?: boolean;
}) {
  if (!referencePrice || referencePrice < price || !showPromotion) {
    return <p className="text-red-600 text-[16px] lg:text-lg font-[500]">{moneyFormatVND(price)}</p>;
  } else {
    return (
      <div>
        <span className="text-red-600 text-sm lg:text-[16px] font-[500] mr-2 inline-block">
          {moneyFormatVND(price)}
        </span>
        <span className="font-[500] line-through text-[12px] lg:text-[14px] opacity-40 inline-block">
          {moneyFormatVND(referencePrice)}
        </span>
      </div>
    );
  }
};

TourCard.Label = function TourCardLabel({
  icon,
  promotionLabel,
  promotionLabelType,
}: {
  icon?: React.ReactNode;
  promotionLabel?: string;
  promotionLabelType?: "" | "text" | "image";
}) {
  const Iconn = icon;

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
    return icon ? <span className="absolute z-10 top-1 right-1">{icon}</span> : null;
  }

  return null;
};
