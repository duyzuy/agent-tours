import IconArrowRightCircle from "@/assets/icons/IconArrowRightCircle";
import Image from "next/image";
import React from "react";
import { Button } from "antd";
import Link from "next/link";
import IconChevronRight from "@/assets/icons/IconChevronRight";
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
];
const ExploreSection = () => {
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
            <div className="container mx-auto relative z-10">
                <div className="inner flex flex-wrap items-center">
                    <div className="section-title w-[320px] pr-6">
                        <div className="title text-5xl  drop-shadow-lg text-white relative pb-6 mb-8">
                            <div className="text relative z-10">
                                <p className="mb-2">Trải nghiệm</p>
                                <p>khám phá</p>
                            </div>
                            <div className="bg-red-600 h-12 absolute pointer-events-none bottom-0 w-full max-w-[200px]"></div>
                        </div>
                        <div className="bottom">
                            <Link
                                className="btn rounded-full flex items-center border w-fit text-white px-3 py-2 font-semibold text-[14px]"
                                href="/"
                            >
                                <span>Khám phá ngay</span>
                                <IconChevronRight width={14} />
                            </Link>
                        </div>
                    </div>
                    <div className="list flex items-center flex-1">
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
                    </div>
                </div>
            </div>
        </section>
    );
};
export default ExploreSection;
