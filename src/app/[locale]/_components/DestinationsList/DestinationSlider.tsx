"use client";
import React, { useState, useRef, useCallback, forwardRef, useEffect } from "react";
import Image from "next/image";
import { Link } from "@/utils/navigation";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";

import classNames from "classnames";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper as SwiperType } from "swiper/types";
import IconChevronRight from "@/assets/icons/IconChevronRight";
import IconChevronLeft from "@/assets/icons/IconChevronLeft";
import { mediaConfig } from "@/configs";

interface DestinationsSliderProps {
  items: { id: number; thumb?: string; title: string; slug: string }[];
}
const DestinationsSlider: React.FC<DestinationsSliderProps> = ({ items }) => {
  const swiperRef = useRef<SwiperType>();

  return (
    <div className="list-items slider relative">
      <Swiper
        slidesPerView={2}
        spaceBetween={16}
        breakpoints={{
          640: {
            slidesPerView: 4,
            spaceBetween: 16,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 24,
          },
        }}
        modules={[Navigation]}
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}
      >
        {items.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="destination-card rounded-lg overflow-hidden">
              <div className="destination-card__inner relative">
                <div className="desctination-card__thumbnail relative w-full pt-[135%]">
                  {item.thumb ? (
                    <Image
                      src={`${mediaConfig.rootApiPath}/${item.thumb}`}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center absolute top-0 left-0 w-full h-full">no image</div>
                  )}
                </div>
                <div className="desctination-card__content absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900/80 via-[60%] via-gray-900/40 to-transparent px-3 py-4">
                  <Link href={`/destination/${item.slug}`}>
                    <h3 className="text-white text-base font-[500] line-clamp-2">{item.title}</h3>
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="post-navigation hidden md:block">
        <ButtonNavigation
          className="-left-5 top-[50%] -translate-y-[50%]"
          onClick={() => swiperRef.current?.slidePrev()}
        >
          <IconChevronLeft width={16} />
        </ButtonNavigation>
        <ButtonNavigation
          className="-right-5 top-[50%] -translate-y-[50%]"
          onClick={() => swiperRef.current?.slideNext()}
        >
          <IconChevronRight width={16} />
        </ButtonNavigation>
      </div>
    </div>
  );
};
export default DestinationsSlider;

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
        "z-10 w-9 h-9 bg-white rounded-full flex items-center justify-center absolute drop-shadow-sm",
        { [className]: className },
      )}
    >
      {props.children}
    </button>
  );
};
