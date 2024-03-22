import React, { useCallback, useMemo } from "react";
import { IOrderDetail } from "@/models/management/booking/order.interface";
import { Row, Col } from "antd";
import { getPassengerType } from "@/utils/common";
import { moneyFormatVND } from "@/utils/helper";
import classNames from "classnames";

interface ServiceDetailProps {
    serviceList: IOrderDetail["ssr"];
    className?: string;
}
const ServiceDetail: React.FC<ServiceDetailProps> = ({
    serviceList,
    className = "",
}) => {
    const getServiceName = (serviceItem: IOrderDetail["ssr"][0]) => {
        const data = JSON.parse(serviceItem.booking.configJson);

        return data.Details;
    };

    return (
        <div
            className={classNames("booking__detail--ssr", {
                [className]: className,
            })}
        >
            <div className="booking__detail-head mb-3">
                <span className="text-[16px] font-semibold">
                    Thông tin dịch vụ
                </span>
            </div>
            <div className="booking__detail-body">
                <Row gutter={[24, 24]}>
                    {serviceList.map((serviceItem, _index) => (
                        <Col
                            span={8}
                            className="booking__detail__item"
                            key={_index}
                        >
                            <div className="p-4 bg-white border rounded-md shadow-sm">
                                <div className="booking__detail__item-head border-b mb-3 pb-3">
                                    <ul className="flex justify-between">
                                        <li className="flex-1">
                                            {getServiceName(serviceItem)}
                                        </li>
                                        <li className="w-28 text-right">
                                            <span className="font-[500] text-primary-default">
                                                {moneyFormatVND(
                                                    serviceItem.booking.amount,
                                                )}
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                                <div>
                                    <ul className="flex">
                                        <li className="w-16">
                                            <span className="block text-xs text-gray-600">
                                                Class
                                            </span>
                                            <span className="font-[500]">
                                                {serviceItem.booking.class}
                                            </span>
                                        </li>
                                        <li className="w-1/4">
                                            <span className="block text-xs text-gray-600">
                                                Hành khách
                                            </span>
                                            <span className="font-[500]">
                                                {getPassengerType(
                                                    serviceItem.booking.type,
                                                )}
                                            </span>
                                        </li>
                                        <li className="w-1/4">
                                            <span className="block text-xs text-gray-600">
                                                Họ
                                            </span>
                                            <span className="font-[500]">
                                                {serviceItem.booking.pax
                                                    .paxLastname || "--"}
                                            </span>
                                        </li>
                                        <li className="w-1/4">
                                            <span className="block text-xs text-gray-600">
                                                Tên đệm và tên
                                            </span>
                                            <span className="font-[500]">
                                                {serviceItem.booking.pax
                                                    .paxMiddleFirstName || "--"}
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </Col>
                    ))}
                </Row>
            </div>
        </div>
    );
};
export default ServiceDetail;
