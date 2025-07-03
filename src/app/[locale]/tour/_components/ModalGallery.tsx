"use client";
import React, { memo, useEffect, useRef, useState } from "react";

import styled from "styled-components";

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
import CustomModal from "@/components/base/CustomModal";
interface ModalGalleryProps {
  images: IThumbnail[];
  open?: boolean;
  onClose?: () => void;
}
const ModalGallery: React.FC<ModalGalleryProps> = ({ onClose, images, open }) => {
  return (
    <CustomModal open={open} onClose={onClose}>
      <CarouselGallery images={images} />
    </CustomModal>
  );
};
export default memo(ModalGallery);

interface CarouselGalleryProps {
  images: IThumbnail[];
}
const CarouselGallery: React.FC<CarouselGalleryProps> = memo(({ images }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  const swiperRef = useRef<SwiperType | null>(null);

  useEffect(() => {
    return () => {
      swiperRef.current?.destroy();
    };
  }, []);

  return (
    <>
      <div className="relative rounded-md pb-12 h-full lg:px-8">
        <Swiper
          spaceBetween={10}
          pagination={{
            el: ".galleries-pagination",
            clickable: true,
            renderBullet: (index, className) => {
              return `<span class="${className}"></span>`;
            },
          }}
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
          }}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[FreeMode, Navigation, Thumbs]}
          className="galleries h-full"
          breakpoints={{
            1400: {
              navigation: true,
            },
          }}
        >
          {images?.map(({ id, original, small }, _index) => (
            <SwiperSlide key={_index}>
              <div className="relative w-full h-full flex items-center justify-center">
                <Image
                  src={`${mediaConfig.rootApiPath}/${original}`}
                  loading="lazy"
                  alt="thumbnail"
                  fill
                  className="italic object-contain"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="galleries-pagination hidden lg:block">
          <button
            className="gallery-prev absolute w-10 h-10 bg-gray-950/30 rounded-full p-1 opacity-80 hover:opacity-100 -left-12 top-1/2 -translate-y-1/2 text-white z-10 cursor-pointer inline-flex items-center justify-center"
            onClick={() => swiperRef.current?.slidePrev()}
          >
            <IconChevronLeft className="w-6 h-6" />
          </button>
          <button
            className="gallery-next absolute w-10 h-10 bg-gray-950/30 rounded-full p-1 opacity-80 hover:opacity-100 -right-12 top-1/2 -translate-y-1/2 text-white z-10 cursor-pointer inline-flex items-center justify-center"
            onClick={() => swiperRef.current?.slideNext()}
          >
            <IconChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
      <ThumbnailSwiperContainer className="thumbnails">
        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={16}
          loop={false}
          slidesPerView={"auto"}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Thumbs]}
          className="thumbnail-gallery"
        >
          {images?.map(({ id, original, small }, _index) => (
            <SwiperSlide key={_index}>
              <div className="thumb-item relative rounded-md overflow-hidden w-full h-full">
                <Image
                  src={`${mediaConfig.rootApiPath}/${small}`}
                  loading="lazy"
                  alt={`thumbnail-${_index}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover italic"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </ThumbnailSwiperContainer>
    </>
  );
});

const ThumbnailSwiperContainer = styled("div")`
  & {
    .swiper-slide {
      width: 80px;
      height: 80px;
      &.swiper-slide-thumb-active {
        .thumb-item {
          border-color: white;
          filter: none;
        }
      }
      .thumb-item {
        border: 2px solid transparent;
        filter: brightness(0.5);
        border-radius: 10px;
        cursor: pointer;
      }
    }
  }
`;
