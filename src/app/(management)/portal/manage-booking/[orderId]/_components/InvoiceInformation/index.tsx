import React, { memo, useState } from "react";
import { Button, Row, Col } from "antd";
import classNames from "classnames";
import { EditOutlined } from "@ant-design/icons";
import { BookingOrderInvoiceFormData } from "../../../modules/bookingOrder.interface";
import DrawerInvoiceInformation, {
    DrawerInvoiceInformationProps,
} from "./DrawerInvoiceInformation";
import {
    InvoiceFormData,
    IInvoice,
} from "@/models/management/booking/invoice.interface";
import { ButtonSecondary } from "@/components/base/buttons";

interface InvoiceInformationProps {
    className?: string;
    invoiceInfo?: Partial<IInvoice>;
    orderId?: number;
    onSave?: (formData: BookingOrderInvoiceFormData, cb?: () => void) => void;
}
const InvoiceInformation: React.FC<InvoiceInformationProps> = ({
    orderId,
    invoiceInfo,
    className = "",
    onSave,
}) => {
    const [showDrawer, setShowDrawer] = useState(false);
    const onCloseDrawer = () => setShowDrawer(false);
    const onOpenDrawer = () => setShowDrawer(true);
    const handleUpdate: DrawerInvoiceInformationProps["onSubmit"] = (data) => {
        orderId &&
            onSave?.({ ...data, recId: orderId }, () => {
                setShowDrawer(false);
            });
    };

    return (
        <>
            <div
                className={classNames("order__detail-invoice-info", {
                    [className]: className,
                })}
            >
                <div className="order__detail-invoice-info-head mb-2">
                    <span className="font-semibold text-[16px] mr-3">
                        Thông xuất hoá đơn
                    </span>

                    <ButtonSecondary
                        buttonProps={{
                            icon: <EditOutlined />,
                            size: "small",
                            shape: "circle",
                        }}
                        color="primary"
                        onClick={onOpenDrawer}
                    ></ButtonSecondary>
                </div>
                <Row gutter={16}>
                    <Col span={12} className="mb-3">
                        <div className="">
                            <span className="block text-xs">Họ và tên</span>
                            <span className="font-[500]">
                                {invoiceInfo?.invoiceName}
                            </span>
                        </div>
                    </Col>
                    <Col span={12} className="mb-3">
                        <div className="">
                            <span className="block text-xs">Email</span>
                            <span className="font-[500]">
                                {invoiceInfo?.invoiceEmail}
                            </span>
                        </div>
                    </Col>
                    <Col span={12} className="mb-3">
                        <div className="">
                            <span className="block text-xs">Tên công ty</span>
                            <span className="font-[500]">
                                {invoiceInfo?.invoiceCompanyName}
                            </span>
                        </div>
                    </Col>
                    <Col span={12} className="mb-3">
                        <div className="">
                            <span className="block text-xs">Mã số thuế</span>
                            <span className="font-[500]">
                                {invoiceInfo?.invoiceTaxCode}
                            </span>
                        </div>
                    </Col>
                    <Col span={12} className="mb-3">
                        <div className="">
                            <span className="block text-xs">Địa chỉ</span>
                            <span className="font-[500]">
                                {invoiceInfo?.invoiceAddress}
                            </span>
                        </div>
                    </Col>
                </Row>
            </div>
            <DrawerInvoiceInformation
                isOpen={showDrawer}
                orderId={orderId}
                initialValues={invoiceInfo}
                onClose={onCloseDrawer}
                onSubmit={handleUpdate}
            />
        </>
    );
};
export default memo(InvoiceInformation);
