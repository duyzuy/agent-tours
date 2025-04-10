import useMessage from "@/hooks/useMessage";

import { usePortalBookingServiceManager } from "./store/context";
import { PassengerType } from "@/models/common.interface";
import { PriceConfig } from "@/models/management/core/priceConfig.interface";
import { PortalBookingServiceFormData } from "./bookingInformation.interface";
import { useRouter } from "next/navigation";
import { ESellChannel } from "@/constants/channel.constant";
import { IProductService } from "@/models/management/booking/product.interface";
import { initPortalBookingServiceManagerState } from "./store/reducer";

type ProductItem = Exclude<PortalBookingServiceFormData["bookingInfo"], undefined>["bookingSsr"][number];
const useSelectProductTour = () => {
  const message = useMessage();
  const [portalBookingManagerInfo, setBookingInformation] = usePortalBookingServiceManager();
  const router = useRouter();

  const onNext = () => {
    // const { passengerPriceConfigs } = portalBookingManagerInfo;
    // if (passengerPriceConfigs["adult"].length === 0 && passengerPriceConfigs["child"].length === 0) {
    //   message.error("Chưa chọn số lượng hành khách.");
    //   return;
    // }
    // type BookingItemType = {
    //   type: PassengerType;
    //   item: PriceConfig;
    // };
    // const allBookingItems = Object.keys(passengerPriceConfigs).reduce<BookingItemType[]>(
    //   (totalConfigItems, paxType) => {
    //     const totalBookingItemsPax = passengerPriceConfigs[paxType as PassengerType].reduce<BookingItemType[]>(
    //       (configItems, item) => {
    //         const priceConfigItems = Array.from({ length: item.qty }, (_, index) => ({
    //           type: paxType as PassengerType,
    //           item: item.priceConfig,
    //         }));
    //         return [...configItems, ...priceConfigItems];
    //       },
    //       [],
    //     );
    //     return [...totalConfigItems, ...totalBookingItemsPax];
    //   },
    //   [],
    // );
    // const bookingItems = allBookingItems.reduce<ProductItem[]>((acc, paxItem, _index) => {
    //   acc = [
    //     ...acc,
    //     {
    //       index: _index,
    //       configItem: paxItem.item,
    //       type: paxItem.type,
    //       passengerInformation: undefined,
    //     },
    //   ];
    //   return acc;
    // }, []);
    // setBookingInformation((prev) => ({
    //   ...prev,
    //   bookingInfo: {
    //     ...prev.bookingInfo,
    //     bookingItems: [...bookingItems],
    //   },
    // }));
    // router.push("/portal/booking/payments");
  };

  const onSetProductItem = (productItem: IProductService) => {
    setBookingInformation((prev) => ({
      ...prev,
      bookingInfo: {
        ...prev.bookingInfo,
        product: productItem,
      },
    }));
  };

  const onChangeSellChannel = (newChannel: ESellChannel) => {
    setBookingInformation((prev) => ({
      ...initPortalBookingServiceManagerState,
      productList: prev.productList,
      searchBooking: prev.searchBooking,
      channel: newChannel,
    }));
  };

  const onReselectProduct = () => {
    setBookingInformation((prev) => ({
      ...initPortalBookingServiceManagerState,
      productList: prev.productList,
      searchBooking: prev.searchBooking,
      channel: prev.channel,
    }));
  };

  return {
    onSetProductItem,
    onNext,
    onReselectProduct,
    onChangeSellChannel,
  };
};
export default useSelectProductTour;
