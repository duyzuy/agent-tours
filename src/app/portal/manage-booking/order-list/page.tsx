"use client";
import React, { useState } from "react";
import PageContainer from "@/components/admin/PageContainer";
import TableListPage from "@/components/admin/TableListPage";
import { BookingOrderListQueryParams } from "@/models/management/booking/reservation.interface";
import { useGetBookingOrderListCoreQuery } from "@/queries/core/bookingOrder";
import { columnsOrderList } from "./columnsOrderList";
import { useRouter } from "next/navigation";
import { IOrderListRs } from "@/models/management/booking/order.interface";
import { useLocalGetRuleAndPolicyQuery } from "@/queries/ruleAndPolicy";
import { Form, Row, Select, Col, DatePickerProps, PaginationProps } from "antd";
import FormItem from "@/components/base/FormItem";
import { Status } from "@/models/management/common.interface";
import CustomDatePicker from "@/components/admin/CustomDatePicker";
import dayjs, { Dayjs } from "dayjs";
import { DATE_FORMAT } from "@/constants/common";
export default function ManageBookingOrderListPage() {
    const router = useRouter();

    const [booingQueryParams, setBookingQueryParams] = useState(
        () => new BookingOrderListQueryParams(undefined, 1, 20),
    );

    const { data: ruleAndPolicyList, isLoading: isLoadingRule } =
        useLocalGetRuleAndPolicyQuery();

    const { data: reservationResponse, isLoading } =
        useGetBookingOrderListCoreQuery({
            enabled: !isLoadingRule,
            queryParams: booingQueryParams,
            localRuleAndPolicies: ruleAndPolicyList || [],
        });

    const onChangeCreatedTo: DatePickerProps["onChange"] = (
        date: Dayjs | null,
    ) => {
        setBookingQueryParams((prev) => ({
            ...prev,
            requestObject: {
                ...prev.requestObject,
                createdTo: date?.format(DATE_FORMAT),
            },
        }));
    };

    const onChangeCreatedFrom: DatePickerProps["onChange"] = (
        date: Dayjs | null,
    ) => {
        setBookingQueryParams((prev) => ({
            ...prev,
            requestObject: {
                ...prev.requestObject,
                createdFrom: date?.format(DATE_FORMAT),
            },
        }));
    };
    const onChangePagination: PaginationProps["onChange"] = (
        page,
        pageSize,
    ) => {
        setBookingQueryParams((prev) => ({ ...prev, pageCurrent: page }));
    };
    const onChangeStatus = (value: Status) => {
        setBookingQueryParams((prev) => ({
            ...prev,
            requestObject: {
                ...prev.requestObject,
                status: value,
            },
        }));
    };
    return (
        <PageContainer
            name="Quản lý đặt chỗ"
            modelName="Quản lý đặt chỗ"
            breadCrumItems={[
                { title: "Quản lý đặt chỗ" },
                { title: "Danh sách đặt chỗ" },
            ]}
            hideAddButton
        >
            <div className="">
                <Form layout="vertical">
                    <Row gutter={16}>
                        <Col lg={3}>
                            <FormItem>
                                <Select
                                    options={[
                                        {
                                            value: Status.OK,
                                            label: "Đã duyệt",
                                        },
                                        {
                                            value: Status.QQ,
                                            label: "Chờ duyệt",
                                        },
                                        { value: Status.XX, label: "Đã huỷ" },
                                    ]}
                                    onChange={onChangeStatus}
                                    placeholder="Trạng thái"
                                />
                            </FormItem>
                        </Col>
                        <Col lg={4}>
                            <FormItem>
                                <CustomDatePicker
                                    placeholder="Từ ngày"
                                    className="w-full"
                                    disabledDate={(date) => {
                                        if (
                                            booingQueryParams.requestObject
                                                ?.createdTo
                                        ) {
                                            return date.isAfter(
                                                dayjs(
                                                    booingQueryParams
                                                        .requestObject
                                                        ?.createdTo,
                                                    DATE_FORMAT,
                                                ),
                                            );
                                        }
                                        return false;
                                    }}
                                    onChange={onChangeCreatedFrom}
                                />
                            </FormItem>
                        </Col>
                        <Col span={6} lg={4}>
                            <FormItem>
                                <CustomDatePicker
                                    placeholder="Đến ngày"
                                    className="w-full"
                                    disabledDate={(date) => {
                                        if (
                                            booingQueryParams.requestObject
                                                ?.createdFrom
                                        ) {
                                            return date.isBefore(
                                                dayjs(
                                                    booingQueryParams
                                                        .requestObject
                                                        ?.createdFrom,
                                                    DATE_FORMAT,
                                                ),
                                            );
                                        }
                                        return false;
                                    }}
                                    onChange={onChangeCreatedTo}
                                />
                            </FormItem>
                        </Col>
                    </Row>
                </Form>
            </div>
            <TableListPage<IOrderListRs["result"][0]>
                dataSource={reservationResponse?.list || []}
                columns={columnsOrderList}
                isLoading={isLoading || isLoadingRule}
                fixedActionsColumn={false}
                size="small"
                rowKey={"recId"}
                onView={(record) =>
                    router.push(`./portal/manage-booking/${record.recId}`)
                }
                pagination={{
                    total: reservationResponse?.totalItems,
                    pageSize: reservationResponse?.pageSize,
                    current: reservationResponse?.pageCurrent,
                    onChange: onChangePagination,
                }}
                scroll={{ x: 1400 }}
                showActionsLess={false}
            />
        </PageContainer>
    );
}
