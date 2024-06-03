import React, { useMemo, useState, useCallback, memo } from "react";
import { moneyFormatVND } from "@/utils/helper";
import { isEmpty } from "lodash";
import { Button } from "antd";
import DrawerServiceItem, { DrawerServiceItemProps } from "./DrawerServiceItem";
import { PriceConfig } from "@/models/management/core/priceConfig.interface";
import { IPassengerInformation } from "@/models/management/booking/passengerInformation.interface";
import { BookingDetailItemType, BookingDetailSSRItemType } from "../../page";
// import { BookingSSRItemType } from "../../modules/bookingSSR.interface";
import { BookingSSRItemType } from "../../../modules/manageBooking.interface";
import { IOrderDetail } from "@/models/management/booking/order.interface";
import { RightOutlined } from "@ant-design/icons";

type BookingSSRItemsByPassengerType = {
    recId: number;
    pax: IPassengerInformation;
    ssr: IOrderDetail["ssr"][0]["booking"][];
};
export interface ServiceItemProps {
    serviceName?: string;
    pricingConfigs?: PriceConfig[];
    bookingDetails?: BookingDetailItemType[];
    ssrListBooked?: BookingDetailSSRItemType[];
    initSSRBookingItems?: BookingSSRItemType[];
    initSSRBookingItemsRemove: BookingDetailSSRItemType[];
    render?: () => React.ReactNode;
    serviceId?: number;
    onConfirm?: DrawerServiceItemProps["onConfirm"];
}

