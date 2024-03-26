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
        title: "Loại",
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
