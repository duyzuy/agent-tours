import React, { useRef } from "react";
import { Form, Input, Row, Col, DatePicker, Button, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import styled from "styled-components";
import classNames from "classnames";

export interface BoxBookingProps {
    departLocation?: string;
    departDate?: string;
    className?: string;
}
const BoxBooking: React.FC<BoxBookingProps> = ({
    className = "searchbox px-4 py-2 bg-white shadow-lg rounded-lg",
}) => {
    const selectRef = useRef<HTMLDivElement>(null);
    return (
        <SearchBookingWrapper
            className={classNames({ [className]: className })}
        >
            <Form layout="vertical" size="large" className="booking-form">
                <Row align="bottom" gutter={16}>
                    <Col span={6}>
                        <div id="departure-location" ref={selectRef}></div>
                        <Form.Item
                            label="Điểm đến"
                            className="departure-location"
                        >
                            <Select
                                placeholder="Chọn điểm đến"
                                bordered={false}
                                style={{ padding: 0 }}
                                showSearch={true}
                                options={[
                                    { label: "Chau A", value: 1 },
                                    { label: "Chau Au", value: 2 },
                                    { label: "Chau Uc", value: 3 },
                                    { label: "Da Lat", value: 4 },
                                    { label: "Viet Nam", value: 5 },
                                    { label: "HongKong", value: 6 },
                                    { label: "Trung Quoc", value: 7 },
                                    { label: "Singapore", value: 8 },
                                    { label: "Dai loan", value: 9 },
                                    { label: "Phap", value: 10 },
                                    { label: "Ha Noi", value: 11 },
                                ]}
                                getPopupContainer={(triggerNode) =>
                                    triggerNode.parentElement.parentElement
                                }
                                suffixIcon={null}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={4}>
                        <Form.Item label="Ngày đi">
                            <DatePicker
                                placeholder="Chọn ngày di"
                                className="w-full"
                                bordered={false}
                                style={{ padding: 0 }}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={4}>
                        <Form.Item label="Hành khách">
                            <Input
                                placeholder="Số lượng hành khách"
                                bordered={false}
                                style={{ padding: 0 }}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={4}>
                        <Form.Item label="Mã giảm giá">
                            <Input
                                placeholder="Nhập mã giảm giá"
                                bordered={false}
                                style={{ padding: 0 }}
                            />
                        </Form.Item>
                    </Col>
                    <Col flex={1}></Col>
                    <Form.Item>
                        <Button type="primary" icon={<SearchOutlined />}>
                            Tìm kiếm
                        </Button>
                    </Form.Item>
                </Row>
            </Form>
        </SearchBookingWrapper>
    );
};
export default BoxBooking;

const SearchBookingWrapper = styled(`div`)`
    .travel-form-large {
        .travel-form-item {
            margin-bottom: 0;

            .travel-form-item-label > label {
                height: auto;
                font-size: 12px;
                color: gray;
            }
            .travel-form-item-control-input {
                min-height: auto;
            }
        }
    }
    .travel-select-single.travel-select-lg:not(.travel-select-customize-input) {
        .travel-select-selector {
            padding-left: 0;
            padding-right: 0;
            .travel-select-selection-search {
                inset-inline-start: 0px;
                inset-inline-end: 0px;
            }
            .travel-select-selection-search-input {
                height: auto;
            }
        }
    }
    .travel-select-single.travel-select-lg {
        height: 26px;
    }
`;
