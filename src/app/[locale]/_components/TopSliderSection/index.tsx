import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import BoxSearchTour from "./BoxSearchTour";

const TopSliderSection = () => {
    return (
        <div className="page-middle relative pt-8 pb-16 w-full flex flex-col justify-between min-h-[500px] lg:h-[650px]">
            <div className="container mx-auto menu-horizon relative z-10">
                <div className="menu-container bg-main-400 text-white rounded-lg py-3">
                    <ul className="menu-list flex items-center font-semibold">
                        <li className="px-4 py-2">
                            <Link href="/" className="flex items-center">
                                <Image
                                    src="/assets/icons/icon-international.svg"
                                    alt="global"
                                    width={28}
                                    height={28}
                                    className="mr-2"
                                />
                                <span className="nav-link-text text-white">
                                    Tour nước ngoài
                                </span>
                            </Link>
                        </li>
                        <li className="px-4 py-2">
                            <Link href="/" className="flex items-center">
                                <Image
                                    src="/assets/icons/icon-dom.svg"
                                    alt="global"
                                    width={28}
                                    height={28}
                                    className="mr-2"
                                />
                                <span className="nav-link-text text-white">
                                    Tour trong nước
                                </span>
                            </Link>
                        </li>
                        <li className="px-4 py-2">
                            <Link href="/" className="flex items-center">
                                <Image
                                    src="/assets/icons/icon-group.svg"
                                    alt="global"
                                    width={28}
                                    height={28}
                                    className="mr-2"
                                />
                                <span className="nav-link-text text-white">
                                    Tour team building
                                </span>
                            </Link>
                        </li>
                        <li className="px-4 py-2">
                            <Link href="/" className="flex items-center">
                                <Image
                                    src="/assets/icons/icon-hot.svg"
                                    alt="global"
                                    width={28}
                                    height={28}
                                    className="mr-2"
                                />
                                <span className="nav-link-text text-white">
                                    Tour combo hot
                                </span>
                            </Link>
                        </li>
                        <li className="px-4 py-2">
                            <Link href="/" className="flex items-center">
                                <Image
                                    src="/assets/icons/icon-visa.svg"
                                    alt="global"
                                    width={28}
                                    height={28}
                                    className="mr-2"
                                />
                                <span className="nav-link-text text-white">
                                    Visa / passport
                                </span>
                            </Link>
                        </li>
                        <li className="px-4 py-2">
                            <Link href="/" className="flex items-center">
                                <Image
                                    src="/assets/icons/icon-fly.svg"
                                    alt="global"
                                    width={28}
                                    height={28}
                                    className="mr-2"
                                />
                                <span className="nav-link-text text-white">
                                    Vé máy bay
                                </span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="trv-slider absolute top-0 bottom-0 left-0 right-0">
                <Image
                    src="/assets/images/slide-banner.jpg"
                    fill
                    alt="slider"
                    style={{
                        objectFit: "cover",
                        objectPosition: "bottom center",
                    }}
                />
            </div>
            <div className="box box-middle container max-w-[850px] mx-auto relative z-10">
                <div className="inner">
                    <div className="box-content text-white text-center py-6">
                        <h5 className="text-white drop-shadow-lg text-5xl font-bold mb-4">
                            Trải nghiệm kỳ nghỉ tuyệt vời
                        </h5>
                        <p className="font-bold text-xl drop-shadow-md">
                            Combo khách sạn - vé máy bay - đưa đón sân bay giá
                            tốt nhất
                        </p>
                    </div>
                    <BoxSearchTour />
                </div>
            </div>
        </div>
    );
};
export default TopSliderSection;
