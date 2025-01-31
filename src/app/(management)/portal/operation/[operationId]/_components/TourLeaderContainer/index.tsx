import { useState } from "react";
import OperationDutyList, { OperationDutyListProps } from "./OperationDutyList";
import useUpdateOperationDuty from "../../../modules/useUpdateOperationDuty";
import { TourLeader, UpdateOperationDutyPayload } from "@/models/management/core/operation/operationDuty.interface";
import { Button, Col, Divider, Empty, Form, Input, Modal, Popconfirm, Row, Space, Table } from "antd";
import useMessage from "@/hooks/useMessage";
import { DeleteOutlined, EditOutlined, PlusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { useForm, Control } from "react-hook-form";
import { updateOperationDutySchema } from "../../../schema/operation.schema";
import TourLeaderFormDrawer from "./TourLeaderFormDrawer";

interface TourLeaderContainerProps {
  sellableId: number;
  maximumDutyAmount: number;
  dutyBookingList: any;
}

type OperationUpdateDutyFormData = { sellableId: number; suppliers: (TourLeader & { rmk: string })[] };

const TourLeaderContainer: React.FC<TourLeaderContainerProps> = ({
  sellableId,
  maximumDutyAmount,
  dutyBookingList,
}) => {
  const [showFormDrawer, setShowFormDrawer] = useState(false);
  const message = useMessage();

  const [formData, setFormdata] = useState<OperationUpdateDutyFormData>({
    sellableId,
    suppliers: [],
  });

  const { mutate: update, isPending } = useUpdateOperationDuty();

  return (
    <div className="pt-6">
      <div className="flex gap-x-3 mb-6">
        <h3 className="text-lg font-semibold">Tour leader</h3>
        <Button size="small" type="primary" ghost onClick={() => setShowFormDrawer(true)} icon={<PlusOutlined />}>
          Thêm
        </Button>
      </div>
      <p className="mb-6">{`Tối đa ${maximumDutyAmount} Tour leader có thể chọn.`}</p>
      <TourLeaderFormDrawer
        sellableId={sellableId}
        maximumDutyAmount={maximumDutyAmount}
        open={showFormDrawer}
        onCancel={() => setShowFormDrawer(false)}
      />
      <Table
        dataSource={dutyBookingList}
        columns={[
          {
            title: "#ID",
            dataIndex: "dutyBookingId",
            width: 80,
          },
          {
            title: "Họ và tên",
            dataIndex: "",
            width: 250,
          },
          {
            title: "Ghi chú",
            dataIndex: "remark",
            width: 300,
          },
          {
            title: "Trạng thái",
            dataIndex: "status",
          },
          {
            title: "",
            width: 120,
            render(value, record, index) {
              return (
                <Popconfirm title="Xoá" description="Bạn chắc chắn muốn xoá!" okText="Đồng ý" cancelText="Đóng">
                  <Button size="small" type="text" className="!bg-red-50 !text-red-600" icon={<DeleteOutlined />}>
                    Xoá
                  </Button>
                </Popconfirm>
              );
            },
          },
        ]}
        pagination={{ hideOnSinglePage: true }}
      />
    </div>
  );
};
export default TourLeaderContainer;
