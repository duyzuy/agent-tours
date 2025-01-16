import { IBookingSsrItemWithPax } from "./booking.interface";
import { useBookingInformation } from "@/store/hooks";
import { EBookingActions } from "@/store/actions/bookingActions";
type PassengerWithConfig = Omit<IBookingSsrItemWithPax, "inventory" | "stock">;

export interface UseBookingServicesProps {
  addService: (
    passengerWithConfigs: PassengerWithConfig[],
    inventory: IBookingSsrItemWithPax["inventory"],
    stock: IBookingSsrItemWithPax["stock"],
  ) => void;
}

const useBookingServices = (): UseBookingServicesProps => {
  const [{ bookingInfo }, dispatch] = useBookingInformation();

  const { bookingSsrWithPax } = bookingInfo;

  const addService: UseBookingServicesProps["addService"] = (PassengerWithConfig, inventory, stock) => {
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
    const newServiceItems = PassengerWithConfig.reduce<IBookingSsrItemWithPax[]>((acc, item) => {
      return [
        ...acc,
        {
          paxIndex: item.paxIndex,
          paxType: item.paxType,
          priceConfig: item.priceConfig,
          stock: stock,
          inventory: inventory,
        },
      ];
    }, []);

    dispatch({
      type: EBookingActions.ADD_SERVICE_LIST,
      payload: [...ssrItemsExcludedOld, ...newServiceItems],
    });
  };

  return {
    addService,
  };
};
export default useBookingServices;
