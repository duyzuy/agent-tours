"use client";
import IconArrowRightCircle from "@/assets/icons/IconArrowRightCircle";
import Image from "next/image";
import { Button } from "antd";
import Link from "next/link";
import IconChevronRight from "@/assets/icons/IconChevronRight";
import React, {
    useState,
    useRef,
    useCallback,
    forwardRef,
    useEffect,
} from "react";

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
        description:
            "Ẩm thực xứ Quảng mang nét đặc trưng văn hóa, lịch sử của vùng đất Quảng Nam...",
    },
    {
        id: 2,

        date: "Thứ Ba, 18/08/2023 09:30",
        name: "Về xứ Quảng thưởng thức mỹ vị ẩm thực tinh hoa",
        slug: "/",
        thumbnail: "/assets/images/khampha-2.jpg",
        description:
            "Ẩm thực xứ Quảng mang nét đặc trưng văn hóa, lịch sử của vùng đất Quảng Nam...",
    },
    {
        id: 3,
        date: "Thứ Ba, 18/08/2023 09:30",
        name: "Về xứ Quảng thưởng thức mỹ vị ẩm thực tinh hoa",
        slug: "/",
        thumbnail: "/assets/images/khampha-3.jpg",
        description:
            "Ẩm thực xứ Quảng mang nét đặc trưng văn hóa, lịch sử của vùng đất Quảng Nam...",
    },
    {
        id: 4,
        date: "Thứ Ba, 18/08/2023 09:30",
        name: "Về xứ Quảng thưởng thức mỹ vị ẩm thực tinh hoa",
        slug: "/",
        thumbnail: "/assets/images/khampha-3.jpg",
        description:
            "Ẩm thực xứ Quảng mang nét đặc trưng văn hóa, lịch sử của vùng đất Quảng Nam...",
    },
];
const ExploreSection = () => {
    const swiperRef = useRef<SwiperType>();
    return (
        <section
            className="relative py-12"
            style={{
                background: "url(/assets/images/bg-footer.jpg)",
                backgroundSize: "cover",
                backgroundPosition: "center bottom",
            }}
        >
            <div className="overlay bg-slate-900 opacity-40 absolute left-0 top-0 w-full h-full"></div>
            <div className="container mx-auto relative z-10 px-4 lg:px-0">
                <div className="inner flex flex-wrap items-center">
                    <div className="section-title w-full lg:w-1/3 mb-6 lg:mb-0">
                        <div className="title text-2xl lg:text-5xl  drop-shadow-lg text-white relative lg:pb-6 pb-2 mb-8">
                            <div className="text relative z-10 ">
                                <p className="mb-2">Trải nghiệm</p>
                                <p>khám phá</p>
                            </div>
                            <div className="bg-red-600 h-6 lg:h-12 absolute pointer-events-none bottom-0 w-full max-w-[200px]"></div>
                        </div>
                        <div className="bottom">
                            <Link
                                className="btn rounded-full flex items-center border w-fit px-3 py-2 font-semibold text-[14px]"
                                href="/"
                            >
                                <span className="text-white">
                                    Khám phá ngay
                                </span>
                                <span className="ml-2">
                                    <IconChevronRight
                                        width={14}
                                        color="white"
                                    />
                                </span>
                            </Link>
                        </div>
                    </div>
                    <div className="w-full lg:w-2/3">
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
                                        slidesPerView: 3,
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
                                        <div
                                            className="explore-item"
                                            key={_item.id}
                                        >
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
                                                    <h3 className="text-main-500 font-semibold text-[15px] line-clamp-2">
                                                        {_item.name}
                                                    </h3>
                                                    <div className="line bg-gray-200 h-[1px] my-2"></div>
                                                    <p className="date text-[12px] text-gray-400 py-2">
                                                        {_item.date}
                                                    </p>
                                                    <p className="desc line-clamp-3 text-sm text-gray-500 mb-2">
                                                        {_item.description}
                                                    </p>
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
                                <ButtonNavigation
                                    className="-left-5 top-[50%]"
                                    onClick={() =>
                                        swiperRef.current?.slidePrev()
                                    }
                                >
                                    <IconChevronLeft width={16} />
                                </ButtonNavigation>
                                <ButtonNavigation
                                    className="-right-5 top-[50%]"
                                    onClick={() =>
                                        swiperRef.current?.slideNext()
                                    }
                                >
                                    <IconChevronRight width={16} />
                                </ButtonNavigation>
                            </div>
                        </div>
                    </div>
                    {/* <div className="list flex items-center flex-1">
                        {POSTS.map((_item) => (
                            <div className="explore-item px-2" key={_item.id}>
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
                                        <h3 className="text-main-500 font-semibold text-[15px] line-clamp-2">
                                            {_item.name}
                                        </h3>
                                        <div className="line bg-gray-200 h-[1px] my-2"></div>
                                        <p className="date text-[12px] text-gray-400 py-2">
                                            {_item.date}
                                        </p>
                                        <p className="desc line-clamp-3 text-sm text-gray-500 mb-2">
                                            {_item.description}
                                        </p>
                                        <p className="text-right">
                                            <IconArrowRightCircle className="stroke-red-600 inline-block" />
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div> */}
                </div>
            </div>
        </section>
    );
};
export default ExploreSection;

// ("use client");
// import React, {
//     useState,
//     useRef,
//     useCallback,
//     forwardRef,
//     useEffect,
// } from "react";
// import Image from "next/image";
// import Link from "next/link";

// // Import Swiper React components
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Pagination, Navigation } from "swiper/modules";

