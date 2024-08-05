import useMessage from "@/hooks/useMessage";
import useBooking from "../hooks/useBooking";
import { PassengerType } from "@/models/common.interface";
import { PriceConfig } from "@/models/management/core/priceConfig.interface";
import { BookingInformation, IBookingItem } from "./bookingInformation.interface";
import { useRouter } from "next/navigation";
import { ESellChannel } from "@/constants/channel.constant";
import { initBookingData } from "../BookingProvider";
import { IProductItem } from "@/models/management/booking/productItem.interface";
const useSelectProductTour = () => {
  const message = useMessage();
  const [bookingInformation, setBookingInformation] = useBooking();
  const router = useRouter();

  const onNext = () => {
    const { passengerPriceConfigs } = bookingInformation;

    if (passengerPriceConfigs["adult"].length === 0 && passengerPriceConfigs["child"].length === 0) {
      message.error("Chưa chọn số lượng hành khách.");
      return;
    }

    const allBookingItems = Object.keys(passengerPriceConfigs).reduce<
      {
        type: PassengerType;
        item: PriceConfig;
      }[]
    >((totalConfigItems, paxType) => {
      const totalBookingItemsPax = passengerPriceConfigs[paxType as PassengerType].reduce<
        {
          type: PassengerType;
          item: PriceConfig;
        }[]
      >((configItems, item) => {
        const priceConfigItems = Array.from({ length: item.qty }, (_, index) => ({
          type: paxType as PassengerType,
          item: item.priceConfig,
        }));

        configItems = [...configItems, ...priceConfigItems];
        return configItems;
      }, []);
      totalConfigItems = [...totalConfigItems, ...totalBookingItemsPax];
      return totalConfigItems;
    }, []);

    const bookingItems = allBookingItems.reduce<IBookingItem[]>((acc, paxItem, _index) => {
      acc = [
        ...acc,
        {
          index: _index,
          item: paxItem.item,
          type: paxItem.type,
          passengerInformation: {},
          ssr: [],
        },
      ];

      return acc;
    }, []);

    setBookingInformation((prev) => ({
      ...prev,
      bookingInfo: {
        ...prev.bookingInfo,
        bookingItems: [...bookingItems],
      },
    }));
    router.push("/portal/booking/payment");
  };
  const onSetProductItem = (productItem: IProductItem) => {
    setBookingInformation((prev) => ({
      ...prev,
      bookingInfo: {
        ...prev.bookingInfo,
        product: productItem,
      },
    }));
  };
  const onSetQuantityPassenger = (passengers: BookingInformation["searchBooking"]["passengers"]) => {
    setBookingInformation((prev) => ({
      ...prev,
      searchBooking: {
        ...prev.searchBooking,

        passengers: {
          ...passengers,
        },
      },
    }));
  };
  const onChangeSellChannel = (newChannel: ESellChannel) => {
    setBookingInformation((prev) => ({
      ...prev,
      agentUserId: undefined,
      passengerPriceConfigs: { adult: [], child: [], infant: [] },
      channel: newChannel,
    }));
  };
  const onSetPassengerConfig = (type: PassengerType, quantity: number, priceConfig: PriceConfig) => {
    setBookingInformation((oldData) => {
      let newPassengerPriceConfigs = { ...oldData.passengerPriceConfigs };

      const indexOfPriceConfigPax = newPassengerPriceConfigs[type].findIndex(
        (item) => item.priceConfig.recId === priceConfig.recId,
      );

      if (indexOfPriceConfigPax === -1) {
        newPassengerPriceConfigs = {
          ...newPassengerPriceConfigs,
          [type]: [
            ...newPassengerPriceConfigs[type],
            {
              priceConfig: priceConfig,
              qty: 1,
            },
          ],
        };
      } else {
        let newPaxTourPriceConfig = newPassengerPriceConfigs[type];

        if (quantity === 0) {
          newPaxTourPriceConfig.splice(indexOfPriceConfigPax, 1);
        } else {
          newPaxTourPriceConfig.splice(indexOfPriceConfigPax, 1, {
            ...newPaxTourPriceConfig[indexOfPriceConfigPax],
            qty: quantity,
          });
        }

        newPassengerPriceConfigs = {
          ...newPassengerPriceConfigs,
          [type]: [...newPaxTourPriceConfig],
        };
      }

      return {
        ...oldData,
        passengerPriceConfigs: {
          ...newPassengerPriceConfigs,
        },
      };
    });
  };
  const onReselectProduct = () => {
    setBookingInformation((prev) => ({
      ...prev,
      bookingInfo: {
        ...prev.bookingInfo,
        product: undefined,
        bookingItems: [],
      },
      passengerPriceConfigs: {
        adult: [],
        child: [],
        infant: [],
      },
      searchBooking: {
        ...prev.searchBooking,
        passengers: { adult: 1, child: 0, infant: 0 },
      },
    }));
  };

  return {
    onSetProductItem,
    onNext,
    onSetQuantityPassenger,
    onReselectProduct,
    onSetPassengerConfig,
    onChangeSellChannel,
  };
};
export default useSelectProductTour;
