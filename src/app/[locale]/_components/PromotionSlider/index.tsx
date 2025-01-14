"use client";

import Image from "next/image";
import React, { useState, useRef, useCallback, forwardRef, useEffect, Suspense } from "react";
import { Link } from "@/utils/navigation";
import classNames from "classnames";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/virtual";
import { Swiper as SwiperType } from "swiper/types";
import IconChevronLeft from "@/assets/icons/IconChevronLeft";
import IconChevronRight from "@/assets/icons/IconChevronRight";
import { Virtual } from "swiper/modules";
interface PromotionSliderProps {
  items: { id: number; thumb?: string; title: string; slug: string; date: string; description: string }[];
  title?: string;
}
const PromotionSlider: React.FC<PromotionSliderProps> = ({ items, title }) => {
  const ITEMS = [
    {
      id: 1,
      name: "Banner 1",
      slug: "/post/chill-he-cuc-nhiet-voi-loat-uu-dai-qua-tang-tu-vietravel-va-enchanteur",
      thumb: "/assets/images/banner-n1.jpg",
    },
    {
      id: 2,
      name: "Banner 2",
      slug: "/post/vui-he-cuc-tiet-kiem-voi-voucher-giam-gia-len-den-60-tu-vietravel-va-mykingdom",
      thumb: "/assets/images/banner-n2.jpg",
    },
    {
      id: 3,
      name: "Banner 3",
      slug: "/post/du-lich-tha-ga-thoa-suc-rinh-uu-dai-tu-anthai-va-ocb",
      thumb: "/assets/images/banner-n3.jpg",
    },
    {
      id: 4,
      name: "Banner 4",
      slug: "/post/deal-sieu-hot-tu-vietravel-x-momo-giam-den-250-000-dong-khi-thanh-toan-tour-du-lich-tron-goi",
      thumb: "/assets/images/banner-n4.jpg",
    },
  ];
  const swiperRef = useRef<SwiperType>();
  return (
    <section className="promotion-section">
      <div className="container mx-auto px-3 md:px-6 lg:px-8">
        <div className="section__body slider relative block w-full">
          <Swiper
            virtual
            slidesPerView={3}
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
            modules={[Autoplay, Navigation, Virtual]}
            onBeforeInit={(swiper) => {
              swiperRef.current = swiper;
            }}
          >
            {ITEMS.map((_item) => (
              <SwiperSlide key={_item.id}>
                <div className="banner overflow-hidden">
                  <Link href={_item.slug}>
                    <Image src={_item.thumb} alt={_item.name} width={900} height={600} className="rounded-md" />
                  </Link>
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
      </div>
    </section>
  );
};
export default PromotionSlider;

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
