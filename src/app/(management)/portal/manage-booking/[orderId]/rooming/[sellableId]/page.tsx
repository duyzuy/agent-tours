"use client";
import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import PageContainer from "@/components/admin/PageContainer";
import { Button, Form, Radio, Space, Tag } from "antd";
import FormItem from "@/components/base/FormItem";
import useMessage from "@/hooks/useMessage";
import { useGetRoomingList } from "@/queries/core/operation";
import { ROOM_TYPES } from "@/constants/rooming.constant";
import RoomingList from "@/app/(management)/portal/operation/[operationId]/_components/RoomingContainer/RoomingList";
import { isUndefined } from "lodash";
import { useGetOperationStatusQuery } from "@/queries/core/operation";

import HandOverRoomingForm from "../_components/HandOverRoomingForm";

import { CheckCircleOutlined, WarningOutlined } from "@ant-design/icons";
import useRooming from "@/app/(management)/portal/operation/modules/useRooming";

interface RoomingPageProps {
  params: { orderId: number; sellableId: number };
}
const RoomingPage: React.FC<RoomingPageProps> = ({ params }) => {
  const router = useRouter();

  const message = useMessage();
  const { data, isLoading } = useGetRoomingList({
    queryParams: { sellableId: Number(params.sellableId) },
    enabled: true,
  });
  const { data: operation, isLoading: isLoadingOperation } = useGetOperationStatusQuery({
    queryParams: { sellableId: Number(params.sellableId) },
  });

  const [showConfirmation, setShowConfirmation] = useState(false);

  const { onChangeRoomingType, onChangeRooming, onSubmit, roomingData, onHandOver } = useRooming(data || []);

  const disabledButtonSave = useMemo(() => {
    return showConfirmation || isUndefined(roomingData?.roomingType);
  }, [showConfirmation, roomingData]);

  const isWaitingForSales = useMemo(() => {
    return operation?.roomingList.roomingListStatus === "WAITING_FOR_SALES";
  }, [operation]);

  const isInProgress = useMemo(() => {
    return operation?.roomingList.roomingListStatus === "IN_PROGRESS";
  }, [operation]);

  const isHasOperationCode = useMemo(() => {
    return !!operation;
  }, [operation]);

  return (
    <PageContainer
      name="Xếp phòng"
      modelName="Xếp phòng"
      breadCrumItems={[
        { title: "Quản lý booking", href: "/portal/manage-booking" },
        {
          title: "Chi tiết booking",
          href: `/portal/manage-booking/${params.orderId}`,
        },
        { title: "Xếp phòng" },
      ]}
      onBack={() => router.push(`/portal/manage-booking/${params.orderId}`)}
      hideAddButton
    >
      <div className="w-full max-w-4xl">
        <div className="box-operation border rounded-md p-4 mb-6">
          <div className="mb-3 pb-3 border-b">
            <h3 className="font-semibold">
              Điều hành
              <span className={`ml-3 ${isHasOperationCode ? "text-green-600" : "text-red-600"}`}>
                {isHasOperationCode ? <CheckCircleOutlined color="green" /> : <WarningOutlined color="red" />}
              </span>
            </h3>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex">
              <div className="w-[100px]">Họ tên:</div>
              <span>: {operation ? operation.pic.fullname : "--"}</span>
            </div>
            <div className="flex">
              <div className="w-[100px]">Email:</div>
              <span>: {operation ? operation.pic.email : "--"}</span>
            </div>
            <div className="flex">
              <div className="w-[100px]">Số điện thoại:</div>
              <span>: {operation ? operation.pic.phoneNumber : "--"}</span>
            </div>
          </div>
        </div>
        <div className="flex gap-6 mb-6">
          <div>Trạng thái:</div>
          {isInProgress ? <Tag color="green">Đã bàn giao</Tag> : <Tag color="orange">Chờ sắp xếp</Tag>}
        </div>
        <Form layout="vertical">
          <FormItem label="Loại phòng" required>
            <Space>
              {ROOM_TYPES.map((type) => (
                <Radio
                  key={type.value}
                  value={type.value}
                  checked={roomingData?.roomingType === type.value}
                  onChange={() => onChangeRoomingType(type.value)}
                  disabled={isInProgress}
                >
                  {type.label}
                </Radio>
              ))}
            </Space>
          </FormItem>
        </Form>
        <RoomingList
          value={roomingData.roomingItems}
          onChange={onChangeRooming}
          items={data || []}
          isEditable={!isInProgress}
        />
        <div className="py-8">
          <Space>
            <Button type="primary" onClick={() => onSubmit()} disabled={disabledButtonSave}>
              Lưu sắp xếp
            </Button>

            {isWaitingForSales ? (
              <Button type="link" onClick={() => setShowConfirmation(true)}>
                Tiến hành bàn giao
              </Button>
            ) : null}
          </Space>
        </div>
        {showConfirmation && isWaitingForSales && (
          <HandOverRoomingForm
            operationId={operation?.operationId}
            onCancel={() => setShowConfirmation(false)}
            onOk={(data) => onHandOver(data)}
          />
        )}
      </div>
    </PageContainer>
  );
};
export default RoomingPage;
