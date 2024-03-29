import React from "react";
import { Tabs, TabsProps, Drawer } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useFormOfPayment } from "../../modules/useFormOfPayment";
import { IOrderDetail } from "@/models/management/booking/order.interface";
import FOPList from "./FOPList";
import FOPForm from "./FOPForm";

export interface DrawerFormOfPaymentProps {
    orderId: number;
    totalAmount: number;
    totalPaid: number;
    isOpen?: boolean;
    onClose?: () => void;
    fops: IOrderDetail["bookingOrder"]["fops"];
}

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
