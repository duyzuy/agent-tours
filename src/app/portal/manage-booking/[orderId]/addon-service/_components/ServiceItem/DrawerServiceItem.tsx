import { useCallback, useEffect, useMemo, useState, memo } from "react";
import { Drawer, Space, Button } from "antd";
import classNames from "classnames";
import { isEmpty, isUndefined } from "lodash";
import { getPassengerType } from "@/utils/common";
import { moneyFormatVND } from "@/utils/helper";
import { PriceConfig } from "@/models/management/core/priceConfig.interface";
import useMessage from "@/hooks/useMessage";
import { PassengerType } from "@/models/management/common.interface";
import SellableConfigItem from "./SellableConfigItem";
import { IPassengerInformation } from "@/models/management/booking/passengerInformation.interface";
import { BookingDetailItem } from "../../page";
import { BookingSSRItem } from "../../modules/bookingSSR.interface";

type ServiceGroupingByPassenger = {
    recId: number;
    passengerInfo: IPassengerInformation;
    bookingId: number;
    bookingRefId: number;
    priceConfigs: {
        quantity: number;
        priceConfig: PriceConfig;
        type: PassengerType;
    }[];
};
export interface DrawerServiceItemProps {
    isOpen?: boolean;
    onClose?: () => void;
    initalValue?: any;
    serviceName?: string;
    serviceId?: number;
    pricingConfigs?: PriceConfig[];
    ssrBookedItemGroupByPax?: ServiceGroupingByPassenger[];
    onConfirm?: (
        bookingDetailSSRItems: BookingSSRItem[],
        serviceId: number,
    ) => void;
    bookingItems?: BookingDetailItem[];
    initSSRBookingItems?: BookingSSRItem[];
    defaultSSRBookingItems?: BookingSSRItem[];
}

