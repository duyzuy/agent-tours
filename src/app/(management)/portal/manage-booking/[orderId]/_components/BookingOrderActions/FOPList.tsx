import React, { useState } from "react";
import CustomTable from "@/components/admin/CustomTable";
import { IOrderDetail } from "@/models/management/booking/order.interface";
import { Status } from "@/models/common.interface";
import { moneyFormatVND } from "@/utils/helper";
import { CheckCircleOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { Button, Space, Tag, Modal, Col, Row } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import { formatDate } from "@/utils/date";
import { IFormOfPayment } from "@/models/management/core/formOfPayment.interface";
import useMessage from "@/hooks/useMessage";

const columns: ColumnsType<IFormOfPayment> = [
  {
    title: "#ID",
    key: "recId",
    dataIndex: "recId",
    width: 80,
  },
  {
    title: "Người thanh toán",
    key: "payer",
    dataIndex: "payer",
    width: 180,
  },
  {
    title: "Loại",
    key: "type",
    dataIndex: "type",
    width: 100,
  },
  {
    title: "Số tiền",
    key: "amount",
    dataIndex: "amount",
    render: (_, { amount, type }) => {
      return moneyFormatVND(amount);
    },
    width: 150,
  },
  {
    title: "Trạng thái",
    key: "status",
    dataIndex: "status",
    render: (status, record) => {
      const statusName =
        (status === Status.OK && "Đã duyệt") ||
        (status === Status.QQ && "Chờ duyệt") ||
        (status === Status.XX && "Đã huỷ") ||
        (status === Status.OX && "Đang chờ") ||
        "Không xác định";
      const tagColor =
        (status === Status.OK && "green") ||
        (status === Status.QQ && "orange") ||
        (status === Status.XX && "red") ||
        "default";
      return (
        <Tag color={tagColor} bordered={false}>
          {statusName}
        </Tag>
      );
    },
    width: 100,
  },
];

export interface FOPListProps {
  items: IOrderDetail["fops"];
  onApproval: (recId: number, data: IFormOfPayment) => void;
  onDelete: (recId: number) => void;
  totalAmount?: number;
  totalPaid?: number;
  loading?: boolean;
}
const FOPList: React.FC<FOPListProps> = ({ items, onApproval, onDelete, totalAmount = 0, totalPaid = 0, loading }) => {
  const [detailRecord, setDetailRecord] = useState<{
    isShow: boolean;
    data?: IOrderDetail["fops"][0];
  }>({ isShow: false, data: undefined });

  const message = useMessage();
  const onViewDetail = (record: IOrderDetail["fops"][0]) => {
    setDetailRecord((prev) => ({
      isShow: true,
      data: record,
    }));
  };

  // const handleApproval = (record: IFormOfPayment) => {
  //   console.log(record, totalPaid, totalAmount);
  //   if (record.amount + totalPaid > totalAmount) {
  //     message.error("Tổng tiền thanh toán không vượt quá số tiền phải thanh toán.");
  //     return;
  //   }

  //   onApproval(record.recId);
  // };
  const mergeColumns: ColumnsType<IOrderDetail["fops"][0]> = [
    ...columns,
    {
      title: "",
      key: "amount",
      dataIndex: "actions",
      render: (amount, record) => {
        return (
          <Space>
            <Button
              type="text"
              shape="circle"
              icon={<EyeOutlined className="!text-blue-600" />}
              onClick={() => onViewDetail(record)}
            />
            {record.status === Status.QQ && (
              <Button
                type="text"
                shape="circle"
                onClick={() => onDelete(record.recId)}
                icon={<DeleteOutlined className="!text-red-600" />}
              />
            )}
            {record.status !== Status.OK && (
              <Button
                type="text"
                shape="circle"
                onClick={() => onApproval(record.recId, record)}
                icon={<CheckCircleOutlined className="!text-green-600" />}
              />
            )}
          </Space>
        );
      },
    },
  ];

  return (
    <>
      <Table dataSource={items} rowKey={"recId"} columns={mergeColumns} loading={loading} />
      <ModalDetailFOP
        isShowModal={detailRecord.isShow}
        data={detailRecord.data}
        onCancel={() => setDetailRecord({ isShow: false, data: undefined })}
      />
    </>
  );
};
export default FOPList;

interface ModalDetailFOPProps {
  onConfirm?: () => void;
  onCancel?: () => void;
  isShowModal: boolean;
  title?: string;
  descriptions?: string;
  confirmLoading?: boolean;
  data?: IOrderDetail["fops"][0];
}
const ModalDetailFOP: React.FC<ModalDetailFOPProps> = ({
  onConfirm,
  isShowModal,
  onCancel,
  title = "Chi tiết",
  data,
}) => {
  return (
    <Modal open={isShowModal} onCancel={onCancel} footer={null} width={450}>
      <div className="body">
        <div className="text-center font-[500] text-lg mb-6">
          <p>{title}</p>
        </div>
        <div className="content py-2">
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <div>
                <span className="block text-xs">ID</span>
                <span className="font-[500]">{`#${data?.recId}`}</span>
              </div>
            </Col>
            <Col span={12}>
              <div>
                <span className="block text-xs">Loại</span>
                <span className="font-[500]">{data?.type}</span>
              </div>
            </Col>
            <Col span={12}>
              <div>
                <span className="block text-xs">Người thanh toán</span>
                <span className="font-[500]">{data?.payer}</span>
              </div>
            </Col>
            <Col span={12}>
              <div>
                <span className="block text-xs">Hình thức</span>
                <span className="font-[500]">{data?.fopType}</span>
              </div>
            </Col>
            <Col span={12}>
              <div>
                <span className="block text-xs">Số tiền</span>
                <span className="text-primary-default font-[500]">{moneyFormatVND(data?.amount)}</span>
              </div>
            </Col>
            <Col span={12}>
              <div>
                <span className="block text-xs">Thông tin thanh toán</span>
                <span className="font-[500]">{data?.fopDocument}</span>
              </div>
            </Col>
            <Col span={12}>
              <div>
                <span className="block text-xs">infoTId</span>
                <span className="font-[500]">{data?.infoTId}</span>
              </div>
            </Col>
            <Col span={12}>
              <div>
                <span className="block text-xs">infoTnxId</span>
                <span className="font-[500]">{data?.infoTnxId}</span>
              </div>
            </Col>
            <Col span={12}>
              <div>
                <span className="block text-xs">infoMId</span>
                <span className="font-[500]">{data?.infoMId}</span>
              </div>
            </Col>
            <Col span={12}>
              <div>
                <span className="block text-xs">infoTrace</span>
                <span className="font-[500]">{data?.infoTrace}</span>
              </div>
            </Col>
            <Col span={12}>
              <div>
                <span className="block text-xs">infoNumber</span>
                <span className="font-[500]">{data?.infoNumber}</span>
              </div>
            </Col>
            <Col span={12}>
              <div>
                <span className="block text-xs">infoNote</span>
                <span className="font-[500]">{data?.infoNote}</span>
              </div>
            </Col>
            <Col span={12}>
              <div>
                <span className="block text-xs">Ghi chú</span>
                <span className="font-[500]">{data?.rmk}</span>
              </div>
            </Col>
            <Col span={12}>
              <div>
                <span className="block text-xs">Trạng thái</span>
                <span className="font-[500]">
                  {(data?.status === Status.OK && "Đã duyệt") ||
                    (data?.status === Status.QQ && "Chờ duyệt") ||
                    (data?.status === Status.XX && "Đã huỷ") ||
                    (data?.status === Status.OX && "Đang chờ") ||
                    "Không xác định"}
                </span>
              </div>
            </Col>
            <Col span={12}>
              <div>
                <span className="block text-xs">Ngày tạo</span>
                <span className="font-[500]">{data?.sysFstUpdate && formatDate(data?.sysFstUpdate)}</span>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </Modal>
  );
};
