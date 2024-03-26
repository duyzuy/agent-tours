import { ColumnsType } from "antd/es/table";
import { moneyFormatVND } from "@/utils/helper";
import { ReservationRs } from "@/models/management/booking/reservation.interface";
import { Tag } from "antd";
import { IOrderListRs } from "@/models/management/booking/order.interface";
import { PaymentStatus } from "@/models/management/common.interface";

export const columnsOrderList: ColumnsType<IOrderListRs["result"][0]> = [
    {
        title: "#ID",
        dataIndex: "recId",
        key: "recId",
        width: 80,
    },
    {
        title: "Tên template sellable",
        dataIndex: "recId",
        key: "recId",
        width: 320,
        render(value, record, index) {
            return <>{record.template.name}</>;
        },
    },
    {
        title: "Sellable code",
        dataIndex: "recId",
        key: "recId",
        width: 160,
        render(value, record, index) {
            return <>{record.sellable.code}</>;
        },
    },
    {
        title: "Người đặt",
        dataIndex: "custName",
        key: "custName",
        width: 120,
    },
    {
        title: "Tổng tiền",
        dataIndex: "totalAmount",
        key: "totalAmount",
        width: 180,
        render: (_, record) => {
            return <>{moneyFormatVND(record.totalAmount)}</>;
        },
    },
    {
        title: "Trạng thái",
        dataIndex: "paymentStatus",
        key: "paymentStatus",
        width: 160,
        render(value, record, index) {
            return (
                <>
                    {(record.paymentStatus === PaymentStatus.PAID && (
                        <Tag color="green">Đã thanh toán</Tag>
                    )) ||
                        (record.paymentStatus === PaymentStatus.DEPOSITED && (
                            <Tag color="blue">Thanh toán 1 phần</Tag>
                        )) || <Tag color="red">Chưa thanh toán</Tag>}
                </>
            );
        },
    },
];
