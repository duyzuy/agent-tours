import { getPassengerGender, getPassengerTitle } from "@/constants/common";
import { getRoomingName } from "@/constants/rooming.constant";
import { PaymentStatus } from "@/models/common.interface";
import { RoomingType } from "@/models/management/booking/rooming.interface";

import { OperationStatusResponse } from "@/models/management/core/operation/OperationStatus.interface";
import { getPassengerType } from "@/utils/common";
import { moneyFormatVND } from "@/utils/helper";
import { Card, Divider, Table, Tag, TagProps } from "antd";
import { ColumnsType } from "antd/es/table";
import React, { useMemo } from "react";

interface OperationGeneralInformationProps {
  passengerList?: OperationStatusResponse["result"]["passengerList"];
  orderList?: OperationStatusResponse["result"]["orderList"];
  roomingList?: OperationStatusResponse["result"]["roomingList"];
  totalCosting?: OperationStatusResponse["result"]["totalCosting"];
  totalSale?: OperationStatusResponse["result"]["totalSale"];
}
type PassengerGroupByRoomType = {
  [key: string]: {
    roomType: RoomingType;
    roomNumber: number;
    passengers: OperationStatusResponse["result"]["passengerList"];
  };
};
const OperationGeneralInformation: React.FC<OperationGeneralInformationProps> = ({
  passengerList,
  orderList,
  totalCosting,
  totalSale,
}) => {
  const passengersGroupByRoom = useMemo(() => {
    return passengerList?.reduce<PassengerGroupByRoomType>((acc, item) => {
      const roomNumber = item.roomingListNumber;

      if (acc[roomNumber]) {
        acc = {
          ...acc,
          [roomNumber]: {
            ...acc[roomNumber],
            passengers: [...acc[roomNumber].passengers, item],
          },
        };
      } else {
        acc = {
          ...acc,
          [roomNumber]: {
            roomNumber: roomNumber,
            roomType: item.roomingListType,
            passengers: [item],
          },
        };
      }

      return acc;
    }, {});
  }, [passengerList]);
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
  const columns: ColumnsType<OperationStatusResponse["result"]["orderList"][0]> = [
    { title: "#ID", dataIndex: "id" },
    { title: "Kênh bán", dataIndex: "channel" },
    { title: "Khách hàng", dataIndex: "custName" },
    { title: "Số điện thoại", dataIndex: "custPhoneNumber" },
    {
      title: "Tổng tiền",
      dataIndex: "totalAmount",
      render(value, { totalAmount }, index) {
        return moneyFormatVND(totalAmount);
      },
    },
    {
      title: "Đã thanh toán",
      dataIndex: "totalPaid",
      render(value, { totalPaid }, index) {
        return moneyFormatVND(totalPaid);
      },
    },
    {
      title: "Trạng thái",
      dataIndex: "paymentStatus",
      render(value, record, index) {
        return (
          <>
            {record.paymentStatus === PaymentStatus.PAID ? (
              <Tag color="green" bordered={false}>
                Đã thanh toán
              </Tag>
            ) : record.paymentStatus === PaymentStatus.DEPOSITED ? (
              <Tag color="blue" bordered={false}>
                Thanh toán 1 phần
              </Tag>
            ) : record.paymentStatus === PaymentStatus.NOTPAID ? (
              <Tag color="red" bordered={false}>
                Chưa thanh toán
              </Tag>
            ) : (
              "Không xác định"
            )}
          </>
        );
      },
    },
  ];
  return (
    <div className="pt-6">
      <div className="order-list-container mb-6">
        <h3 className="text-lg font-semibold mb-6">Danh sách đơn hàng</h3>
        <Table dataSource={orderList} rowKey={"id"} columns={columns} pagination={{ hideOnSinglePage: true }} />
      </div>
      <div className="passenger-container">
        <h3 className="text-lg font-semibold mb-6">Danh sách hành khách</h3>
        <div className="passenger-list flex flex-col gap-y-3">
          {passengersGroupByRoom
            ? Object.entries(passengersGroupByRoom)?.map(([key, { roomNumber, roomType, passengers }], _index) => (
                <Card key={_index} size="small">
                  <div className="mb-3">
                    <Tag color={getRoomingColor(roomType)} bordered={false}>
                      <span className="text-[14px]">{getRoomingName(roomType)}</span>
                    </Tag>
                  </div>
                  {passengers.map((pax, _paxIndex) => (
                    <React.Fragment key={pax.paxId}>
                      {_paxIndex !== 0 ? <Divider style={{ margin: "12px 0" }} /> : null}
                      <div className="pax-item ">
                        <div className="flex flex-wrap gap-3 mb-3">
                          <div className="w-[120px]">
                            <div className="text-xs text-gray-500 mb-1">Hành khách</div>
                            {getPassengerType(pax.type)}
                          </div>
                          <div className="w-[80px]">
                            <div className="text-xs text-gray-500 mb-1">Danh xưng</div>
                            {getPassengerTitle(pax.paxTitle)}
                          </div>
                          <div className="w-[100px]">
                            <div className="text-xs text-gray-500 mb-1">Họ</div>
                            {pax.paxLastname ? pax.paxLastname : "--"}
                          </div>
                          <div className="w-[120px]">
                            <div className="text-xs text-gray-500 mb-1">Tên đệm và tên</div>
                            {pax.paxMiddleFirstName ? pax.paxMiddleFirstName : "--"}
                          </div>
                          <div className="w-[80px]">
                            <div className="text-xs text-gray-500 mb-1">Giới tính</div>
                            {getPassengerGender(pax.paxGender)}
                          </div>
                          <div className="flex-1 max-w-xs">
                            <div className="text-xs text-gray-500 mb-1">Hồ sơ giấy tờ yêu cầu</div>
                            <ul className="pl-4 flex flex-col gap-y-1">
                              {pax.documents?.map(({ documentName, status }, _index) => (
                                <li key={_index} className="list-decimal">
                                  <div className="flex gap-x-3 justify-between items-start">
                                    <div className="flex-1">{documentName}</div>
                                    <Tag
                                      className="text-xs"
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
                                </li>
                              )) || "--"}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </React.Fragment>
                  ))}
                </Card>
              ))
            : null}
        </div>
      </div>
    </div>
  );
};
export default OperationGeneralInformation;
