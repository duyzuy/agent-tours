import { ColumnsType } from "antd/es/table";
import { IRolesPermissionsRs } from "@/models/management/role.interface";
import { Tag } from "antd";
import { IRuleAndPolicy } from "@/models/ruleAndPolicy.interface";
import { moneyFormatVND } from "@/utils/helper";
export const columns: ColumnsType<IRuleAndPolicy> = [
    {
        title: "#ID",
        key: "id",
        dataIndex: "id",
        width: 80,
    },
    {
        title: "Loại chính sách",
        key: "type",
        dataIndex: "type",
        width: 150,
        render(soTien, record) {
            return (
                <div>
                    <span className="block">{record.typeName}</span>
                    <span className="text-xs">{record.type}</span>
                </div>
            );
        },
    },
    {
        title: "Loại áp dụng",
        key: "cat",
        dataIndex: "cat",
        width: 150,
    },
    {
        title: "Nguyên tắc",
        key: "ruleName",
        dataIndex: "ruleName",
        width: 150,
    },
    {
        title: "Số tiền",
        key: "soTien",
        dataIndex: "soTien",
        render(soTien, record) {
            return moneyFormatVND(soTien);
        },
        width: 150,
    },
    {
        title: "Số ngày",
        key: "soNgay",
        dataIndex: "soNgay",
        width: 150,
    },
    {
        title: "Số giờ",
        key: "soGio",
        dataIndex: "soGio",
        width: 150,
    },
];
