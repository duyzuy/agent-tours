import { OperationStatusResponse } from "@/models/management/core/operationStatus.interface";
import { Table } from "antd";
import { columns } from "./columns";
import { moneyFormatVND } from "@/utils/helper";

export interface OrderListProps {
  orderList?: OperationStatusResponse["result"]["orderList"];
  totalCosting?: OperationStatusResponse["result"]["totalCosting"];
  totalSale?: OperationStatusResponse["result"]["totalSale"];
}
const OrderList: React.FC<OrderListProps> = ({ orderList, totalCosting, totalSale }) => {
  return (
    <div className="order-list-container pt-6">
      <h3 className="text-lg font-semibold mb-6">Danh sách đơn hàng</h3>
      <Table rowKey={"id"} dataSource={orderList} columns={columns} pagination={{ hideOnSinglePage: true }} />
      <div className="h-8"></div>
      <div className="subtotal text-right">
        <div className="flex text-lg gap-x-3">
          <span className="inline-block">Tổng chi</span>
          <span className="inline-block text-red-600">{moneyFormatVND(totalCosting)}</span>
        </div>
        <div className="flex text-lg gap-x-3">
          <span className="inline-block">Tổng thu</span>
          <span className="inline-block text-emerald-600">{moneyFormatVND(totalSale)}</span>
        </div>
      </div>
    </div>
  );
};
export default OrderList;
