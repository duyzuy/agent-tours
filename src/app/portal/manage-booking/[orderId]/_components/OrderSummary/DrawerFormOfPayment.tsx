import React, { useMemo } from "react";
import { Tabs, TabsProps, Drawer } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useFormOfPayment } from "../../modules/useFormOfPayment";
import FOPList from "./FOPList";
import FOPForm from "./FOPForm";
import { FOP_TYPE } from "@/models/management/core/formOfPayment.interface";
import { FOPFormData } from "../../modules/formOfPayment.interface";
import { useGetFormOfPaymentListByOrderIdCoreQuery } from "@/queries/core/bookingOrder";

import { FormOfPaymmentQueryParams } from "@/models/management/core/formOfPayment.interface";
import { isUndefined } from "lodash";

export interface DrawerFormOfPaymentProps {
    orderId?: number;
    totalAmount?: number;
    totalPaid?: number;
    isOpen?: boolean;
    onClose?: () => void;
    formOfPaymentType: FOPFormData["type"];
}

const DrawerFormOfPayment: React.FC<DrawerFormOfPaymentProps> = ({
    isOpen,
    totalAmount,
    totalPaid,
    onClose,
    orderId,
    formOfPaymentType,
}) => {
    const queryParams = new FormOfPaymmentQueryParams(
        { orderId: orderId, type: formOfPaymentType },
        undefined,
        undefined,
    );
    const { data: fopList, isLoading } =
        useGetFormOfPaymentListByOrderIdCoreQuery({
            queryParams: queryParams,
            enabled: !isUndefined(orderId) && !isUndefined(formOfPaymentType),
        });

    const { onCreateFormOfPayment, onApproval, onDelete } = useFormOfPayment();

    const items: TabsProps["items"] = [
        {
            key: "fopList",
            label: "Danh sách",
            children: (
                <FOPList
                    items={fopList || []}
                    onApproval={onApproval}
                    onDelete={onDelete}
                    totalPaid={totalPaid}
                    totalAmount={totalAmount}
                />
            ),
        },
        {
            key: "fopCreate",
            label: "Thêm mới",
            children: (
                <FOPForm
                    orderId={orderId}
                    formOfPaymentType={FOP_TYPE.PAYMENT}
                    onSubmitForm={onCreateFormOfPayment}
                />
            ),
            icon: <PlusOutlined />,
        },
    ];

    return (
        <Drawer
            title={
                (formOfPaymentType === FOP_TYPE.PAYMENT && "Thanh toán") ||
                (formOfPaymentType === FOP_TYPE.REFUND && "Hoàn tiền") ||
                "--"
            }
            width={750}
            onClose={onClose}
            destroyOnClose={true}
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
