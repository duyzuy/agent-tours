"use client";
import React, { useMemo } from "react";
import { IconChevronDown } from "@/assets/icons";
import QuantityInput from "@/components/frontend/QuantityInput";
import { Flex, Button, Form, DatePickerProps } from "antd";
import { IconShippingCart } from "@/assets/icons";
import classNames from "classnames";
import { FeProductItem } from "@/models/fe/productItem.interface";
import { formatDate } from "@/utils/date";
import FeDatePicker from "@/components/frontend/FeDatePicker";
import dayjs, { Dayjs } from "dayjs";
import FormItem from "@/components/base/FormItem";
import { useState } from "react";
import { moneyFormatVND } from "@/utils/helper";
import { useTranslations } from "next-intl";
import useSetProductItem from "@/app/[locale]/(booking)/modules/useSetProductItem";
import { useBookingSelector } from "@/app/[locale]/hooks/useBookingInformation";
import { PassengerType } from "@/models/common.interface";
import { moneyFormat } from "@/utils/common";
interface Props {
    className?: string;
    sellableList?: FeProductItem[];
    defaultSellable?: FeProductItem;
}
const ProductSummary = ({
    className = "",
    sellableList,
    defaultSellable,
}: Props) => {
    console.log(sellableList);
    const productSelected = useBookingSelector((state) => state.product);
    const onSetProduct = useSetProductItem();

    const [productItem, setProductItem] = useState<FeProductItem | undefined>(
        defaultSellable,
    );

    const t = useTranslations("String");
    const departureDates = sellableList?.reduce<{ departDate: string }[]>(
        (acc, item) => {
            return [...acc, { departDate: item.startDate }];
        },
        [],
    );
    const isSameDate = (d: Dayjs) => {
        return departureDates?.some((item) => {
            return d.isSame(dayjs(item.departDate), "date");
        });
    };

    const getLowestPrice = (configs: FeProductItem["configs"]) => {
        let minPrice = 99999999999999;
        configs.forEach((item) => {
            if (item.open > 0 && item.adult < minPrice) {
                minPrice = item.adult;
            }
        });
        return minPrice;
    };
    const lowestPriceConfigItem = useMemo(() => {
        let minConfig: FeProductItem["configs"][0] | undefined;
        productItem?.configs.forEach((item) => {
            if (!minConfig) {
                minConfig = item;
            } else {
                if (item.adult < minConfig.adult) {
                    minConfig = item;
                }
            }
        });

        return minConfig;
    }, [productItem]);

    const onChangeProduct: DatePickerProps["onChange"] = (date) => {
        const newProduct = sellableList?.find((prd) => {
            return dayjs(prd.startDate).isSame(date);
        });

        newProduct && setProductItem(newProduct);
    };
    const hasConfigPrice = Boolean(productItem?.configs.length);

    return (
        <div
            className={classNames("col-booking", {
                [className]: className,
            })}
        >
            <div className="box-booking border lg:px-6 px-4 lg:py-3 py-2 mb-4 rounded-lg bg-white drop-shadow-sm">
                <div className="header py-3 flex items-center justify-between">
                    <h3 className="font-semibold text-red-600 uppercase">
                        {t("productSummary.title")}
                    </h3>
                    <span>
                        <IconChevronDown />
                    </span>
                </div>
                {productItem?.configs.length ? (
                    <div className="mb-3 py-2">
                        <span className="price block">
                            <span className="text-xs block">
                                {t("justFrom")}
                            </span>
                            <span className="text-red-600 font-semibold text-2xl block">
                                {moneyFormatVND(
                                    getLowestPrice(productItem.configs),
                                )}
                            </span>
                        </span>
                        <span className="amount inline-block">
                            <span className="text-xs block">
                                {t("productSummary.amountRemain", {
                                    amount: lowestPriceConfigItem?.open,
                                })}
                            </span>
                        </span>
                    </div>
                ) : (
                    <p className="text-red-600 font-semibold text-2xl mb-6">
                        {t("card.contact")}
                    </p>
                )}
                <Form layout="vertical">
                    <FormItem label="Ngày khởi hành">
                        <FeDatePicker
                            value={dayjs(productItem?.startDate)}
                            placeholder="Ngày khởi hành"
                            size="large"
                            onChange={onChangeProduct}
                            disabledDate={(date) => {
                                if (isSameDate(date) && date.isAfter(dayjs())) {
                                    return false;
                                }

                                return true;
                            }}
                            className="w-full bg-red-100"
                        />
                    </FormItem>
                </Form>

                {hasConfigPrice ? (
                    <ProductSummary.Actions
                        adultPrice={lowestPriceConfigItem?.adult}
                        childPrice={lowestPriceConfigItem?.child}
                        infantPrice={lowestPriceConfigItem?.infant}
                        onClick={() => onSetProduct(productItem)}
                    />
                ) : (
                    <div>
                        <p>{t("productSummary.emptyPrices")}</p>
                    </div>
                )}
            </div>
            <div className="box-booking border lg:px-6 px-4 lg:py-3 py-2 mb-4 rounded-lg bg-white drop-shadow-sm">
                <Flex gap="middle">
                    <div className="px-2 w-full rounded-lg py-2">
                        <p className="text-xs">HOTLINE ĐẶT TOUR</p>
                        <span className="text-lg text-primary-default">
                            0988.308.530
                        </span>
                    </div>
                </Flex>
            </div>
        </div>
    );
};
export default ProductSummary;

