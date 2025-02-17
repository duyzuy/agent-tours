import React from "react";
import { Button, Drawer, Modal, Popconfirm, Popover, Space, Table, Tag } from "antd";

import { EFopType, IFormOfPayment } from "@/models/management/core/formOfPayment.interface";
import { FormOfPaymmentQueryParams } from "@/models/management/core/formOfPayment.interface";
import { isUndefined } from "lodash";
import useMessage from "@/hooks/useMessage";
import { useApprovalFormOfpayment } from "@/modules/admin/form-of-payment/hooks/useApprovalFormOfpayment";
import { useDeleteFormOfPayment } from "@/modules/admin/form-of-payment/hooks/useDeleteFormOfPayment";
import { ColumnsType } from "antd/es/table";
import { moneyFormatVND } from "@/utils/helper";
import { Status } from "@/models/common.interface";
import { CheckCircleOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { formatDate } from "@/utils/date";
import { ContentDetailList } from "@/components/admin/ContentDetailList";
import { useGetFormOfPaymentList } from "@/modules/admin/form-of-payment/hooks/useGetFormOfPayment";
import MediaUploadDrawer from "@/app/(management)/portal/media/_components/MediaUploadDrawer";

export interface DrawerPaymentListProps {
  orderId?: number;
  totalAmount?: number;
  totalPaid?: number;
  isOpen?: boolean;
  onClose?: () => void;
  formOfPaymentType?: EFopType[];
}

const columns: ColumnsType<IFormOfPayment> = [
  {
    title: "#ID",
    key: "recId",
    dataIndex: "recId",
    width: 80,
  },
  Table.EXPAND_COLUMN,
  {
    title: "Người thanh toán",
    key: "payer",
    dataIndex: "payer",
    width: 200,
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
      return <span className="text-red-600">{moneyFormatVND(amount)}</span>;
    },
    width: 180,
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

const DrawerPaymentList: React.FC<DrawerPaymentListProps> = ({
  isOpen = false,
  totalAmount,
  totalPaid = 0,
  onClose,
  orderId,
  formOfPaymentType,
}) => {
  const queryParams = new FormOfPaymmentQueryParams(
    { orderId: orderId, types: formOfPaymentType },
    undefined,
    undefined,
  );
  const { data: fopList, isLoading } = useGetFormOfPaymentList({
    queryParams: queryParams,
    enabled: !isUndefined(orderId) && !isUndefined(formOfPaymentType) && isOpen,
  });

  const message = useMessage();

  const { mutate: onApproval, isPending: loadingApproval } = useApprovalFormOfpayment();
  const { mutate: onDelete, isPending: loadingDelete } = useDeleteFormOfPayment();

  const handleApproval = (record: IFormOfPayment) => {
    const { amount, type } = record;
    if (type === EFopType.REFUND) {
      if (amount > totalPaid) {
        message.error("Tổng tiền hoàn không vượt quá số tiền đã thanh toán.");
        return;
      }
    }
    onApproval({ recId: record.recId, attachedMedias: [] }, { onSuccess(data, variables, context) {} });
  };

  return (
    <>
      <Drawer
        title="Lịch sử giao dịch"
        width={1040}
        onClose={onClose}
        maskClosable={false}
        destroyOnClose={true}
        open={isOpen}
      >
        <Table
          dataSource={fopList}
          loading={isLoading}
          rowKey={"recId"}
          pagination={{ hideOnSinglePage: true, size: "small" }}
          columns={[
            ...columns,

            {
              title: "",
              key: "amount",
              dataIndex: "actions",
              width: 150,
              render: (amount, record) => (
                <Space>
                  {record.status !== Status.OK && record.status !== Status.XX && (
                    <Button
                      type="text"
                      size="small"
                      onClick={() => handleApproval(record)}
                      loading={loadingApproval}
                      icon={<CheckCircleOutlined />}
                      className="!text-emerald-600"
                    />
                  )}
                  {record.status === Status.QQ && (
                    <Popconfirm
                      title="Xoá"
                      description="Bạn chắc chắn muốn xoá giao dịch này."
                      onConfirm={() => onDelete(record.recId)}
                      okText="Xác nhận"
                      cancelText="Hủy"
                    >
                      <Button
                        type="text"
                        size="small"
                        icon={<DeleteOutlined />}
                        loading={loadingDelete}
                        className="!text-red-600"
                      />
                    </Popconfirm>
                  )}
                </Space>
              ),
            },
          ]}
          expandable={{
            expandedRowRender: (record) => (
              <>
                <ContentDetailList
                  direction="horizontal"
                  items={[
                    { label: "Người thanh toán", value: record.payer || "--" },
                    { label: "Loại", value: record.type },
                    { label: "Phương thức", value: record.fopType || "--" },
                    { label: "Số tiền", value: moneyFormatVND(record.amount) },
                    { label: "Thông tin thanh toán", value: record.fopDocument || "--" },
                    { label: "File đính kèm", value: record.fopDocument || "--" },
                    { label: "infoTnxId", value: record.infoTnxId || "--" },
                    { label: "infoMId", value: record.infoMId || "--" },
                    { label: "infoTrace", value: record.infoTrace || "--" },
                    { label: "infoNumber", value: record.infoNumber || "--" },
                    { label: "infoNote", value: record.infoNote || "--" },
                    { label: "Ghi chú", value: record.rmk || "--" },
                    { label: "Ngày tạo", value: formatDate(record.sysFstUpdate) },
                  ]}
                />
              </>
            ),
          }}
        />
      </Drawer>
    </>
  );
};
export default DrawerPaymentList;
