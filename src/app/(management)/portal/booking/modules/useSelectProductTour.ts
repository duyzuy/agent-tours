import useMessage from "@/hooks/useMessage";

import { usePortalBookingManager } from "../context";
import { PassengerType } from "@/models/common.interface";
import { PriceConfig } from "@/models/management/core/priceConfig.interface";
import { PortalBookingManagerFormData } from "./bookingInformation.interface";
import { useRouter } from "next/navigation";
import { ESellChannel } from "@/constants/channel.constant";
import { IProductTour } from "@/models/management/booking/product.interface";
import { initPortalBookingManagerState } from "../reducer";

type ProductItem = Exclude<PortalBookingManagerFormData["bookingInfo"], undefined>["bookingItems"][number];
const useSelectProductTour = () => {
  const message = useMessage();
  const [portalBookingManagerInfo, setBookingInformation] = usePortalBookingManager();
  const router = useRouter();

  const onNext = () => {
    const { passengerPriceConfigs } = portalBookingManagerInfo;

    if (passengerPriceConfigs["adult"].length === 0 && passengerPriceConfigs["child"].length === 0) {
      message.error("Chưa chọn số lượng hành khách.");
      return;
    }

    type BookingItemType = {
      type: PassengerType;
      item: PriceConfig;
    };
    const allBookingItems = Object.keys(passengerPriceConfigs).reduce<BookingItemType[]>(
      (totalConfigItems, paxType) => {
        const totalBookingItemsPax = passengerPriceConfigs[paxType as PassengerType].reduce<BookingItemType[]>(
          (configItems, item) => {
            const priceConfigItems = Array.from({ length: item.qty }, (_, index) => ({
              type: paxType as PassengerType,
              item: item.priceConfig,
            }));

            return [...configItems, ...priceConfigItems];
          },
          [],
        );
        return [...totalConfigItems, ...totalBookingItemsPax];
      },
      [],
    );

    const bookingItems = allBookingItems.reduce<ProductItem[]>((acc, paxItem, _index) => {
      acc = [
        ...acc,
        {
          index: _index,
          configItem: paxItem.item,
          type: paxItem.type,
          passengerInformation: undefined,
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
    // router.push("/portal/booking/tour-services");
    router.push("/portal/booking/payments");
  };

  const onSetProductItem = (productItem: IProductTour) => {
    setBookingInformation((prev) => ({
      ...prev,
      bookingInfo: {
        ...prev.bookingInfo,
        product: productItem,
      },
    }));
  };
  const onSetQuantityPassenger = (passengers: PortalBookingManagerFormData["searchBooking"]["passengers"]) => {
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
      ...initPortalBookingManagerState,
      productList: prev.productList,
      searchBooking: prev.searchBooking,
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
      ...initPortalBookingManagerState,
      productList: prev.productList,
      searchBooking: prev.searchBooking,
      channel: prev.channel,
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
