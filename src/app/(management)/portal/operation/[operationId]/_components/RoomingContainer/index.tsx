import { useGetRoomingList } from "@/queries/core/operation";
import RoomingList from "./RoomingList";
import useRooming from "../../../modules/useRooming";

import { RoomingStatusType } from "@/models/management/booking/rooming.interface";

import { Button, Form, Radio, Space, Spin, Tag } from "antd";
import { ROOM_TYPES } from "@/constants/rooming.constant";
import { memo, useMemo } from "react";
import FormItem from "@/components/base/FormItem";
import { isUndefined } from "lodash";

export interface RoomingContainerProps {
  operationId: number;
  editAble?: boolean;
  status?: RoomingStatusType;
}
const RoomingContainer: React.FC<RoomingContainerProps> = ({ operationId, editAble = false, status }) => {
  const { data, isLoading } = useGetRoomingList({ queryParams: { operationId } });

  const { onChangeRoomingType, onChangeRooming, onSubmit, roomingData, clearSelection } = useRooming(data || []);

  const isDisableButton = useMemo(() => {
    return isUndefined(roomingData.roomingType) || roomingData.roomingItems.length === 0;
  }, [roomingData]);

  return (
    <div className="pt-6">
      <h3 className="text-lg font-semibold mb-3">Xếp phòng</h3>
      <div className="mb-6">
        <Space>
          Trạng thái:
          <Tag
            color={
              status === "WAITING_FOR_SALES"
                ? "orange"
                : status === "DONE"
                ? "green"
                : status === "IN_PROGRESS"
                ? "blue"
                : "default"
            }
            bordered={false}
          >
            {status === "WAITING_FOR_SALES"
              ? "Đang chờ Sale bàn giao."
              : status === "DONE"
              ? "Đã xong"
              : status === "IN_PROGRESS"
              ? "Điều hành sắp xếp"
              : "Không xác định"}
          </Tag>
        </Space>
      </div>
      {isLoading ? (
        <Spin />
      ) : (
        <>
          <Form layout="vertical">
            <FormItem label="Loại phòng">
              <Space>
                {ROOM_TYPES.map((type) => (
                  <Radio
                    key={type.value}
                    value={type.value}
                    checked={roomingData?.roomingType === type.value}
                    onChange={() => onChangeRoomingType(type.value)}
                    disabled={!editAble}
                  >
                    {type.label}
                  </Radio>
                ))}
              </Space>
            </FormItem>
            <FormItem label="Danh sách hành khách">
              <RoomingList
                value={roomingData.roomingItems}
                editAble={editAble}
                onChange={onChangeRooming}
                items={data || []}
              />
            </FormItem>
          </Form>
          <div className="">
            <Space>
              <Button type="primary" onClick={() => onSubmit()} disabled={!editAble || isDisableButton}>
                Lưu sắp xếp
              </Button>
              <Button onClick={clearSelection}>Huỷ bỏ</Button>
            </Space>
          </div>
        </>
      )}
    </div>
  );
};
export default memo(RoomingContainer);
