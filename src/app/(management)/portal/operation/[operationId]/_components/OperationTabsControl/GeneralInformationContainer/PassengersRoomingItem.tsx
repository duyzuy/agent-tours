import { Button, Card, Divider, Form, Input, Popover, Space, Tag, TagProps } from "antd";
import { getRoomingName } from "@/constants/rooming.constant";
import { RoomingType } from "@/models/management/booking/rooming.interface";
import React, { useEffect, useState } from "react";
import { getPassengerType } from "@/utils/common";
import { getPassengerTitle } from "@/constants/common";
import { getPassengerGender } from "@/constants/common";
import { OperationStatusResponse } from "@/models/management/core/operation/operationStatus.interface";
import FormItem from "@/components/base/FormItem";
import { EditOutlined, UserOutlined } from "@ant-design/icons";

type PassengerRoomingInfo = OperationStatusResponse["result"]["passengerList"][number];
export interface PassengersRoomingItemProps {
  roomType: RoomingType;
  passengers: Pick<
    PassengerRoomingInfo,
    | "documents"
    | "passengerDeadlineRemarks"
    | "paxGender"
    | "paxId"
    | "paxLastname"
    | "paxMiddleFirstName"
    | "paxTitle"
    | "type"
  >[];
  children?: React.ReactNode;
  onSave?: PassengerDeadlineRemarkItemProps["onSave"];
  loading?: PassengerDeadlineRemarkItemProps["loading"];
}
const PassengersRoomingItem: React.FC<PassengersRoomingItemProps> = ({ roomType, passengers, loading, onSave }) => {
  return (
    <Card size="small">
      <div className="mb-3">
        <Tag color={getRoomingColor(roomType)} bordered={false}>
          <span className="text-[14px]">{getRoomingName(roomType)}</span>
        </Tag>
      </div>
      {passengers.map((pax, _paxIndex) => (
        <React.Fragment key={pax.paxId}>
          {_paxIndex !== 0 ? <Divider style={{ margin: "12px 0" }} /> : null}
          <div className="flex gap-x-3 items-start">
            <UserOutlined className="w-12 h-12 text-lg bg-gray-100 rounded-full flex items-center justify-center" />
            <div>
              <div className="grid grid-cols-2 gap-6 mb-3">
                <div className="grid grid-cols-4 gap-3">
                  <div className="">
                    <div className="text-xs text-gray-500 mb-1">Hành khách</div>
                    {getPassengerType(pax.type)}
                  </div>
                  <div className="">
                    <div className="text-xs text-gray-500 mb-1">Danh xưng</div>
                    {getPassengerTitle(pax.paxTitle)}
                  </div>
                  <div className="">
                    <div className="text-xs text-gray-500 mb-1">Họ</div>
                    {pax.paxLastname ? pax.paxLastname : "--"}
                  </div>
                  <div className="">
                    <div className="text-xs text-gray-500 mb-1">Tên đệm và tên</div>
                    {pax.paxMiddleFirstName ? pax.paxMiddleFirstName : "--"}
                  </div>
                  <div className="">
                    <div className="text-xs text-gray-500 mb-1">Giới tính</div>
                    {getPassengerGender(pax.paxGender)}
                  </div>
                </div>
                <div className="flex-1 max-w-xs">
                  <div className="text-xs text-gray-500 mb-1">Hồ sơ giấy tờ yêu cầu</div>
                  <ul className="flex flex-col gap-y-1">
                    {pax.documents?.map(({ documentName, status, documentCheckListId }, _index) => (
                      <li key={documentCheckListId}>
                        <div className="flex gap-x-1 justify-between items-start">
                          <div className="w-20 text-right">
                            <Tag
                              className="text-xs !mr-0"
                              color={
                                status === "FINISHED"
                                  ? "green"
                                  : status === "NOT_FINISHED"
                                  ? "red"
                                  : status === "NEW"
                                  ? "blue"
                                  : "default"
                              }
                              bordered={false}
                            >
                              {status === "FINISHED"
                                ? "Đã nộp"
                                : status === "HANDOVERED"
                                ? "Đã bàn giao"
                                : status === "NEW"
                                ? "Mới"
                                : status === "NOT_FINISHED"
                                ? "Chưa nộp"
                                : "Unknown"}
                            </Tag>
                          </div>
                          <div className="flex-1">
                            <span className="w-6 inline-block text-center">{`${_index + 1}.`}</span>
                            <span>{documentName}</span>
                          </div>
                        </div>
                      </li>
                    )) || "--"}
                  </ul>
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">Thông tin</div>
                <div className="flex flex-row flex-wrap gap-2">
                  {pax.passengerDeadlineRemarks
                    ? pax.passengerDeadlineRemarks?.map((item, _index) => (
                        <PassengerDeadlineRemarkItem key={_index} data={item} onSave={onSave} loading={loading} />
                      ))
                    : "--"}
                </div>
              </div>
            </div>
          </div>
        </React.Fragment>
      ))}
    </Card>
  );
};
export default PassengersRoomingItem;

const getRoomingColor = (type: RoomingType): TagProps["color"] => {
  return type === "DOUBLE"
    ? "volcano"
    : type === "TRIPLE"
    ? "blue"
    : type === "SINGLE"
    ? "green"
    : type === "TWIN"
    ? "cyan"
    : undefined;
};

type PassengerDeadlineRemarkItemProps = {
  data: Exclude<PassengerRoomingInfo["passengerDeadlineRemarks"], null>[number];
  onSave?: (data: Exclude<PassengerRoomingInfo["passengerDeadlineRemarks"], null>[number], cb?: () => void) => void;
  loading?: boolean;
};

function PassengerDeadlineRemarkItem({ data, onSave, loading }: PassengerDeadlineRemarkItemProps) {
  const { deadlineId, deadlineType, remark, recId, sellableId, paxId } = data;
  const [note, setNote] = useState("");
  const [open, setOpen] = useState(false);
  const hide = () => {
    setOpen(false);
  };
  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };
  useEffect(() => {
    setNote(data.remark);
  }, [data]);
  return (
    <div className="item-deadline border rounded-md justify-between w-80 px-3 py-2" key={deadlineId}>
      <div className="flex justify-between">
        <span className="text-xs font-semibold">{deadlineType}</span>
        <Button
          size="small"
          type="text"
          className="!text-blue-600 hover:!bg-blue-50"
          icon={<EditOutlined />}
          shape="circle"
        />
      </div>
      <div className="text-xs">{remark || "--"}</div>
      <Popover
        trigger="click"
        open={open}
        content={
          <Form disabled={loading} className="w-80">
            <FormItem>
              <Input.TextArea
                rows={3}
                placeholder={`Thông tin ${deadlineType}`}
                value={note}
                onChange={(evt) => setNote(evt.target.value)}
              />
            </FormItem>
            <Space>
              <Button
                size="small"
                type="primary"
                onClick={() => onSave?.({ sellableId, deadlineId, paxId, remark: note, deadlineType, recId }, hide)}
                loading={loading}
              >
                Lưu
              </Button>
              <Button size="small" onClick={hide}>
                Đóng
              </Button>
            </Space>
          </Form>
        }
        onOpenChange={handleOpenChange}
      ></Popover>
    </div>
  );
}
