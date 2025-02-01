import { Drawer, Row, Col, Form, Input, Space, Button, Divider, Empty } from "antd";
import OperationDutyList, { OperationDutyListProps } from "./OperationDutyList";
import { TourLeader, UpdateOperationDutyPayload } from "@/models/management/core/operation/operationDuty.interface";
import { useState } from "react";
import useMessage from "@/hooks/useMessage";
import { updateOperationDutySchema } from "../../../../schema/operation.schema";
import { DeleteOutlined } from "@ant-design/icons";

type OperationUpdateDutyFormData = { sellableId: number; suppliers: (TourLeader & { rmk: string })[] };

interface TourLeaderFormDrawerProps {
  sellableId: number;
  maximumDutyAmount: number;
  onSubmit?: (formData: UpdateOperationDutyPayload) => void;
  open?: boolean;
  onCancel?: () => void;
}
const TourLeaderFormDrawer: React.FC<TourLeaderFormDrawerProps> = ({
  open,
  onCancel,
  sellableId,
  maximumDutyAmount,
  onSubmit,
}) => {
  const [formData, setFormdata] = useState<OperationUpdateDutyFormData>({
    sellableId,
    suppliers: [],
  });
  const message = useMessage();

  const addTourLeader: OperationDutyListProps["onSelect"] = (data) => {
    if (formData.suppliers.length >= maximumDutyAmount) {
      message.info(`Hiện tại chỉ cho tối đa ${maximumDutyAmount} tour leader.`);
      return;
    }

    setFormdata((prev) => {
      const { suppliers } = prev;
      let newSuppliers = [...suppliers];
      const indexSup = suppliers.findIndex((item) => item.supplier.recId === data.supplier.recId);

      if (indexSup !== -1) {
        newSuppliers.splice(indexSup, 1);
      } else {
        newSuppliers = [...suppliers, { ...data, rmk: "" }];
      }
      return {
        ...prev,
        suppliers: newSuppliers,
      };
    });
  };
  const removeTourLeader = (recId: number) => {
    setFormdata((prev) => {
      const { suppliers } = prev;
      let newSuppliers = [...suppliers];
      const indexSup = suppliers.findIndex((item) => item.supplier.recId === recId);

      if (indexSup !== -1) {
        newSuppliers.splice(indexSup, 1);
      }
      return {
        ...prev,
        suppliers: newSuppliers,
      };
    });
  };

  const onChangeNote = (recId: number, rmk: string) => {
    setFormdata((prev) => {
      const { suppliers } = prev;
      let newSuppliers = [...suppliers];
      const indexSup = suppliers.findIndex((item) => item.supplier.recId === recId);

      if (indexSup !== -1) {
        newSuppliers.splice(indexSup, 1, {
          ...suppliers[indexSup],
          rmk,
        });
      }
      return {
        ...prev,
        suppliers: newSuppliers,
      };
    });
  };

  const handleSaveOperationDuty = (data: OperationUpdateDutyFormData) => {
    let updatePayload: Partial<UpdateOperationDutyPayload> = {};
    const supplierIdsAndNotes = data.suppliers.reduce<{ remark: string; supplierId: number }[]>((acc, item) => {
      acc = [...acc, { supplierId: item.supplier.recId, remark: item.rmk || "" }];
      return acc;
    }, []);

    updateOperationDutySchema
      .validate({ sellableId: data.sellableId, suppliers: supplierIdsAndNotes })
      .then((schema) => {
        onSubmit?.({ sellableId: schema.sellableId, suppliers: schema.suppliers });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Drawer
      open={open}
      width={550}
      onClose={onCancel}
      title="Thêm tour leader"
      footer={
        <Space className="py-3">
          <Button type="primary" className="w-28" onClick={() => handleSaveOperationDuty(formData)}>
            Lưu
          </Button>
          <Button className="w-28">Huỷ bỏ</Button>
        </Space>
      }
    >
      <p className="mb-3 font-semibold">Danh sách tour leader</p>
      <OperationDutyList
        values={formData.suppliers.map((supplier) => supplier.supplier.recId)}
        onSelect={addTourLeader}
      />
      <div className="h-8"></div>
      <p className="mb-3 font-semibold">Thông tin tour leader</p>
      {formData.suppliers.length ? (
        <div className="grid lg:grid-cols-2 gap-4">
          {formData.suppliers.map(({ supplier, rmk }) => (
            <div key={supplier.recId} className="border rounded-md p-4">
              <div className="flex justify-between mb-3">
                <div className="name">
                  <div>{supplier.fullname}</div>
                  <div className="text-xs text-gray-600">{supplier.shortname}</div>
                </div>
                <Space>
                  <Button
                    size="small"
                    icon={<DeleteOutlined />}
                    type="text"
                    className="!bg-red-100 !text-red-600"
                    shape="circle"
                    onClick={() => removeTourLeader(supplier.recId)}
                  />
                </Space>
              </div>
              <div className="item-note">
                <Form layout="vertical">
                  <Input.TextArea
                    value={rmk}
                    cols={3}
                    rows={2}
                    placeholder="Ghi chú"
                    className="!resize-none"
                    onChange={(evt) => onChangeNote(supplier.recId, evt.target.value)}
                  />
                </Form>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Hiện chưa có tour leader" />
      )}
    </Drawer>
  );
};
export default TourLeaderFormDrawer;
