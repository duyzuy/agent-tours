"use client";
import React from "react";
import {
    ArrowDownOutlined,
    ArrowUpOutlined,
    SearchOutlined,
    SwapOutlined,
} from "@ant-design/icons";
import {
    Card,
    Col,
    Row,
    Statistic,
    Form,
    Input,
    Button,
    DatePicker,
    Divider,
} from "antd";
import FormItem from "antd/es/form/FormItem";
import styled from "styled-components";
import { moneyFormatVND } from "@/utils/helper";
interface Props {}

const TOURSS = [
    {
        title: "Chào năm mới 2024 tại Đài Loan",
        code: "HG400.0311FEB24",
        departLocation: "Hà Nội",
        departDate: "11 tháng 02, 2024",
        returnDate: "13 tháng 02, 2024",
        transfer: "TURKISH AIRLINES",
        duration: "3 Ngày 2 Ðêm",
        price: 3000000,
    },
    {
        title: "Chào năm mới 2024 tại Đài Loan",
        code: "HG400.0311FEB24",
        departLocation: "Hà Nội",
        departDate: "11 tháng 02, 2024",
        returnDate: "13 tháng 02, 2024",
        transfer: "TURKISH AIRLINES",
        duration: "3 Ngày 2 Ðêm",
        price: 3000000,
    },
    {
        title: "Chào năm mới 2024 tại Đài Loan",
        code: "HG400.0311FEB24",
        departLocation: "Hà Nội",
        departDate: "11 tháng 02, 2024",
        returnDate: "13 tháng 02, 2024",
        transfer: "TURKISH AIRLINES",
        duration: "3 Ngày 2 Ðêm",
        price: 3000000,
    },
    {
        title: "Chào năm mới 2024 tại Đài Loan",
        code: "HG400.0311FEB24",
        departLocation: "Hà Nội",
        departDate: "11 tháng 02, 2024",
        returnDate: "13 tháng 02, 2024",
        transfer: "TURKISH AIRLINES",
        duration: "3 Ngày 2 Ðêm",
        price: 3000000,
    },
    {
        title: "Chào năm mới 2024 tại Đài Loan",
        code: "HG400.0311FEB24",
        departLocation: "Hà Nội",
        departDate: "11 tháng 02, 2024",
        returnDate: "13 tháng 02, 2024",
        transfer: "VIETJET AIRLINES",
        duration: "3 Ngày 2 Ðêm",
        price: 3000000,
    },
    {
        title: "Chào năm mới 2024 tại Đài Loan",
        code: "HG400.0311FEB24",
        departLocation: "Hà Nội",
        departDate: "11 tháng 02, 2024",
        returnDate: "13 tháng 02, 2024",
        transfer: "TURKISH AIRLINES",
        duration: "3 Ngày 2 Ðêm",
        price: 3000000,
    },
];
const SearchTourPage = ({}: Props) => {
    return (
        <>
            <div className="page">
                <div
                    className="header-page p-6 bg-gray-200 rounded-lg mb-6"
                    style={{
                        background: "url('/assets/images/bg-header.png')",
                        backgroundSize: "cover",
                        backgroundPosition: "bottom center",
                    }}
                >
                    <div className=" h-36"></div>
                    <div className="searchbox px-6 py-4 bg-white shadow-lg rounded-lg">
                        <SearchBookingWrapper>
                            <Form
                                layout="vertical"
                                size="large"
                                className="booking-form"
                            >
                                <Row align="bottom" gutter={16}>
                                    <Col span={6}>
                                        <Form.Item label="Điểm đến">
                                            <Input
                                                placeholder="Chọn điểm đến"
                                                bordered={false}
                                                style={{ padding: 0 }}
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col span={6}>
                                        <Form.Item label="Ngày đi">
                                            <DatePicker
                                                placeholder="Chọn ngày di"
                                                className="w-full"
                                                bordered={false}
                                                style={{ padding: 0 }}
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col span={6}>
                                        <Form.Item label="Hành khách">
                                            <Input
                                                placeholder="Số lượng hành khách"
                                                bordered={false}
                                                style={{ padding: 0 }}
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col flex={1}></Col>
                                    <Form.Item>
                                        <Button
                                            type="primary"
                                            icon={<SearchOutlined />}
                                        >
                                            Tìm kiếm
                                        </Button>
                                    </Form.Item>
                                </Row>
                            </Form>
                        </SearchBookingWrapper>
                    </div>
                </div>

                <div className="tours-wrapper">
                    <h3 className="text-lg py-3 font-bold">Các tour giá tốt</h3>
                    <div className="tour-list flex items-center flex-wrap -mx-3 ">
                        {TOURSS.map((tour, _index) => (
                            <div
                                className="tour-item px-3 mb-3 w-1/3"
                                key={_index}
                            >
                                <div className="p-3 bg-white rounded-lg shadow-lg">
                                    <div>
                                        <p>{tour.title}</p>
                                        <p className="text-red-500 font-bold">
                                            {tour.code}
                                        </p>
                                        <div className="schedule-date flex justify-between">
                                            <div>
                                                <span>Ngày đi</span>
                                                <p className="font-bold">
                                                    {tour.departDate}
                                                </p>
                                            </div>
                                            <SwapOutlined />
                                            <div>
                                                <span>Ngày về</span>
                                                <p className="font-bold">
                                                    {tour.returnDate}
                                                </p>
                                            </div>
                                        </div>
                                        <Divider orientationMargin={"10px"} />
                                        <div>
                                            <p>{moneyFormatVND(tour.price)}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};
export default SearchTourPage;

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
`;
