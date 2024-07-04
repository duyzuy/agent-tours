import React from "react";
import { Drawer } from "antd";

import { useFormOfPayment } from "../../../modules/useFormOfPayment";
import FOPList from "../FOPList";
import { FOP_TYPE } from "@/models/management/core/formOfPayment.interface";
import { useGetFormOfPaymentListByOrderIdCoreQuery } from "@/queries/core/bookingOrder";
import { FormOfPaymmentQueryParams } from "@/models/management/core/formOfPayment.interface";
import { isUndefined } from "lodash";
import { FOPFormData } from "../../../modules/formOfPayment.interface";

export interface DrawerPaymentListProps {
    orderId?: number;
    totalAmount?: number;
    totalPaid?: number;
    isOpen?: boolean;
    onClose?: () => void;
    formOfPaymentType: FOPFormData["type"];
}

const DrawerPaymentList: React.FC<DrawerPaymentListProps> = ({
    isOpen = false,
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
            enabled:
                !isUndefined(orderId) &&
                !isUndefined(formOfPaymentType) &&
                isOpen,
        });

    const { onApproval, onDelete } = useFormOfPayment();

    return (
        <Drawer
            title={
                (formOfPaymentType === FOP_TYPE.PAYMENT &&
                    "Lịch sử thanh toán") ||
                (formOfPaymentType === FOP_TYPE.REFUND &&
                    "Lịch sử hoàn tiền") ||
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
            <FOPList
                items={fopList || []}
                onApproval={onApproval}
                onDelete={onDelete}
                totalPaid={totalPaid}
                totalAmount={totalAmount}
                loading={isLoading}
            />
        </Drawer>
    );
};
export default DrawerPaymentList;
