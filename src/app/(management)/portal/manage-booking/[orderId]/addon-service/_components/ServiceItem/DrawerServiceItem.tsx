import { useCallback, useEffect, useMemo, useState, memo } from "react";
import { Drawer, Space, Button } from "antd";
import classNames from "classnames";
import { isEmpty, isUndefined } from "lodash";
import { getPassengerType } from "@/utils/common";
import { moneyFormatVND } from "@/utils/helper";
import { PriceConfig } from "@/models/management/core/priceConfig.interface";
import useMessage from "@/hooks/useMessage";
import SellableConfigItem from "./SellableConfigItem";
import { BookingDetailItemType, BookingDetailSSRItemType } from "../../page";
// import { BookingSSRItemType } from "../../modules/bookingSSR.interface";
import { BookingSSRItemType } from "../../../modules/manageBooking.interface";
import BookingSSRItem, { BookingSSRItemprops } from "./BookingSSRItem";

export interface DrawerServiceItemProps {
    isOpen?: boolean;
    onClose?: () => void;
    initalSSRItems?: {
        addList?: BookingSSRItemType[];
        removeList?: BookingDetailSSRItemType[];
    };
    serviceName?: string;
    serviceId?: number;
    pricingConfigs?: PriceConfig[];
    bookingSSRItemsBooked?: BookingDetailSSRItemType[];
    onConfirm?: (
        bookingDetailSSRItems: BookingSSRItemType[],
        bookingDetailSSRItemsRemove: BookingDetailSSRItemType[],
        serviceId: number,
    ) => void;
    bookingItems?: BookingDetailItemType[];
}

