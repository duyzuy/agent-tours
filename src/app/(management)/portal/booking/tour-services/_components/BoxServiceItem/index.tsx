import React, { useMemo, useState } from "react";
import {
    BookingInformation,
    IBookingItem,
} from "../../../modules/bookingInformation.interface";
import Quantity, { QuantityProps } from "@/components/admin/Quantity";
import { getPassengerType } from "@/utils/common";
import { moneyFormatVND } from "@/utils/helper";
import { TServiceItemType } from "../../page";
import useMessage from "@/hooks/useMessage";
import { PassengerType } from "@/models/common.interface";
import { isUndefined } from "lodash";
import { Button } from "antd";
import DrawerServiceItem, {
    TBookingServicePricingItem,
} from "../DrawerServiceItem";

export interface BoxServiceItemProps {
    serviceName?: string;
    onAddService?: (
        bookingIndex: number,
        action: "minus" | "plus",
        serviceRecId: number,
        pasengerType: PassengerType,
    ) => void;
    serviceItem: TServiceItemType;
    bookingItems: IBookingItem[];
    onSetService: (
        sellableDetailsId: number,
        pricingItems: TBookingServicePricingItem[],
    ) => void;
    render?: () => React.ReactNode;
}
const BoxServiceItem: React.FC<BoxServiceItemProps> = ({
    serviceName,
    bookingItems = [],
    serviceItem,
    onAddService,
    onSetService,
    render,
}) => {
    const [openDrawer, setOpenDrawer] = useState(false);

    const pricingItems = useMemo(() => {
        const items = bookingItems.reduce<IBookingItem["ssr"]>(
            (acc, bkItem) => {
                const pricingsItems = bkItem.ssr.filter(
                    (svItem) =>
                        svItem.sellableDetailsId ===
                        serviceItem.sellableDetailsId,
                );

                acc = [...acc, ...pricingsItems];
                return acc;
            },
            [],
        );

        const serviceGroupByPaxType = items.reduce<{
            [key: string]:
                | { qty: number; subTotal: number; type: PassengerType }
                | undefined;
        }>(
            (acc, item) => {
                if (acc[item.type]) {
                    acc = {
                        ...acc,
                        [item.type]: {
                            ...(acc[item.type] || {}),
                            qty: (acc[item.type]?.qty || 0) + item.qty,
                            subTotal:
                                (acc[item.type]?.subTotal || 0) +
                                item.qty * item.item[item.type],
                            type: item.type,
                        },
                    };
                } else {
                    acc = {
                        ...acc,
                        [item.type]: {
                            qty: item.qty,
                            type: item.type,
                            subTotal: item.qty * item.item[item.type],
                        },
                    };
                }

                return acc;
            },
            {
                [PassengerType.ADULT]: undefined,
                [PassengerType.CHILD]: undefined,
                [PassengerType.INFANT]: undefined,
            },
        );
        return serviceGroupByPaxType;
    }, [bookingItems]);

    const isSelectedService = useMemo(() => {
        return bookingItems.some((item) =>
            item.ssr.some(
                (ssrItem) =>
                    ssrItem.sellableDetailsId === serviceItem.sellableDetailsId,
            ),
        );
    }, [bookingItems, serviceItem]);

    return (
        <>
            <div className="service__item bg-white mb-6 rounded-sm drop-shadow-sm">
                <div className="service__item-inner">
                    <div className="service__item-head px-6 py-6 flex justify-between">
                        <div className="service-name ">
                            <span className="font-[500]">
                                {serviceItem.detail}
                            </span>
                        </div>
                        <Button
                            type="primary"
                            ghost
                            size="small"
                            onClick={() => setOpenDrawer(true)}
                            className="cursor-pointer"
                        >
                            Chọn
                        </Button>
                    </div>
                    {render?.()}
                    {isSelectedService ? (
                        <div className="px-6 pb-4 border-t pt-6">
                            {Object.keys(pricingItems).map((itemKey) => (
                                <React.Fragment key={itemKey}>
                                    {pricingItems[itemKey] ? (
                                        <div
                                            className="pricing-item flex py-1"
                                            key={itemKey}
                                        >
                                            <div className="w-20">
                                                {getPassengerType(
                                                    itemKey as PassengerType,
                                                )}
                                            </div>
                                            <div>
                                                <span>{`x ${pricingItems[itemKey]?.qty}`}</span>
                                            </div>
                                            <div className="flex-1 pl-6">
                                                <span className="text-primary-default">
                                                    {moneyFormatVND(
                                                        pricingItems[itemKey]
                                                            ?.subTotal,
                                                    )}
                                                </span>
                                            </div>
                                        </div>
                                    ) : null}
                                </React.Fragment>
                            ))}
                        </div>
                    ) : null}
                </div>
            </div>
            <DrawerServiceItem
                isOpen={openDrawer}
                onClose={() => setOpenDrawer(false)}
                serviceName={serviceItem.detail}
                sellableDetailsId={serviceItem.sellableDetailsId}
                pricingItems={serviceItem.items}
                bookingItems={bookingItems}
                onConfirm={(pricingsService) =>
                    onSetService(serviceItem.sellableDetailsId, pricingsService)
                }
            />
        </>
    );
};
export default BoxServiceItem;
