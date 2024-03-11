import { ColumnsType } from "antd/es/table";
import { moneyFormatVND } from "@/utils/helper";
import { ReservationRs } from "@/models/management/booking/reservation.interface";
import { Tag } from "antd";

export const columnsOrderList: ColumnsType<ReservationRs["result"]> = [
    {
        title: "#ID",
        dataIndex: "recId",
        key: "recId",
        width: 80,
    },
    {
        title: "Họ và tên",
        dataIndex: "custName",
        key: "custName",
        width: 120,
    },
    {
        title: "Email",
        dataIndex: "custEmail",
        key: "custEmail",
        width: 120,
    },
    {
        title: "Tổng tiền",
        dataIndex: "totalAmount",
        key: "totalAmount",
        width: 200,
        render: (_, record) => {
            return <>{moneyFormatVND(record.totalAmount)}</>;
        },
    },
    {
        title: "Trạng thái thanh toán",
        dataIndex: "paymentStatus",
        key: "paymentStatus",
        width: 160,
        render(value, record, index) {
            return (
                <>
                    {(record.paymentStatus === "paid" && (
                        <Tag color="green">Đã thanh toán</Tag>
                    )) ||
                        (record.paymentStatus === "deposit" && (
                            <Tag color="blue">Thanh toán 1 phần</Tag>
                        )) || <Tag color="red">Chưa thanh toán</Tag>}
                </>
            );
        },
    },
];
