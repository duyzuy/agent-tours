"use client";
import Link from "next/link";
import ArticleTour from "@/components/frontend/TourCard";
import VisaSection from "./_components/VisaSection";
import PostsSection from "./_components/PostsSection";
import ExploreSection from "./_components/ExploreSection";
import FlashSale from "./_components/FlashSale";
import LineSpacing from "@/components/frontend/LineSpacing";
import BannerSection from "./_components/BannerSection";
import TopSliderSection from "./_components/TopSliderSection";
const HomegePageClient = () => {
    return (
        <div className="page-home">
            <TopSliderSection />
            <div
                className="page-bottom pt-12"
                style={{
                    background: "url(/assets/images/bg.jpg)",
                    backgroundSize: "cover",
                }}
            >
                <FlashSale />
                <LineSpacing spaceY={12} />
                <BannerSection />
                <LineSpacing spaceY={12} />
                <section className="tabs">
                    <div className="container mx-auto">
                        <div className="tabs py-3 mb-3">
                            <ul className="flex items-center gap-x-6">
                                <li>
                                    <Link
                                        href="/"
                                        className="font-semibold text-main-400"
                                    >
                                        TOUR TRONG NƯỚC
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/" className="font-semibold ">
                                        TOUR NƯỚC NGOÀI
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/" className="font-semibold ">
                                        TOUR COMBO
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className="tour-list flex flex-wrap flex-1 -mx-2">
                            <ArticleTour
                                thumbnail="/assets/images/article-1.jpg"
                                title=" Liên Tuyến Trung Bắc: Đà Nẵng - Huế - Động Phong Nha & Thiên Đường"
                                className="w-1/4 px-2 mb-4"
                            />
                            <ArticleTour
                                thumbnail="/assets/images/article-2.jpg"
                                title=" Liên Tuyến Trung Bắc: Cầu Vàng - Hội An - Hà Nội - Sapa - Fansipan - Vịnh Hạ"
                                className="w-1/4 px-2 mb-4"
                            />
                            <ArticleTour
                                thumbnail="/assets/images/article-8.jpg"
                                title="Động Phong Nha & Thiên Đường - Bà Nà - Cầu Vàng - Hội An - Hà Nội - Sapa - Fansipan - Vịnh Hạ
                                    Long"
                                className="w-1/4 px-2 mb-4"
                            />
                            <ArticleTour
                                thumbnail="/assets/images/article-3.jpg"
                                title="Động Phong Nha & Thiên Đường - Bà Nà - Cầu Vàng - Hội An - Hà Nội - Sapa - Fansipan - Vịnh Hạ
                                    Long"
                                className="w-1/4 px-2 mb-4"
                            />
                            <ArticleTour
                                thumbnail="/assets/images/article-4.jpg"
                                title="Động Phong Nha & Thiên Đường - Bà Nà - Cầu Vàng - Hội An - Hà Nội - Sapa - Fansipan - Vịnh Hạ
                                    Long"
                                className="w-1/4 px-2 mb-4"
                            />
                            <ArticleTour
                                thumbnail="/assets/images/article-5.jpg"
                                title="Động Phong Nha & Thiên Đường - Bà Nà - Cầu Vàng - Hội An - Hà Nội - Sapa - Fansipan - Vịnh Hạ
                                    Long"
                                className="w-1/4 px-2 mb-4"
                            />
                            <ArticleTour
                                thumbnail="/assets/images/article-6.jpg"
                                title="Động Phong Nha & Thiên Đường - Bà Nà - Cầu Vàng - Hội An - Hà Nội - Sapa - Fansipan - Vịnh Hạ
                                    Long"
                                className="w-1/4 px-2 mb-4"
                            />
                            <ArticleTour
                                thumbnail="/assets/images/article-7.jpg"
                                title="Động Phong Nha & Thiên Đường - Bà Nà - Cầu Vàng - Hội An - Hà Nội - Sapa - Fansipan - Vịnh Hạ
                                    Long"
                                className="w-1/4 px-2 mb-4"
                            />
                        </div>
                        <div className="paginations flex items-center justify-center">
                            <span className="w-9 h-9 bg-white rounded-full inline-flex items-center justify-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="lucide lucide-chevron-left"
                                >
                                    <path d="m15 18-6-6 6-6" />
                                </svg>
                            </span>
                            <ul className="flex items-center mx-2">
                                <li>
                                    <span className="w-9 h-9 bg-white inline-flex text-gray-600 text-[14px] items-center justify-center rounded-full border">
                                        1
                                    </span>
                                </li>
                                <li>
                                    <span className="w-9 h-9 bg-white inline-flex text-gray-600 text-[14px] items-center justify-center rounded-full border ml-2">
                                        2
                                    </span>
                                </li>
                                <li>
                                    <span className="w-9 h-9 bg-white inline-flex text-gray-600 text-[14px] items-center justify-center rounded-full border ml-2">
                                        3
                                    </span>
                                </li>
                                <li>
                                    <span className="w-9 h-9 bg-white inline-flex text-gray-600 text-[14px] items-center justify-center rounded-full border ml-2">
                                        4
                                    </span>
                                </li>
                                <li>
                                    <span className="w-9 h-9 bg-white inline-flex text-gray-600 text-[14px] items-center justify-center rounded-full border ml-2">
                                        5
                                    </span>
                                </li>
                                <li>
                                    <span className="w-9 h-9 bg-white inline-flex text-gray-600 text-[14px] items-center justify-center rounded-full border ml-2">
                                        6
                                    </span>
                                </li>
                                <li>
                                    <span className="w-9 h-9 bg-white inline-flex text-gray-600 text-[14px] items-center justify-center rounded-full border ml-2">
                                        7
                                    </span>
                                </li>
                                <li>
                                    <span className="w-9 h-9 bg-white inline-flex text-gray-600 text-[14px] items-center justify-center rounded-full border ml-2">
                                        8
                                    </span>
                                </li>
                            </ul>
                            <span className="w-9 h-9 bg-white rounded-full inline-flex items-center justify-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="lucide lucide-chevron-right"
                                >
                                    <path d="m9 18 6-6-6-6" />
                                </svg>
                            </span>
                        </div>
                    </div>
                </section>
                <LineSpacing spaceY={12} />
                <VisaSection />
                <LineSpacing spaceY={12} />
                <PostsSection />
                <LineSpacing spaceY={12} />
                <ExploreSection />
            </div>
        </div>
    );
};
export default HomegePageClient;
