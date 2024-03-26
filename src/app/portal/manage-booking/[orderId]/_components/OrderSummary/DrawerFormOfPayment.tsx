import { useEffect, useState } from "react";
import { Drawer, Space, Button, Form, Row, Col, Input, Select } from "antd";
import FormItem from "@/components/base/FormItem";

import {
    FOP_PAYMENT_TYPE_LIST,
    FOP_TYPE_LIST,
} from "../../modules/formOfPayment.interface";
import TextArea from "antd/es/input/TextArea";
import { FOPFormData } from "../../modules/formOfPayment.interface";
import { HandleSubmit, useFormSubmit } from "@/hooks/useFormSubmit";
import { formOfPaymentSchema } from "../../schema/formOfPayment";
import { useFormOfPayment } from "../../modules/useFormOfPayment";
import { Tabs, TabsProps } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { IOrderDetail } from "@/models/management/booking/order.interface";
import { moneyFormat } from "@/utils/common";
import { moneyFormatVND } from "@/utils/helper";
import FOPList from "./FOPList";
import FOPForm from "./FOPForm";

export interface DrawerFormOfPaymentProps {
    orderId: number;
    isOpen?: boolean;
    onClose?: () => void;
    fops: IOrderDetail["fops"];
}
type TFormData = Required<FOPFormData>;
const DrawerFormOfPayment: React.FC<DrawerFormOfPaymentProps> = ({
    isOpen,
    onClose,
    orderId,
    fops,
}) => {
    const { onCreateFormOfPayment, onApproval } = useFormOfPayment();

    const items: TabsProps["items"] = [
        {
            key: "fopList",
            label: "Danh sách phiếu thu",
            children: <FOPList items={fops} onApproval={onApproval} />,
        },
        {
            key: "fopcreate",
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
