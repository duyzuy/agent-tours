import React, { useEffect, useMemo, useState } from "react";
import { Button, Col, Form, Input, Modal, Row, Space, Tag } from "antd";
import { HandleSubmit, useFormSubmit } from "@/hooks/useFormSubmit";
import FormItem from "@/components/base/FormItem";
import {
    DiscountType,
    IDiscountPolicy,
    IDiscountPolicyPayload,
} from "@/models/management/core/discountPolicy.interface";
import { moneyFormatVND } from "@/utils/helper";
import { IDestination } from "@/models/management/region.interface";
import { formatDate } from "@/utils/date";
import { SwapRightOutlined } from "@ant-design/icons";
import { Status } from "@/models/management/common.interface";
import dayjs from "dayjs";
import { DATE_FORMAT, DAYS_OF_WEEK } from "@/constants/common";

interface ModalDiscountDetailProps {
    isOpen?: boolean;
    onClose?: () => void;
    onSubmit?: (data: any, cb?: () => void) => void;
    record?: IDiscountPolicy;
}

const ModalDiscountDetail: React.FC<ModalDiscountDetailProps> = ({
    isOpen,
    onClose,
    onSubmit,
    record,
}) => {
    const destinationList = useMemo(() => {
        return record?.destJson
            ? (JSON.parse(record?.destJson) as IDestination[])
            : undefined;
    }, [record]);

    const timeSlots = useMemo(() => {
        return record?.timeJson
            ? (JSON.parse(record?.timeJson) as number[]).sort((a, b) => a - b)
            : undefined;
    }, [record]);

    const tourCodes = useMemo(() => {
        return record?.tourCodeJson
            ? (JSON.parse(record?.tourCodeJson) as string[])
            : undefined;
    }, [record]);

    const blackOutDates = useMemo(() => {
        return record?.blackoutJson
            ? (JSON.parse(record.blackoutJson) as {
                  byDate: string[] | undefined;
                  byDaterange:
                      | { fromDate: string; toDate: string }[]
                      | undefined;
              })
            : undefined;
    }, [record]);

    const daysOfWeek = useMemo(() => {
        const daysValues = record?.dayOfWeek
            ? (JSON.parse(record.dayOfWeek) as string[])
            : undefined;

        if (!daysValues) {
            return undefined;
        }
        return DAYS_OF_WEEK.reduce<{ label: string; value: string }[]>(
            (acc, item) => {
                if (daysValues.includes(item.value)) {
                    acc = [...acc, item];
                }
                return acc;
            },
            [],
        );
    }, [record]);

    useEffect(() => {}, [isOpen]);
    return (
        <Modal
            open={isOpen}
            onCancel={onClose}
            footer={false}
            destroyOnClose={true}
            width={650}
        >
            <div className="header py-3 mb-3">
                <h4 className="text-center font-bold text-lg">
                    Chi tiết {`#${record?.recId}`}
                </h4>
            </div>
            <div className="body">
                <Row gutter={[16, 16]}>
                    <Col span={24}>
                        <div className="item flex">
                            <div className="label w-36 mr-1">Tên</div>
                            <span className="mr-1">:</span>
                            <div className="value flex-1">{record?.name}</div>
                        </div>
                    </Col>
                    <Col span={24}>
                        <div className="item flex">
                            <div className="label w-36 mr-1">Mô tả</div>
                            <span className="mr-1">:</span>
                            <div className="value flex-1">
                                {record?.descriptions}
                            </div>
                        </div>
                    </Col>
                    <Col span={24}>
                        <div className="item flex">
                            <div className="label w-36 mr-1">Mã</div>
                            <span className="mr-1">:</span>
                            <div className="value flex-1">{record?.code}</div>
                        </div>
                    </Col>
                    <Col span={24}>
                        <div className="item flex">
                            <div className="label w-36 mr-1">
                                Giá trị sử dụng
                            </div>
                            <span className="mr-1">:</span>
                            <div className="value flex-1">
                                {(record?.discountAmount &&
                                    moneyFormatVND(record?.discountAmount)) ||
                                    "--"}
                            </div>
                        </div>
                    </Col>
                    <Col span={24}>
                        <div className="item flex">
                            <div className="label w-36 mr-1">
                                Số lần sử dụng
                            </div>
                            <span className="mr-1">:</span>
                            <div className="value flex-1">
                                {record?.type === DiscountType.COUPON ? (
                                    <span>{`${record?.used}/${record.maxUseTimes}`}</span>
                                ) : (
                                    <p className="text-primary-default">
                                        Không giới hạn
                                    </p>
                                )}
                            </div>
                        </div>
                    </Col>
                    <Col span={24}>
                        <div className="item flex">
                            <div className="label w-36 mr-1">Ngày sử dụng</div>
                            <span className="mr-1">:</span>
                            <div className="value flex-1">
                                <p className="flex">
                                    {(record?.validFrom &&
                                        formatDate(record?.validFrom)) ||
                                        "--"}
                                    <span className="mx-2">
                                        <SwapRightOutlined />
                                    </span>
                                    {(record?.validTo &&
                                        formatDate(record?.validTo)) ||
                                        "--"}
                                </p>
                            </div>
                        </div>
                    </Col>
                    <Col span={24}>
                        <div className="item flex">
                            <div className="label w-36 mr-1">
                                Không bao gồm các ngày
                            </div>
                            <span className="mr-1">:</span>
                            <div className="value flex-1">
                                <div>
                                    {blackOutDates &&
                                    blackOutDates.byDate?.length
                                        ? blackOutDates.byDate?.map((date) => (
                                              <Tag key={date} color="red">
                                                  {dayjs(date, {
                                                      format: DATE_FORMAT,
                                                  }).format("DD/MM/YYYY")}
                                              </Tag>
                                          ))
                                        : null}
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col span={24}>
                        <div className="item flex">
                            <div className="label w-36 mr-1">
                                Khung giờ áp dụng
                            </div>
                            <span className="mr-1">:</span>
                            <div className="value flex-1">
                                {record?.isValidByTime === true ? (
                                    <>
                                        <Space wrap className="mb-2">
                                            {timeSlots?.map((timeSlot) => (
                                                <Tag
                                                    key={timeSlot}
                                                    color="blue"
                                                >{`${timeSlot}h`}</Tag>
                                            ))}
                                        </Space>
                                        <p>
                                            *Khung giờ áp dụng từ 0-59 phút cùng
                                            giờ
                                        </p>
                                    </>
                                ) : (
                                    <p className="text-primary-default">
                                        Tất cả khung giờ
                                    </p>
                                )}
                            </div>
                        </div>
                    </Col>
                    <Col span={24}>
                        <div className="item flex">
                            <div className="label w-36 mr-1">
                                Ngày trong tuần áp dụng
                            </div>
                            <span className="mr-1">:</span>
                            <div className="value flex-1">
                                {record?.isValidByDayofweek === true ? (
                                    <>
                                        <Space wrap className="mb-2">
                                            {daysOfWeek?.map((dayOfW) => (
                                                <Tag
                                                    key={dayOfW.value}
                                                    color="blue"
                                                >{`${dayOfW.label}`}</Tag>
                                            ))}
                                        </Space>
                                    </>
                                ) : (
                                    <p className="text-primary-default">
                                        Tất cả các ngày trong tuần
                                    </p>
                                )}
                            </div>
                        </div>
                    </Col>
                    <Col span={24}>
                        <div className="item flex">
                            <div className="label w-36 mr-1">
                                Nhóm điểm đến áp dụng
                            </div>
                            <span className="mr-1">:</span>
                            <div className="value flex-1">
                                {record?.isValidbyDest === true ? (
                                    <Row gutter={[16, 16]}>
                                        {destinationList?.map((destination) => (
                                            <Col
                                                className="destination-item"
                                                key={destination.id}
                                                span={24}
                                            >
                                                <p className="font-bold mb-2">{`${destination.codeName} - ${destination.codeKey}`}</p>

                                                <Space wrap>
                                                    {destination.listStateProvince.map(
                                                        (item) => (
                                                            <Tag
                                                                key={item.recId}
                                                            >
                                                                {item.cat ===
                                                                "REGIONLIST"
                                                                    ? item.regionKey
                                                                    : item.cat ===
                                                                      "SUBREGIONLIST"
                                                                    ? item.subRegionKey
                                                                    : item.cat ===
                                                                      "COUNTRYLIST"
                                                                    ? item.countryName
                                                                    : item.cat ===
                                                                      "STATEPROVINCELIST"
                                                                    ? item.stateProvinceKey
                                                                    : "Không xác định"}
                                                            </Tag>
                                                        ),
                                                    )}
                                                </Space>
                                            </Col>
                                        ))}
                                    </Row>
                                ) : (
                                    <p className="text-primary-default">
                                        Tất cả các nhóm điểm đến
                                    </p>
                                )}
                            </div>
                        </div>
                    </Col>
                    <Col span={24}>
                        <div className="item flex">
                            <div className="label w-36 mr-1">
                                Mã tour áp dụng
                            </div>
                            <span className="mr-1">:</span>
                            <div className="value flex-1">
                                {record?.isValidbyTourCode === true ? (
                                    <Space wrap>
                                        {tourCodes?.map((tourCode) => (
                                            <Tag key={tourCode} color="blue">
                                                {tourCode}
                                            </Tag>
                                        ))}
                                    </Space>
                                ) : (
                                    <p className="text-primary-default">
                                        Toàn bộ mã tour
                                    </p>
                                )}
                            </div>
                        </div>
                    </Col>
                    <Col span={24}>
                        <div className="item flex">
                            <div className="label w-36 mr-1">Ngày tạo</div>
                            <span className="mr-1">:</span>
                            <div className="value flex-1">
                                <span>
                                    {(record?.sysFstUpdate &&
                                        formatDate(record?.sysFstUpdate)) ||
                                        "--"}
                                </span>
                            </div>
                        </div>
                    </Col>
                    <Col span={24}>
                        <div className="item flex">
                            <div className="label w-36 mr-1">Trạng thái</div>
                            <span className="mr-1">:</span>
                            <div className="value flex-1">
                                {record?.status === Status.OK ? (
                                    <Tag color="green">Đang kích hoạt</Tag>
                                ) : record?.status === Status.QQ ? (
                                    <Tag color="orange">Chờ kích hoạt</Tag>
                                ) : (
                                    <Tag color="red">Đã huỷ</Tag>
                                )}
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </Modal>
    );
};
export default ModalDiscountDetail;
