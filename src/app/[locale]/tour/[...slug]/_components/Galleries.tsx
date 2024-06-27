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
import {
    IconArrowLeftCircle,
    IconChevronLeft,
    IconChevronRight,
} from "@/assets/icons";
interface GalleriesProps {
    data: any;
    data2: any;
    images?: string[];
}
const Galleries: React.FC<GalleriesProps> = ({ data, data2, images = [] }) => {
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

    console.log(data);
    console.log(data2);
    return (
        <>
            <div className="relative bg-gray-50 rounded-md overflow-hidden w-full mb-6">
                <Swiper
                    spaceBetween={10}
                    navigation={{
                        nextEl: ".gallery-next",
                        prevEl: ".gallery-prev",
                    }}
                    thumbs={{ swiper: thumbsSwiper }}
                    modules={[FreeMode, Navigation, Thumbs]}
                    className="galleries"
                    breakpoints={{
                        1400: {
                            navigation: true,
                        },
                    }}
                >
                    {images?.map((img, _index) => (
                        <SwiperSlide key={_index}>
                            <div className="relative pt-[66.67%]">
                                <Image
                                    src={`${mediaConfig.rootApiPath}/${img}`}
                                    alt="thumbnail"
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    className="bg-slate-50 object-contain italic"
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
                <div className="gallery-prev absolute bg-gray-950/30 rounded-full p-1 opacity-30 hover:opacity-100 left-0 top-1/2 -translate-y-1/2 text-white z-10 cursor-pointer hidden lg:block">
                    <IconChevronLeft className="w-8 h-8" />
                </div>
                <div className="gallery-next absolute bg-gray-950/30 rounded-full p-1 opacity-30 hover:opacity-100 right-0 top-1/2 -translate-y-1/2 text-white z-10 cursor-pointer hidden lg:block">
                    <IconChevronRight className="w-8 h-8" />
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
                {images?.map((img, _index) => (
                    <SwiperSlide key={_index}>
                        <div className="w-full pt-[55.25%] relative rounded-md overflow-hidden">
                            <Image
                                src={`${mediaConfig.rootApiPath}/${img}`}
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
