"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Form, Space, Button, Drawer, Divider, InputNumber } from "antd";
import { PassengerType } from "@/models/management/common.interface";
import { PassengerSelectedItem } from "../../modules/bookingInformation.interface";
import { IProductItem } from "@/models/management/booking/productItem.interface";
import { moneyFormatVND } from "@/utils/helper";
import { formatDate } from "@/utils/date";
import { useBookingSelector } from "../../hooks/useBooking";
import useMessage from "@/hooks/useMessage";

export interface DrawerBookingSelectionProps {
    isOpen?: boolean;
    onCancel?: () => void;
    onClickNext?: (
        passengerList: PassengerSelectedItem[],
        productItem?: IProductItem,
    ) => void;
    productItem?: IProductItem;
}

const DrawerBookingSelection: React.FC<DrawerBookingSelectionProps> = ({
    isOpen,
    onCancel,
    onClickNext,
    productItem,
}) => {
    const message = useMessage();
    const bookingInfor = useBookingSelector();

    const [passengerSelection, setPassengerSelection] = useState<
        PassengerSelectedItem[]
    >([]);

    const passengerSelectionInbooking = useMemo(() => {
        return bookingInfor.bookingInfo?.passengerSelections;
    }, [bookingInfor]);

    const onSelectPassengerClassItem = (
        quantity: number,
        type: PassengerType,
        productPriceItem: IProductItem["configs"][0],
    ) => {
        if (quantity < 0) {
            message.error("Số lượng phải lớn hơn hoặc bằng 0.");
            return;
        }

        let newPassengerSelection = [...passengerSelection];

        /**
         * Get index of passenger by priceConfig and passenger type
         */
        const paxIndex = passengerSelection.findIndex(
            (pItem) =>
                pItem.item.recId === productPriceItem.recId &&
                pItem.type === type,
        );

        if (type === PassengerType.INFANT) {
            const allPassengerAdultOfPriceConfig = passengerSelection.filter(
                (pItem) =>
                    pItem.type === PassengerType.ADULT &&
                    pItem.item.recId === productPriceItem.recId,
            );

            const totalAdultQuantity = allPassengerAdultOfPriceConfig.reduce(
                (acc, pItem) => acc + pItem.quantity,
                0,
            );

            if (quantity !== 0 && quantity > totalAdultQuantity) {
                message.error(
                    "Số lượng em bé không được lớn hơn số lượng người lớn.",
                );
                return;
            }
        } else {
            const allPassengerByPriceConfigWithoutInfant =
                passengerSelection.filter(
                    (pItem) =>
                        pItem.type !== PassengerType.INFANT &&
                        pItem.item.recId === productPriceItem.recId,
                );

            const totalPassengerWithoutInfantQuantity =
                allPassengerByPriceConfigWithoutInfant.reduce((acc, item) => {
                    return (acc = acc + item.quantity);
                }, 0);

            if (paxIndex !== -1) {
                if (
                    quantity +
                        totalPassengerWithoutInfantQuantity -
                        passengerSelection[paxIndex].quantity >
                    productPriceItem.open
                ) {
                    message.error("Số lượng hiện tại không đủ.");
                    return;
                }
            } else {
                if (
                    quantity + totalPassengerWithoutInfantQuantity >
                    productPriceItem.open
                ) {
                    message.error("Số lượng hiện tại không đủ.");
                    return;
                }
            }
        }

        /**
         * Remove passenger Selection if quantity input equal zero and exists in selection
         */
        if (quantity === 0 && paxIndex !== -1) {
            newPassengerSelection.splice(paxIndex, 1);
        }
        /**
         * Update new selection if quantity !== 0
         */
        if (quantity !== 0) {
            if (paxIndex !== -1) {
                newPassengerSelection.splice(paxIndex, 1, {
                    ...newPassengerSelection[paxIndex],
                    quantity: quantity,
                });
            } else {
                newPassengerSelection = [
                    ...newPassengerSelection,
                    { item: productPriceItem, type: type, quantity: quantity },
                ];
            }
        }

        setPassengerSelection(() => newPassengerSelection);
    };

    const getSubtotalPassengerSelection = (
        paxType: PassengerType,
        productPriceItem: IProductItem["configs"][0],
    ) => {
        let total = 0;
        const passengerByTypeAndByPriceConfig = passengerSelection.find(
            (pItem) =>
                pItem.type === paxType &&
                pItem.item.recId === productPriceItem.recId,
        );
        if (passengerByTypeAndByPriceConfig) {
            total =
                passengerByTypeAndByPriceConfig.quantity *
                passengerByTypeAndByPriceConfig.item[paxType];
        }

        return moneyFormatVND(total);
    };

    const getTotalSelection = () => {
        const total = passengerSelection.reduce((acc, pItem) => {
            acc = acc + pItem["quantity"] * pItem.item[pItem.type];
            return acc;
        }, 0);

        return moneyFormatVND(total);
    };
    const getQuantityPassengerSelectItem = useCallback(
        (item: IProductItem["configs"][0], type: PassengerType): number => {
            const passengerSelect = passengerSelection.find(
                (paxItem) =>
                    paxItem.item.recId === item.recId && paxItem.type === type,
            );

            return passengerSelect ? passengerSelect.quantity : 0;
        },
        [passengerSelection],
    );

    const isDisableSubmit = useMemo(() => {
        return Boolean(!passengerSelection.length);
    }, [passengerSelection]);

    useEffect(() => {
        if (passengerSelectionInbooking && passengerSelectionInbooking.length) {
            setPassengerSelection(() => passengerSelectionInbooking);
        }
    }, [passengerSelectionInbooking]);

    return (
        <Drawer
            title={productItem?.code}
            destroyOnClose
            width={650}
            onClose={onCancel}
            open={isOpen}
            styles={{
                body: {
                    paddingBottom: 80,
                },
            }}
        >
            <Form
                layout="vertical"
                colon={false}
                labelWrap
                className="max-w-4xl"
            >
                <div className="product__info mb-3">
                    <div className="product__info-usedate mb-3">
                        <div className="product__info-usedate-head font-bold">
                            Hiệu lực sử dụng
                        </div>
                        <div className="product__info-usedate-body flex">
                            <div>
                                <span className="product__info-usedate-label block">
                                    Từ ngày
                                </span>
                                <span>
                                    {productItem?.startDate &&
                                        formatDate(productItem?.startDate)}
                                </span>
                            </div>
                            <span className=" w-14"></span>
                            <div>
                                <span className="product__info-usedate-label block">
                                    Đến ngày
                                </span>
                                <span>
                                    {productItem?.endDate &&
                                        formatDate(productItem?.endDate)}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="product__info-quantity">
                        <div className="product__info-usedate-quantity font-bold">
                            Chi tiết số lượng
                        </div>
                        <div className="product__info-usedate-body flex justify-between">
                            <div>
                                <span className="product__info-usedate-label block">
                                    Tổng
                                </span>
                                <span>{productItem?.avaiable}</span>
                            </div>
                            <div>
                                <span className="product__info-usedate-label block">
                                    Đã dùng
                                </span>
                                <span>{productItem?.used}</span>
                            </div>
                            <div>
                                <span className="product__info-usedate-label block">
                                    Đang còn
                                </span>
                                <span>{productItem?.open}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="product__pricings">
                    <div className="product__pricings-head mb-3">
                        <span className="font-bold">Hạng vé</span>
                    </div>
                    <div className="product__pricings-body">
                        {productItem?.configs.map((item) => (
                            <React.Fragment key={item.recId}>
                                <div className="bg-white rounded-md mb-3 px-4 py-4 border">
                                    <div className="product__pricings-info flex justify-between">
                                        <div className=" flex-1">
                                            <span className="text-xs block">
                                                Class
                                            </span>
                                            <span className=" text-primary-default font-bold">
                                                {item.class}
                                            </span>
                                        </div>
                                        <div className=" flex-1">
                                            <span className="text-xs block">
                                                Channel
                                            </span>
                                            <span className=" text-primary-default font-bold">
                                                {item.channel}
                                            </span>
                                        </div>
                                        <div className=" flex-1">
                                            <span className="text-xs block">
                                                Số lượng
                                            </span>
                                            <span className=" text-primary-default font-bold">
                                                {item.open}
                                            </span>
                                        </div>
                                    </div>
                                    {item.details ? (
                                        <div className="details mt-2">
                                            <span className="">
                                                {item.details}
                                            </span>
                                        </div>
                                    ) : null}
                                    <div className="mt-3 mb-3 border-b"></div>
                                    <div>
                                        {/* <div className="mb-3 flex justify-between">
                                            <div className="flex-1">
                                                <span className="font-bold">
                                                    Loại hành khách
                                                </span>
                                            </div>
                                            <div className="w-32">
                                                <span className="font-bold">
                                                    Số lượng
                                                </span>
                                            </div>
                                            <div className="w-48 text-right">
                                                <span className="font-bold">
                                                    Tạm tính
                                                </span>
                                            </div>
                                        </div> */}
                                        <div className="flex justify-between mb-2">
                                            <div className="flex-1">
                                                <span className="block">
                                                    Người lớn
                                                </span>
                                                <span className="text-xs font-semibold">
                                                    {moneyFormatVND(item.adult)}
                                                </span>
                                            </div>
                                            <div className="w-32 flex items-center">
                                                <InputNumber<number>
                                                    size="small"
                                                    value={getQuantityPassengerSelectItem(
                                                        item,
                                                        PassengerType.ADULT,
                                                    )}
                                                    onChange={(value) =>
                                                        value !== null &&
                                                        onSelectPassengerClassItem(
                                                            value,
                                                            PassengerType.ADULT,
                                                            item,
                                                        )
                                                    }
                                                />
                                            </div>
                                            <div className="w-48 flex items-center justify-end">
                                                <span className="text-xs font-semibold">
                                                    {getSubtotalPassengerSelection(
                                                        PassengerType.ADULT,
                                                        item,
                                                    )}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex justify-between mb-2">
                                            <div className="flex-1">
                                                <span className="block">
                                                    Trẻ em
                                                </span>
                                                <span className="text-xs font-semibold">
                                                    {moneyFormatVND(item.child)}
                                                </span>
                                            </div>
                                            <div className="w-32 flex items-center">
                                                <InputNumber
                                                    value={getQuantityPassengerSelectItem(
                                                        item,
                                                        PassengerType.CHILD,
                                                    )}
                                                    size="small"
                                                    onChange={(value) =>
                                                        value !== null &&
                                                        onSelectPassengerClassItem(
                                                            value,
                                                            PassengerType.CHILD,
                                                            item,
                                                        )
                                                    }
                                                />
                                            </div>
                                            <div className="w-48 flex items-center justify-end">
                                                <span className="text-xs font-semibold">
                                                    {getSubtotalPassengerSelection(
                                                        PassengerType.CHILD,
                                                        item,
                                                    )}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex justify-between">
                                            <div className="flex-1">
                                                <span className="block">
                                                    Em bé
                                                </span>
                                                <span className="text-xs font-semibold">
                                                    {moneyFormatVND(
                                                        item.infant,
                                                    )}
                                                </span>
                                            </div>
                                            <div className="w-32 flex items-center">
                                                <InputNumber<number>
                                                    value={getQuantityPassengerSelectItem(
                                                        item,
                                                        PassengerType.INFANT,
                                                    )}
                                                    size="small"
                                                    onChange={(value) =>
                                                        value !== null &&
                                                        onSelectPassengerClassItem(
                                                            value,
                                                            PassengerType.INFANT,
                                                            item,
                                                        )
                                                    }
                                                />
                                            </div>
                                            <div className="w-48 flex items-center justify-end">
                                                <span className="text-xs font-semibold">
                                                    {getSubtotalPassengerSelection(
                                                        PassengerType.INFANT,
                                                        item,
                                                    )}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </React.Fragment>
                        ))}
                    </div>
                </div>
                <div></div>
            </Form>
            <div className="bottom py-4 absolute bottom-0 left-0 right-0 border-t px-6 bg-white z-50">
                <div className="flex justify-between">
                    <div>
                        <span className="text-xs block">Tổng tiền</span>
                        <span className="text-lg font-bold text-red-600">
                            {getTotalSelection()}
                        </span>
                    </div>
                    <Space>
                        <Button onClick={onCancel}>Huỷ bỏ</Button>
                        <Button
                            type="primary"
                            onClick={() =>
                                onClickNext?.(passengerSelection, productItem)
                            }
                            disabled={isDisableSubmit}
                        >
                            Đi tiếp
                        </Button>
                    </Space>
                </div>
            </div>
        </Drawer>
    );
};
export default DrawerBookingSelection;
