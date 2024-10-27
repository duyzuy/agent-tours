import { IOperationCosting } from "@/models/management/core/operationCosting.interface";
import { ISupplier } from "@/models/management/supplier.interface";
import { useGetSupplierDetailCoreQuery } from "@/queries/core/supplier";
import { moneyFormatVND } from "@/utils/helper";
import { DeleteOutlined, EyeOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Spin } from "antd";

export interface CostingBoxListProps {
  items: IOperationCosting[];
  loading?: boolean;
  onView?: (supplier: ISupplier, data: IOperationCosting) => void;
  onAdd?: (data: IOperationCosting) => void;
  onDelete?: (data: IOperationCosting) => void;
}
const CostingBoxList: React.FC<CostingBoxListProps> = ({ items, loading, onView, onDelete }) => {
  if (loading) {
    return <Spin />;
  }

  return (
    <div className="costing-list">
      <div className="flex gap-3 bg-gray-100 rounded-t-md p-4 mb-3">
        <div className="w-[80px] font-semibold">ID</div>
        <div className="w-[250px] font-semibold">Nhà cung cấp</div>
        <div className="w-[160px] font-semibold">Dịch vụ</div>
        <div className="w-[200px] font-semibold">Tổng tiền</div>
        <div className="w-[150px] font-semibold">Trạng thái</div>
        <div className="action"></div>
      </div>
      {items.map((item) => (
        <CostingItem
          key={item.id}
          id={item.id}
          operationId={item.operationId}
          supplierId={item.supplierId}
          type={item.type}
          totalCost={item.totalCost}
          status={item.status}
          onView={(supplier) => onView?.(supplier, item)}
          onDelete={() => onDelete?.(item)}
          // onAdd={() => onAdd?.(item)}
        />
      ))}
    </div>
  );
};
export default CostingBoxList;

interface ICostingItemProps {
  id: number;
  operationId: number;
  supplierId: number;
  type: string;
  totalCost: number;
  status: string;
  onView?: (data: ISupplier) => void;
  onAdd?: () => void;
  onDelete?: () => void;
}
const CostingItem: React.FC<ICostingItemProps> = ({
  id,
  supplierId,
  type,
  totalCost,
  operationId,
  status,
  onView,
  onAdd,
  onDelete,
}) => {
  const { data, isLoading } = useGetSupplierDetailCoreQuery({ recId: supplierId, enabled: true });

  return (
    <div className="costing-item border-b mb-3 p-4 flex gap-3">
      <div className="w-[80px]">{`#${id}`}</div>
      <div className="w-[250px]">
        {isLoading ? (
          <Spin />
        ) : (
          <div>
            <p>{data?.fullName}</p>
            <p className="text-gray-600 text-xs">{data?.shortName}</p>
          </div>
        )}
      </div>
      <div className="w-[160px]">{type}</div>
      <div className="w-[200px]">
        <span className="text-blue-600">{moneyFormatVND(totalCost)}</span>
      </div>
      <div className="w-[150px]">{status}</div>
      <div>
        <Button
          type="text"
          size="small"
          onClick={() => data && onView?.(data)}
          icon={<EyeOutlined />}
          className="!text-primary-default"
        >
          Xem
        </Button>
        <Popconfirm
          title="Xoá"
          description="Bạn muốn xoá loại dịch vụ này?"
          icon={<QuestionCircleOutlined style={{ color: "red" }} />}
          onConfirm={onDelete}
        >
          <Button type="text" danger size="small" icon={<DeleteOutlined />}>
            Xoá
          </Button>
        </Popconfirm>
      </div>
    </div>
  );
};
