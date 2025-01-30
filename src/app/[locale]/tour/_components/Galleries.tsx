"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { mediaConfig } from "@/configs";
import { IconChevronLeft, IconChevronRight } from "@/assets/icons";
import { IThumbnail } from "@/models/thumbnail.interface";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { Button } from "antd";
import styled from "styled-components";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

interface GalleriesProps {
  images: IThumbnail[] | null;
}
const Galleries: React.FC<GalleriesProps> = ({ images = [] }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  const swiperRef = useRef<SwiperType>();

  if (!images || !images.length) return null;
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
          breakpoints={{
            1400: {
              navigation: true,
            },
          }}
          className="galleries"
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
        <Button
          type="text"
          shape="circle"
          className="!absolute left-0 top-1/2 !bg-gray-950/30 -translate-y-1/2 z-10"
          icon={<IconChevronLeft className="text-white -mt-[1px]" />}
          onClick={() => swiperRef.current?.slidePrev()}
        />
        <Button
          type="text"
          shape="circle"
          className="!absolute right-0 !bg-gray-950/30 top-1/2 -translate-y-1/2 z-10"
          icon={<IconChevronRight className="text-white -mt-[1px]" />}
          onClick={() => swiperRef.current?.slideNext()}
        />
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
