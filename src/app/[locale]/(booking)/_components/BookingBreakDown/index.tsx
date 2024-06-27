"use client";
import classNames from "classnames";
import { useBookingSelector } from "@/app/[locale]/hooks/useBookingInformation";
import { useLocale } from "next-intl";
import { useMemo } from "react";
import { mediaConfig } from "@/configs";
import Image from "next/image";
import useSummaryBooking from "../../modules/useSummaryBooking";
import { moneyFormatVND } from "@/utils/helper";
import { formatDate } from "@/utils/date";
import { PassengerType } from "@/models/common.interface";
import { useTranslations } from "next-intl";
import { Tag } from "antd";
interface BookingBreakDownProps {
    className?: string;
}
const BookingBreakDown: React.FC<BookingBreakDownProps> = ({
    className = "",
}) => {
    const bookingDetails = useBookingSelector((state) => state.bookingDetails);
    const { productBreakdown, subtotal } = useSummaryBooking();
    const product = useBookingSelector((state) => state.product);
    const locale = useLocale();
    const t = useTranslations("String");

    const productCmsContent = useMemo(() => {
        return product?.template?.cms.find((item) => item.lang === locale);
    }, [product]);
    return (
        <div
            className={classNames("booking__breakdown", {
                [className]: className,
            })}
        >
            <div className="booking__breakdown-inner">
                <div className="box product-detail px-6 py-4 bg-white rounded-lg mb-6">
                    <div className="box-inner flex">
                        <div className="thumbail w-24 h-24 rounded-md relative mr-4 overflow-hidden">
                            {productCmsContent?.thumb ? (
                                <Image
                                    src={`${mediaConfig.rootApiPath}/${productCmsContent.thumb}`}
                                    fill
                                    alt={productCmsContent?.name}
                                    style={{ objectFit: "cover" }}
                                />
                            ) : (
                                <div>no image</div>
                            )}
                        </div>
                        <div className="content flex-1">
                            <p className="text-lg font-[500] mb-3">
                                {productCmsContent?.name}
                            </p>
                            <Tag color="blue">{`#${product?.template.code}`}</Tag>
                        </div>
                    </div>
                    <div className="border-t mt-4 pt-4">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-gray-500">
                                {t("departDate")}
                            </span>
                            <span>
                                {product?.startDate
                                    ? formatDate(
                                          product?.startDate,
                                          "dd/MM/yyyy",
                                      )
                                    : null}
                            </span>
                        </div>
                        <div>
                            {Object.entries(productBreakdown)?.map(
                                ([type, configs]) =>
                                    configs.length ? (
                                        <div
                                            className="breakdown-pax flex justify-between mb-2"
                                            key={type}
                                        >
                                            <div className="pax-name w-32 text-gray-500">
                                                {t(type)}
                                            </div>
                                            <div className="price-list flex-1 text-right">
                                                {configs.map(
                                                    (config, _index) => (
                                                        <div
                                                            key={`${type}-${_index}`}
                                                            className="flex-1"
                                                        >
                                                            <span className="config-class w-">
                                                                {config.class}
                                                            </span>
                                                            <span className="w-32 text-right ml-3">
                                                                {moneyFormatVND(
                                                                    config[
                                                                        type as PassengerType
                                                                    ],
                                                                )}
                                                            </span>
                                                        </div>
                                                    ),
                                                )}
                                            </div>
                                        </div>
                                    ) : null,
                            )}
                        </div>
                        <div className="flex items-center justify-between border-t pt-4 mt-4">
                            <span className="text-gray-500">
                                {t("subtotal")}
                            </span>
                            <span className="font-[500] text-lg">
                                {moneyFormatVND(subtotal)}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="box total px-6 py-4 bg-white rounded-lg">
                    <div className="flex items-center justify-between">
                        <span className="text-gray-500">{t("subtotal")}</span>
                        <span>{moneyFormatVND(subtotal)}</span>
                    </div>
                    <div className="flex items-center justify-between border-t pt-4 mt-4">
                        <span className="text-gray-500">
                            {t("totalPayment")}
                        </span>
                        <span className="text-red-600 text-lg font-[500]">
                            {moneyFormatVND(subtotal)}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default BookingBreakDown;
