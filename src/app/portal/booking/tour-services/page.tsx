"use client";
import React, { useEffect, useMemo } from "react";
import { Breadcrumb, Col, Row } from "antd";
import useBooking from "../hooks/useBooking";
import { useRouter } from "next/navigation";
import { isUndefined } from "lodash";

import { useGetBookingTourServicesCoreQuery } from "@/queries/core/bookingOrder";

import { Space, Button } from "antd";
import { IServicesRs } from "@/models/management/booking/service.interface";
import BookingSummary from "../_components/BookingSummary";
import useTourServiceAddOn from "../modules/servies/useTourServiceAddOn";
import BoxServiceItem from "./_components/BoxServiceItem";
interface Props {}
export type TServiceItemType = {
    sellableDetailsId: number;
    detail: string;
    items: IServicesRs["result"];
    lowestPrice: {
        adult: number;
        child: number;
        infant: number;
    };
};
const CustomerInformationPage = ({}: Props) => {
    const [bookingInformation, setBookingInfomation] = useBooking();

    const { data: tourServices, isLoading } =
        useGetBookingTourServicesCoreQuery({
            enabled: !isUndefined(
                bookingInformation.bookingInfo?.product?.recId,
            ),
            sellableId: bookingInformation.bookingInfo?.product?.recId,
        });
    const router = useRouter();
    const { onAddService } = useTourServiceAddOn();

    const bookingItems = useMemo(() => {
        return bookingInformation.bookingInfo?.bookingItems || [];
    }, [bookingInformation]);

    useEffect(() => {
        if (!isUndefined(tourServices) && !isLoading) {
            setBookingInfomation((prev) => ({
                ...prev,
                serviceList: [...tourServices],
            }));
        }
    }, [tourServices, isLoading]);

    const servicesItemsGrouping = useMemo(() => {
        return tourServices?.reduce<
            | {
                  [key: string]: TServiceItemType;
              }
            | undefined
        >((acc, item) => {
            if (acc && acc[item.sellableDetailsId]) {
                acc[item.sellableDetailsId] = {
                    ...acc[item.sellableDetailsId],
                    items: [...acc[item.sellableDetailsId].items, item].sort(
                        (a, b) => a.adult - b.adult,
                    ),
                    lowestPrice: {
                        ...acc[item.sellableDetailsId].lowestPrice,
                        adult:
                            acc[item.sellableDetailsId].lowestPrice.adult >
                            item.adult
                                ? item.adult
                                : acc[item.sellableDetailsId].lowestPrice.adult,
                        child:
                            acc[item.sellableDetailsId].lowestPrice.child >
                            item.child
                                ? item.child
                                : acc[item.sellableDetailsId].lowestPrice.child,
                        infant:
                            acc[item.sellableDetailsId].lowestPrice.infant >
                            item.adult
                                ? item.infant
                                : acc[item.sellableDetailsId].lowestPrice
                                      .infant,
                    },
                };
            } else {
                acc = {
                    ...acc,
                    [item.sellableDetailsId]: {
                        sellableDetailsId: item.sellableDetailsId,
                        detail: item.details,
                        items: [item],
                        lowestPrice: {
                            adult: item.adult,
                            child: item.child,
                            infant: item.infant,
                        },
                    },
                };
            }
            return acc;
        }, undefined);
    }, [tourServices]);

    // useEffect(() => {
    //     if (
    //         isUndefined(bookingInformation?.bookingInfo?.product) ||
    //         isUndefined(bookingInformation?.bookingInfo?.bookingItems) ||
    //         !bookingInformation?.bookingInfo?.bookingItems.length
    //     ) {
    //         router.push("./portal/booking");
    //     }
    // }, [bookingInformation]);

    return (
        <div className="services__page bg-slate-50 -mx-6 -my-6 p-6 h-full mb-8">
            <div className="max-w-6xl mx-auto">
                <Breadcrumb
                    items={[
                        {
                            title: "Chọn tour",
                        },
                        {
                            title: "Mua thêm dịch vụ",
                        },
                    ]}
                />
                <div className="h-4"></div>
                <div className="services__page">
                    <Row gutter={32}>
                        <Col span={15}>
                            {servicesItemsGrouping &&
                                Object.keys(servicesItemsGrouping)?.map(
                                    (key) => (
                                        <BoxServiceItem
                                            key={key}
                                            serviceItem={
                                                servicesItemsGrouping[key]
                                            }
                                            bookingItems={bookingItems}
                                            onAddService={onAddService}
                                        />
                                    ),
                                )}
                            <div className="text-right">
                                <Space align="end">
                                    <Button
                                        type="primary"
                                        ghost
                                        onClick={() => router.back()}
                                    >
                                        Quay lại
                                    </Button>
                                    <Button
                                        type="primary"
                                        onClick={() =>
                                            router.push(
                                                "./portal/booking/payment",
                                            )
                                        }
                                    >
                                        Tiến hành đặt chỗ
                                    </Button>
                                </Space>
                            </div>
                        </Col>
                        <Col span={9}>
                            <BookingSummary label="Chi tiết giá tour" />
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    );
};
export default CustomerInformationPage;
