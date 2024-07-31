"use client";
import React from "react";
import Image from "next/image";
import IconStar from "@/assets/icons/IconStar";
import IconHeart from "@/assets/icons/IconHeart";
import IconShare from "@/assets/icons/IconShare";
import classNames from "classnames";
import { useTranslations } from "next-intl";
import { Link } from "@/utils/navigation";

interface Props {
  name?: string;
  thumbnail?: string;
  href?: string;
  tourCode?: string;
  durationDays?: string;
  departDate?: string;
  openAmount?: number;
  salePrice?: string;
  price?: string;
  className?: string;
  shadow?: "none" | "sm" | "md" | "lg";
}
const TourCard = ({
  thumbnail,
  name,
  price,
  salePrice,
  tourCode,
  durationDays,
  href = "/",
  departDate,
  openAmount,
  className = "",
  shadow = "md",
}: Props) => {
  const t = useTranslations("String");
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
        <div className="thumbnail w-full pt-[57.25%] relative italic">
          {thumbnail ? (
            <Image src={thumbnail} alt="article" fill className="rounded-tl-lg rounded-tr-lg object-cover" />
          ) : (
            <span>no image</span>
          )}
        </div>
        <div className="article-content px-2 py-3 rounded-bl-xl rounded-br-xl bg-white flex flex-col">
          <div className="article-content__top flex-1 mb-3 border-b border-[#f1f1f1] pb-3">
            <Link href={href} className="text-main-400 text-[15px]">
              <h3 className="line-clamp-2 mb-2 text-md font-semibold text-main-400 text-sm lg:text-base">{name}</h3>
            </Link>
            <div className="price lg:flex lg:items-center">
              {price ? (
                <p className="text-red-600 text-md font-semibold">{price}</p>
              ) : (
                <p className="text-xs h-[22px]">{t("card.contact")}</p>
              )}
            </div>
          </div>
          <div className="article-content__middle">
            <div className="flex justify-between text-[11px]">
              <ul className="flex-1">
                <li className="flex items-center mb-1">
                  <span className="text-gray-500 w-[65px] block">{t("card.tourCode")}</span>
                  <span>{tourCode}</span>
                </li>
                <li className="flex items-center mb-1">
                  <span className="text-gray-500 w-[65px] block">{t("card.departDate")}</span>
                  <span>{departDate}</span>
                </li>
                <li className="flex items-center mb-1">
                  <span className="text-gray-500 w-[65px] block">{t("card.amountRemaining")}</span>
                  <span className="text-red-600">{openAmount}</span>
                </li>
              </ul>
              {/* <div className="slot text-center bg-gray-100 rounded-md px-2 py-2 border border-gray-300">
              <p>{t("card.amountRemaining")}</p>
              <span className="text-red-600 text-sm">{openAmount}</span>
            </div> */}
            </div>
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
