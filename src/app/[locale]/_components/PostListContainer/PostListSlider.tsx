"use client";
import IconArrowRightCircle from "@/assets/icons/IconArrowRightCircle";
import Image from "next/image";
import { Button } from "antd";
import { Link } from "@/utils/navigation";
import IconChevronRight from "@/assets/icons/IconChevronRight";
import React, { useState, useRef, useCallback, forwardRef, useEffect } from "react";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";

import classNames from "classnames";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper as SwiperType } from "swiper/types";
import IconChevronLeft from "@/assets/icons/IconChevronLeft";
interface PostListSliderProps {
  items: { id: number; thumb?: string; title: string; slug: string; date: string; description: string }[];
}
const PostListSlider: React.FC<PostListSliderProps> = ({ items }) => {
  const swiperRef = useRef<SwiperType>();
  return (
    <div className="slider relative block w-full">
      <Swiper
        slidesPerView={2}
        spaceBetween={12}
        breakpoints={{
          640: {
            slidesPerView: 3,
            spaceBetween: 12,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 16,
          },
        }}
        modules={[Navigation]}
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}
      >
        {items.map((_item) => (
          <SwiperSlide key={_item.id}>
            <div className="explore-item">
              <div className="inner bg-white rounded-xl drop-shadow-lg p-2 lg:p-3">
                <div className="thumbnail">
                  {_item.thumb ? (
                    <Image
                      src={_item.thumb}
                      alt={_item.title}
                      width={900}
                      height={600}
                      className="rounded-tl-xl rounded-br-xl"
                    />
                  ) : (
                    <div>no image</div>
                  )}
                </div>
                <div className="explore-content pt-3">
                  <Link href={`/post/${_item.slug}`}>
                    <h3 className="text-main-500 font-semibold text-[15px] line-clamp-2">{_item.title}</h3>
                  </Link>
                  <div className="line bg-gray-200 h-[1px] my-2"></div>
                  <p className="date text-[12px] text-gray-400 py-2 capitalize">{_item.date}</p>
                  <p className="desc line-clamp-3 text-xs lg:text-sm text-gray-500 mb-2">{_item.description}</p>
                  <p className="text-right">
                    <Link href={`/post/${_item.slug}`}>
                      <IconArrowRightCircle className="stroke-red-600 inline-block" />
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </SwiperSlide>
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
  );
};
export default PostListSlider;

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
