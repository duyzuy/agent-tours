import { useSplitBooking } from "../context";
import { SplitBookingFormData } from "./splitBooking.interface";
const useSelectPassenger = () => {
  const [splitState, setSplitBooking] = useSplitBooking();

  const addOrRemovePassenger = (item: SplitBookingFormData["bookingDetails"][number]) => {
    setSplitBooking((oldData) => {
      let newItems = [...oldData.bookingDetails];
      const itemIndex = newItems.findIndex((bkItem) => bkItem.recId === item.recId);
      if (itemIndex !== -1) {
        newItems.splice(itemIndex, 1);
      } else {
        newItems = [...newItems, item];
      }
      return {
        ...oldData,
        bookingDetails: [...newItems],
      };
    });
  };

  return {
    passengers: splitState.bookingDetails,
    addOrRemovePassenger,
  };
};
export default useSelectPassenger;
