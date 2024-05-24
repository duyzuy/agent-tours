import React, { useCallback, useEffect, useMemo, useState } from "react";
import { PriceConfig } from "@/models/management/core/priceConfig.interface";
import ServiceItem, { ServiceItemProps } from "../ServiceItem";

import useManageBooking from "../../hooks/useManageBooking";

import { BookingDetailItemType, BookingDetailSSRItemType } from "../../page";
import { BookingSSRItemType } from "../../modules/bookingSSR.interface";
import useEditSSR from "../../modules/useEditSSR";
import { Button, Space } from "antd";
import { useRouter } from "next/navigation";

interface ServiceListContainerProps {
    orderId?: number;
    items: PriceConfig[];
    ssrListBooked?: BookingDetailSSRItemType[];
    bookingDetails?: BookingDetailItemType[];
}
const ServiceListContainer: React.FC<ServiceListContainerProps> = ({
    orderId,
    items,
    ssrListBooked,
    bookingDetails,
}) => {
    const [bookingSSRInformation, setBookingSSRInformation] =
        useManageBooking();
    const router = useRouter();
    const { onUpdateSSRByPax } = useEditSSR();

    console.log(bookingSSRInformation);
    /**
     *
     * Grouping Booking service items by serviceitem
     * @param sellableDetailsId present an type of service.
     *
     */
    const groupingServices = useMemo(() => {
        return items.reduce<{
            [key: string]: {
                serviceId: number;
                serviceName: string;
                priceConfigs: PriceConfig[];
            };
        }>((acc, item) => {
            const detailsId = item.sellableDetailsId;

            if (acc[detailsId]) {
                acc = {
                    ...acc,
                    [detailsId]: {
                        ...acc[detailsId],
                        priceConfigs: [...acc[detailsId]["priceConfigs"], item],
                    },
                };
            } else {
                acc = {
                    ...acc,
                    [detailsId]: {
                        serviceId: detailsId,
                        serviceName: item.details,
                        priceConfigs: [item],
                    },
                };
            }
            return acc;
        }, {});
    }, [items]);

    // const defaultSSRBookingGroupingItems = useMemo(() => {
    //     let initBookingSSRItems: Required<
    //         typeof bookingSSRData
    //     >["bookingDetails"] = {};

    //     Object.entries(groupingServices).forEach(([key, service], _index) => {
    //         const groupSSRListBooked = ssrListBooked?.filter(
    //             (item) => item.config.sellableDetailsId === service.serviceId,
    //         );

    //         let bookingSSRByServiceItems: (typeof initBookingSSRItems)[0]["items"] =
    //             [];
    //         bookingDetails?.forEach((bkItem) => {
    //             const ssrListBookedByBooking =
    //                 groupSSRListBooked?.filter(
    //                     (item) => item.bookingRefId === bkItem.recId,
    //                 ) || [];

    //             bookingSSRByServiceItems = [
    //                 ...bookingSSRByServiceItems,
    //                 {
    //                     booking: bkItem,
    //                     ssr: ssrListBookedByBooking.reduce<
    //                         BookingSSRItemType["ssr"]
    //                     >((acc, item) => {
    //                         const indexConfig = acc.findIndex(
    //                             (it) =>
    //                                 it.priceConfig.recId === item.config.recId,
    //                         );

    //                         if (indexConfig !== -1) {
    //                             acc.splice(indexConfig, 1, {
    //                                 ...acc[indexConfig],
    //                                 quantity: acc[indexConfig].quantity + 1,
    //                             });
    //                         } else {
    //                             acc = [
    //                                 ...acc,
    //                                 {
    //                                     quantity: 1,
    //                                     type: item.pax.type,
    //                                     priceConfig: item.config,
    //                                 },
    //                             ];
    //                         }
    //                         return acc;
    //                     }, []),
    //                 },
    //             ];
    //         });

    //         initBookingSSRItems = {
    //             ...initBookingSSRItems,
    //             [service.serviceId]: {
    //                 serviceId: service.serviceId,
    //                 items: bookingSSRByServiceItems,
    //             },
    //         };
    //     });
    //     return initBookingSSRItems;
    // }, [groupingServices, bookingDetails]);

    const onAddSSRBooking = useCallback<
        Required<ServiceItemProps>["onConfirm"]
    >((ssrItems, ssrItemRemove, serviceId) => {
        setBookingSSRInformation((oldData) => ({
            ...oldData,
            bookingDetails: {
                ...oldData.bookingDetails,
                [serviceId]: {
                    serviceId: serviceId,
                    items: ssrItems,
                },
            },
            bookingSsrDelete: [...oldData.bookingSsrDelete, ...ssrItemRemove],
        }));
    }, []);

    // const isDisableButton = useMemo(() => {
    //     const bookingDetailItems = bookingSSRData.bookingDetails;

    //     let isDisable = true;

    //     bookingDetailItems &&
    //         Object.entries(bookingDetailItems).forEach(([key, serviceItem]) => {
    //             const isEqualData =
    //                 defaultSSRBookingGroupingItems[key] &&
    //                 serviceItem.items.length ===
    //                     defaultSSRBookingGroupingItems[key].items.length &&
    //                 serviceItem.items.every((bookingItem) => {
    //                     return defaultSSRBookingGroupingItems[key].items.some(
    //                         (defaultItem) => {
    //                             return (
    //                                 defaultItem.booking.recId ===
    //                                     bookingItem.booking.recId &&
    //                                 defaultItem.ssr.length ===
    //                                     bookingItem.ssr.length &&
    //                                 bookingItem.ssr.every((ssrItem) => {
    //                                     return defaultItem.ssr.some(
    //                                         (defaultSsrItem) =>
    //                                             defaultSsrItem.priceConfig
    //                                                 .recId ===
    //                                                 ssrItem.priceConfig.recId &&
    //                                             defaultSsrItem.quantity ===
    //                                                 ssrItem.quantity,
    //                                     );
    //                                 })
    //                             );
    //                         },
    //                     );
    //                 });
    //             if (isEqualData === false) {
    //                 isDisable = false;
    //             }
    //         });

    //     return isDisable;
    // }, [bookingSSRData, defaultSSRBookingGroupingItems]);

    /**
     * init formData with orderId
     */
    useEffect(() => {
        setBookingSSRInformation((prev) => ({
            ...prev,
            bookingOrder: { recId: orderId },
            bookingDetails: {},
            bookingSsrDelete: [],
        }));
    }, []);
    return (
        <>
            <div className="manage__booking-service-head mb-6">
                <p className="font-[500] text-[16px]">Chọn dịch vụ</p>
            </div>
            {Object.entries(groupingServices)?.map(
                ([key, { serviceId, serviceName, priceConfigs }]) => (
                    <ServiceItem
                        key={serviceId}
                        serviceName={serviceName}
                        serviceId={serviceId}
                        pricingConfigs={priceConfigs}
                        bookingDetails={bookingDetails}
                        ssrListBooked={ssrListBooked}
                        // defaultSSRBookingItems={
                        //     defaultSSRBookingGroupingItems
                        //         ? defaultSSRBookingGroupingItems[serviceId]
                        //               ?.items
                        //         : undefined
                        // }
                        initSSRBookingItems={
                            bookingSSRInformation?.bookingDetails
                                ? bookingSSRInformation.bookingDetails[
                                      serviceId
                                  ]?.items
                                : undefined
                        }
                        initSSRBookingItemsRemove={
                            bookingSSRInformation.bookingSsrDelete
                        }
                        onConfirm={onAddSSRBooking}
                    />
                ),
            )}
            <div className="manage__booking-service-actions bg-white mb-6">
                <Space>
                    <Button
                        className="w-48"
                        onClick={() =>
                            router.push(`./portal/manage-booking/${orderId}`)
                        }
                    >
                        Quay lại
                    </Button>
                    <Button
                        type="primary"
                        className="w-48"
                        onClick={() => onUpdateSSRByPax(bookingSSRInformation)}
                        // disabled={isDisableButton}
                    >
                        Tiến hành thanh toán
                    </Button>
                </Space>
            </div>
        </>
    );
};
export default ServiceListContainer;
