"use client";
import React, { useEffect, useMemo, useTransition } from "react";
import QuantityInput from "@/components/frontend/QuantityInput";
import { Form, DatePickerProps } from "antd";
import classNames from "classnames";
import { FeProductItem } from "@/models/fe/productItem.interface";
import FeDatePicker from "@/components/frontend/FeDatePicker";
import dayjs, { Dayjs } from "dayjs";
import FormItem from "@/components/base/FormItem";
import { useState } from "react";
import { moneyFormatVND } from "@/utils/helper";
import { useTranslations } from "next-intl";
import useInitProductItemAndPassengersInformation from "@/app/[locale]/(booking)/modules/useInitProductItemAndPassengersInformation";
import { useBookingSelector } from "@/app/[locale]/hooks/useBookingInformation";
import { PassengerType } from "@/models/common.interface";
import useSummaryPricingSelect from "@/app/[locale]/(booking)/modules/useSummaryPricingSelect";
import HotlineBox from "@/components/frontend/HotlineBox";
import ProductSummaryWraper from "@/components/frontend/ProductSummaryWraper";
import { formatDate } from "@/utils/date";
import useCoupon from "@/app/[locale]/(booking)/modules/useCoupon";

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
    const bookingPassenger = useBookingSelector(
        (state) => state.bookingPassenger,
    );
    const bookingCounponPolicy = useBookingSelector(
        (state) => state.bookingInfo.couponPolicy,
    );

    const {
        initProduct,
        setQuantityPassenger,
        // resetQuantityPassenger,
        // initBookingDetailItemsThenGoToPassengerInfo,
        initPassengerInfoThenGoToPassenger,
    } = useInitProductItemAndPassengersInformation();
    const { addCouponPolicy, removeCouponPolicy } = useCoupon();
    const { productBreakdown, subtotal } = useSummaryPricingSelect();
    const t = useTranslations("String");

    const [productItem, setProductItem] = useState<FeProductItem | undefined>(
        defaultSellable,
    );

    const departureDates = sellableList?.reduce<{ departDate: string }[]>(
        (acc, item) => {
            return [...acc, { departDate: item.startDate }];
        },
        [],
    );

    const [isPendingInitBookingDetails, startTransitionInitBookingDetailItems] =
        useTransition();
    const [isUpdateTingPaxQuantity, setStartUpdateQuantity] = useTransition();

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
                if (item.open > 0 && item.adult < minConfig.adult) {
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
    const goToPasssenger = () => {
        startTransitionInitBookingDetailItems(() => {
            initPassengerInfoThenGoToPassenger();
        });
    };
    const breakDownItems = useMemo(() => {
        return Object.entries(productBreakdown).reduce<
            {
                type: PassengerType;
                pricing: string;
                id: number;
                configClass: string;
            }[]
        >((acc, [type, configList]) => {
            const items = configList.map((configItem, _index) => ({
                type: type as PassengerType,
                pricing: moneyFormatVND(configItem[type as PassengerType]),
                id: configItem.recId,
                configClass: configItem.class,
            }));
            acc = [...acc, ...items];
            return acc;
        }, []);
    }, [productBreakdown]);

    useEffect(() => {
        initProduct(productItem);
    }, [productItem]);

    return (
        <div
            className={classNames("col-booking", {
                [className]: className,
            })}
        >
            <ProductSummaryWraper
                label={t("productSummary.title")}
                productPrice={
                    productItem?.configs.length
                        ? moneyFormatVND(getLowestPrice(productItem.configs))
                        : undefined
                }
                openAmount={lowestPriceConfigItem?.open}
                promotion={{
                    selectedCode: bookingCounponPolicy?.code,
                    items: productItem?.promotions.map((item) => ({
                        name: item.name,
                        code: item.code,
                        price: moneyFormatVND(item.discountAmount),
                        validFrom: formatDate(item.validFrom, "dd/MM/yyyy"),
                        validTo: formatDate(item.validTo, "dd/MM/yyyy"),
                        type: item.type,
                    })),
                    onSelect: (code) => {
                        bookingCounponPolicy?.code === code
                            ? removeCouponPolicy()
                            : addCouponPolicy(code);
                    },
                }}
                onBookNow={goToPasssenger}
                isLoading={isPendingInitBookingDetails}
                breakDown={{
                    pricingConfigs: breakDownItems,
                    couponPolicy: bookingCounponPolicy && {
                        code: bookingCounponPolicy.code,
                        discountAmount: moneyFormatVND(
                            bookingCounponPolicy.discountAmount,
                        ),
                    },
                    subtotal: moneyFormatVND(subtotal),
                }}
            >
                <Form layout="vertical" component="div">
                    <FormItem label="Ngày khởi hành">
                        <FeDatePicker
                            value={dayjs(productItem?.startDate)}
                            placeholder="Ngày khởi hành"
                            size="large"
                            inputReadOnly
                            allowClear={false}
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
                <ProductSummary.PassengerQuantity
                    label={"Số lượng hành khách"}
                    passenger={{
                        adult: bookingPassenger.adult,
                        children: bookingPassenger.child,
                        infant: bookingPassenger.infant,
                    }}
                    onChangePassenger={(type, quantity, action) =>
                        setQuantityPassenger({
                            type: type,
                            quantity: quantity,
                            action,
                        })
                    }
                />
            </ProductSummaryWraper>

            <HotlineBox label="Hotline" phoneNumber={"0982.013.089"} />
        </div>
    );
};
export default ProductSummary;

interface ProductSummaryPassengerQuantityProps {
    label?: string;
    passenger: {
        adult: number;
        children: number;
        infant: number;
    };
    onChangePassenger?: (
        type: PassengerType,
        quantity: number,
        action: "plus" | "minus",
    ) => void;
}
ProductSummary.PassengerQuantity = function ProductSummaryPassengerQuantity({
    passenger,
    label,
    onChangePassenger,
}: ProductSummaryPassengerQuantityProps) {
    const t = useTranslations("String");

    const onChangeQuantityPax = (
        type: PassengerType,
        value: number,
        action: "plus" | "minus",
    ) => {
        onChangePassenger?.(type, value, action);
    };
    return (
        <>
            <div className="passengers mb-4">
                <div className="label mb-3">
                    <p>{label}</p>
                </div>
                <div className="select flex">
                    <QuantityInput
                        size="sm"
                        label={t("adult")}
                        value={passenger["adult"]}
                        className="w-1/3"
                        maximum={9}
                        minimum={1}
                        onChange={(action, value) =>
                            onChangeQuantityPax(
                                PassengerType.ADULT,
                                value,
                                action,
                            )
                        }
                    />
                    <QuantityInput
                        size="sm"
                        label={t("children")}
                        value={passenger["children"]}
                        maximum={9}
                        minimum={0}
                        className="w-1/3"
                        onChange={(action, value) =>
                            onChangeQuantityPax(
                                PassengerType.CHILD,
                                value,
                                action,
                            )
                        }
                    />
                    <QuantityInput
                        size="sm"
                        label={t("infant")}
                        value={passenger["infant"]}
                        maximum={9}
                        minimum={0}
                        className="w-1/3"
                        onChange={(action, value) =>
                            onChangeQuantityPax(
                                PassengerType.INFANT,
                                value,
                                action,
                            )
                        }
                    />
                </div>
            </div>
        </>
    );
};
