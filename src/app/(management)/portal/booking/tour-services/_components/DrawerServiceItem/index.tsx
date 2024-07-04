import { Drawer, Space, Button } from "antd";
import FormItem from "@/components/base/FormItem";
import { IBookingItem } from "../../../modules/bookingInformation.interface";
import Quantity, { QuantityProps } from "@/components/admin/Quantity";
import { getPassengerType } from "@/utils/common";
import { TServiceItemType } from "../../page";
import { moneyFormatVND } from "@/utils/helper";
import { useEffect, useMemo, useState } from "react";
import classNames from "classnames";
import { PriceConfig } from "@/models/management/core/priceConfig.interface";
import useMessage from "@/hooks/useMessage";

export type TBookingServicePricingItem = {
    bookingItem: IBookingItem;
    pricingItems: {
        qty: number;
        item: PriceConfig;
    }[];
};
interface DrawerServiceItemProps {
    isOpen?: boolean;
    onClose: () => void;
    initalValue?: any;
    serviceName: string;
    sellableDetailsId: number;
    bookingItems: IBookingItem[];
    pricingItems: TServiceItemType["items"];

    onConfirm: (pricingsService: TBookingServicePricingItem[]) => void;
}
const DrawerServiceItem: React.FC<DrawerServiceItemProps> = ({
    isOpen,
    onClose,
    serviceName = "",
    sellableDetailsId,
    bookingItems,
    pricingItems = [],
    onConfirm,
}) => {
    const [serviceItems, setServiceItems] = useState<
        TBookingServicePricingItem[]
    >([]);
    const [bookingItem, setBookingItem] = useState<IBookingItem>(
        bookingItems[0],
    );
    const message = useMessage();

    const onSelectPassenger = (bookingItem: IBookingItem) => {
        setBookingItem(bookingItem);
    };

    const onChangeQuantityService = (
        action: "minus" | "plus",
        quantity: number,
        item: PriceConfig,
    ) => {
        if (quantity < 0) {
            return;
        }

        const totalAmountOfPricingSvItem = serviceItems.reduce(
            (acc, paxItem) => {
                const pricingItem = paxItem.pricingItems.find(
                    (pricingItem) => pricingItem.item.recId === item.recId,
                );
                if (pricingItem) {
                    acc += pricingItem.qty;
                }
                return acc;
            },
            0,
        );

        if (totalAmountOfPricingSvItem === item.open && action === "plus") {
            message.error(`Số lượng dịch vụ hạng ${item.class} đã chọn hết`);
            return;
        }

        setServiceItems((oldDAta) => {
            let newData = [...oldDAta];

            const bookingItemService = newData.find(
                (svItem) => svItem.bookingItem.index === bookingItem.index,
            );
            const bookingItemIndex = newData.findIndex(
                (svItem) => svItem.bookingItem.index === bookingItem.index,
            );

            if (bookingItemIndex !== -1) {
                const pricingIndex = newData[
                    bookingItemIndex
                ].pricingItems.findIndex(
                    (pricing) => pricing.item.recId === item.recId,
                );
                let newPricingOfBookingItem = [
                    ...newData[bookingItemIndex].pricingItems,
                ];
                if (pricingIndex !== -1) {
                    newPricingOfBookingItem.splice(pricingIndex, 1, {
                        ...newPricingOfBookingItem[pricingIndex],
                        qty: quantity,
                    });

                    newData.splice(bookingItemIndex, 1, {
                        bookingItem,
                        pricingItems: [...newPricingOfBookingItem],
                    });
                    if (quantity === 0) {
                    }
                } else {
                    newData.splice(bookingItemIndex, 1, {
                        bookingItem,
                        pricingItems: [
                            ...newPricingOfBookingItem,
                            {
                                item: item,
                                qty: 1,
                            },
                        ],
                    });
                }
            } else {
                newData = [
                    ...newData,
                    {
                        bookingItem: bookingItem,
                        pricingItems: [
                            {
                                qty: 1,
                                item: item,
                            },
                        ],
                    },
                ];
            }

            return newData;
        });
    };

    const getQuanityServiceOfPaxByPriceConfig = (item: PriceConfig) => {
        const currentBkServiceItem = serviceItems.find(
            (svItem) => svItem.bookingItem.index === bookingItem.index,
        );

        const pricingItem = currentBkServiceItem?.pricingItems.find(
            (prItem) => prItem.item.recId === item.recId,
        );

        return pricingItem?.qty || 0;
    };
    const getTotalQuantityServiceItemOfPax = (bookingItem: IBookingItem) => {
        const currentBkServiceItem = serviceItems.find(
            (svItem) => svItem.bookingItem.index === bookingItem.index,
        );
        return (
            currentBkServiceItem?.pricingItems.reduce((acc, item) => {
                acc += item.qty;
                return acc;
            }, 0) || 0
        );
    };
    const subTotal = useMemo(() => {
        return serviceItems.reduce((acc, paxItem) => {
            const totalPricings = paxItem.pricingItems.reduce(
                (subPricing, pricingItem) => {
                    subPricing +=
                        pricingItem.qty *
                        pricingItem.item[paxItem.bookingItem.type];
                    return subPricing;
                },
                0,
            );
            acc += totalPricings;
            return acc;
        }, 0);
    }, [serviceItems]);
    const handleConfirmService = () => {
        onConfirm(serviceItems);
        onClose();
        setBookingItem(bookingItems[0]);
    };

    const onCancelSelection = () => {
        onClose();
        setBookingItem(bookingItems[0]);
    };
    useEffect(() => {
        const servicePaxItems = bookingItems.reduce<
            TBookingServicePricingItem[]
        >((acc, bkItem) => {
            /**
             * filter all pricing by sellableId
             */
            const pricingItemsByService = bkItem.ssr.filter(
                (item) => item.sellableDetailsId === sellableDetailsId,
            );

            /**
             * reduce to correct format.
             */

            const pricingItems = pricingItemsByService.reduce<
                { qty: number; item: PriceConfig }[]
            >((accSv, svItem) => {
                accSv = [...accSv, { qty: svItem.qty, item: svItem.item }];
                return accSv;
            }, []);

            acc = [...acc, { bookingItem: bkItem, pricingItems: pricingItems }];
            return acc;
        }, []);

        setServiceItems(servicePaxItems);
    }, [isOpen]);
    return (
        <Drawer
            title={serviceName}
            width={550}
            onClose={onCancelSelection}
            open={isOpen}
            styles={{
                body: {
                    paddingBottom: 80,
                    paddingLeft: 0,
                    paddingRight: 0,
                    paddingTop: 0,
                },
            }}
        >
            <div className="service__item-top py-3 px-3 bg-slate-100 overflow-auto">
                <div className="passenger-list flex gap-x-4">
                    {bookingItems.map((item, _index) => (
                        <div
                            className={classNames(
                                "pax__item p-3 border bg-white shadow-sm rounded-md border-b-2",
                                {
                                    "border-primary-default":
                                        item.index === bookingItem.index,
                                },
                            )}
                            key={_index}
                            onClick={() => onSelectPassenger(item)}
                        >
                            <div className="w-32">
                                <span className="text-xs">
                                    {`${getPassengerType(item.type)}`}
                                </span>
                                <span className="block">
                                    {`Hành khách ${_index + 1}`}
                                </span>

                                {getTotalQuantityServiceItemOfPax(item) ===
                                0 ? (
                                    "--"
                                ) : (
                                    <span className="w-5 h-5 bg-primary-default text-white inline-flex items-center justify-center rounded-full text-xs">
                                        {getTotalQuantityServiceItemOfPax(item)}
                                    </span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="service__item-body px-3 pt-6">
                <div>
                    {pricingItems.map((item, _index) => (
                        <div className="pricing__item mb-3" key={_index}>
                            <div className="flex justify-between border p-3 shadow-sm rounded-md">
                                <div className="flex">
                                    <div className="w-16">
                                        <span className="block text-xs text-gray-500">
                                            Class
                                        </span>
                                        <span>{item.class}</span>
                                    </div>
                                    <div className="w-24">
                                        <span className="text-xs block text-gray-500">
                                            Đang còn
                                        </span>
                                        <span>{item.open}</span>
                                    </div>
                                    <div>
                                        <span className="block text-xs">
                                            Giá tiền
                                        </span>
                                        <span className="text-primary-default">
                                            {moneyFormatVND(
                                                item[bookingItem.type],
                                            )}
                                        </span>
                                    </div>
                                </div>
                                <Quantity
                                    size="sm"
                                    value={getQuanityServiceOfPaxByPriceConfig(
                                        item,
                                    )}
                                    onChange={(action, value) =>
                                        onChangeQuantityService(
                                            action,
                                            value,
                                            item,
                                        )
                                    }
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="drawler-action absolute px-4 py-4 border-t left-0 right-0 bg-white bottom-0">
                <div className="flex justify-between">
                    <div>
                        <div>
                            <span className="block">Tạm tính</span>
                            <span className="font-[500] text-[16px] text-primary-default">
                                {moneyFormatVND(subTotal)}
                            </span>
                        </div>
                    </div>
                    <Space>
                        <Button onClick={handleConfirmService} type="primary">
                            Xác nhận
                        </Button>
                    </Space>
                </div>
            </div>
        </Drawer>
    );
};
export default DrawerServiceItem;
