import React, { memo, useState } from "react";
import { Button, Row, Col } from "antd";
import classNames from "classnames";
import { EditOutlined } from "@ant-design/icons";
import { IOrderDetail } from "@/models/management/booking/order.interface";
import { IBookingOrderCustomerPayload } from "../../../modules/bookingOrder.interface";
import DrawerCustomerInformation, {
    DrawerCustomerInformationProps,
} from "./DrawerCustomerInformation";

interface CustomerInformationProps {
    bookingOrder: IOrderDetail["bookingOrder"];
    className?: string;
    onSave?: (payload: IBookingOrderCustomerPayload, cb?: () => void) => void;
}
const CustomerInformation: React.FC<CustomerInformationProps> = ({
    bookingOrder,
    className = "",
    onSave,
}) => {
    const [showDrawer, setShowDrawer] = useState(false);
    const [record, setRecord] = useState<IOrderDetail["bookingOrder"]>();

    const onEditCustomerInfo = (record: IOrderDetail["bookingOrder"]) => {
        setShowDrawer(true);
        setRecord(record);
    };

    const onCancelEditCustomerInfo = () => {
        setShowDrawer(false);
        setRecord(undefined);
    };

    const handleSubmitCustomerInfo: DrawerCustomerInformationProps["onSubmit"] =
        (data) => {
            onSave?.({ bookingOrder: { ...data } }, () => {
                setShowDrawer(false);
                setRecord(undefined);
            });
        };

    return (
        <>
            <div
                className={classNames("order__detail-customer-info", {
                    [className]: className,
                })}
            >
                <div className="order__detail-customer-info-head mb-2">
                    <span className="font-semibold text-[16px] mr-3">
                        Thông tin người đặt
                    </span>
                    <Button
                        icon={<EditOutlined />}
                        type="primary"
                        ghost
                        size="small"
                        onClick={() => onEditCustomerInfo(bookingOrder)}
                    >
                        Sửa
                    </Button>
                </div>
                <Row gutter={16}>
                    <Col span={8} className="mb-3">
                        <div className="">
                            <span className="block text-xs">Họ và tên</span>
                            <span className="font-[500]">
                                {bookingOrder.custName}
                            </span>
                        </div>
                    </Col>
                    <Col span={8} className="mb-3">
                        <div className="">
                            <span className="block text-xs">Email</span>
                            <span className="font-[500]">
                                {bookingOrder.custEmail}
                            </span>
                        </div>
                    </Col>
                    <Col span={8} className="mb-3">
                        <div className="">
                            <span className="block text-xs">Số điện thoại</span>
                            <span className="font-[500]">
                                {bookingOrder.custPhoneNumber}
                            </span>
                        </div>
                    </Col>
                    <Col span={8} className="mb-3">
                        <div className="">
                            <span className="block text-xs">Địa chỉ</span>
                            <span className="font-[500]">
                                {bookingOrder.custAddress}
                            </span>
                        </div>
                    </Col>
                    <Col span={8} className="mb-3">
                        <div className="">
                            <span className="block text-xs">Ghi chú</span>
                            <span className="font-[500]">
                                {bookingOrder.rmk}
                            </span>
                        </div>
                    </Col>
                </Row>
            </div>
            <DrawerCustomerInformation
                isOpen={showDrawer}
                initialValues={record}
                onClose={onCancelEditCustomerInfo}
                onSubmit={handleSubmitCustomerInfo}
            />
        </>
    );
};
export default memo(CustomerInformation);
