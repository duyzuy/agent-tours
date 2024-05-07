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

interface ServiceDetailProps {
    serviceList: IOrderDetail["ssr"];
    className?: string;
}

type GroupingServiceByTypeAndPassengerItem = {
    serviceId: number;
    serviceName: string;
    passengers: {
        recId: number;
        passengerInfo: IPassengerInformation;
        priceConfigs: { quantity: number; priceConfig: PriceConfig }[];
    }[];
};
const ServiceDetail: React.FC<ServiceDetailProps> = ({
    serviceList,
    className = "",
}) => {
    const serviceListGroupingByTypeAndPax = useMemo(() => {
        if (!serviceList || !serviceList.length) return undefined;

        return serviceList.reduce<{
            [key: string]: GroupingServiceByTypeAndPassengerItem;
        }>((acc, svItem) => {
            const detailsId = svItem.booking.config.sellableDetailsId;
            const serviceItem = acc[detailsId];

            /**
             * if exists serviceGroup
             */
            if (serviceItem) {
                const { passengers } = serviceItem;
                let newPassengers = [...passengers];

                const passengerIndex = passengers.findIndex(
                    (pax) => pax.recId === svItem.booking.pax.recId,
                );
                /**
                 * if passenger exists => update pricingConfig to pax
                 */
                if (passengerIndex !== -1) {
                    const pricingConfigsByPax =
                        passengers[passengerIndex].priceConfigs;
                    let newPricingConfigsByPax = [...pricingConfigsByPax];
                    /**
                     * Check pricing is exists in pax
                     */

                    const pricingIndex = pricingConfigsByPax.findIndex(
                        (prConfig) =>
                            prConfig.priceConfig.recId ===
                            svItem.booking.config.recId,
                    );

                    /**
                     * if exists => update quantity
                     */

                    if (pricingIndex !== -1) {
                        newPricingConfigsByPax.splice(pricingIndex, 1, {
                            ...pricingConfigsByPax[pricingIndex],
                            quantity:
                                pricingConfigsByPax[pricingIndex]["quantity"] +
                                1,
                        });
                    }

                    /**
                     * if not exists => add new priceConfig to pax
                     */
                    if (pricingIndex === -1) {
                        newPricingConfigsByPax = [
                            ...newPricingConfigsByPax,
                            { quantity: 1, priceConfig: svItem.booking.config },
                        ];
                    }
                    newPassengers.splice(passengerIndex, 1, {
                        ...passengers[passengerIndex],
                        priceConfigs: newPricingConfigsByPax,
                    });
                }

                /**
                 * if passenger not exists => add new pax and new price config to list
                 */
                if (passengerIndex === -1) {
                    newPassengers = [
                        ...newPassengers,
                        {
                            recId: svItem.booking.pax.recId,
                            passengerInfo: svItem.booking.pax,
                            priceConfigs: [
                                {
                                    quantity: 1,
                                    priceConfig: svItem.booking.config,
                                },
                            ],
                        },
                    ];
                }

                acc = {
                    ...acc,
                    [detailsId]: {
                        ...serviceItem,
                        passengers: [...newPassengers],
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
                        serviceName: svItem.booking.config.details,
                        passengers: [
                            {
                                recId: svItem.booking.pax.recId,
                                passengerInfo: svItem.booking.pax,
                                priceConfigs: [
                                    {
                                        quantity: 1,
                                        priceConfig: svItem.booking.config,
                                    },
                                ],
                            },
                        ],
                    },
                };
            }

            return acc;
        }, {});
    }, [serviceList]);

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
                <Button icon={<PlusCircleFilled />} type="primary" size="small">
                    Thên dịch vụ
                </Button>
            </div>
            <div className="booking__detail-body">
                {!serviceListGroupingByTypeAndPax ? (
                    <Empty description="Không có dịch vụ nào." />
                ) : (
                    <Row gutter={[24, 24]}>
                        {Object.entries(serviceListGroupingByTypeAndPax).map(
                            ([key, { serviceName, passengers, serviceId }]) => (
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
                                                {passengers.map(
                                                    (
                                                        {
                                                            recId,
                                                            passengerInfo,
                                                            priceConfigs,
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
                                                                {priceConfigs.map(
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
                                                                                        .priceConfig
                                                                                        .class
                                                                                }
                                                                            </span>
                                                                            <span className="block w-20 pr-2">
                                                                                {`${item.quantity} x`}
                                                                            </span>
                                                                            <span className="block w-32 pr-2 text-primary-default">
                                                                                {moneyFormatVND(
                                                                                    item
                                                                                        .priceConfig[
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
