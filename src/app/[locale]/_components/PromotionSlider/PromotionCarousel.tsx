"use client";

import React, { Children, PropsWithChildren, useRef } from "react";

import classNames from "classnames";
import { Swiper as SwiperType } from "swiper/types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import IconChevronLeft from "@/assets/icons/IconChevronLeft";
import IconChevronRight from "@/assets/icons/IconChevronRight";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface PromotionCarouselProps extends PropsWithChildren {}
const PromotionCarousel: React.FC<PromotionCarouselProps> = ({ children }) => {
  const swiperRef = useRef<SwiperType>();
  return (
    <div className="container mx-auto px-3 md:px-6 lg:px-8">
      <div className="slider-container relative">
        <Swiper
          slidesPerView={1}
          spaceBetween={12}
          autoplay={{
            delay: 8000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: {
              slidesPerView: 3,
              spaceBetween: 12,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 12,
            },
          }}
          modules={[Autoplay, Navigation]}
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
          }}
        >
          {Children.map(children, (child, _index) => (
            <SwiperSlide key={_index}>{child}</SwiperSlide>
          ))}
        </Swiper>
        <div className="swiper-navigation hidden lg:block">
          <ButtonNavigation className="-left-5 top-[50%]" onClick={() => swiperRef.current?.slidePrev()}>
            <IconChevronLeft width={16} />
          </ButtonNavigation>
          <ButtonNavigation className="-right-5 top-[50%]" onClick={() => swiperRef.current?.slideNext()}>
            <IconChevronRight width={16} />
          </ButtonNavigation>
        </div>
      </div>
    </div>
  );
};

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

export default PromotionCarousel;
