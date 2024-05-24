import React, { useCallback, useMemo } from "react";
import { IOrderDetail } from "@/models/management/booking/order.interface";
import { Row, Col, Empty, Button } from "antd";
import { getPassengerType } from "@/utils/common";
import { moneyFormatVND } from "@/utils/helper";
import classNames from "classnames";
import { PlusCircleFilled } from "@ant-design/icons";
import { PriceConfig } from "@/models/management/core/priceConfig.interface";
import { IPassengerInformation } from "@/models/management/booking/passengerInformation.interface";
import { isEmpty } from "lodash";
import { PassengerType } from "@/models/management/common.interface";

interface ServiceDetailProps {
    serviceList: IOrderDetail["ssr"][0]["booking"][];
    onBuyService?: () => void;
    className?: string;
    isLoading?: boolean;
}

type GroupingServiceByTypeAndPassengerItem = {
    serviceId: number;
    serviceName: string;
    bookingPassengerList: {
        recId: number;
        passengerInfo: IPassengerInformation;
        ssr: IOrderDetail["ssr"][0]["booking"][];
    }[];
};
const ServiceDetail: React.FC<ServiceDetailProps> = ({
    serviceList,
    className = "",
    onBuyService,
    isLoading = false,
}) => {
    console.log(serviceList);

    const serviceListGroupingByPax = useMemo(() => {
        if (!serviceList || !serviceList.length) return undefined;

        return serviceList.reduce<{
            [key: string]: GroupingServiceByTypeAndPassengerItem;
        }>((acc, bookingSSRItem) => {
            const detailsId = bookingSSRItem.config.sellableDetailsId;
            const serviceItem = acc[detailsId];

            /**
             * if exists serviceGroup
             */
            if (serviceItem) {
                const { bookingPassengerList } = serviceItem;
                let newBookingPassengerList = [...bookingPassengerList];

                const bookingPassengerIndex = bookingPassengerList.findIndex(
                    (pax) => pax.recId === bookingSSRItem.pax.recId,
                );
                /**
                 * if passenger exists => update pricingConfig to pax
                 */
                if (bookingPassengerIndex !== -1) {
                    newBookingPassengerList.splice(bookingPassengerIndex, 1, {
                        ...bookingPassengerList[bookingPassengerIndex],
                        ssr: [
                            ...bookingPassengerList[bookingPassengerIndex].ssr,
                            bookingSSRItem,
                        ],
                    });
                } else {
                    newBookingPassengerList = [
                        ...newBookingPassengerList,
                        {
                            recId: bookingSSRItem.pax.recId,
                            passengerInfo: bookingSSRItem.pax,
                            ssr: [bookingSSRItem],
                        },
                    ];
                }

                acc = {
                    ...acc,
                    [detailsId]: {
                        ...serviceItem,
                        bookingPassengerList: [...newBookingPassengerList],
                    },
                };
            }

            /**
             * if no exists serviceGroup
             */
            if (!serviceItem) {
                acc = {
                    ...acc,
                    [detailsId]: {
                        serviceId: detailsId,
                        serviceName: bookingSSRItem.config.details,
                        bookingPassengerList: [
                            {
                                recId: bookingSSRItem.pax.recId,
                                passengerInfo: bookingSSRItem.pax,
                                ssr: [bookingSSRItem],
                            },
                        ],
                    },
                };
            }

            return acc;
        }, {});
    }, [serviceList]);

    console.log(serviceListGroupingByPax);
    return (
        <div
            className={classNames("booking__detail--ssr", {
                [className]: className,
            })}
        >
            <div className="booking__detail-head mb-6">
                <span className="text-[16px] font-semibold mr-2">
                    Thông tin dịch vụ
                </span>
                <Button
                    icon={<PlusCircleFilled />}
                    type="primary"
                    size="small"
                    onClick={onBuyService}
                    loading={isLoading}
                >
                    Thên dịch vụ
                </Button>
            </div>
            <div className="booking__detail-body">
                {!serviceListGroupingByPax ? (
                    <Empty description="Không có dịch vụ nào." />
                ) : (
                    <Row gutter={[24, 24]}>
                        {Object.entries(serviceListGroupingByPax).map(
                            ([
                                key,
                                {
                                    serviceName,
                                    bookingPassengerList,
                                    serviceId,
                                },
                            ]) => (
                                <Col span={24} xl={24} key={key}>
                                    <div className="service__item mb-3 border px-4 py-4 rounded-md">
                                        <div className="service__item-head border-b mb-3 pb-3">
                                            <p>{serviceName}</p>
                                        </div>
                                        <div className="service__item-body">
                                            <div className="service__item-pax-list">
                                                <div className="service__item-pax-item-head flex items-center text-xs text-gray-600">
                                                    <span className="w-24 xl:w-36 pr-2">
                                                        Hành khách
                                                    </span>
                                                    <span className="w-20 xl:w-32 pr-2">
                                                        Họ
                                                    </span>
                                                    <span className="w-36 xl:w-48 pr-2">
                                                        Tên đệm và tên
                                                    </span>
                                                    <span className="block w-16 xl:w-24 pr-2">
                                                        Class
                                                    </span>
                                                    <span className="block w-20 pr-2">
                                                        Số lượng
                                                    </span>
                                                    <span className="w-32">
                                                        Giá tiền
                                                    </span>
                                                </div>
                                                {bookingPassengerList.map(
                                                    (
                                                        {
                                                            recId,
                                                            passengerInfo,
                                                            ssr,
                                                        },
                                                        _index,
                                                    ) => (
                                                        <div
                                                            className="service__item-pax-item flex items-center py-1"
                                                            key={recId}
                                                        >
                                                            <span className="pax-type w-24 xl:w-36 font-[500] pr-2">
                                                                {getPassengerType(
                                                                    passengerInfo.type,
                                                                )}
                                                            </span>

                                                            <span className="w-20 xl:w-32 font-[500] pr-2">
                                                                {isEmpty(
                                                                    passengerInfo.paxLastname,
                                                                )
                                                                    ? "--"
                                                                    : passengerInfo.paxLastname}
                                                            </span>
                                                            <span className="w-36 xl:w-48 font-[500] pr-2">
                                                                {isEmpty(
                                                                    passengerInfo.paxMiddleFirstName,
                                                                )
                                                                    ? "--"
                                                                    : passengerInfo.paxMiddleFirstName}
                                                            </span>
                                                            <div className="price-config-items">
                                                                {ssr.map(
                                                                    (
                                                                        item,
                                                                        _indexPrc,
                                                                    ) => (
                                                                        <div
                                                                            className="flex"
                                                                            key={
                                                                                _indexPrc
                                                                            }
                                                                        >
                                                                            <span className="block w-16 xl:w-24 pr-2">
                                                                                {
                                                                                    item
                                                                                        .config
                                                                                        .class
                                                                                }
                                                                            </span>
                                                                            <span className="block w-20 pr-2">
                                                                                {`${item.quantity} x`}
                                                                            </span>
                                                                            <span className="block w-32 pr-2 text-primary-default">
                                                                                {moneyFormatVND(
                                                                                    item
                                                                                        .config[
                                                                                        passengerInfo
                                                                                            .type
                                                                                    ],
                                                                                )}
                                                                            </span>
                                                                        </div>
                                                                    ),
                                                                )}
                                                            </div>
                                                        </div>
                                                    ),
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                            ),
                        )}
                    </Row>
                )}
            </div>
        </div>
    );
};
export default ServiceDetail;

interface BookingPassengerServiceItemProps {
    passengers: {
        pasengerType?: PassengerType;
        paxLastname?: string;
        paxMiddleFirstName?: string;
        priceConfigItems: {
            quantity: number;
            priceConfig: PriceConfig;
        }[];
    }[];
}
const BookingPassengerServiceItem: React.FC<
    BookingPassengerServiceItemProps
> = ({ passengers }) => {
    return (
        <div>
            <div className="service__item-pax-item-head flex items-center text-xs text-gray-600">
                <span className="w-24 xl:w-36 pr-2">Hành khách</span>
                <span className="w-20 xl:w-32 pr-2">Họ</span>
                <span className="w-36 xl:w-48 pr-2">Tên đệm và tên</span>
                <span className="block w-16 xl:w-24 pr-2">Class</span>
                <span className="block w-20 pr-2">Số lượng</span>
                <span className="w-32">Giá tiền</span>
            </div>
            {passengers.map(
                (
                    {
                        pasengerType,
                        paxLastname,
                        paxMiddleFirstName,
                        priceConfigItems,
                    },
                    _index,
                ) => (
                    <div
                        className="service__item-pax-item flex items-center py-1"
                        key={_index}
                    >
                        <span className="pax-type w-24 xl:w-36 font-[500] pr-2">
                            {pasengerType}
                        </span>

                        <span className="w-20 xl:w-32 font-[500] pr-2">
                            {isEmpty(paxLastname) ? "--" : paxLastname}
                        </span>
                        <span className="w-36 xl:w-48 font-[500] pr-2">
                            {isEmpty(paxMiddleFirstName)
                                ? "--"
                                : paxMiddleFirstName}
                        </span>
                        <div className="price-config-items">
                            {priceConfigItems.map((item, _indexPrc) => (
                                <div className="flex" key={_indexPrc}>
                                    <span className="block w-16 xl:w-24 pr-2">
                                        {item.priceConfig.class}
                                    </span>
                                    <span className="block w-20 pr-2">
                                        {`${item.quantity} x`}
                                    </span>
                                    <span className="block w-32 pr-2 text-primary-default">
                                        {pasengerType
                                            ? moneyFormatVND(
                                                  item.priceConfig[
                                                      pasengerType
                                                  ],
                                              )
                                            : null}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                ),
            )}
        </div>
    );
};
