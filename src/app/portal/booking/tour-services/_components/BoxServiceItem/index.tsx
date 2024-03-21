import React, { useState } from "react";
import {
    BookingInformation,
    IBookingItem,
} from "../../../modules/bookingInformation.interface";
import Quantity, { QuantityProps } from "@/components/admin/Quantity";
import { getPassengerType } from "@/utils/common";
import { moneyFormatVND } from "@/utils/helper";
import { TServiceItemType } from "../../page";
import useMessage from "@/hooks/useMessage";
import { PassengerType } from "@/models/management/common.interface";
import { isUndefined } from "lodash";
import { Button } from "antd";
import DrawerServiceItem from "../DrawerServiceItem";

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
}
const BoxServiceItem: React.FC<BoxServiceItemProps> = ({
    serviceName,
    bookingItems = [],
    serviceItem,
    onAddService,
}) => {
    const [openDrawer, setOpenDrawer] = useState(false);

    const message = useMessage();

    const onChangeQuantityService = (
        quantity: number,
        bookingItem: IBookingItem,
        pasengerType: PassengerType,
        action: "minus" | "plus",
    ) => {
        onAddService?.(
            bookingItem.index,
            action,
            serviceItem.sellableDetailsId,
            pasengerType,
        );
    };

    const getQuantityServiceSelected = ({
        bookingItem,
        paxType,
    }: {
        bookingItem: IBookingItem;
        paxType: PassengerType;
    }) => {
        if (isUndefined(bookingItem)) {
            throw new Error("Booking item invalid");
        }
        const serviceItemsInBooking = bookingItem.ssr.filter(
            (ssrItem) =>
                ssrItem.sellableDetailsId === serviceItem.sellableDetailsId,
        );

        return serviceItemsInBooking.reduce((acc, item) => {
            acc = acc + item.qty;
            return acc;
        }, 0);
    };

    return (
        <>
            <div className="service__item bg-white mb-6 rounded-sm drop-shadow-sm">
                <div className="service__item-inner">
                    <div className="service__item-title">
                        <div className="service-name px-6 py-6">
                            <span className="font-[500]">
                                {serviceItem.detail}
                            </span>
                        </div>
                    </div>
                    <div className="service__item-body">
                        {bookingItems.map((item, _index) => (
                            <div
                                className="pax-item flex justify-between py-3 px-6 border-t"
                                key={_index}
                            >
                                <div className="flex-1">
                                    <span className="mr-2">
                                        {`Hành khách ${_index + 1}`}
                                    </span>
                                    <span className="text-xs text-gray-600">
                                        {`(${getPassengerType(item.type)})`}
                                    </span>
                                </div>
                                <div className="flex items-center">
                                    <div className="quantiy mr-6">
                                        <Quantity
                                            size="sm"
                                            value={getQuantityServiceSelected({
                                                bookingItem: item,
                                                paxType: item.type,
                                            })}
                                            onChange={(action, value) =>
                                                onChangeQuantityService(
                                                    value,
                                                    item,
                                                    item.type,
                                                    action,
                                                )
                                            }
                                        />
                                    </div>
                                    <div className="price w-32">
                                        <span className="block text-xs">
                                            Chỉ từ
                                        </span>
                                        <span className="block font-[500] text-primary-default">
                                            {moneyFormatVND(
                                                serviceItem.lowestPrice[
                                                    item.type
                                                ],
                                            )}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {/* <DrawerServiceItem
                isOpen={openDrawer}
                onClose={() => setOpenDrawer(false)}
                serviceName={serviceItem.detail}
                pricingItems={serviceItem.items}
                bookingItems={bookingItems}
            /> */}
        </>
    );
};
export default BoxServiceItem;
