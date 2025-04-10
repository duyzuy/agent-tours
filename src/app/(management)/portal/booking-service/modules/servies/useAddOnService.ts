import { usePortalBookingManager } from "../store/context";

import useMessage from "@/hooks/useMessage";
import { PassengerType } from "@/models/common.interface";
// import { IProductServiceBookingItem } from "../bookingInformation.interface";
import { PortalBookingManagerFormData } from "../bookingInformation.interface";
import { isUndefined } from "lodash";

type BookingSSRItem = PortalBookingManagerFormData["bookingInfo"]["bookingSsr"][number];
export type UseAddOnServiceType = {
  onAddServiceByPax: (
    action: "minus" | "plus",
    qty: number,
    bookingIndex: number,
    configItem: BookingSSRItem["configItem"],
    serviceItem: BookingSSRItem["serviceItem"],
    type: PassengerType,
  ) => void;
  onAddServiceNoPax: (
    action: "minus" | "plus",
    qty: number,
    configItem: BookingSSRItem["configItem"],
    serviceItem: BookingSSRItem["serviceItem"],
  ) => void;
};
const useAddOnService = () => {
  const [bookingInformation, setBookingInformation] = usePortalBookingManager();
  const bookingSsrWithPax = bookingInformation.bookingInfo?.bookingSsrWithPax;
  const bookingSsr = bookingInformation.bookingInfo?.bookingSsr;
  const message = useMessage();

  const getTotalQuantityConfigItem = (configItem: BookingSSRItem["configItem"]) => {
    const qtyWithPax =
      [...(bookingSsrWithPax || []), ...(bookingSsr || [])]
        ?.filter((item) => item.configItem.recId === configItem.recId)
        ?.reduce((acc, item) => {
          return acc + item.qty;
        }, 0) || 0;

    return qtyWithPax;
  };

  const onAddServiceByPax: UseAddOnServiceType["onAddServiceByPax"] = (
    action,
    qty,
    bookingIndex,
    configItem,
    serviceItem,
    type,
  ) => {
    if (qty < 0) {
      message.warning("Số lượng không nhỏ hơn không.");
      return;
    }

    const totalQuantityConfig = getTotalQuantityConfigItem(configItem);

    if (action === "plus" && totalQuantityConfig >= configItem.open) {
      message.warning(`Số lượng sản phẩm chỉ còn ${configItem.open}`);
      return;
    }

    setBookingInformation((oldData) => {
      const { bookingInfo } = oldData;
      const bookingSsrWithPax = bookingInfo?.bookingSsrWithPax;

      const indexConfigItem = bookingSsrWithPax?.findIndex(
        (item) => item.bookingIndex === bookingIndex && item.configItem.recId === configItem.recId,
      );

      let newBookingSsrWithPax = [...(bookingSsrWithPax || [])];

      if (!isUndefined(indexConfigItem) && indexConfigItem !== -1) {
        if (qty === 0) {
          newBookingSsrWithPax.splice(indexConfigItem, 1);
        } else {
          newBookingSsrWithPax.splice(indexConfigItem, 1, {
            ...newBookingSsrWithPax[indexConfigItem],
            qty: qty,
          });
        }
      } else {
        newBookingSsrWithPax = [
          ...newBookingSsrWithPax,
          { bookingIndex: bookingIndex, configItem: configItem, qty: qty, serviceItem: serviceItem, type: type },
        ];
      }

      return {
        ...oldData,
        bookingInfo: {
          ...oldData.bookingInfo,
          bookingSsrWithPax: [...newBookingSsrWithPax],
        },
      };
    });
  };

  const onAddServiceNoPax: UseAddOnServiceType["onAddServiceNoPax"] = (action, qty, configItem, serviceItem) => {
    if (qty < 0) {
      message.warning("Số lượng không nhỏ hơn không.");
      return;
    }

    const totalQuantityConfig = getTotalQuantityConfigItem(configItem);

    if (action === "plus" && totalQuantityConfig >= configItem.open) {
      message.warning(`Số lượng sản phẩm chỉ còn ${configItem.open}`);
      return;
    }

    setBookingInformation((oldData) => {
      const { bookingInfo } = oldData;
      const bookingSsr = bookingInfo?.bookingSsr;

      const indexSSRConfigItem = bookingSsr?.findIndex((item) => item.configItem.recId === configItem.recId);

      let newBookingSsr = [...(bookingSsr || [])];

      if (!isUndefined(indexSSRConfigItem) && indexSSRConfigItem !== -1) {
        if (qty === 0) {
          newBookingSsr.splice(indexSSRConfigItem, 1);
        } else {
          newBookingSsr.splice(indexSSRConfigItem, 1, {
            ...newBookingSsr[indexSSRConfigItem],
            qty: qty,
          });
        }
      } else {
        newBookingSsr = [
          ...newBookingSsr,
          { configItem: configItem, qty: qty, serviceItem: serviceItem, type: PassengerType.ADULT },
        ];
      }

      return {
        ...oldData,
        bookingInfo: {
          ...oldData.bookingInfo,
          bookingSsr: [...newBookingSsr],
        },
      };
    });
  };

  return { onAddServiceByPax, onAddServiceNoPax };
};
export default useAddOnService;
