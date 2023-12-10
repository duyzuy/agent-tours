"use client";
import React, {
    useState,
    useRef,
    useCallback,
    forwardRef,
    useEffect,
} from "react";
import Image from "next/image";
import Link from "next/link";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";

import classNames from "classnames";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper as SwiperType } from "swiper/types";
import IconChevronRight from "@/assets/icons/IconChevronRight";
import IconChevronLeft from "@/assets/icons/IconChevronLeft";

const POSTS = [
    {
        id: 1,
        authorName: "Nguyen Hoang Anh",
        authorAvt: "/assets/images/avt.jpg",
        date: "11/12/2024",
        name: "Những điểm hấp dẫn của Hà Nội khi vào Thu.",
        slug: "/",
        thumbnail: "/assets/images/steel-1.jpg",
        hashtags: ["Hanoi mùa xuân lãng mạn", "Hanoi mùa xuân"],
    },
    {
        id: 2,
        authorName: "Nguyen Hoang Anh",
        authorAvt: "/assets/images/avt.jpg",
        date: "11/12/2024",
        name: "Những điểm hấp dẫn của Hà Nội khi vào Thu.",
        slug: "/",
        thumbnail: "/assets/images/steel-4.jpg",
        hashtags: ["Hanoi mùa xuân lãng mạn", "Hanoi mùa xuân"],
    },
    {
        id: 3,
        authorName: "Nguyen Hoang Anh",
        authorAvt: "/assets/images/avt.jpg",
        date: "11/12/2024",
        name: "Những điểm hấp dẫn của Hà Nội khi vào Thu.",
        slug: "/",
        thumbnail: "/assets/images/steel-5.jpg",
        hashtags: ["Hanoi mùa xuân lãng mạn", "Hanoi mùa xuân", "Mùa xuân"],
    },
    {
        id: 4,
        authorName: "Nguyen Hoang Anh",
        authorAvt: "/assets/images/avt.jpg",
        date: "11/12/2024",
        name: "Những điểm hấp dẫn của Hà Nội khi vào Thu.",
        slug: "/",
        thumbnail: "/assets/images/steel-2.jpg",
        hashtags: ["Hanoi mùa xuân lãng mạn", "Hanoi mùa xuân"],
    },
    {
        id: 5,
        authorName: "Nguyen Hoang Anh",
        authorAvt: "/assets/images/avt.jpg",
        date: "11/12/2024",
        name: "Những điểm hấp dẫn của Hà Nội khi vào Thu.",
        slug: "/",
        thumbnail: "/assets/images/steel-3.jpg",
        hashtags: ["Hanoi mùa xuân lãng mạn", "Hanoi mùa xuân"],
    },
];
const PostsSection = () => {
    const swiperRef = useRef<SwiperType>();

    return (
        <section className="steel tours">
            <div className="container mx-auto py-12">
                <div className="list-items slider relative">
                    <Swiper
                        slidesPerView={1}
                        spaceBetween={16}
                        breakpoints={{
                            640: {
                                slidesPerView: 2,
                                spaceBetween: 16,
                            },
                            1024: {
                                slidesPerView: 3,
                                spaceBetween: 16,
                            },
                        }}
                        modules={[Navigation]}
                        onBeforeInit={(swiper) => {
                            swiperRef.current = swiper;
                        }}
                    >
                        {POSTS.map((item) => (
                            <SwiperSlide key={item.id}>
                                <div className="post-item mb-6">
                                    <div className="author mb-3">
                                        <div className="flex items-center">
                                            <Image
                                                src={item.authorAvt}
                                                alt={item.authorName}
                                                width={60}
                                                height={60}
                                                className="rounded-full"
                                            />
                                            <div className="ml-2">
                                                <p className=" font-semibold text-xs mb-1">
                                                    {item.authorName}
                                                </p>
                                                <p className="text-xs text-gray-400">
                                                    {item.date}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <Link href={item.slug}>
                                        <div className="thumbnail rounded-2xl overflow-hidden mb-4">
                                            <Image
                                                src={item.thumbnail}
                                                alt={item.name}
                                                width={900}
                                                height={900}
                                            />
                                        </div>
                                        <div className="steel-content mb-2">
                                            <h3 className="text-[15px] font-semibold text-main-400 line-clamp-2">
                                                {item.name}
                                            </h3>
                                            <div className="hash-tag">
                                                {item.hashtags.map(
                                                    (hTag, _index) => (
                                                        <span
                                                            key={_index}
                                                            className={classNames(
                                                                "h-tag text-xs text-main-400",
                                                                {
                                                                    "ml-2":
                                                                        _index !==
                                                                        0,
                                                                },
                                                            )}
                                                        >{`#${hTag}`}</span>
                                                    ),
                                                )}
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    <div className="swiper-navigation">
                        <ButtonNavigation
                            className="-left-5 top-[50%]"
                            onClick={() => swiperRef.current?.slidePrev()}
                        >
                            <IconChevronLeft width={16} />
                        </ButtonNavigation>
                        <ButtonNavigation
                            className="-right-5 top-[50%]"
                            onClick={() => swiperRef.current?.slideNext()}
                        >
                            <IconChevronRight width={16} />
                        </ButtonNavigation>
                    </div>
                </div>
            </div>
        </section>
    );
};
export default PostsSection;

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
