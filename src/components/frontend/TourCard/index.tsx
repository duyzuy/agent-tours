import React from "react";
import Image from "next/image";
import IconStar from "@/assets/icons/IconStar";
import IconHeart from "@/assets/icons/IconHeart";
import IconShare from "@/assets/icons/IconShare";
import classNames from "classnames";
interface Props {
    thumbnail?: string;
    title: string;
    className?: string;
    shadow?: "none" | "sm" | "md" | "lg";
}
const TourCard: React.FC<Props> = ({
    thumbnail,
    title,
    className = "w-1/3",
    shadow = "md",
}) => {
    return (
        <div
            className={classNames("article", {
                [className]: className,
            })}
        >
            <div
                className={classNames(
                    "inner bg-white rounded-2xl overflow-hidden ",
                    {
                        "drop-shadow-sm": shadow === "sm",
                        "drop-shadow-md": shadow === "md",
                        "drop-shadow-lg": shadow === "lg",
                    },
                )}
            >
                <div className="thumbnail">
                    {thumbnail ? (
                        <Image
                            src={thumbnail}
                            alt="article"
                            width={900}
                            height={600}
                            className="rounded-tl-lg rounded-tr-lg"
                        />
                    ) : (
                        <span>no image</span>
                    )}
                </div>
                <div className="article-content px-2 pt-3 border-[2px] border-t-0 rounded-bl-2xl rounded-br-2xl bg-white">
                    <h3 className="line-clamp-2 mb-2 text-md font-semibold text-main-400 text-[15px]">
                        {title}
                    </h3>
                    <div className="price flex items-center">
                        <p className=" line-through text-gray-400 mr-2 text-xs">
                            4.500.000 VND
                        </p>
                        <p className="text-red-600 text-md font-semibold">
                            3.900.000 VND
                        </p>
                    </div>
                    <p className="line w-full h-[1px] my-3 bg-gray-100"></p>
                    <div className="flex justify-between text-[11px]">
                        <ul className="flex-1">
                            <li className="flex items-center mb-1">
                                <span className="text-gray-500 w-[65px] block">
                                    Mã tour
                                </span>
                                <span>#KDU82937</span>
                            </li>
                            <li className="flex items-center mb-1">
                                <span className="text-gray-500 w-[65px] block">
                                    Thời gian
                                </span>
                                <span>3 ngày 2 đêm</span>
                            </li>
                            <li className="flex items-center mb-1">
                                <span className="text-gray-500 w-[65px] block">
                                    Khởi hành
                                </span>
                                <span>16/09/2023</span>
                            </li>
                        </ul>
                        <div className="slot text-center bg-gray-100 rounded-md px-2 py-2 border border-gray-300">
                            <p>Số chỗ còn</p>
                            <span className="text-red-600 text-sm">8</span>
                        </div>
                    </div>
                    <p className="line w-full h-[1px] mt-3 mb-1 bg-gray-100"></p>
                    <div className="article-bottom py-2 text-[11px]">
                        <div className="flex items-center justify-between">
                            <div className="left flex items-center">
                                <span>
                                    <IconStar
                                        fill="#F2C94C"
                                        stroke="#F2C94C"
                                        className="w-[14px]"
                                    />
                                </span>
                                <span className="mx-2 w-[1px] h-[8px] block bg-gray-400"></span>
                                <span className="text-main-400">Tuyệt vời</span>
                            </div>
                            <div className="right flex items-center">
                                <span>634 quan tâm</span>
                                <span className="mx-2 w-[1px] h-[8px] block bg-gray-400"></span>
                                <div className="flex items-center gap-x-2">
                                    <span>
                                        <IconHeart className="w-[14px]" />
                                    </span>
                                    <span>
                                        <IconShare className="w-[14px]" />
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default TourCard;
