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

const POSTS = [
  {
    id: 1,

    date: "Thứ Ba, 18/08/2023 09:30",
    name: "Về xứ Quảng thưởng thức mỹ vị ẩm thực tinh hoa",
    slug: "/",
    thumbnail: "/assets/images/khampha-1.jpg",
    description: "Ẩm thực xứ Quảng mang nét đặc trưng văn hóa, lịch sử của vùng đất Quảng Nam...",
  },
  {
    id: 2,

    date: "Thứ Ba, 18/08/2023 09:30",
    name: "Về xứ Quảng thưởng thức mỹ vị ẩm thực tinh hoa",
    slug: "/",
    thumbnail: "/assets/images/khampha-2.jpg",
    description: "Ẩm thực xứ Quảng mang nét đặc trưng văn hóa, lịch sử của vùng đất Quảng Nam...",
  },
  {
    id: 3,
    date: "Thứ Ba, 18/08/2023 09:30",
    name: "Về xứ Quảng thưởng thức mỹ vị ẩm thực tinh hoa",
    slug: "/",
    thumbnail: "/assets/images/khampha-3.jpg",
    description: "Ẩm thực xứ Quảng mang nét đặc trưng văn hóa, lịch sử của vùng đất Quảng Nam...",
  },
  {
    id: 4,
    date: "Thứ Ba, 18/08/2023 09:30",
    name: "Về xứ Quảng thưởng thức mỹ vị ẩm thực tinh hoa",
    slug: "/",
    thumbnail: "/assets/images/khampha-3.jpg",
    description: "Ẩm thực xứ Quảng mang nét đặc trưng văn hóa, lịch sử của vùng đất Quảng Nam...",
  },
  {
    id: 5,
    date: "Thứ Ba, 18/08/2023 09:30",
    name: "Về xứ Quảng thưởng thức mỹ vị ẩm thực tinh hoa",
    slug: "/",
    thumbnail: "/assets/images/khampha-3.jpg",
    description: "Ẩm thực xứ Quảng mang nét đặc trưng văn hóa, lịch sử của vùng đất Quảng Nam...",
  },
];
const ExploreSection = () => {
  const swiperRef = useRef<SwiperType>();
  return (
    <section
      className="relative lg:py-16 py-12"
      style={{
        background: "url(/assets/images/bg-footer.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center bottom",
      }}
    >
      <div className="overlay bg-slate-900 opacity-40 absolute left-0 top-0 w-full h-full"></div>
      <div className="container mx-auto relative z-10 px-4 md:px-6 lg:px-8">
        <div className="section-title w-full flex items-center justify-between mb-6 lg:mb-12">
          <div className="text-2xl lg:text-4xl drop-shadow-lg text-white relative">
            <span className="">Trải nghiệm, khám phá</span>
          </div>
        </div>
        <div className="w-full">
          <div className="slider relative block w-full">
            <Swiper
              slidesPerView={2}
              spaceBetween={16}
              breakpoints={{
                640: {
                  slidesPerView: 3,
                  spaceBetween: 16,
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
              {POSTS.map((_item) => (
                <SwiperSlide key={_item.id}>
                  <div className="explore-item" key={_item.id}>
                    <div className="inner bg-white rounded-xl drop-shadow-lg p-3">
                      <div className="thumbnail">
                        <Image
                          src={_item.thumbnail}
                          alt={_item.name}
                          width={900}
                          height={600}
                          className="rounded-tl-xl rounded-br-xl"
                        />
                      </div>

                      <div className="explore-content pt-3">
                        <h3 className="text-main-500 font-semibold text-[15px] line-clamp-2">{_item.name}</h3>
                        <div className="line bg-gray-200 h-[1px] my-2"></div>
                        <p className="date text-[12px] text-gray-400 py-2">{_item.date}</p>
                        <p className="desc line-clamp-3 text-sm text-gray-500 mb-2">{_item.description}</p>
                        <p className="text-right">
                          <IconArrowRightCircle className="stroke-red-600 inline-block" />
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
          <div className="text-center pt-6">
            <Link
              className="btn rounded-full flex items-center border w-fit px-3 py-2 font-semibold text-[14px] mx-auto"
              href="/category/tin-tuc-du-lich"
            >
              <span className="text-white">Xem thêm</span>
              <span className="ml-2">
                <IconChevronRight width={14} color="white" />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
export default ExploreSection;

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

// const ButtonNavigation = forwardRef<HTMLButtonElement, ButtonNavigationProps>(
//     (props: ButtonNavigationProps, ref) => {
//         const className = props.className ?? "";
//         return (
//             <button
//                 onClick={props.onClick}
//                 ref={ref}
//                 className={classNames(
//                     "z-10 w-9 h-9 bg-white rounded-full flex items-center justify-center absolute drop-shadow-md border",
//                     { [className]: className },
//                 )}
//             >
//                 {props.children}
//             </button>
//         );
//     },
// );
