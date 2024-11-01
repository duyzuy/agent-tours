import { getPassengerGender, getPassengerTitle } from "@/constants/common";
import { getRoomingName } from "@/constants/rooming.constant";
import { PaymentStatus } from "@/models/common.interface";
import { RoomingType } from "@/models/management/booking/rooming.interface";
import { OperationStatusResponse } from "@/models/management/core/operation.interface";
import { getPassengerType } from "@/utils/common";
import { moneyFormatVND } from "@/utils/helper";
import { CheckOutlined } from "@ant-design/icons";
import { Table, Tag, TagProps } from "antd";
import { ColumnsType } from "antd/es/table";
import { useMemo } from "react";

interface OperationInformationProps {
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
const OperationInformation: React.FC<OperationInformationProps> = ({
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
              <Tag color="green">Đã thanh toán</Tag>
            ) : record.paymentStatus === PaymentStatus.DEPOSITED ? (
              <Tag color="blue">Thanh toán 1 phần</Tag>
            ) : record.paymentStatus === PaymentStatus.NOTPAID ? (
              <Tag color="red">Chưa thanh toán</Tag>
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
        <div className="section-head mb-6">
          <h3 className="text-lg font-semibold">Danh sách đơn hàng</h3>
        </div>
        <Table dataSource={orderList} rowKey={"id"} columns={columns} pagination={{ hideOnSinglePage: true }} />
      </div>
      <div className="passenger-container">
        <div className="section-head mb-6">
          <h3 className="text-lg font-semibold">Thông tin hành khách</h3>
        </div>
        <div className="passenger-list">
          {passengersGroupByRoom
            ? Object.entries(passengersGroupByRoom)?.map(([key, { roomNumber, roomType, passengers }], _index) => (
                <div className="room-item border rounded-md p-4 mb-4" key={_index}>
                  <div className="mb-3 flex gap-x-3">
                    <span>Loại phòng</span>
                    <Tag color={getRoomingColor(roomType)} bordered={false}>
                      {getRoomingName(roomType)}
                    </Tag>
                  </div>
                  {passengers.map((pax, _paxIndex) => (
                    <div className={`pax-item flex ${_paxIndex !== 0 ? "border-t pt-3 mt-3" : null}`} key={pax.paxId}>
                      <div className="w-[160px]">
                        <div className="text-xs text-gray-500">Hành khách</div>
                        {getPassengerType(pax.type)}
                      </div>
                      <div className="w-[160px]">
                        <div className="text-xs text-gray-500">Danh xưng</div>
                        {getPassengerTitle(pax.paxTitle)}
                      </div>
                      <div className="w-[160px]">
                        <div className="text-xs text-gray-500">Họ</div>
                        {pax.paxLastname ? pax.paxLastname : "--"}
                      </div>
                      <div className="w-[160px]">
                        <div className="text-xs text-gray-500">Tên đệm và tên</div>
                        {pax.paxMiddleFirstName ? pax.paxMiddleFirstName : "--"}
                      </div>
                      <div className="w-[160px]">
                        <div className="text-xs text-gray-500">Giới tính</div>
                        {getPassengerGender(pax.paxGender)}
                      </div>
                      <div className="flex-1">
                        <div className="text-xs text-gray-500">Hồ sơ giấy tờ</div>
                        <div>
                          {pax.documents?.map(({ documentName, status }, _index) => (
                            <div key={_index} className="flex items-center gap-x-3">
                              <div>{documentName}</div>-
                              <span className="text-xs">
                                {status === "FINISHED"
                                  ? "Đã nộp"
                                  : status === "HANDOVERED"
                                  ? "Đã bàn giao"
                                  : status === "NEW"
                                  ? "Mới"
                                  : status === "NOT_FINISHED"
                                  ? "Chưa nộp"
                                  : "Unknown"}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))
            : null}
        </div>
      </div>
    </div>
  );
};
export default OperationInformation;