const DrawerServiceItem: React.FC<DrawerServiceItemProps> = ({
    isOpen,
    onClose,
    serviceName = "",
    pricingConfigs = [],
    ssrBookedItemGroupByPax,
    initSSRBookingItems,
    defaultSSRBookingItems = [],
    serviceId,
    onConfirm,
    bookingItems,
}) => {
    const [bookingDetailItems, setBookingDetailItems] = useState<
        BookingSSRItem[]
    >([]);
    const [bookingItemSelecting, setBookingItemSelecting] =
        useState<BookingDetailItem>();
    const message = useMessage();

    const selectBookingItem = (bookingItem: BookingDetailItem) => {
        setBookingItemSelecting(bookingItem);
    };

    const handleChangeServiceItem = (
        action: "minus" | "plus",
        quantity: number,
        priceConfig: PriceConfig,
    ) => {
        if (quantity < 0) {
            return;
        }
        if (isUndefined(bookingItemSelecting)) {
            throw new Error("Booking Item is undefined");
        }

        const totalSellableConfigSelecting = getTotalSellableConfigSelecting(
            priceConfig.recId,
        );

        const totalBookedItem = getTotalSellableConfigBookedItem(
            priceConfig.recId,
        );
        if (
            action === "plus" &&
            totalSellableConfigSelecting + 1 >
                priceConfig.open + totalBookedItem
        ) {
            message.info("Số lượng dịch vụ đã hết.");
            return;
        }
        const bookingItemIndex = bookingDetailItems.findIndex(
            (item) => item.booking.recId === bookingItemSelecting.recId,
        );
        let newBookingDetailItems = [...bookingDetailItems];
        /**
         * if bookingItem is added SSR
         */
        if (bookingItemIndex !== -1) {
            /**
             * Check ssr exists
             */

            const ssrListByBookingItem =
                bookingDetailItems[bookingItemIndex]["ssr"];

            let newSSRListByBookingItem = [...ssrListByBookingItem];
            const ssrIndex = ssrListByBookingItem.findIndex(
                (ssrItem) => ssrItem.priceConfig.recId === priceConfig.recId,
            );
            /**
             * if SSR is added in booking item
             */
            if (ssrIndex !== -1) {
                if (quantity === 0) {
                    newSSRListByBookingItem.splice(ssrIndex, 1);
                } else {
                    newSSRListByBookingItem.splice(ssrIndex, 1, {
                        ...ssrListByBookingItem[ssrIndex],
                        quantity: quantity,
                    });
                }
            } else {
                newSSRListByBookingItem = [
                    ...newSSRListByBookingItem,
                    {
                        quantity: quantity,
                        priceConfig: priceConfig,
                        type: bookingItemSelecting.pax.type,
                    },
                ];
            }
            newBookingDetailItems.splice(bookingItemIndex, 1, {
                ...bookingDetailItems[bookingItemIndex],
                ssr: newSSRListByBookingItem,
            });
        }

        /**
         * if bookingItem not exists
         */
        if (bookingItemIndex === -1) {
            newBookingDetailItems = [
                ...newBookingDetailItems,
                {
                    booking: bookingItemSelecting,
                    ssr: [
                        {
                            quantity: quantity,
                            type: bookingItemSelecting.pax.type,
                            priceConfig: priceConfig,
                        },
                    ],
                },
            ];
        }

        setBookingDetailItems(newBookingDetailItems);
    };

    const getQuanitySSROfPaxByPriceConfig = (priceConfig: PriceConfig) => {
        let totalQuantity = 0;

        if (!bookingItemSelecting) {
            return totalQuantity;
        }

        const bookingItem = bookingDetailItems.find(
            (bkItem) => bkItem.booking.recId === bookingItemSelecting?.recId,
        );

        const ssrItem = bookingItem?.ssr.find(
            (ssrItem) => ssrItem.priceConfig.recId === priceConfig.recId,
        );
        totalQuantity = ssrItem?.quantity ?? 0;

        return totalQuantity;
    };

    const getTotalQuantitySSROfOneBooking = (bookingId: number) => {
        return bookingDetailItems.reduce((totalQuantity, item) => {
            if (item.booking.recId === bookingId) {
                item.ssr.forEach((ssrItem) => {
                    totalQuantity += ssrItem.quantity;
                });
            }
            return totalQuantity;
        }, 0);
    };

    const getTotalSellableConfigSelecting = (sellableConfigId: number) => {
        return bookingDetailItems.reduce((totalQuantity, bkItem) => {
            bkItem.ssr.forEach((ssrItem) => {
                if (ssrItem.priceConfig.recId === sellableConfigId) {
                    totalQuantity += ssrItem.quantity;
                }
            });
            return totalQuantity;
        }, 0);
    };

    const getTotalSellableConfigBookedItem = (sellableConfigId: number) => {
        return (
            ssrBookedItemGroupByPax?.reduce((totalQuantity, paxItem) => {
                paxItem.priceConfigs.forEach((ssrItem) => {
                    if (ssrItem.priceConfig.recId === sellableConfigId) {
                        totalQuantity += ssrItem.quantity;
                    }
                });
                return totalQuantity;
            }, 0) ?? 0
        );
    };

    const subTotal = useMemo(() => {
        return bookingDetailItems.reduce((subTotal, bkItem) => {
            bkItem.ssr.forEach((ssrItem) => {
                subTotal +=
                    ssrItem.quantity * ssrItem.priceConfig[ssrItem.type];
            });
            return subTotal;
        }, 0);
    }, [bookingDetailItems]);

    const getFullnamePassenger = useCallback(
        (lastName?: string, middleAndFirstName?: string) => {
            if (
                middleAndFirstName &&
                !isEmpty(middleAndFirstName) &&
                lastName &&
                !isEmpty(lastName)
            ) {
                return `${lastName}, ${middleAndFirstName}`;
            }
        },
        [],
    );
    const onCancelSelection = () => {
        onClose?.();
        bookingItems && setBookingItemSelecting(bookingItems[0]);
    };

    const handleConfirmService = () => {
        serviceId && onConfirm?.(bookingDetailItems, serviceId);
        onClose?.();
        // bookingItems && setBookingItemSelecting(bookingItems[0]);
    };

    const isDisableButton = useMemo(() => {
        if (defaultSSRBookingItems?.length !== bookingDetailItems.length) {
            return false;
        }
        return !!bookingDetailItems.every((bkItem) => {
            return defaultSSRBookingItems.some((defaultItem) => {
                return (
                    bkItem.booking === defaultItem.booking &&
                    bkItem.ssr.length === defaultItem.ssr.length &&
                    bkItem.ssr.every((ssrIt) => {
                        return defaultItem.ssr.some(
                            (defaultSSr) =>
                                defaultSSr.priceConfig.recId ===
                                    ssrIt.priceConfig.recId &&
                                defaultSSr.quantity === ssrIt.quantity,
                        );
                    })
                );
            });
        });
    }, [bookingDetailItems, defaultSSRBookingItems]);

    useEffect(() => {
        initSSRBookingItems && setBookingDetailItems(initSSRBookingItems);
    }, [initSSRBookingItems, isOpen]);
    useEffect(() => {
        bookingItems && setBookingItemSelecting(bookingItems[0]);
    }, [isOpen, bookingItems]);
    return (
        <Drawer
            title={serviceName}
            width={550}
            onClose={onCancelSelection}
            destroyOnClose={true}
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
            <div className="service__item-top py-4 px-6 bg-slate-100 overflow-auto">
                <div className="booking-list flex gap-x-4">
                    {bookingItems?.map((bkItem, _index) => (
                        <div
                            className={classNames(
                                "pax__item p-3 border bg-white shadow-sm rounded-md border-b-2",
                                {
                                    "border-primary-default":
                                        bkItem.recId ===
                                        bookingItemSelecting?.recId,
                                    "cursor-pointer":
                                        bkItem.recId !==
                                        bookingItemSelecting?.recId,
                                },
                            )}
                            key={_index}
                            onClick={() => selectBookingItem(bkItem)}
                        >
                            <div className="w-32">
                                <span className="text-xs">
                                    {`${getPassengerType(bkItem.type)}`}
                                </span>
                                <span className="block font-[500]">
                                    {getFullnamePassenger(
                                        bkItem.pax.paxLastname,
                                        bkItem.pax.paxMiddleFirstName,
                                    ) ?? `Hành khách ${_index + 1}`}
                                </span>

                                {getTotalQuantitySSROfOneBooking(
                                    bkItem.recId,
                                ) === 0 ? (
                                    "--"
                                ) : (
                                    <span className="w-5 h-5 bg-primary-default text-white inline-flex items-center justify-center rounded-full text-xs">
                                        {getTotalQuantitySSROfOneBooking(
                                            bkItem.recId,
                                        )}
                                    </span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="service__item-body px-6 pt-6">
                {pricingConfigs.map((item, _index) => (
                    <SellableConfigItem
                        key={_index}
                        sellableClass={item.class}
                        open={item.open}
                        price={
                            bookingItemSelecting
                                ? moneyFormatVND(
                                      item[bookingItemSelecting?.type],
                                  )
                                : undefined
                        }
                        onChange={(action, value) =>
                            handleChangeServiceItem(action, value, item)
                        }
                        quantity={getQuanitySSROfPaxByPriceConfig(item)}
                        className="mb-3"
                    />
                ))}
            </div>
            <div className="drawler-action absolute px-6 py-4 border-t left-0 right-0 bg-white bottom-0">
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
                        <Button
                            onClick={handleConfirmService}
                            type="primary"
                            size="large"
                            className="w-36"
                            // disabled={isDisableButton}
                        >
                            Xác nhận
                        </Button>
                    </Space>
                </div>
            </div>
        </Drawer>
    );
};
export default memo(DrawerServiceItem);
