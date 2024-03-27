import { useEffect, useState } from "react";
import { Drawer, Space, Button, Form, Row, Col, Input, Select } from "antd";
import { FOPFormData } from "../../modules/formOfPayment.interface";
import { useFormOfPayment } from "../../modules/useFormOfPayment";
import { Tabs, TabsProps } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { IOrderDetail } from "@/models/management/booking/order.interface";
import FOPList from "./FOPList";
import FOPForm from "./FOPForm";

export interface DrawerFormOfPaymentProps {
    orderId: number;
    totalAmount: number;
    totalPaid: number;
    isOpen?: boolean;
    onClose?: () => void;
    fops: IOrderDetail["fops"];
}
type TFormData = Required<FOPFormData>;
const DrawerFormOfPayment: React.FC<DrawerFormOfPaymentProps> = ({
    isOpen,
    totalAmount,
    totalPaid,
    onClose,
    orderId,
    fops,
}) => {
    const { onCreateFormOfPayment, onApproval, onDelete } = useFormOfPayment();

    const items: TabsProps["items"] = [
        {
            key: "fopList",
            label: "Danh sách phiếu thu",
            children: (
                <FOPList
                    items={fops}
                    onApproval={onApproval}
                    onDelete={onDelete}
                    totalPaid={totalPaid}
                    totalAmount={totalAmount}
                />
            ),
        },
        {
            key: "fopCreate",
            label: "Thêm phiếu thu",
            children: (
                <FOPForm
                    orderId={orderId}
                    onSubmitForm={onCreateFormOfPayment}
                />
            ),
            icon: <PlusOutlined />,
        },
    ];
    return (
        <Drawer
            title={`Phiếu thu`}
            width={750}
            onClose={onClose}
            open={isOpen}
            styles={{
                body: {
                    paddingBottom: 80,
                },
            }}
        >
            <Tabs defaultActiveKey="fopList" items={items} />
        </Drawer>
    );
};
export default DrawerFormOfPayment;
