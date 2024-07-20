"use client";

import React, { useRef, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
// import required modules

import Image from "next/image";
import { mediaConfig } from "@/configs";
import { IconChevronLeft, IconChevronRight } from "@/assets/icons";
import { IThumbnail } from "@/models/thumbnail.interface";
import classNames from "classnames";
interface GalleriesProps {
  images: IThumbnail[] | null;
}
const Galleries: React.FC<GalleriesProps> = ({ images = [] }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const swiperRef = useRef<SwiperType>();
  // if (!images || !images.length) {
  //   return null;
  // }
  return (
    <>
      <div className="relative bg-gray-50 rounded-md overflow-hidden w-full mb-3">
        <Swiper
          spaceBetween={10}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[FreeMode, Navigation, Thumbs]}
          pagination={{
            el: ".swiper-pagination",
            clickable: true,
            renderBullet: (index, className) => {
              return `<span class="${className}"></span>`;
            },
          }}
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
          }}
          className="galleries"
          breakpoints={{
            1400: {
              navigation: true,
            },
          }}
        >
          {images?.map(({ id, original, small }, _index) => (
            <SwiperSlide key={_index}>
              <div className="relative pt-[66.67%]">
                <Image
                  src={`${mediaConfig.rootApiPath}/${original}`}
                  loading="lazy"
                  alt="thumbnail"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="bg-slate-50 object-contain italic"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="swiper-pagination">
          <div
            className="gallery-prev absolute bg-gray-950/30 rounded-full p-1 opacity-30 hover:opacity-100 left-0 top-1/2 -translate-y-1/2 text-white z-10 cursor-pointer hidden lg:block"
            onClick={() => swiperRef.current?.slidePrev()}
          >
            <IconChevronLeft className="w-8 h-8" />
          </div>
          <div
            className="gallery-next absolute bg-gray-950/30 rounded-full p-1 opacity-30 hover:opacity-100 right-0 top-1/2 -translate-y-1/2 text-white z-10 cursor-pointer hidden lg:block"
            onClick={() => swiperRef.current?.slideNext()}
          >
            <IconChevronRight className="w-8 h-8" />
          </div>
        </div>
      </div>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="thumbnail-gallery"
      >
        {images?.map(({ id, original, small }, _index) => (
          <SwiperSlide key={_index}>
            <div className="w-full pt-[55.25%] relative rounded-md overflow-hidden">
              <Image
                src={`${mediaConfig.rootApiPath}/${original}`}
                loading="lazy"
                alt={`thumbnail-${_index}`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="bg-slate-50 object-cover italic"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};
export default Galleries;
