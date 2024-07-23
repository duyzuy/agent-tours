"use client";
import React, { useRef } from "react";
import classNames from "classnames";
import TourCard from "@/components/frontend/TourCard";
import { FeProductItem } from "@/models/fe/productItem.interface";

import "swiper/css";
import "swiper/css/navigation";
import { Swiper as SwiperType } from "swiper/types";
import IconChevronRight from "@/assets/icons/IconChevronRight";
import IconChevronLeft from "@/assets/icons/IconChevronLeft";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import { useLocale } from "next-intl";
import styles from "./style.module.scss";
import { moneyFormatVND } from "@/utils/helper";
import { mediaConfig } from "@/configs";
import { formatDate } from "@/utils/date";

interface Props {
  className?: string;
  items?: FeProductItem[];
  sellableTemplateCode?: string[];
}
const TourRelateds: React.FC<Props> = ({ className = "", items, sellableTemplateCode }: Props) => {
  const swiperRef = useRef<SwiperType>();

  const locale = useLocale();

  const getCmsContentByLang = (item: FeProductItem) => {
    return item.template.cms.find((cmsItem) => cmsItem.lang === locale);
  };

  const getMinAdultPrice = (pricingList: FeProductItem["configs"]) => {
    let minPrice = 99999999999;
    pricingList.forEach((item) => {
      if (item.open > 0 && item.adult < minPrice) {
        minPrice = item.adult;
      }
    });

    return minPrice;
  };

  console.log(items);
  return (
    <div
      className={classNames("tour", {
        [className]: className,
      })}
    >
      <div className="header py-3 mb-3">
        <h4 className="text-2xl font-semibold text-primary-default">Tour Liên Quan</h4>
      </div>
      <div className="tour-list">
        <div className="tours-slide relative">
          <Swiper
            slidesPerView={"auto"}
            // slidesPerView={1}
            spaceBetween={5}
            // breakpoints={{
            //     640: {
            //         slidesPerView: 2,
            //         spaceBetween: 16,
            //     },
            //     1024: {
            //         slidesPerView: 2,
            //         spaceBetween: 16,
            //     },
            // }}
            pagination={{
              el: ".swiper-pagination",
              clickable: true,
              renderBullet: (index, className) => {
                return `<span class="${className}"></span>`;
              },
            }}
            modules={[Navigation, Pagination]}
            onBeforeInit={(swiper) => {
              swiperRef.current = swiper;
            }}
          >
            {items?.map((item) => (
              <SwiperSlide
                key={item.recId}
                style={{ width: "40%", paddingLeft: "5px", paddingRight: "5px", paddingBottom: "10px" }}
              >
                <TourCard
                  key={item.recId}
                  thumbnail={`${mediaConfig.rootApiPath}/${getCmsContentByLang(item)?.thumbnail.original}`}
                  name={getCmsContentByLang(item)?.name}
                  price={item.configs.length ? moneyFormatVND(getMinAdultPrice(item.configs)) : undefined}
                  departDate={formatDate(item.startDate, "dd/MM/yyyy")}
                  tourCode={item.template.code}
                  openAmount={item.open}
                  href={`/tour/${item.sellableTemplateId}/${item.recId}/${getCmsContentByLang(item)?.slug}`}
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <div className={`swiper-pagination ${styles.pagination}`}></div>
          <div className="product-related-navigation hidden lg:block">
            <ButtonNavigation className="-left-5 top-[50%]" onClick={() => swiperRef.current?.slidePrev()}>
              <IconChevronLeft width={16} />
            </ButtonNavigation>
            <ButtonNavigation className="-right-5 top-[50%]" onClick={() => swiperRef.current?.slideNext()}>
              <IconChevronRight width={16} />
            </ButtonNavigation>
          </div>
        </div>
      </div>
    </div>
  );
};
export default TourRelateds;

interface ButtonNavigationProps {
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const ButtonNavigation = function (props: ButtonNavigationProps) {
  const className = props.className ?? "";
  return (
    <button
      onClick={props.onClick}
      className={classNames(
        "z-10 w-9 h-9 bg-white rounded-full flex items-center justify-center absolute drop-shadow-md border",
        { [className]: className },
      )}
    >
      {props.children}
    </button>
  );
};
