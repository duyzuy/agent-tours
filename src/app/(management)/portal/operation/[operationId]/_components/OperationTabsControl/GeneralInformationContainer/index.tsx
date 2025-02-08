import { RoomingType } from "@/models/management/booking/rooming.interface";
import { OperationStatusResponse } from "@/models/management/core/operationStatus.interface";
import { Table } from "antd";

import React, { useEffect, useMemo, useState } from "react";
import PassengersRoomingItem, { PassengersRoomingItemProps } from "./PassengersRoomingItem";
import { columns } from "../OrderList/columns";
import { moneyFormatVND } from "@/utils/helper";
import useUpdateOperationDeadlineRemark from "@/modules/admin/operation/hooks/useUpdatePassengerRemark";
export interface GeneralInformationContainerProps {
  passengerList?: OperationStatusResponse["result"]["passengerList"];
  roomingList?: OperationStatusResponse["result"]["roomingList"];
}

const GeneralInformationContainer: React.FC<GeneralInformationContainerProps> = ({ passengerList, roomingList }) => {
  const { mutate: updateRemark, isPending: isLoadingUpdate } = useUpdateOperationDeadlineRemark();

  const handleUpdateRemark: PassengersRoomingItemProps["onSave"] = (data, cb) => {
    updateRemark(data, {
      onSuccess(data, variables, context) {
        cb?.();
      },
    });
  };

  const passengersGroupByRoom = useMemo(() => {
    return passengerList?.reduce<{
      [key: string]: {
        roomType: RoomingType;
        roomNumber: number;
        passengers: OperationStatusResponse["result"]["passengerList"];
      };
    }>((acc, item) => {
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

  return (
    <div className="pt-6">
      <div className="passenger-container">
        <h3 className="text-lg font-semibold mb-6">Danh sách hành khách</h3>
        <div className="passenger-list flex flex-col gap-y-3">
          {passengersGroupByRoom
            ? Object.entries(passengersGroupByRoom)?.map(([key, { roomNumber, roomType, passengers }], _index) => (
                <PassengersRoomingItem
                  key={_index}
                  roomType={roomType}
                  passengers={passengers}
                  onSave={handleUpdateRemark}
                  loading={isLoadingUpdate}
                />
              ))
            : null}
        </div>
      </div>
    </div>
  );
};
export default GeneralInformationContainer;
