import { FeProductItem } from "@/models/fe/productItem.interface";
import { useBookingInformation } from "../../hooks/useBookingInformation";
import { EBookingActions } from "../../store/actions/bookingActions";
import { PassengerType } from "@/models/common.interface";
import { useCallback } from "react";
import useMessage from "@/hooks/useMessage";
import { PriceConfig } from "@/models/management/core/priceConfig.interface";
import { FeBookingInformation } from "./booking.interface";
import { useRouter } from "@/utils/navigation";
import { FePassengerInformationFormData } from "../passenger/modules/passegner.interface";

const useSetProductItemAndPaxQuantity = () => {
  const [bookingInformation, dispatch] = useBookingInformation();

  const message = useMessage();
  const router = useRouter();

  const {
    bookingInfo: { product },
    bookingPassenger,
  } = bookingInformation;
  const setProductItem = (product?: FeProductItem) => {
    dispatch({ type: EBookingActions.SET_PRODUCT, payload: product });
  };

  const getProductFlatPricings = useCallback(() => {
    let items: FeProductItem["configs"] = [];

    product?.configs.forEach((configItem) => {
      Array.from({ length: configItem.open }, (v, k) => {
        items = [...items, configItem];
      });
    });
    return items.sort((a, b) => a.adult - b.adult);
  }, [product]);

  const getTotalAmountPax = () => {
    const { infant, ...restBookingPax } = bookingPassenger;
    return Object.entries(restBookingPax).reduce((acc, [k, v]) => (acc += v), 0);
  };
  const resetQuantityPassenger = () => {
    dispatch({
      type: EBookingActions.RESET_PASSENGER_QUANTITY,
    });
  };
  const setQuantityPassenger = (passenger: { type: PassengerType; quantity: number; action: "plus" | "minus" }) => {
    const { type, quantity, action } = passenger;
    let newPassengers = { ...bookingPassenger };

    if (!product) {
      throw new Error("Product invalid");
    }
    const totalAmountPax = getTotalAmountPax();

    if (totalAmountPax === product.open && action === "plus") {
      message.error("Số lượng vé không đủ.");
      return;
    }

    switch (type) {
      case PassengerType.ADULT: {
        if ((action === "plus" && quantity > 9) || (action === "plus" && quantity + bookingPassenger["child"] > 9)) {
          message.error("Số lượng hành khách tối đa là 9");
          return;
        } else {
          newPassengers = {
            ...newPassengers,
            [PassengerType.ADULT]: quantity,
          };
        }
        break;
      }
      case PassengerType.CHILD: {
        if ((action === "plus" && quantity > 9) || (action === "plus" && quantity + bookingPassenger["adult"] > 9)) {
          message.error("Số lượng hành khách tối đa là 9");
          return;
        } else {
          newPassengers = {
            ...newPassengers,
            [PassengerType.CHILD]: quantity,
          };
        }
        break;
      }
      case PassengerType.INFANT: {
        if (action === "plus" && quantity > bookingPassenger["adult"]) {
          message.error("Số lượng trẻ em tối đa bằng người lớn");
          return;
        } else {
          newPassengers = {
            ...newPassengers,
            [PassengerType.INFANT]: quantity,
          };
        }
        break;
      }
    }

    dispatch({
      type: EBookingActions.SET_PASSENGER_QUANTITY,
      payload: newPassengers,
    });
  };
  const initBookingDetailItemsThenGoToPassengerInfo = () => {
    const totalAmountPax = getTotalAmountPax();
    let pricingListPicker = getProductFlatPricings();

    if (!product) {
      throw new Error("Product invalid");
    }
    if (totalAmountPax > product.open || totalAmountPax <= 0) {
      message.error("Số lượng không hợp lệ.");
      return;
    }

    if (!pricingListPicker.length) {
      message.error("Số lượng không hợp lệ.");
      return;
    }

    let bookingDetailItemBookedList: Required<FeBookingInformation>["bookingInfo"]["bookingDetails"] = [];
    let _index = 0;
    Object.entries(bookingPassenger).forEach(([type, amount]) => {
      for (let i = 0; i < amount; i++) {
        const priceConfigItem = pricingListPicker.shift();
        bookingDetailItemBookedList = priceConfigItem
          ? [
              ...bookingDetailItemBookedList,
              {
                priceConfig: priceConfigItem,
                index: _index,
                type: type as PassengerType,
                amount: priceConfigItem[type as PassengerType],
                pax: undefined,
                ssr: [],
              },
            ]
          : [...bookingDetailItemBookedList];
        _index++;
      }
    });

    dispatch({
      type: EBookingActions.SET_PRODUCT_DETAIL_ITEMS,
      payload: bookingDetailItemBookedList,
    });
    router.push("/passenger");
  };
  const initPassengerInfoThenGoToPassenger = () => {
    const totalAmountPax = getTotalAmountPax();

    if (!product) {
      throw new Error("Product invalid");
    }
    if (totalAmountPax > product.open || totalAmountPax <= 0) {
      message.error("Số lượng không hợp lệ.");
      return;
    }

    let passengersInformation: Required<FeBookingInformation>["bookingInfo"]["passengers"] = [];
    let _index = 0;
    Object.entries(bookingPassenger).forEach(([type, quantity]) => {
      for (let i = 0; i < quantity; i++) {
        passengersInformation = [
          ...passengersInformation,
          {
            index: _index,
            type: type as PassengerType,
            info: new FePassengerInformationFormData(
              undefined,
              undefined,
              "",
              "",
              undefined,
              undefined,
              undefined,
              "",
              "",
              "",
              "",
              "",
              undefined,
            ),
          },
        ];

        _index++;
      }
    });

    dispatch({
      type: EBookingActions.INIT_PASSENGERS_INFORMATION_FORMDATA,
      payload: passengersInformation,
    });
    router.push("/passenger");
  };
  return {
    setProductItem,
    setQuantityPassenger,
    resetQuantityPassenger,
    initBookingDetailItemsThenGoToPassengerInfo,
    initPassengerInfoThenGoToPassenger,
  };
};
export default useSetProductItemAndPaxQuantity;
