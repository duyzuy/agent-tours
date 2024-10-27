import { useGetRoomingList } from "@/queries/core/operation";
import RoomingList from "./RoomingList";
import useRooming from "../../../modules/useRooming";

import { RoomingStatusType } from "@/models/management/booking/rooming.interface";

import { Button, Radio, Space } from "antd";
import { ROOM_TYPES } from "@/constants/rooming.constant";
import { memo } from "react";

export interface RoomingContainerProps {
  operationId: number;
  isEditAble?: boolean;
  status?: RoomingStatusType;
}
const RoomingContainer: React.FC<RoomingContainerProps> = ({ operationId, isEditAble = false, status }) => {
  const { data, isLoading } = useGetRoomingList({ queryParams: { operationId } });

  const { onChangeRoomingType, onChangeRooming, onSubmit, roomingData } = useRooming(data || []);

  return (
    <div className="pt-6">
      <div className="mb-3 flex gap-x-4">
        <h3 className="text-lg font-semibold">Sắp xếp phòng</h3>
        {/* {isEditAble ? (
            <Button onClick={setCreate} type="primary" ghost size="small" icon={<PlusOutlined />}>
              Thêm
            </Button>
          ) : null} */}
      </div>
      <div className="mb-6">
        {status === "WAITING_FOR_SALES"
          ? "Đang chờ Sale bàn giao."
          : status === "DONE"
          ? "Đã xong"
          : status === "IN_PROGRESS"
          ? "Điều hành sắp xếp"
          : "Không xác định"}
      </div>
      <div className="mb-6">
        <div className="mb-3">
          <p className="font-semibold">Loại phòng</p>
        </div>
        <Space>
          {ROOM_TYPES.map((type) => (
            <Radio
              key={type.value}
              value={type.value}
              checked={roomingData?.roomingType === type.value}
              onChange={() => onChangeRoomingType(type.value)}
              disabled={!isEditAble}
            >
              {type.label}
            </Radio>
          ))}
        </Space>
      </div>
      <RoomingList
        value={roomingData.roomingItems}
        isEditable={isEditAble}
        onChange={onChangeRooming}
        items={data || []}
      />
      <div className="py-8">
        <Space>
          <Button type="primary" onClick={() => onSubmit()} disabled={!isEditAble}>
            Lưu sắp xếp
          </Button>
        </Space>
      </div>
    </div>
  );
};
export default memo(RoomingContainer);
