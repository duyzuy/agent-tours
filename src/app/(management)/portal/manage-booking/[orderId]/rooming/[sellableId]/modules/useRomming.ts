import { useUpdateRoomingMutation } from "@/mutations/managements/booking";
import { useState } from "react";
import { RoomingFormData } from "./rooming.interface";
import { RoomingPayload, RoomingType } from "@/models/management/booking/rooming.interface";
import useMessage from "@/hooks/useMessage";
import { useQueryClient } from "@tanstack/react-query";
import { queryCore } from "@/queries/var";
const useRooming = () => {
  const { mutate: makeUpdate } = useUpdateRoomingMutation();
  const initFormData = new RoomingFormData(undefined, 0, []);
  const [formData, setFormdata] = useState(initFormData);
  const queryClient = useQueryClient();

  const message = useMessage();
  const onChangeRooming = () => {};

  const onChangeRoomingType = (roomingType: RoomingType) => {
    setFormdata((oldData) => ({
      ...oldData,
      roomingType: roomingType,
      roomingItems: [],
    }));
  };

  const onSubmit = (data: RoomingFormData, cb?: () => void) => {
    console.log(data);

    let payload: RoomingPayload = { roomingList: [] };

    const roomingItems = data.roomingItems.reduce<RoomingPayload["roomingList"]>((acc, item) => {
      acc = [
        ...acc,
        {
          bookingPaxId: item.bookingPaxId,
          roomingListNumber: data.roomingNumber,
          roomingListType: data.roomingType,
        },
      ];

      return acc;
    }, []);

    payload = {
      roomingList: [...roomingItems],
    };

    makeUpdate(payload, {
      onSuccess(data, variables, context) {
        queryClient.invalidateQueries({ queryKey: [queryCore.GET_ROOMING_LIST] });
        message.success("Cập nhật thành công.");
        cb?.();
      },
      onError(error, variables, context) {
        console.log(error);
        message.error(error.message);
      },
    });
  };

  return {
    onChangeRoomingType,
    onChangeRooming,
    onSubmit,
  };
};
export default useRooming;
