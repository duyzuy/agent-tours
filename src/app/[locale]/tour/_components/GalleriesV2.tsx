"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { mediaConfig } from "@/configs";
import { IconChevronLeft, IconChevronRight, IconImage, IconImages } from "@/assets/icons";
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
import classNames from "classnames";
import ModalGallery from "./ModalGallery";

interface GalleriesV2Props {
  images: IThumbnail[] | null;
}
const GalleriesV2: React.FC<GalleriesV2Props> = ({ images = [] }) => {
  if (!images || !images.length) return null;

  if (images?.length > 5) {
    return <GalleryGrid images={images} />;
  }
  return (
    <div className="product-gallery relative bg-gray-50 rounded-md overflow-hidden w-full mb-3">
      <div className="flex flex-wrap items-center">
        {images?.map(({ id, original, small }, _index) => (
          <div className="relative aspect-video w-1/3">
            <Image
              src={`${mediaConfig.rootApiPath}/${original}`}
              loading="lazy"
              alt="thumbnail"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="bg-slate-50 object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
export default GalleriesV2;

interface GalleryGridProps {
  images: IThumbnail[];
}
const GalleryGrid: React.FC<GalleryGridProps> = ({ images }) => {
  const [openModal, setOpenModal] = useState(false);
  const firstFiveImage = images.slice(0, 5);

  return (
    <div className="grid grid-cols-8 grid-rows-2 -mx-1">
      {firstFiveImage.map(({ id, original, small }, _index) => (
        <div
          key={_index}
          className={classNames("aspect-video p-1 overflow-hidden", {
            "col-span-8 md:col-span-4 row-span-2": _index === 0,
            "col-span-2 row-span-1": _index !== 0,
          })}
        >
          <div className="relative w-full h-full rounded-md md:rounded-xl overflow-hidden">
            <Image
              src={`${mediaConfig.rootApiPath}/${original}`}
              loading="lazy"
              alt="thumbnail"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="bg-slate-50 object-cover w-full h-full"
            />
            {_index === 4 && (
              <Button
                onClick={() => setOpenModal(true)}
                className={classNames(
                  "!px-3 !py-2 !h-auto bottom-2 right-2 !absolute !rounded-lg hover:!border-white",
                  {
                    "!hidden lg:!inline-flex items-center": true,
                  },
                )}
              >
                <span className="!inline-flex text-gray-800 items-center gap-2 leading-none">
                  <IconImage className="mx-auto !w-4 !h-4" />
                  <span>Thư viện ảnh</span>
                </span>
              </Button>
            )}
          </div>
        </div>
      ))}
      <ModalGallery images={images} open={openModal} onClose={() => setOpenModal(false)} />
    </div>
  );
};