const DrawerServiceItem: React.FC<DrawerServiceItemProps> = ({
    isOpen,
    onClose,
    serviceName = "",
    pricingConfigs = [],
    bookingSSRItemsBooked = [],
    serviceId,
    onConfirm,
    bookingItems,
    initalSSRItems,
}) => {
    // const [bookingDetailItems, setBookingDetailItems] = useState<
    //     BookingSSRItemType[]
    // >([]);

    // const [bookingDetailSSRItemsRemove, setBookingDetailSSRItemsRemove] =
    //     useState<BookingDetailSSRItemType[]>([]);
    const [ssrData, setSSRData] = useState<{
        addList: BookingSSRItemType[];
        removeList: BookingDetailSSRItemType[];
    }>({
        addList: [],
        removeList: [],
    });
    const [bookingItemSelecting, setBookingItemSelecting] =
        useState<BookingDetailItemType>();
    const message = useMessage();

    const selectBookingItem = (bookingItem: BookingDetailItemType) => {
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

        const { addList } = ssrData;
        const totalSellableConfigSelecting = getTotalSellableConfigSelecting(
            priceConfig.recId,
        );

        if (
            action === "plus" &&
            totalSellableConfigSelecting + 1 > priceConfig.open
        ) {
            message.info("Số lượng dịch vụ đã hết.");
            return;
        }
        const bookingItemIndex = addList.findIndex(
            (item) => item.booking.recId === bookingItemSelecting.recId,
        );
        let newAddList = [...addList];
        /**
         * if bookingItem is added SSR
         */
        if (bookingItemIndex !== -1) {
            /**
             * Check ssr exists
             */

            const ssrListByBookingItem = addList[bookingItemIndex]["ssr"];

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
            newAddList.splice(bookingItemIndex, 1, {
                ...addList[bookingItemIndex],
                ssr: newSSRListByBookingItem,
            });
        }

        /**
         * if bookingItem not exists
         */
        if (bookingItemIndex === -1) {
            newAddList = [
                ...newAddList,
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

        setSSRData((oldData) => ({
            ...oldData,
            addList: newAddList,
        }));
    };

    const getQuanitySSROfPaxByPriceConfig = (priceConfig: PriceConfig) => {
        let totalQuantity = 0;

        const { addList } = ssrData;
        if (!bookingItemSelecting) {
            return totalQuantity;
        }

        const bookingItem = addList.find(
            (bkItem) => bkItem.booking.recId === bookingItemSelecting?.recId,
        );

        const ssrItem = bookingItem?.ssr.find(
            (ssrItem) => ssrItem.priceConfig.recId === priceConfig.recId,
        );
        totalQuantity = ssrItem?.quantity ?? 0;

        return totalQuantity;
    };

    const getTotalQuantitySSROfOnePaxBooking = (paxBookingId: number) => {
        const { addList, removeList } = ssrData;
        const totalAdded = addList.reduce((totalQuantity, item) => {
            if (item.booking.recId === paxBookingId) {
                item.ssr.forEach((ssrItem) => {
                    totalQuantity += ssrItem.quantity;
                });
            }
            return totalQuantity;
        }, 0);

        const totalInitAddedBefore = bookingSSRItemsBooked.reduce(
            (totalQty, itemRv) => {
                if (
                    itemRv.bookingRefId === paxBookingId &&
                    removeList.every((item) => item.recId !== itemRv.recId)
                ) {
                    totalQty += 1;
                }
                return totalQty;
            },
            0,
        );

        return totalAdded + totalInitAddedBefore;
    };

    const getTotalSellableConfigSelecting = (sellableConfigId: number) => {
        const { addList, removeList } = ssrData;

        return addList.reduce((totalQuantity, bkItem) => {
            bkItem.ssr.forEach((ssrItem) => {
                if (ssrItem.priceConfig.recId === sellableConfigId) {
                    totalQuantity += ssrItem.quantity;
                }
            });
            return totalQuantity;
        }, 0);
    };

    const subTotal = useMemo(() => {
        const { addList, removeList } = ssrData;
        const totalNewAdded = addList.reduce((subTotal, bkItem) => {
            bkItem.ssr.forEach((ssrItem) => {
                subTotal +=
                    ssrItem.quantity * ssrItem.priceConfig[ssrItem.type];
            });
            return subTotal;
        }, 0);

        const totalBooked =
            bookingSSRItemsBooked?.reduce((subTotalBooked, bkItem) => {
                if (removeList.some((item) => item.recId === bkItem.recId)) {
                } else {
                    subTotalBooked = subTotalBooked + bkItem.amount;
                }
                return subTotalBooked;
            }, 0) || 0;

        return totalNewAdded + totalBooked;
    }, [ssrData, bookingSSRItemsBooked]);

    /**
     * Get Booking SSR detail Item by pax selecting
     */
    const bookingSSRItemsBookedByCurrentPax = useMemo(
        () =>
            bookingSSRItemsBooked.filter(
                (item) => item.bookingRefId === bookingItemSelecting?.recId,
            ),
        [bookingSSRItemsBooked, bookingItemSelecting],
    );

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
        serviceId &&
            onConfirm?.(ssrData.addList, ssrData.removeList, serviceId);
        onClose?.();
        // bookingItems && setBookingItemSelecting(bookingItems[0]);
    };

    const hasBookingSSRItemRemoved = useCallback(
        (bkDetailSSRItem: BookingDetailSSRItemType) => {
            return ssrData.removeList.some(
                (item) => item.recId === bkDetailSSRItem.recId,
            );
        },
        [ssrData],
    );
    const onAddRemoveSSRItem: BookingSSRItemprops["onAdd"] = (data) => {
        if (!data) return;
        setSSRData((oldData) => {
            const { removeList } = oldData;
            let newRemoveList = [...removeList];
            const indexItem = removeList.findIndex(
                (item) => item.recId === data?.recId,
            );

            if (indexItem !== -1) {
                newRemoveList.splice(indexItem, 1);
            } else {
                newRemoveList = [...newRemoveList, data];
            }

            return {
                ...oldData,
                removeList: newRemoveList,
            };
        });
    };

    // const isDisableConfirmation = useMemo(() => {
    //     return (
    //         (!bookingDetailItems ||
    //             !bookingDetailItems.some((item) => item.ssr.length)) &&
    //         (!bookingDetailSSRItemsRemove ||
    //             !bookingDetailSSRItemsRemove.length)
    //     );
    // }, [bookingDetailItems, bookingDetailSSRItemsRemove]);

    useEffect(() => {
        setSSRData(() => ({
            addList: initalSSRItems?.addList || [],
            removeList: initalSSRItems?.removeList || [],
        }));
    }, [isOpen, initalSSRItems]);

    useEffect(() => {
        bookingItems && setBookingItemSelecting(bookingItems[0]);
    }, [isOpen]);

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

                                {getTotalQuantitySSROfOnePaxBooking(
                                    bkItem.recId,
                                ) === 0 ? (
                                    "--"
                                ) : (
                                    <span className="w-5 h-5 bg-primary-default text-white inline-flex items-center justify-center rounded-full text-xs">
                                        {getTotalQuantitySSROfOnePaxBooking(
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
                <div className="service-item-booked mb-6">
                    {bookingSSRItemsBookedByCurrentPax ? (
                        <div>
                            <div className="mb-6">
                                <p className="font-[500]">Dịch vụ đã mua</p>
                            </div>
                            {bookingSSRItemsBookedByCurrentPax.map(
                                (bookingSSRItem, _index) => (
                                    <BookingSSRItem
                                        key={_index}
                                        isRemoved={hasBookingSSRItemRemoved(
                                            bookingSSRItem,
                                        )}
                                        data={bookingSSRItem}
                                        onAdd={onAddRemoveSSRItem}
                                        className="mb-3"
                                    />
                                ),
                            )}
                        </div>
                    ) : null}
                </div>
                <div className="service-items-new">
                    <div>
                        <div className="mb-6">
                            <p className="font-[500]">Mua thêm dịch vụ</p>
                        </div>
                    </div>
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
                            // disabled={isDisableConfirmation}
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
