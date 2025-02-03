import { PassengerListFormData } from "../passenger-information/_components/PassengersInformationForm";
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

  const onSetPassengerInformationBooking = (passengerFormsData: PassengerListFormData) => {
    setBookingInformation((prev) => {
      let newBookingItems = prev.bookingInfo?.bookingItems || [];

      newBookingItems = newBookingItems.reduce<BookingItem[]>((acc, item) => {
        const paxFormItem = passengerFormsData.find(
          (paxForm) => paxForm.index === item.index && paxForm.type === item.type,
        );
        if (paxFormItem) {
          acc = [...acc, { ...item, passengerInformation: paxFormItem.data }];
        }
        return acc;
      }, []);

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
    onSetPassengerInformationBooking,
  };
};
export default usePassenger;
