import { useUpdateRoomingMutation, useHandOverRoomingMutation } from "@/mutations/managements/operation";
import { useState } from "react";
import { RoomingFormData, RoomingHandOverFormData } from "./rooming.interface";
import { RoomingItem, RoomingPayload, RoomingType } from "@/models/management/booking/rooming.interface";
import { PassengerType } from "@/models/common.interface";
import useMessage from "@/hooks/useMessage";
import { useQueryClient } from "@tanstack/react-query";
import { queryCore } from "@/queries/var";

const useRooming = (roomingItems: RoomingItem[]) => {
  const { mutate: updateRoom } = useUpdateRoomingMutation();
  const { mutate: handOverRoom } = useHandOverRoomingMutation();

  const initFormData = new RoomingFormData(undefined, 0, []);
  const [formData, setFormdata] = useState(initFormData);

  const queryClient = useQueryClient();
  const message = useMessage();

  const onChangeRooming = (item: RoomingItem) => {
    setFormdata((oldData) => {
      const { roomingItems, roomingType } = oldData;

      if (!roomingType) {
        message.warning("Vui lòng chọn loại phòng trước.");
        return oldData;
      }

      let newRoomingItems = [...roomingItems];

      const indexItem = roomingItems.findIndex((pItem) => pItem.bookingPaxId === item.bookingPaxId);

      const paxCount = roomingItems.filter((item) => item.type !== PassengerType.INFANT).length;
      if (indexItem !== -1) {
        newRoomingItems.splice(indexItem, 1);
      } else {
        if (roomingType === "SINGLE" && paxCount >= 1 && item.type !== PassengerType.INFANT) {
          message.warning("Phòng đơn tối đa 1 người.");
          return oldData;
        }
        if (
          (roomingType === "DOUBLE" && paxCount >= 2 && item.type !== PassengerType.INFANT) ||
          (roomingType === "TWIN" && paxCount >= 2 && item.type !== PassengerType.INFANT)
        ) {
          message.warning("Phòng tối đa 2 người");
          return oldData;
        }
        if (roomingType === "TRIPLE" && paxCount >= 3 && item.type !== PassengerType.INFANT) {
          message.warning("Phòng tối đa 3 người");
          return oldData;
        }

        newRoomingItems = [...newRoomingItems, item];
      }
      return { ...oldData, roomingItems: [...newRoomingItems] };
    });
  };

  const genrateRoomingNumber = () => {
    const currentRoomingNumberList = roomingItems.reduce<number[]>((acc, item) => {
      if (!acc.length || !acc.includes(item.roomingListNumber)) {
        acc = [...acc, item.roomingListNumber];
      }
      return acc;
    }, []);

    let nextNum = 1;

    if (currentRoomingNumberList) {
      do {
        nextNum = nextNum + 1;
      } while (currentRoomingNumberList.includes(nextNum));
    }
    return nextNum;
  };

  const onChangeRoomingType = (type: RoomingType) => {
    setFormdata((oldData) => {
      const nextNum = genrateRoomingNumber();
      return {
        ...oldData,
        roomingType: type,
        roomingItems: [],
        roomingNumber: nextNum,
      };
    });
  };

  const onSubmit = (cb?: () => void) => {
    let payload: RoomingPayload = { roomingList: [] };

    const roomingItems = formData.roomingItems.reduce<RoomingPayload["roomingList"]>((acc, item) => {
      return [
        ...acc,
        {
          bookingPaxId: item.bookingPaxId,
          roomingListNumber: formData.roomingNumber,
          roomingListType: formData.roomingType,
        },
      ];
    }, []);

    payload = {
      roomingList: [...roomingItems],
    };

    updateRoom(payload, {
      onSuccess(data, variables, context) {
        queryClient.invalidateQueries({ queryKey: [queryCore.GET_ROOMING_LIST] });
        queryClient.invalidateQueries({ queryKey: [queryCore.GET_OPERATION_STATUS] });
        message.success("Lưu sắp xếp thành công.");
        setFormdata(initFormData);
        cb?.();
      },
      onError(error, variables, context) {
        console.log(error);
        message.error(error.message);
      },
    });
  };

  const onHandOver = (formData: RoomingHandOverFormData, cb?: () => void) => {
    handOverRoom(formData, {
      onSuccess(data, variables, context) {
        queryClient.invalidateQueries({ queryKey: [queryCore.GET_OPERATION_STATUS] });
        message.success("Bàn giao thành công.");
        setFormdata(initFormData);
        cb?.();
      },
      onError(error, variables, context) {
        console.log(error);
        message.error(error.message);
      },
    });
  };

  const clearSelection = () => {
    setFormdata((oldData) => {
      const nextNum = genrateRoomingNumber();
      return {
        ...oldData,
        roomingType: undefined,
        roomingItems: [],
        roomingNumber: nextNum,
      };
    });
  };
  return {
    onChangeRoomingType,
    onChangeRooming,
    onSubmit,
    onHandOver,
    clearSelection,
    roomingData: formData,
  };
};
export default useRooming;
