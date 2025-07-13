"use client";
import React, { Children, memo, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper as SwiperType } from "swiper/types";
import IconChevronRight from "@/assets/icons/IconChevronRight";
import IconChevronLeft from "@/assets/icons/IconChevronLeft";
import classNames from "classnames";
interface DestinationsSliderProps extends React.PropsWithChildren {}
const DestinationsSlider: React.FC<DestinationsSliderProps> = ({ children }) => {
  const swiperRef = useRef<SwiperType>();

  return (
    <div className="list-items slider relative">
      <Swiper
        slidesPerView={2}
        spaceBetween={12}
        breakpoints={{
          640: {
            slidesPerView: 4,
            spaceBetween: 12,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 16,
          },
        }}
        modules={[Navigation]}
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}
      >
        {Children.map(children, (child, _index) => (
          <SwiperSlide key={_index}>{child}</SwiperSlide>
        ))}
      </Swiper>
      <div className="post-navigation hidden md:block">
        <ButtonNavigation className="-left-5 top-[50%] -translate-y-[50%]" onClick={swiperRef.current?.slidePrev}>
          <IconChevronLeft width={16} />
        </ButtonNavigation>
        <ButtonNavigation className="-right-5 top-[50%] -translate-y-[50%]" onClick={swiperRef.current?.slideNext}>
          <IconChevronRight width={16} />
        </ButtonNavigation>
      </div>
    </div>
  );
};
export default memo(DestinationsSlider);

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
