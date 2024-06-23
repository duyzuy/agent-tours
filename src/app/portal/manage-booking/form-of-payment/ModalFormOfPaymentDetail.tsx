import React from "react";
import { Modal, Row, Col } from "antd";
import { moneyFormatVND } from "@/utils/helper";
import { formatDate } from "@/utils/date";
import { Status } from "@/models/common.interface";
import { IFormOfPayment } from "@/models/management/core/formOfPayment.interface";
interface ModalDetailFOPProps {
    onConfirm?: () => void;
    onCancel?: () => void;
    isShowModal: boolean;
    title?: string;
    descriptions?: string;
    confirmLoading?: boolean;
    data?: IFormOfPayment;
}
const ModalFormOfPaymentDetail: React.FC<ModalDetailFOPProps> = ({
    onConfirm,
    isShowModal,
    onCancel,
    title = "Chi tiết phiếu thu",
    data,
}) => {
    return (
        <Modal open={isShowModal} onCancel={onCancel} footer={null} width={450}>
            <div className="body py-4">
                <div className="text-center font-[500] text-lg mb-6">
                    <p>{title}</p>
                </div>
                <div className="content py-2">
                    <Row gutter={[16, 16]}>
                        <Col span={12}>
                            <div>
                                <span className="block text-xs">Order id</span>
                                <span className="font-[500]">
                                    {data?.orderId}
                                </span>
                            </div>
                        </Col>
                        <Col span={12}>
                            <div>
                                <span className="block text-xs">
                                    Người thanh toán
                                </span>
                                <span className="font-[500]">
                                    {data?.payer}
                                </span>
                            </div>
                        </Col>
                        <Col span={12}>
                            <div>
                                <span className="block text-xs">Loại</span>
                                <span className="font-[500]">{data?.type}</span>
                            </div>
                        </Col>
                        <Col span={12}>
                            <div>
                                <span className="block text-xs">Hình thức</span>
                                <span className="font-[500]">
                                    {data?.fopType}
                                </span>
                            </div>
                        </Col>
                        <Col span={12}>
                            <div>
                                <span className="block text-xs">Số tiền</span>
                                <span className="text-primary-default font-[500]">
                                    {moneyFormatVND(data?.amount)}
                                </span>
                            </div>
                        </Col>
                        <Col span={12}>
                            <div>
                                <span className="block text-xs">
                                    Thông tin thanh toán
                                </span>
                                <span className="font-[500]">
                                    {data?.fopDocument}
                                </span>
                            </div>
                        </Col>
                        <Col span={12}>
                            <div>
                                <span className="block text-xs">Ghi chú</span>
                                <span className="font-[500]">{data?.rmk}</span>
                            </div>
                        </Col>
                        <Col span={12}>
                            <div>
                                <span className="block text-xs">
                                    Trạng thái
                                </span>
                                <span className="font-[500]">
                                    {(data?.status === Status.OK &&
                                        "Đã duyệt") ||
                                        (data?.status === Status.QQ &&
                                            "Chờ duyệt") ||
                                        (data?.status === Status.XX &&
                                            "Đã huỷ") ||
                                        (data?.status === Status.OX &&
                                            "Đang chờ") ||
                                        "Không xác định"}
                                </span>
                            </div>
                        </Col>
                        <Col span={12}>
                            <div>
                                <span className="block text-xs">Ngày tạo</span>
                                <span className="font-[500]">
                                    {data?.sysFstUpdate &&
                                        formatDate(data?.sysFstUpdate)}
                                </span>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        </Modal>
    );
};
export default ModalFormOfPaymentDetail;
