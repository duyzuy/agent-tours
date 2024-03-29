import { ColumnsType } from "antd/es/table";
import { moneyFormatVND } from "@/utils/helper";
import { Tag } from "antd";
import { PaymentStatus, Status } from "@/models/management/common.interface";
import { formatDate } from "@/utils/date";
import { IFormOfPaymentListRs } from "@/models/management/core/formOfPayment.interface";
import Link from "next/link";

export const columnsFOPs: ColumnsType<IFormOfPaymentListRs["result"][0]> = [
    {
        title: "#ID",
        dataIndex: "recId",
        key: "recId",
        width: 80,
    },
    {
        title: "Loại",
        dataIndex: "type",
        key: "type",
        width: 140,
        render(value, record, index) {
            return (
                <div>
                    <span className="block mb-1">{record.type}</span>
                    <span className="block text-xs mb-2">{record.fopType}</span>
                    <Link
                        href={`./portal/manage-booking/${record.orderId}`}
                        className="block text-xs"
                    >
                        <span>Chi tiết đặt chỗ</span>
                    </Link>
                </div>
            );
        },
    },
    {
        title: "Người thanh toán",
        dataIndex: "fopDocument",
        key: "fopDocument",
        width: 160,
        render(value, record, index) {
            return (
                <div>
                    <span className="block">{record.payer}</span>
                </div>
            );
        },
    },

    {
        title: "Số tiền thanh toán",
        dataIndex: "amount",
        key: "amount",
        width: 180,
        render: (_, record) => {
            return <>{moneyFormatVND(record.amount)}</>;
        },
    },
    {
        title: "Ghi chú",
        dataIndex: "rmk",
        key: "rmk",
        width: 100,
        render(value, record, index) {
            return (
                <div>
                    <span className="block">{record.rmk}</span>
                </div>
            );
        },
    },
    {
        title: "Trạng thái",
        dataIndex: "paymentStatus",
        key: "paymentStatus",
        width: 120,
        render(value, record, index) {
            return (
                <>
                    {(record.status === Status.OK && (
                        <Tag color="green">Đã duyệt</Tag>
                    )) ||
                        (record.status === Status.QQ && (
                            <Tag color="orange">Chờ duyệt</Tag>
                        )) || <Tag color="red">Đã huỷ</Tag>}
                </>
            );
        },
    },
    {
        title: "Ngày tạo",
        dataIndex: "sysFstUpdate",
        key: "sysFstUpdate",
        width: 160,
        render: (sysFstUpdate, record) => {
            return <>{formatDate(sysFstUpdate)}</>;
        },
    },
];