// import classNames from "classnames";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import { Swiper as SwiperType } from "swiper/types";
// import IconChevronRight from "@/assets/icons/IconChevronRight";
// import IconChevronLeft from "@/assets/icons/IconChevronLeft";

// const POSTS = [
//     {
//         id: 1,
//         authorName: "Nguyen Hoang Anh",
//         authorAvt: "/assets/images/avt.jpg",
//         date: "11/12/2024",
//         name: "Những điểm hấp dẫn của Hà Nội khi vào Thu.",
//         slug: "/",
//         thumbnail: "/assets/images/steel-1.jpg",
//         hashtags: ["Hanoi mùa xuân lãng mạn", "Hanoi mùa xuân"],
//     },
//     {
//         id: 2,
//         authorName: "Nguyen Hoang Anh",
//         authorAvt: "/assets/images/avt.jpg",
//         date: "11/12/2024",
//         name: "Những điểm hấp dẫn của Hà Nội khi vào Thu.",
//         slug: "/",
//         thumbnail: "/assets/images/steel-4.jpg",
//         hashtags: ["Hanoi mùa xuân lãng mạn", "Hanoi mùa xuân"],
//     },
//     {
//         id: 3,
//         authorName: "Nguyen Hoang Anh",
//         authorAvt: "/assets/images/avt.jpg",
//         date: "11/12/2024",
//         name: "Những điểm hấp dẫn của Hà Nội khi vào Thu.",
//         slug: "/",
//         thumbnail: "/assets/images/steel-5.jpg",
//         hashtags: ["Hanoi mùa xuân lãng mạn", "Hanoi mùa xuân", "Mùa xuân"],
//     },
//     {
//         id: 4,
//         authorName: "Nguyen Hoang Anh",
//         authorAvt: "/assets/images/avt.jpg",
//         date: "11/12/2024",
//         name: "Những điểm hấp dẫn của Hà Nội khi vào Thu.",
//         slug: "/",
//         thumbnail: "/assets/images/steel-2.jpg",
//         hashtags: ["Hanoi mùa xuân lãng mạn", "Hanoi mùa xuân"],
//     },
//     {
//         id: 5,
//         authorName: "Nguyen Hoang Anh",
//         authorAvt: "/assets/images/avt.jpg",
//         date: "11/12/2024",
//         name: "Những điểm hấp dẫn của Hà Nội khi vào Thu.",
//         slug: "/",
//         thumbnail: "/assets/images/steel-3.jpg",
//         hashtags: ["Hanoi mùa xuân lãng mạn", "Hanoi mùa xuân"],
//     },
// ];
// const PostsSection = () => {
//     const swiperRef = useRef<SwiperType>();

//     return (
//         <section className="steel tours">
//             <div className="container mx-auto py-12 lg:px-0 px-4">
//                 <div className="list-items slider relative">
//                     <Swiper
//                         slidesPerView={2}
//                         spaceBetween={16}
//                         breakpoints={{
//                             640: {
//                                 slidesPerView: 3,
//                                 spaceBetween: 16,
//                             },
//                             1024: {
//                                 slidesPerView: 4,
//                                 spaceBetween: 16,
//                             },
//                         }}
//                         modules={[Navigation]}
//                         onBeforeInit={(swiper) => {
//                             swiperRef.current = swiper;
//                         }}
//                     >
//                         {POSTS.map((item) => (
//                             <SwiperSlide key={item.id}>
//                                 <div className="post-item mb-6">
//                                     <div className="author mb-3">
//                                         <div className="flex items-center">
//                                             <Image
//                                                 src={item.authorAvt}
//                                                 alt={item.authorName}
//                                                 width={40}
//                                                 height={40}
//                                                 className="rounded-full"
//                                             />
//                                             <div className="ml-2">
//                                                 <p className=" font-semibold text-xs mb-1">
//                                                     {item.authorName}
//                                                 </p>
//                                                 <p className="text-xs text-gray-400">
//                                                     {item.date}
//                                                 </p>
//                                             </div>
//                                         </div>
//                                     </div>
//                                     <Link href={item.slug}>
//                                         <div className="thumbnail rounded-2xl overflow-hidden mb-4">
//                                             <Image
//                                                 src={item.thumbnail}
//                                                 alt={item.name}
//                                                 width={900}
//                                                 height={900}
//                                             />
//                                         </div>
//                                         <div className="steel-content mb-2">
//                                             <h3 className="text-[15px] font-semibold text-main-400 line-clamp-2">
//                                                 {item.name}
//                                             </h3>
//                                             <div className="hash-tag">
//                                                 {item.hashtags.map(
//                                                     (hTag, _index) => (
//                                                         <span
//                                                             key={_index}
//                                                             className={classNames(
//                                                                 "h-tag text-xs text-main-400",
//                                                                 {
//                                                                     "ml-2":
//                                                                         _index !==
//                                                                         0,
//                                                                 },
//                                                             )}
//                                                         >{`#${hTag}`}</span>
//                                                     ),
//                                                 )}
//                                             </div>
//                                         </div>
//                                     </Link>
//                                 </div>
//                             </SwiperSlide>
//                         ))}
//                     </Swiper>
//                     <div className="swiper-navigation">
//                         <ButtonNavigation
//                             className="-left-5 top-[50%]"
//                             onClick={() => swiperRef.current?.slidePrev()}
//                         >
//                             <IconChevronLeft width={16} />
//                         </ButtonNavigation>
//                         <ButtonNavigation
//                             className="-right-5 top-[50%]"
//                             onClick={() => swiperRef.current?.slideNext()}
//                         >
//                             <IconChevronRight width={16} />
//                         </ButtonNavigation>
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// };
// export default PostsSection;

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
