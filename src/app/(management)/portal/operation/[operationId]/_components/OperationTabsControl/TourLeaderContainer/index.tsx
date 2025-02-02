import { useState } from "react";
import { Button, Form, Input, Popconfirm, Popover, Space, Table, Tag } from "antd";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import useUpdateOperationDuty from "@/modules/admin/operation/hooks/useUpdateOperationDuty";
import useDeleteOperationDuty from "@/modules/admin/operation/hooks/useDeleteOperationDuty";
import TourLeaderSelectDrawer, { TourLeaderSelectDrawerProps } from "./TourLeaderSelectDrawer";
import { OperationStatusDetail } from "@/models/management/core/operationStatus.interface";
import FormItem from "@/components/base/FormItem";
import { updateOperationDutySchema } from "../../../../schema/operation.schema";

interface TourLeaderContainerProps {
  sellableId: number;
  maximumDutyAmount: number;
  dutyBookingList: OperationStatusDetail["dutyBookingList"];
}
type OperationDutyItem = Exclude<OperationStatusDetail["dutyBookingList"], null>[number];

type OperationUpdateDutyFormData = {
  sellableId: number;
  suppliers: { dutyBookingId: number; remark: string; supplierId: number; status: "OK" | "XX" }[];
};

const TourLeaderContainer: React.FC<TourLeaderContainerProps> = ({
  sellableId,
  maximumDutyAmount,
  dutyBookingList,
}) => {
  const [showFormDrawer, setShowFormDrawer] = useState(false);
  const [formData, setFormdata] = useState<OperationUpdateDutyFormData>({
    sellableId,
    suppliers: [],
  });
  const [openEditNote, setOpenEditNote] = useState(false);

  const { mutate: updateDuty, isPending: loadingUpdate } = useUpdateOperationDuty();
  const { mutate: deleteDuty, isPending: loadingDelete } = useDeleteOperationDuty();

  const openChangeNote = (newOpen: boolean, record: OperationDutyItem) => {
    setOpenEditNote(true);
    setFormdata((prev) => ({
      ...prev,
      suppliers: [
        {
          dutyBookingId: record.dutyBookingId,
          remark: record.remark,
          status: record.status,
          supplierId: record.supplier.recId,
        },
      ],
    }));
  };
  const hideChangeNote = () => {
    setOpenEditNote(false);
    setFormdata((prev) => ({
      sellableId,
      suppliers: [],
    }));
  };
  const handleChangeNote = (dutyBookingId: number, remark: string) => {
    setFormdata((prevData) => {
      const { suppliers } = prevData;

      const supplier = suppliers.find((item) => item.dutyBookingId === dutyBookingId);
      if (!supplier) return prevData;

      return {
        ...prevData,
        suppliers: [
          {
            ...supplier,
            remark: remark,
          },
        ],
      };
    });
  };
  const handleAddTourLeader: TourLeaderSelectDrawerProps["onSubmit"] = (data) => {
    updateOperationDutySchema
      .validate({ sellableId: data.sellableId, suppliers: data.suppliers })
      .then((schema) => {
        const supplier = schema.suppliers[0];
        updateDuty({
          sellableId: schema.sellableId,
          suppliers: [
            { supplierId: supplier.supplierId, remark: supplier.remark, dutyBookingId: supplier.dutyBookingId },
          ],
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleDeleteTourLeader = ({ dutyBookingId, supplierId }: { dutyBookingId: number; supplierId: number }) => {
    deleteDuty({ sellableId, dutyBookingId, supplierId }, { onSuccess(data, variables, context) {} });
  };
  const handleSaveRemark = () => {
    updateOperationDutySchema
      .validate({ sellableId: formData.sellableId, suppliers: formData.suppliers })
      .then((schema) => {
        const supplier = schema.suppliers[0];
        updateDuty(
          {
            sellableId: schema.sellableId,
            suppliers: [
              { supplierId: supplier.supplierId, remark: supplier.remark, dutyBookingId: supplier.dutyBookingId },
            ],
          },
          {
            onSuccess(data, variables, context) {
              hideChangeNote();
            },
          },
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="pt-6">
      <div className="flex gap-x-3 mb-6">
        <h3 className="text-lg font-semibold">Tour leader</h3>
        <Button size="small" type="primary" ghost onClick={() => setShowFormDrawer(true)} icon={<PlusOutlined />}>
          Thêm
        </Button>
      </div>
      <p className="mb-6">{`Tối đa ${maximumDutyAmount} Tour leader có thể chọn.`}</p>
      <Table
        rowKey="dutyBookingId"
        dataSource={dutyBookingList || []}
        pagination={{ hideOnSinglePage: true }}
        columns={[
          {
            title: "#ID",
            dataIndex: "dutyBookingId",
            width: 80,
          },
          {
            title: "Họ và tên",
            width: 250,
            render: (value, { supplier }, index) => (
              <>
                <div>{supplier.fullname}</div>
                <div className="text-xs opacity-60">{supplier.shortname}</div>
              </>
            ),
          },
          {
            title: "Ghi chú",
            width: 300,
            render: (value, record, index) => <div>{record.remark || "--"}</div>,
          },
          {
            title: "Trạng thái",
            width: 150,
            render: (value, { status }, index) => (
              <Tag color="green" bordered={false}>
                {status}
              </Tag>
            ),
          },
          {
            width: 120,
            render: (value, record, index) => (
              <Space>
                <Popover
                  trigger="click"
                  open={openEditNote && record.dutyBookingId === formData.suppliers[0].dutyBookingId}
                  onOpenChange={(open) => openChangeNote(open, record)}
                  content={
                    <Form layout="vertical" disabled={loadingUpdate} className="w-[240px]">
                      <FormItem label="Ghi chú">
                        <Input.TextArea
                          rows={3}
                          value={formData.suppliers[0]?.remark}
                          onChange={(evt) => handleChangeNote(record.dutyBookingId, evt.target.value)}
                          placeholder="Ghi chú"
                        />
                      </FormItem>
                      <Space>
                        <Button type="primary" size="small" onClick={handleSaveRemark} loading={loadingUpdate}>
                          Lưu
                        </Button>
                        <Button onClick={hideChangeNote} size="small">
                          Đóng
                        </Button>
                      </Space>
                    </Form>
                  }
                >
                  <Button
                    icon={<EditOutlined />}
                    type="text"
                    size="small"
                    shape="circle"
                    className="!bg-blue-50 !text-blue-600"
                  ></Button>
                </Popover>
                <Popconfirm
                  title="Xoá"
                  description="Bạn chắc chắn muốn xoá!"
                  okText="Đồng ý"
                  cancelText="Đóng"
                  onConfirm={() =>
                    handleDeleteTourLeader({
                      supplierId: record.supplier.recId,
                      dutyBookingId: record.dutyBookingId,
                    })
                  }
                >
                  <Button
                    size="small"
                    type="text"
                    className="!bg-red-50 !text-red-600"
                    shape="circle"
                    loading={loadingDelete}
                    icon={<DeleteOutlined />}
                  />
                </Popconfirm>
              </Space>
            ),
          },
        ]}
      />
      <TourLeaderSelectDrawer
        sellableId={sellableId}
        supplierIds={dutyBookingList?.map((item) => item.supplier.recId)}
        maximumDutyAmount={maximumDutyAmount}
        open={showFormDrawer}
        onCancel={() => setShowFormDrawer(false)}
        onSubmit={handleAddTourLeader}
      />
    </div>
  );
};
export default TourLeaderContainer;
