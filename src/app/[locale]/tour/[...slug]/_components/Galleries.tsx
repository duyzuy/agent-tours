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

import styled from "styled-components";
interface GalleriesProps {
  images: IThumbnail[] | null;
}
const Galleries: React.FC<GalleriesProps> = ({ images = [] }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  const swiperRef = useRef<SwiperType>();
  if (!images || !images.length) {
    return null;
  }
  return (
    <>
      <div className="product-gallery relative bg-gray-50 rounded-md overflow-hidden w-full mb-3">
        <Swiper
          spaceBetween={10}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[FreeMode, Navigation, Thumbs]}
          pagination={{
            el: ".gallery-pagination",
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
                <span>{` ${mediaConfig.rootApiPath}/${original}`}</span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="gallery-pagination">
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
      <ProductSwiperThumbs className="product-gallery-thumbs">
        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={10}
          slidesPerView={5}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className="thumbnail-gallery"
        >
          {images?.map(({ id, original, small }, _index) => (
            <SwiperSlide key={_index}>
              <div className="w-full pt-[55.25%] relative rounded-md overflow-hidden">
                <Image
                  src={`${mediaConfig.rootApiPath}/${small}`}
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
      </ProductSwiperThumbs>
    </>
  );
};
export default Galleries;

const ProductSwiperThumbs = styled("div")`
  .swiper-slide {
    opacity: 0.6;
    &.swiper-slide-thumb-active {
      opacity: 1;
    }
  }
`;
