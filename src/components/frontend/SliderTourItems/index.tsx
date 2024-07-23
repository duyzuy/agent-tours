"use client";
import React, { useRef } from "react";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";

import classNames from "classnames";
import "swiper/css";
import "swiper/css/navigation";
import { Swiper as SwiperType } from "swiper/types";
import IconChevronRight from "@/assets/icons/IconChevronRight";
import IconChevronLeft from "@/assets/icons/IconChevronLeft";
import TourCard from "../TourCard";
import styles from "./style.module.scss";

const TOUR_ITEMS = [
  {
    id: 1,
    thumbnail: "/assets/images/article-1.jpg",
    title: " Liên Tuyến Trung Bắc: Đà Nẵng - Huế - Động Phong Nha & Thiên Đường",
  },
  {
    id: 2,
    thumbnail: "/assets/images/article-2.jpg",
    title: " Liên Tuyến Trung Bắc: Đà Nẵng - Huế - Động Phong Nha & Thiên Đường",
  },
  {
    id: 3,
    thumbnail: "/assets/images/article-3.jpg",
    title: " Liên Tuyến Trung Bắc: Đà Nẵng - Huế - Động Phong Nha & Thiên Đường",
  },
  {
    id: 4,
    thumbnail: "/assets/images/article-4.jpg",
    title: " Liên Tuyến Trung Bắc: Đà Nẵng - Huế - Động Phong Nha & Thiên Đường",
  },
  {
    id: 5,
    thumbnail: "/assets/images/article-1.jpg",
    title: " Liên Tuyến Trung Bắc: Đà Nẵng - Huế - Động Phong Nha & Thiên Đường",
  },
];
export interface SliderProducts {}
const SliderTourItems: React.FC<SliderProducts> = () => {
  const swiperRef = useRef<SwiperType>();

  return (
    <div className="tours-slide relative">
      <Swiper
        slidesPerView={"auto"}
        // slidesPerView={1}
        spaceBetween={16}
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
        {TOUR_ITEMS.map((item) => (
          <SwiperSlide key={item.id} style={{ width: "40%" }}>
            <TourCard thumbnail={item.thumbnail} name={item.title} className="w-full" shadow="none" />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className={`swiper-pagination ${styles.pagination}`}></div>
      <div className="swiper-navigation">
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
export default SliderTourItems;

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
