import { usePortalBookingManager } from "../context";
import { PortalBookingManagerFormData } from "./bookingInformation.interface";

type BookingItem = PortalBookingManagerFormData["bookingInfo"]["bookingItems"][number];

const usePassenger = () => {
  const [_, setBookingInformation] = usePortalBookingManager();

  const onSetPassengerInformation = ({ index, data }: { index: number; data: BookingItem["passengerInformation"] }) => {
    setBookingInformation((prev) => {
      let newBookingItems = prev.bookingInfo?.bookingItems || [];

      const bookingIndex = newBookingItems.findIndex((item) => item.index === index);

      if (bookingIndex !== -1) {
        newBookingItems.splice(bookingIndex, 1, {
          ...newBookingItems[bookingIndex],
          passengerInformation: { ...data },
        });
      }

      return {
        ...prev,
        bookingInfo: {
          ...prev.bookingInfo,
          bookingItems: [...newBookingItems],
        },
      };
    });
  };

  return {
    onSetPassengerInformation,
  };
};
export default usePassenger;
