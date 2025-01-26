import { useGetRoomingList } from "@/queries/core/operation";
import RoomingList from "./RoomingList";
import useRooming from "../../../modules/useRooming";

import { RoomingStatusType } from "@/models/management/booking/rooming.interface";

import { Button, Form, Radio, Space } from "antd";
import { ROOM_TYPES } from "@/constants/rooming.constant";
import { memo } from "react";
import FormItem from "@/components/base/FormItem";

export interface RoomingContainerProps {
  operationId: number;
  editAble?: boolean;
  status?: RoomingStatusType;
}
const RoomingContainer: React.FC<RoomingContainerProps> = ({ operationId, editAble = false, status }) => {
  const { data, isLoading } = useGetRoomingList({ queryParams: { operationId } });

  const { onChangeRoomingType, onChangeRooming, onSubmit, roomingData } = useRooming(data || []);

  return (
    <div className="pt-6">
      <div className="mb-3 flex gap-x-4">
        <h3 className="text-lg font-semibold">Xếp phòng</h3>
        {/* {editAble ? (
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
            isEditable={editAble}
            onChange={onChangeRooming}
            items={data || []}
          />
        </FormItem>
      </Form>
      <div className="">
        <Space>
          <Button type="primary" onClick={() => onSubmit()} disabled={!editAble}>
            Lưu sắp xếp
          </Button>
        </Space>
      </div>
    </div>
  );
};
export default memo(RoomingContainer);
