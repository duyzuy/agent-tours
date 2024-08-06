import useBooking from "../../hooks/useBooking";

import useMessage from "@/hooks/useMessage";
import { PassengerType } from "@/models/common.interface";
import { IBookingItem, IPricingBookingItem } from "../bookingInformation.interface";
import { PriceConfig } from "@/models/management/core/priceConfig.interface";
type TBookingServicePricingItem = {
  bookingItem: IBookingItem;
  pricingItems: {
    qty: number;
    item: PriceConfig;
  }[];
};
const useTourServiceAddOn = () => {
  const [bookingInformation, setBookingInformation] = useBooking();

  const { bookingInfo, serviceList } = bookingInformation;
  const message = useMessage();

  const getTotalQuantityOfPricingItemInBooking = (recId: number, sellableDetailsId: number) => {
    let totalQtyOfItem = 0;

    bookingInfo?.bookingItems?.forEach((bkItem) => {
      const serviceItem = bkItem.ssr.find(
        (ssrItem) => ssrItem.sellableDetailsId === sellableDetailsId && ssrItem.priceConfigRecId === recId,
      );

      if (serviceItem) {
        totalQtyOfItem = totalQtyOfItem + serviceItem.qty;
      }
    });
    return totalQtyOfItem;
  };

  const onAddService = (
    bookingIndex: number,
    action: "minus" | "plus",
    sellableDetailsId: number,
    passengerType: PassengerType,
  ) => {
    let newBookingItems = [...(bookingInfo?.bookingItems || [])];

    const bookingItem = newBookingItems.find((item) => item.index === bookingIndex);
    if (!bookingItem) {
      throw new Error("Invalid bookingindex");
    }
    let newSSrOfBookingItem = [...bookingItem.ssr];
    if (action === "plus") {
      const pricingsOfServiceItem =
        serviceList
          ?.filter((serviceItem) => serviceItem.sellableDetailsId === sellableDetailsId)
          .sort((a, b) => a.adult - b.adult) || [];

      let outOfStock = true;
      for (let i = 0; i < pricingsOfServiceItem.length; i++) {
        const pricingPickedAmount = getTotalQuantityOfPricingItemInBooking(
          pricingsOfServiceItem[i].recId,
          sellableDetailsId,
        );
        const remainOfItem = pricingsOfServiceItem[i].open - pricingPickedAmount;

        if (remainOfItem === 0) continue;

        outOfStock = false;

        const indexOfSsr = newSSrOfBookingItem.findIndex(
          (item) =>
            item.sellableDetailsId === sellableDetailsId && item.priceConfigRecId === pricingsOfServiceItem[i].recId,
        );
        if (indexOfSsr !== -1) {
          newSSrOfBookingItem.splice(indexOfSsr, 1, {
            ...newSSrOfBookingItem[indexOfSsr],
            qty: newSSrOfBookingItem[indexOfSsr].qty + 1,
          });
        } else {
          newSSrOfBookingItem = [
            ...newSSrOfBookingItem,
            {
              sellableDetailsId: sellableDetailsId,
              priceConfigRecId: pricingsOfServiceItem[i].recId,
              item: pricingsOfServiceItem[i],
              type: passengerType,
              qty: 1,
            },
          ];
        }

        break;
      }
      if (outOfStock) {
        message.info("Số lượng dịch vụ đã đạt mức tối đa");
        return;
      }
    }

    if (action === "minus") {
      const servicePricingsInBookingItem = newSSrOfBookingItem
        .filter((ssrItem) => ssrItem.sellableDetailsId === sellableDetailsId)
        .sort((a, b) => a.item.adult - b.item.adult);
      if (servicePricingsInBookingItem.length === 0) {
        message.error("Số lượng sản phẩm không nhỏ hơn 0");
        return;
      }

      /**
       * Get last item
       */
      const lastPricingItem = servicePricingsInBookingItem[servicePricingsInBookingItem.length - 1];
      const indexOfPricingItem = newSSrOfBookingItem.findIndex(
        (ssrBkItem) => ssrBkItem.priceConfigRecId === lastPricingItem.priceConfigRecId,
      );
      if (newSSrOfBookingItem[indexOfPricingItem].qty === 1) {
        newSSrOfBookingItem.splice(indexOfPricingItem, 1);
      } else {
        newSSrOfBookingItem.splice(indexOfPricingItem, 1, {
          ...newSSrOfBookingItem[indexOfPricingItem],
          qty: newSSrOfBookingItem[indexOfPricingItem].qty - 1,
        });
      }
    }
    newBookingItems.splice(bookingIndex, 1, {
      ...newBookingItems[bookingIndex],
      ssr: [...newSSrOfBookingItem],
    });
    setBookingInformation((prev) => ({
      ...prev,
      bookingInfo: {
        ...prev.bookingInfo,
        bookingItems: [...newBookingItems],
      },
    }));
  };

  const onSetServiceItems = (sellableDetailsId: number, serviceItems: TBookingServicePricingItem[]) => {
    console.log({ sellableDetailsId, serviceItems });
    setBookingInformation((oldData) => {
      let newBookingItems = [...(oldData.bookingInfo?.bookingItems || [])];

      newBookingItems = newBookingItems.reduce<IBookingItem[]>((accBkItems, bkItem) => {
        const serviceOfBookingItem = serviceItems.find((svItem) => svItem.bookingItem.index === bkItem.index);

        if (serviceOfBookingItem) {
          let newSSrOfBookingItem = [...bkItem.ssr];

          serviceOfBookingItem.pricingItems.forEach((pricingItem) => {
            const indexPricingItemInServiceItem = newSSrOfBookingItem.findIndex(
              (item) =>
                item.sellableDetailsId === sellableDetailsId && item.priceConfigRecId === pricingItem.item.recId,
            );

            if (indexPricingItemInServiceItem !== -1) {
              if (pricingItem.qty === 0) {
                newSSrOfBookingItem.splice(indexPricingItemInServiceItem, 1);
              } else {
                newSSrOfBookingItem.splice(indexPricingItemInServiceItem, 1, {
                  ...newSSrOfBookingItem[indexPricingItemInServiceItem],
                  qty: pricingItem.qty,
                });
              }
            } else {
              newSSrOfBookingItem = [
                ...newSSrOfBookingItem,
                {
                  sellableDetailsId: sellableDetailsId,
                  priceConfigRecId: pricingItem.item.recId,
                  item: pricingItem.item,
                  qty: pricingItem.qty,
                  type: serviceOfBookingItem.bookingItem.type,
                },
              ];
            }
          });
          bkItem = { ...bkItem, ssr: newSSrOfBookingItem };
        }
        accBkItems = [...accBkItems, bkItem];

        return accBkItems;
      }, []);

      return {
        ...oldData,
        bookingInfo: {
          ...oldData.bookingInfo,
          bookingItems: [...newBookingItems],
        },
      };
    });
  };
  const getSSrItem = (serviceItems: TBookingServicePricingItem[]) => {};
  return { onAddService, onSetServiceItems };
};
export default useTourServiceAddOn;
