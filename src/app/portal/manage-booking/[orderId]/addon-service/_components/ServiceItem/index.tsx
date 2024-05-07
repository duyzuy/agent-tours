import React, { useMemo, useState, useCallback, memo } from "react";
import { moneyFormatVND } from "@/utils/helper";

import { PassengerType } from "@/models/management/common.interface";
import { isEmpty } from "lodash";
import { Button } from "antd";
import DrawerServiceItem, { DrawerServiceItemProps } from "./DrawerServiceItem";
import { PriceConfig } from "@/models/management/core/priceConfig.interface";
import { IPassengerInformation } from "@/models/management/booking/passengerInformation.interface";
import { BookingDetailItem, BookingDetailSSRItem } from "../../page";
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

export interface ServiceItemProps {
    serviceName?: string;
    pricingConfigs?: PriceConfig[];
    bookingDetails?: BookingDetailItem[];
    ssrListBooked?: BookingDetailSSRItem[];
    initSSRBookingItems?: BookingSSRItem[];
    defaultSSRBookingItems?: BookingSSRItem[];
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
    defaultSSRBookingItems,
    render,
    serviceId,
    onConfirm,
}) => {
    const [openDrawer, setOpenDrawer] = useState(false);

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

    const serviceListGroupingByPax = useMemo(() => {
        if (!ssrListBooked || !ssrListBooked.length) return undefined;

        const ssrBookedItemByService = ssrListBooked?.filter(
            (item) => item.config.sellableDetailsId === serviceId,
        );
        return ssrBookedItemByService.reduce<ServiceGroupingByPassenger[]>(
            (acc, svItem) => {
                const indexPax = acc.findIndex(
                    (item) => item.recId === svItem.pax.recId,
                );

                /**
                 * if exists Pax
                 */

                if (indexPax !== -1) {
                    const paxWithSSRItems = acc[indexPax];

                    const priceConfigs = paxWithSSRItems.priceConfigs;
                    let newPriceConfigs = [...priceConfigs];

                    const indexPriceConfig = priceConfigs.findIndex(
                        (item) =>
                            item.priceConfig.recId === svItem.config.recId,
                    );

                    /**
                     * if priceConfig exists
                     */
                    if (indexPriceConfig !== -1) {
                        newPriceConfigs.splice(indexPriceConfig, 1, {
                            ...priceConfigs[indexPriceConfig],
                            quantity:
                                priceConfigs[indexPriceConfig]["quantity"] + 1,
                        });
                    }
                    /**
                     * if priceConfig no exists
                     */
                    if (indexPriceConfig === -1) {
                        newPriceConfigs = [
                            ...newPriceConfigs,
                            {
                                quantity: 1,
                                priceConfig: svItem.config,
                                type: svItem.pax.type,
                            },
                        ];
                    }

                    acc.splice(indexPax, 1, {
                        ...paxWithSSRItems,
                        priceConfigs: newPriceConfigs,
                    });
                }

                /**
                 * if no exists pax
                 */

                if (indexPax === -1) {
                    acc = [
                        ...acc,
                        {
                            recId: svItem.pax.recId,
                            passengerInfo: svItem.pax,
                            bookingId: svItem.recId,
                            bookingRefId: svItem.bookingRefId,
                            priceConfigs: [
                                {
                                    quantity: 1,
                                    priceConfig: svItem.config,
                                    type: svItem.pax.type,
                                },
                            ],
                        },
                    ];
                }

                return acc;
            },
            [],
        );
    }, [ssrListBooked]);

    return (
        <>
            <div className="service__item bg-white mb-6 rounded-md border">
                <div className="service__item-inner">
                    <div className="service__item-head px-6 py-6 flex justify-between">
                        <div className="service-name ">
                            <span className="font-[500]">{serviceName}</span>
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
                    {serviceListGroupingByPax ? (
                        <div className="border-t py-4 px-6">
                            <div>
                                <p className="font-[500]">Dịch vụ đã mua</p>
                            </div>
                            {serviceListGroupingByPax.map(
                                (
                                    { passengerInfo, priceConfigs, recId },
                                    _index,
                                ) => (
                                    <div key={_index} className="py-2">
                                        <div className="flex">
                                            <span className="passenger-fullname w-36">
                                                {getFullnamePassenger(
                                                    passengerInfo.paxLastname,
                                                    passengerInfo.paxMiddleFirstName,
                                                ) ?? `Hành khách ${_index + 1}`}
                                            </span>
                                            <span>
                                                {priceConfigs.map(
                                                    ({
                                                        quantity,
                                                        priceConfig,
                                                    }) => (
                                                        <span
                                                            key={
                                                                priceConfig.recId
                                                            }
                                                            className="flex"
                                                        >
                                                            <span className="w-16">
                                                                {
                                                                    priceConfig.class
                                                                }
                                                            </span>
                                                            <span className="mr-2">
                                                                {`${quantity} x`}
                                                            </span>
                                                            <span className="text-primary-default">
                                                                {`${moneyFormatVND(
                                                                    priceConfig[
                                                                        passengerInfo
                                                                            .type
                                                                    ],
                                                                )}`}
                                                            </span>
                                                        </span>
                                                    ),
                                                )}
                                            </span>
                                        </div>
                                    </div>
                                ),
                            )}
                        </div>
                    ) : null}
                    {render?.()}
                </div>
            </div>
            <DrawerServiceItem
                isOpen={openDrawer}
                initSSRBookingItems={initSSRBookingItems}
                defaultSSRBookingItems={defaultSSRBookingItems}
                onClose={closeDrawer}
                serviceName={serviceName}
                serviceId={serviceId}
                pricingConfigs={pricingConfigs}
                ssrBookedItemGroupByPax={serviceListGroupingByPax}
                onConfirm={onConfirm}
                bookingItems={bookingDetails}
            />
        </>
    );
};
export default memo(ServiceItem);
