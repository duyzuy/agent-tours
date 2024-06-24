"use client";
import React, { useEffect, useMemo } from "react";
import QuantityInput from "@/components/frontend/QuantityInput";
import { Flex, Button, Form, DatePickerProps } from "antd";
import classNames from "classnames";
import { FeProductItem } from "@/models/fe/productItem.interface";
import FeDatePicker from "@/components/frontend/FeDatePicker";
import dayjs, { Dayjs } from "dayjs";
import FormItem from "@/components/base/FormItem";
import { useState } from "react";
import { moneyFormatVND } from "@/utils/helper";
import { useTranslations } from "next-intl";
import useSetProductItem from "@/app/[locale]/(booking)/modules/useSetProductItem";
import { useBookingSelector } from "@/app/[locale]/hooks/useBookingInformation";
import { PassengerType } from "@/models/common.interface";
import useSummaryPricingSelect from "@/app/[locale]/(booking)/modules/useSummaryPricingSelect";
import { InfoCircleOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import HotlineBox from "@/components/frontend/HotlineBox";
import SummaryCard from "@/components/frontend/SummaryCard";
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

    const [showBreakDown, setShowBreakDown] = useState(false);
    const { onInitProduct, onSetQuantityPassenger, initBookingDetailItems } =
        useSetProductItem();
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

    useEffect(() => {
        onInitProduct(productItem);
    }, [productItem]);

    return (
        <div
            className={classNames("col-booking", {
                [className]: className,
            })}
        >
            <SummaryCard
                label={t("productSummary.title")}
                productPrice={
                    productItem?.configs.length
                        ? moneyFormatVND(getLowestPrice(productItem.configs))
                        : undefined
                }
                open={lowestPriceConfigItem?.open}
            >
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
                <ProductSummary.PassengerQuantity
                    label={"Số lượng hành khách"}
                    passenger={{
                        adult: bookingPassenger.adult,
                        children: bookingPassenger.child,
                        infant: bookingPassenger.infant,
                    }}
                    onChangePassenger={(type, quantity, action) =>
                        onSetQuantityPassenger({
                            type: type,
                            quantity: quantity,
                            action,
                        })
                    }
                />
                <ProductSummary.Subtotal
                    label={t("subtotal")}
                    onClick={() => setShowBreakDown(true)}
                    subtotal={moneyFormatVND(subtotal)}
                />

                <div className="actions py-2 mt-2">
                    <Flex gap="middle">
                        <Button
                            type="primary"
                            block
                            className="h-11 bg-primary-default"
                            onClick={initBookingDetailItems}
                        >
                            Đặt tour ngay
                        </Button>
                    </Flex>
                </div>
            </SummaryCard>
            <Modal
                open={showBreakDown}
                centered
                onCancel={() => setShowBreakDown(false)}
                width={420}
                footer={null}
            >
                <div className="modal__breakdown-header mb-4">
                    <p className="text-center text-lg">
                        {t("modal.breakdown.title")}
                    </p>
                </div>
                <div className="modal__breakdown-body">
                    <div className="breadown-row-head flex items-center border-b mb-2 pb-2">
                        <span className="w-32">{t("passenger.title")}</span>
                        <span className="w-24">{t("productClass")}</span>
                        <span className="flex-1 text-right">{t("price")}</span>
                    </div>
                    {Object.entries(productBreakdown).map(
                        ([type, configList]) => {
                            return configList.map((configitem, _index) => (
                                <div
                                    className="break-down-item flex items-center py-1"
                                    key={`${type}-${_index}`}
                                >
                                    <span className="pax-type w-32">
                                        {t(type)}
                                    </span>
                                    <span className="config-class w-24">
                                        {configitem.class}
                                    </span>
                                    <span className="price flex-1 text-right text-primary-default">
                                        {moneyFormatVND(
                                            configitem[type as PassengerType],
                                        )}
                                    </span>
                                </div>
                            ));
                        },
                    )}
                    <div className="subtotal border-t pt-3 mt-3 justify-between flex">
                        <span>Tạm tính</span>
                        <span className="text-lg text-red-600 font-[500]">
                            {moneyFormatVND(subtotal)}
                        </span>
                    </div>
                </div>
            </Modal>
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

interface ProductSummarySubtotalProps {
    label?: string;
    subtotal?: string;
    onClick?: () => void;
}
ProductSummary.Subtotal = function ProductSummarySubtotal({
    label,
    subtotal,
    onClick,
}: ProductSummarySubtotalProps) {
    return (
        <div className="subtotal py-2">
            <p className="flex items-center justify-between font-semibold">
                <span
                    className="text-gray-600 cursor-pointer"
                    onClick={onClick}
                >
                    {label}
                    <span className="ml-2  text-blue-500">
                        <InfoCircleOutlined />
                    </span>
                </span>
                <span className="text-red-600">{subtotal}</span>
            </p>
        </div>
    );
};