const ServiceItem: React.FC<ServiceItemProps> = ({
    serviceName,
    bookingDetails = [],
    pricingConfigs,
    ssrListBooked,
    initSSRBookingItems,
    initSSRBookingItemsRemove,
    serviceId,
    onConfirm,
}) => {
    const [openDrawer, setOpenDrawer] = useState(false);
    const [showDetail, setShowDetail] = useState(false);
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

    const closeDrawer = useCallback(() => setOpenDrawer(false), []);
    const showDrawer = useCallback(() => setOpenDrawer(true), []);

    /**
     *
     * Filter BookingSSRItem by serviceItem from @ssrListBooked
     * @param sellableDetailsId of an configs present an service type
     */

    const bookingSSRItemsOfService = useMemo(() => {
        return (
            ssrListBooked?.filter(
                (bookingSSrItem) =>
                    bookingSSrItem.config.sellableDetailsId === serviceId,
            ) || []
        );
    }, [ssrListBooked]);

    const ssrItemGroupByPassenger = useMemo(() => {
        return bookingSSRItemsOfService.reduce<
            BookingSSRItemsByPassengerType[]
        >((acc, bookingSSRItem) => {
            const { pax } = bookingSSRItem;

            const paxIndex = acc.findIndex(
                (item) => item.pax.recId === pax.recId,
            );

            if (paxIndex !== -1) {
                const newSSr = initSSRBookingItemsRemove.some(
                    (item) => item.recId === bookingSSRItem.recId,
                )
                    ? [...acc[paxIndex].ssr]
                    : [...acc[paxIndex].ssr, bookingSSRItem];

                acc.splice(paxIndex, 1, {
                    ...acc[paxIndex],
                    ssr: newSSr,
                });
            } else {
                const ssr = initSSRBookingItemsRemove.some(
                    (item) => item.recId === bookingSSRItem.recId,
                )
                    ? []
                    : [bookingSSRItem];

                acc = [
                    ...acc,
                    {
                        recId: bookingSSRItem.paxId,
                        pax: pax,
                        ssr: ssr,
                    },
                ];
            }

            return acc;
        }, []);
    }, [bookingSSRItemsOfService, initSSRBookingItemsRemove]);

    const subtotalServiceItem = useMemo(() => {
        type SubTotalOfService = { subTotal: number; itemCount: number };

        let total: SubTotalOfService = {
            subTotal: 0,
            itemCount: 0,
        };

        total = bookingSSRItemsOfService?.reduce<SubTotalOfService>(
            (acc, bookingSSRItem) => {
                if (
                    initSSRBookingItemsRemove.some(
                        (item) => item.recId === bookingSSRItem.recId,
                    )
                ) {
                    acc = {
                        subTotal: acc.subTotal,
                        itemCount: acc.itemCount,
                    };
                } else {
                    acc = {
                        subTotal: acc.subTotal + bookingSSRItem.amount,
                        itemCount: acc.itemCount + 1,
                    };
                }

                return acc;
            },
            { subTotal: 0, itemCount: 0 },
        );

        if (initSSRBookingItems?.length) {
            const subTotalPricingItemsAddNew = initSSRBookingItems.reduce(
                (acc, item) => {
                    const totalOfPax = item.ssr.reduce<SubTotalOfService>(
                        (accOfPax, { quantity, priceConfig, type }) => {
                            accOfPax = {
                                subTotal:
                                    accOfPax.subTotal +
                                    priceConfig[type] * quantity,
                                itemCount: accOfPax.itemCount + quantity,
                            };
                            return accOfPax;
                        },
                        { subTotal: 0, itemCount: 0 },
                    );

                    acc = {
                        subTotal: acc.subTotal + totalOfPax.subTotal,
                        itemCount: acc.itemCount + totalOfPax.itemCount,
                    };

                    return acc;
                },
                { subTotal: 0, itemCount: 0 },
            );

            total = {
                subTotal: total.subTotal + subTotalPricingItemsAddNew.subTotal,
                itemCount:
                    total.itemCount + subTotalPricingItemsAddNew.itemCount,
            };
        }
        return total;
    }, [
        initSSRBookingItemsRemove,
        initSSRBookingItems,
        bookingSSRItemsOfService,
    ]);

    return (
        <>
            <div className="service__item bg-white mb-6 rounded-md border">
                <div className="service__item-inner">
                    <div className="service__item-head px-6 py-6 ">
                        <div className="flex justify-between">
                            <div className="service-name ">
                                <span className="font-[500]">
                                    {serviceName}
                                </span>
                            </div>
                            <Button
                                type="primary"
                                ghost
                                size="small"
                                onClick={showDrawer}
                                className="cursor-pointer"
                            >
                                Chọn
                            </Button>
                        </div>
                        <div className="border-t pt-6 mt-6">
                            <div className="flex items-center justify-between">
                                <span>{`Tạm tính`}</span>
                                <span
                                    className="font-[500] text-lg text-primary-default cursor-pointer"
                                    onClick={() =>
                                        setShowDetail((prev) => !prev)
                                    }
                                >
                                    {moneyFormatVND(
                                        subtotalServiceItem?.subTotal,
                                    )}
                                    <span className="font-[10px] ml-2">
                                        {showDetail ? (
                                            <RightOutlined className="w-3" />
                                        ) : (
                                            <RightOutlined className="w-3" />
                                        )}
                                    </span>
                                </span>
                            </div>
                        </div>
                    </div>
                    {showDetail ? (
                        <div className="break-down-service-item">
                            {ssrItemGroupByPassenger ? (
                                <div className="pax__item__ssr-old border-t py-4 px-6">
                                    <div className="pax__item__ssr--head mb-3">
                                        <p className="font-[500]">Chi tiết</p>
                                    </div>
                                    <div>
                                        <div className="">
                                            <div className="flex text-gray-600 text-xs">
                                                <span className="w-36">
                                                    Hành khách
                                                </span>
                                                <span className="w-24">
                                                    Hạng
                                                </span>
                                                <span className="w-24">
                                                    Số lượng
                                                </span>
                                                <span className="w-24">
                                                    Giá tiền
                                                </span>
                                            </div>
                                        </div>
                                        {ssrItemGroupByPassenger.map(
                                            ({ pax, ssr }, _index) => (
                                                <BreakDownItem
                                                    key={`pax-${_index}`}
                                                    paxFullName={
                                                        getFullnamePassenger(
                                                            pax.paxLastname,
                                                            pax.paxMiddleFirstName,
                                                        ) ??
                                                        `Hành khách ${
                                                            _index + 1
                                                        }`
                                                    }
                                                    pricingItems={ssr.map(
                                                        (item) => ({
                                                            recId: item.recId,
                                                            ssrClass:
                                                                item.class,
                                                            quantity: 1,
                                                            price: moneyFormatVND(
                                                                item.amount,
                                                            ),
                                                        }),
                                                    )}
                                                />
                                            ),
                                        )}
                                    </div>
                                </div>
                            ) : null}
                            <div className="pax__item__ssr-new py-4 px-6 border-t">
                                <div className="">
                                    <div className="flex text-xs text-gray-600">
                                        <span className="w-36">Hành khách</span>
                                        <span className="w-24">Hạng</span>
                                        <span className="w-24">Số lượng</span>
                                        <span className="w-24">Giá tiền</span>
                                    </div>
                                </div>
                                {initSSRBookingItems?.map(
                                    ({ booking, ssr }, _index) => (
                                        <BreakDownItem
                                            key={`pax-${_index}`}
                                            paxFullName={
                                                getFullnamePassenger(
                                                    booking.pax.paxLastname,
                                                    booking.pax
                                                        .paxMiddleFirstName,
                                                ) ?? `Hành khách ${_index + 1}`
                                            }
                                            pricingItems={ssr.map(
                                                ({
                                                    quantity,
                                                    priceConfig,
                                                    type,
                                                }) => ({
                                                    recId: priceConfig.recId,
                                                    ssrClass:
                                                        priceConfig["class"],
                                                    quantity: quantity,
                                                    price: moneyFormatVND(
                                                        priceConfig[type],
                                                    ),
                                                }),
                                            )}
                                        />
                                    ),
                                )}
                            </div>
                        </div>
                    ) : null}
                </div>
            </div>
            <DrawerServiceItem
                isOpen={openDrawer}
                initalSSRItems={{
                    addList: initSSRBookingItems,
                    removeList: initSSRBookingItemsRemove,
                }}
                bookingSSRItemsBooked={bookingSSRItemsOfService}
                onClose={closeDrawer}
                serviceName={serviceName}
                serviceId={serviceId}
                pricingConfigs={pricingConfigs}
                onConfirm={onConfirm}
                bookingItems={bookingDetails}
            />
        </>
    );
};
export default memo(ServiceItem);

interface BreakDownItemProps {
    paxFullName?: string;
    pricingItems: {
        recId: number;
        ssrClass: string;
        quantity: number;
        price: string;
    }[];
}
const BreakDownItem = function ({
    paxFullName,
    pricingItems,
}: BreakDownItemProps) {
    return (
        <div className="flex">
            <span className="passenger-fullname w-36">{paxFullName}</span>
            <div className="ssr-item-list">
                {pricingItems.length
                    ? pricingItems.map(
                          ({ recId, ssrClass, quantity, price }) => (
                              <span className="flex" key={recId}>
                                  <span className="w-24">{ssrClass}</span>
                                  <span className="w-24">{quantity}</span>
                                  <span className="text-primary-default">
                                      {price}
                                  </span>
                              </span>
                          ),
                      )
                    : "--"}
            </div>
        </div>
    );
};
