import { FeBookingFormData } from "@/store/booking/booking.type";
import { useAppDispatch, useBookingSelector } from "@/store";

type BookingServiceItem = Exclude<FeBookingFormData["bookingInfo"]["bookingSsrWithPax"], undefined>[number];
type PassengerWithConfig = Omit<BookingServiceItem, "inventory" | "stock" | "amount">;

export interface UseBookingServicesProps {
  addService: (
    passengerWithConfigs: PassengerWithConfig[],
    inventory: BookingServiceItem["inventory"],
    stock: BookingServiceItem["stock"],
  ) => void;
}

const useBookingServices = (): UseBookingServicesProps => {
  const bookingInformation = useBookingSelector();
  const dispatch = useAppDispatch();

  const { bookingSsrWithPax } = bookingInformation.bookingInfo;

  const addService: UseBookingServicesProps["addService"] = (passengerWithConfig, inventory, stock) => {
    let newSsrWithPax = [...(bookingSsrWithPax || [])];

    const ssrItemsExcludedOld = newSsrWithPax.filter((item) => {
      if (item.stock && stock && stock.recId === item.stock.recId) {
        return false;
      }
      if (!item.stock && !stock && item.inventory.recId === inventory.recId) {
        return false;
      }
      return true;
    });

    const newServiceItems = passengerWithConfig.reduce<BookingServiceItem[]>((acc, item) => {
      return [
        ...acc,
        {
          paxIndex: item.paxIndex,
          paxType: item.paxType,
          priceConfig: item.priceConfig,
          stock: stock,
          inventory: inventory,
          amount: item.priceConfig[item.paxType],
        },
      ];
    }, []);

    dispatch({
      type: "ADD_SERVICE_LIST",
      payload: [...ssrItemsExcludedOld, ...newServiceItems],
    });
  };

  return {
    addService,
  };
};
export default useBookingServices;
