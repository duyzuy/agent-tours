import IconPaylater from "@/assets/icons/IconPaylater";
import IconCreditCard from "@/assets/icons/IconCreditCard";
import { Col, Row } from "antd";
const PaymentMethod = () => {
    return (
        <div className="payment__methods-body px-6 pb-6">
            <Row gutter={24}>
                <Col span={8}>
                    <div className="method-item border px-3 py-3 rounded-md bg-slate-50 border-primary-default drop-shadow-sm mb-3">
                        <div className="method-item-inner">
                            <div className="flex">
                                <span className="mr-2">
                                    <IconPaylater
                                        width={24}
                                        height={24}
                                        stroke="none"
                                    />
                                </span>
                                <span className="block">
                                    Thanh toán tại Anthai Travel
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="method-item border px-3 py-3 rounded-md drop-shadow-sm mb-3">
                        <div className="method-item-inner">
                            <div className="flex">
                                <span className="mr-2">
                                    <IconCreditCard
                                        width={24}
                                        height={24}
                                        stroke="none"
                                    />
                                </span>
                                <span className="block">
                                    Thanh toán tại địa chỉ liên hệ
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="method-item border px-3 py-3 rounded-md drop-shadow-sm mb-3">
                        <div className="method-item-inner">
                            <div className="flex">
                                <span className="mr-2">
                                    <IconCreditCard
                                        width={24}
                                        height={24}
                                        stroke="none"
                                    />
                                </span>
                                <span className="block">
                                    Chuyển khoản thanh toán
                                </span>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col span={16}>
                    <div>
                        <div className="head mb-6">
                            <p className="text-lg">
                                Thanh toán tại Anthai Travel
                            </p>
                        </div>
                        <div className="">
                            <div className=" mb-3">
                                <span>Địa chỉ 1:</span>
                                <ul>
                                    <li>
                                        TP.HCM Tầng 1, 82 Võ Văn Tần, Phường Võ
                                        Thị Sáu, Quận 3
                                    </li>
                                    <li className="text-blue-600">
                                        xem bản đồ
                                    </li>
                                </ul>
                            </div>
                            <div className="">
                                <span>Địa chỉ 2:</span>
                                <ul>
                                    <li>
                                        Hà Nội Tầng 4, 9 Đào Duy Anh, Quận Đống
                                        Đa, Hà Nội
                                    </li>
                                    <li className="text-blue-600">
                                        xem bản đồ
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="hidden">
                            <p className="text-primary-default font-[500]">
                                Thông tin tài khoản: TP.HCM
                            </p>
                            <ul>
                                <li>Công Ty TNHH Du Lịch ABC</li>
                                <li>Số tài khoản VND: 106 1060 8888 888</li>
                                <li>
                                    Ngân hàng Techcombank - Chi nhánh Tân Bình
                                </li>
                                <li>Số tài khoản VND: 007 100 888 8888</li>
                                <li>Ngân hàng Vietcombank Tp. Hồ Chí Minh</li>
                            </ul>
                        </div>
                        <div className="hidden">
                            <p className="text-primary-default font-[500]">
                                Anthai Travel sẽ xác nhận và đến thu tiền trực
                                tiếp tại địa chỉ của Quý khách.
                            </p>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    );
};
export default PaymentMethod;
