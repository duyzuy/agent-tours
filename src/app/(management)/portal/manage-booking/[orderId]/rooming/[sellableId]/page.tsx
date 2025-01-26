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
import { useGetOperationStatus } from "@/app/(management)/portal/operation/modules/useGetOperationStatus";

import HandOverRoomingForm from "../_components/HandOverRoomingForm";
import useRooming from "@/app/(management)/portal/operation/modules/useRooming";
import OperatorInformation from "../_components/OperatorInformation";

interface RoomingPageProps {
  params: { orderId: number; sellableId: number };
}
const RoomingPage: React.FC<RoomingPageProps> = ({ params }) => {
  const router = useRouter();

  const message = useMessage();
  const { data, isLoading } = useGetRoomingList({
    queryParams: { sellableId: Number(params.sellableId), orderId: Number(params.orderId) },
    enabled: true,
  });
  const { data: operation, isLoading: isLoadingOperation } = useGetOperationStatus({
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
        <OperatorInformation
          hasOperator={isHasOperationCode}
          phoneNumber={operation?.pic.phoneNumber}
          email={operation?.pic.email}
          fullName={operation?.pic.fullname}
        />
        <div className="h-6"></div>
        <div className="flex gap-6 mb-6">
          <div>Trạng thái xếp phòng:</div>
          {isInProgress ? (
            <Tag color="green" bordered={false}>
              Đã bàn giao
            </Tag>
          ) : (
            <Tag color="orange" bordered={false}>
              Đang xếp phòng
            </Tag>
          )}
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
          <FormItem label="Danh sách hành khách" required>
            <RoomingList
              value={roomingData.roomingItems}
              onChange={onChangeRooming}
              items={data || []}
              editAble={!isInProgress}
            />
          </FormItem>
        </Form>
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
