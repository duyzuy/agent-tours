"use client";
import { Modal } from "antd";
import React, { useEffect, useRef, useState } from "react";
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
import { IconChevronLeft, IconChevronRight, IconXCircle } from "@/assets/icons";
import { IThumbnail } from "@/models/thumbnail.interface";
import { CloseOutlined } from "@ant-design/icons";
interface PopUpGalleriesProps {
  images: IThumbnail[];
  onClose?: () => void;
}
const PopupGalleries: React.FC<PopUpGalleriesProps> = ({ onClose, images }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  const swiperRef = useRef<SwiperType | null>(null);

  useEffect(() => {
    return () => {
      swiperRef.current?.destroy();
    };
  }, []);

  return (
    <>
      <ModalStyled className="gallery-modal fixed left-0 top-0 w-full h-full z-50">
        <div className="overlay bg-gray-900/80 absolute left-0 top-0 w-full h-full"></div>
        <div className="gallery-modal-inner relative left-0 top-0 w-full h-full flex items-center justify-center">
          <span className="absolute top-8 right-8 text-4xl text-white/60 cursor-pointer" onClick={onClose}>
            <CloseOutlined className="stroke-none" />
          </span>
          <div className="w-full h-full max-w-[1560px] flex flex-col justify-between px-6 lg:px-16 pt-24 pb-12">
            <div className="relative rounded-md pb-12 h-full">
              <Swiper
                spaceBetween={10}
                pagination={{
                  el: ".galleries-pagination",
                  clickable: true,
                  renderBullet: (index, className) => {
                    return `<span class="${className}"></span>`;
                  },
                }}
                // navigation={{ nextEl: ".gallery-next", prevEl: ".gallery-prev" }}
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
                        // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="italic object-contain"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
              <div className="galleries-pagination">
                <div
                  className="gallery-prev absolute bg-gray-950/30 rounded-full p-1 opacity-30 hover:opacity-100 -left-12 top-1/2 -translate-y-1/2 text-white z-10 cursor-pointer hidden lg:block"
                  onClick={() => swiperRef.current?.slidePrev()}
                >
                  <IconChevronLeft className="w-8 h-8" />
                </div>
                <div
                  className="gallery-next absolute bg-gray-950/30 rounded-full p-1 opacity-30 hover:opacity-100 -right-12 top-1/2 -translate-y-1/2 text-white z-10 cursor-pointer hidden lg:block"
                  onClick={() => swiperRef.current?.slideNext()}
                >
                  <IconChevronRight className="w-8 h-8" />
                </div>
              </div>
            </div>
            <ThumbnailSwiperContainer className="thumbnails">
              <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={16}
                // centeredSlides={true}
                loop={false}
                slidesPerView={"auto"}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
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
          </div>
        </div>
      </ModalStyled>
    </>
  );
};
export default PopupGalleries;

const ModalStyled = styled("div")`
  & {
    &.travel-modal {
      .travel-modal-content {
        background-color: transparent;
        box-shadow: none;
      }
    }
  }
`;
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
      }
    }
  }
`;
