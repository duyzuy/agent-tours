"use client";
import React, { useRef } from "react";
import classNames from "classnames";
import TourCard from "@/components/frontend/TourCard";
import "swiper/css";
import "swiper/css/navigation";
import { Swiper as SwiperType } from "swiper/types";
import IconChevronRight from "@/assets/icons/IconChevronRight";
import IconChevronLeft from "@/assets/icons/IconChevronLeft";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";

import styles from "./style.module.scss";

export interface ProductListSliderProps {
  className?: string;
  items?: {
    recId?: number;
    name?: string;
    code?: string;
    href?: string;
    thumbnail?: string;
    price?: number;
    departDate?: string;
    openAmount?: number;
    showPromotion?: boolean;
    promotion?: {
      promotionImage?: string;
      promotionLabel?: string;
      promotionLabelType?: "image" | "text" | "";
      promotionReferencePrice?: number;
    };
  }[];
}
const ProductListSlider: React.FC<ProductListSliderProps> = ({ className = "", items }) => {
  const swiperRef = useRef<SwiperType>();

  return (
    <div
      className={classNames("product-list relative mb-4", {
        [className]: className,
      })}
    >
      <Swiper
        slidesPerView={"auto"}
        // slidesPerView={1}
        spaceBetween={7}
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
              thumbnail={item.thumbnail}
              name={item.name}
              price={item.price}
              departDate={item.departDate}
              tourCode={item.code}
              openAmount={item.openAmount}
              href={item.href}
              showPromotion={item?.showPromotion}
              promotion={{
                promotionImage: item?.promotion?.promotionImage,
                promotionLabel: item?.promotion?.promotionLabel,
                promotionLabelType: item?.promotion?.promotionLabelType,
                promotionReferencePrice: item?.promotion?.promotionReferencePrice,
              }}
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
  );
};
export default ProductListSlider;

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