interface ProductSummaryActionsProps {
    adultPrice?: number;
    childPrice?: number;
    infantPrice?: number;
    onClick?: () => void;
}
ProductSummary.Actions = function ProductSummaryActions({
    adultPrice,
    childPrice,
    infantPrice,
    onClick,
}: ProductSummaryActionsProps) {
    const t = useTranslations("String");

    const [passengers, setPassengers] = useState<Record<PassengerType, number>>(
        { adult: 1, child: 0, infant: 0 },
    );

    const onChangeQuantityPax = (paxType: PassengerType, value: number) => {
        setPassengers((oldData) => {
            return {
                ...oldData,
                [paxType]: value,
            };
        });
    };
    return (
        <>
            <div className="passengers mb-4">
                <div className="label mb-3">
                    <p>Số lượng hành khách</p>
                </div>
                <div className="select flex">
                    <QuantityInput
                        label={t("adult")}
                        value={passengers.adult}
                        className="w-1/3"
                        maximum={9}
                        minimum={1}
                        onChange={(action, value) =>
                            onChangeQuantityPax(PassengerType.ADULT, value)
                        }
                    />
                    <QuantityInput
                        label={t("children")}
                        value={passengers.child}
                        maximum={9}
                        minimum={0}
                        className="w-1/3"
                        onChange={(action, value) =>
                            onChangeQuantityPax(PassengerType.CHILD, value)
                        }
                    />
                    <QuantityInput
                        label={t("infant")}
                        value={passengers.infant}
                        maximum={9}
                        minimum={0}
                        className="w-1/3"
                        onChange={(action, value) =>
                            onChangeQuantityPax(PassengerType.INFANT, value)
                        }
                    />
                </div>
            </div>
            <div className="breakdown">
                <div className="breakdown-table -mx-2">
                    <div className="row flex items-center py-2 font-bold text-primary-default">
                        <div className="cell flex-1 px-2">Hành khách</div>
                        <div className="cell w-20 px-2">Số lượng</div>
                        <div className="cell flex-1 text-right px-2">
                            Đơn giá <span className="text-xs">(VND)</span>
                        </div>
                    </div>
                    <div className="row flex py-2 items-center">
                        <div className="cell flex-1 px-2">
                            <p>Người lớn</p>
                            <p className="text-xs text-red-600 font-semibold">
                                {adultPrice ? moneyFormatVND(adultPrice) : null}
                            </p>
                        </div>
                        <div className="cell w-20 px-2 text-center">x 1</div>
                        <div className="cell flex-1 text-right px-2">
                            {adultPrice
                                ? moneyFormatVND(adultPrice * passengers.adult)
                                : 0}
                        </div>
                    </div>
                    <div className="row flex py-2 items-center">
                        <div className="cell flex-1 px-2">
                            <p>Trẻ em</p>
                            <p className="text-xs text-red-600 font-semibold">
                                {childPrice ? moneyFormatVND(childPrice) : null}
                            </p>
                        </div>
                        <div className="cell w-20 px-2 text-center">
                            x {passengers.child}
                        </div>
                        <div className="cell flex-1 text-right px-2">
                            {childPrice
                                ? moneyFormatVND(childPrice * passengers.child)
                                : 0}
                        </div>
                    </div>
                    <div className="row flex py-2 items-center">
                        <div className="cell flex-1 px-2">
                            <p>Em bé</p>
                            <p className="text-xs text-red-600 font-semibold">
                                {infantPrice ? moneyFormat(infantPrice) : 0}
                            </p>
                        </div>
                        <div className="cell w-20 px-2 text-center">
                            x {passengers.infant}
                        </div>
                        <div className="cell flex-1 text-right px-2">
                            {infantPrice
                                ? moneyFormatVND(
                                      infantPrice * passengers.infant,
                                  )
                                : 0}
                        </div>
                    </div>
                </div>
                <div className="py-2 mt-2 border-t">
                    <p className="flex items-center justify-between font-semibold">
                        <span className="text-gray-600">Tổng cộng</span>
                        <span className="text-red-600">2.550.000</span>
                    </p>
                </div>
            </div>
            <div className="actions py-2 mt-2">
                <Flex gap="middle">
                    <Button
                        type="primary"
                        block
                        className="h-11 bg-primary-default"
                        onClick={onClick}
                    >
                        Đặt tour ngay
                    </Button>
                </Flex>
            </div>
        </>
    );
};
