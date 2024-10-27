"use client";
import React, { useState } from "react";
import { Button, Dropdown, MenuProps, Space, Table, TableProps } from "antd";
import PageContainer from "@/components/admin/PageContainer";
import TableListPage from "@/components/admin/TableListPage";
import DrawerOperation, { DrawerOperationProps } from "../_components/DrawerOperation";
import useOperation from "../modules/useOperation";
import { useGetOperationListQuery } from "@/queries/core/operation";
import { columns } from "./columns";
import { IOperation } from "@/models/management/core/operation.interface";
import { useRouter } from "next/navigation";
import { ColumnsType } from "antd/es/table";
import { EditOutlined, EllipsisOutlined, EyeOutlined } from "@ant-design/icons";
const CodeListPage = () => {
  const { data, isLoading } = useGetOperationListQuery();
  const [isSubmiting, setSubmiting] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [action, setAction] = useState<"create" | "edit">();
  const [editRecord, setEditRecord] = useState<IOperation>();

  const router = useRouter();

  const { onCreate, onUpdate, onUpdateStatus } = useOperation();

  const createOperation = () => {
    setOpenDrawer(true);
    setAction("create");
  };

  const setEditOperation = (record: IOperation) => {
    setOpenDrawer(true);
    setAction("edit");
    setEditRecord(record);
  };

  const closeOperation = () => {
    setOpenDrawer(false);
    setAction(undefined);
    setEditRecord(undefined);
  };
  const handleSubmit: DrawerOperationProps["onSubmit"] = (data, action) => {
    setSubmiting(true);
    action === "create" &&
      onCreate(data, {
        onSuccess: (data, variables, context) => {
          closeOperation();
          setSubmiting(false);
        },
        onError: (data, variables, context) => {
          setSubmiting(false);
        },
      });
    action === "edit" &&
      onUpdate(data, {
        onSuccess: (data, variables, context) => {
          setSubmiting(false);
          closeOperation();
        },
        onError: (data, variables, context) => {
          setSubmiting(false);
        },
      });
  };

  const onHandOver = (id: number) => {
    onUpdateStatus({ id, status: "HANDOVERED" });
  };
  const onAccept = (id: number) => {
    onUpdateStatus({ id, status: "ACCEPTED" });
  };
  const onLock = (id: number) => {
    onUpdateStatus({ id, status: "LOCKED" });
  };
  const onPendingCancel = (id: number) => {
    onUpdateStatus({ id, status: "PENDINGCANCELED" });
  };
  const onCancel = (id: number) => {
    onUpdateStatus({ id, status: "CANCELED" });
  };
  const onFinish = (id: number) => {
    onUpdateStatus({ id, status: "DONE" });
  };
  const mergedColumns: ColumnsType<IOperation> = [
    ...columns,
    {
      render(value, record, index) {
        const { status, id } = record;
        //NEW - default sau khi tạo => ACCEPTED, CANCELED
        //ACCEPTED - đã nhận: vẫn được update roomingList + checkList => HANDOVERED, PENDINGCANCELED
        //HANDOVERED - đã bàn giao: vẫn được book thêm dịch vụ Costing => LOCKED, PENDINGCANCELED
        //LOCKED - khoá: vẫn có thể thanh toán => HANDOVERED, PENDINGCANCELED, DONE
        //PENDINGCANCELED - đã huỷ, vẫn có thể thanh toán => HANDOVERED, CANCELED
        //CANCELED - xong, chỉ xem
        //DONE - xong, chỉ xem
        let menuItems: MenuProps["items"] = [
          {
            key: "accept",
            label: <span className="text-emerald-600">Duyệt</span>,
            onClick: () => onAccept(id),
          },
          {
            key: "handOver",
            label: <span className="text-amber-600">Bàn giao</span>,
            onClick: () => onHandOver(id),
          },
          {
            key: "lock",
            label: <span>Khoá</span>,
            onClick: () => onLock(id),
          },
          {
            key: "pendingCancel",
            label: <span className="text-pink-600">Chờ huỷ</span>,
            onClick: () => onPendingCancel(id),
          },
          {
            key: "cancel",
            label: <span className="text-red-600">Huỷ</span>,
            onClick: () => onCancel(id),
          },
          {
            key: "done",
            label: <span className="text-emerald-600">Hoàn thành</span>,
            onClick: () => onFinish(id),
          },
        ];

        if (status === "NEW") {
          menuItems = menuItems.filter((item) => item?.key === "accept" || item?.key === "cancel");
        }
        if (status === "ACCEPTED") {
          menuItems = menuItems.filter((item) => item?.key === "handOver" || item?.key === "pendingCancel");
        }
        if (status === "HANDOVERED") {
          menuItems = menuItems.filter((item) => item?.key === "lock" || item?.key === "pendingCancel");
        }
        if (status === "LOCKED") {
          menuItems = menuItems.filter(
            (item) => item?.key === "handOver" || item?.key === "pendingCancel" || item?.key === "done",
          );
        }
        if (status === "PENDINGCANCELED") {
          menuItems = menuItems.filter((item) => item?.key === "handOver" || item?.key === "cancel");
        }

        return (
          <>
            <Space>
              <Button
                type="text"
                size="small"
                onClick={() => router.push(`/portal/operation/${id}`)}
                icon={<EyeOutlined />}
              >
                Xem
              </Button>
              <Button type="text" size="small" onClick={() => setEditOperation(record)} icon={<EditOutlined />}>
                Sửa
              </Button>
              {status !== "DONE" && status !== "CANCELED" ? (
                <Dropdown
                  menu={{
                    items: menuItems,
                  }}
                >
                  <Button icon={<EllipsisOutlined />} shape="circle" type="text" className="!bg-gray-100" />
                </Dropdown>
              ) : null}
            </Space>
          </>
        );
      },
    },
  ];
  return (
    <PageContainer
      name="Điều hành"
      modelName="điều hành"
      breadCrumItems={[{ title: "Điều hành" }]}
      onClick={createOperation}
    >
      <Table<IOperation>
        scroll={{ x: 1200 }}
        rowKey="id"
        columns={mergedColumns}
        dataSource={data || []}
        size="small"
        loading={isLoading}
        pagination={{
          size: "small",
          pageSize: 20,
        }}
      />
      <DrawerOperation
        initialValue={editRecord}
        isSubmiting={isSubmiting}
        open={openDrawer}
        action={action}
        onClose={closeOperation}
        onSubmit={handleSubmit}
      />
    </PageContainer>
  );
};
export default CodeListPage;
