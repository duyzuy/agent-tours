import { useAppDispatch, useBookingSelector } from "@/store";
import { PassengerType } from "@/models/common.interface";
import useMessage from "@/hooks/useMessage";
import { useRouter } from "@/utils/navigation";
import { FePassengerInformationFormData } from "./passegner.interface";
import { FeBookingInformation } from "@/store/booking/booking.type";
import { useSession } from "next-auth/react";
import useAuthModal from "../../auth/hooks/useAuthModal";
import { useCallback } from "react";

const useSelectPassengerQuantity = () => {
  const bookingInformation = useBookingSelector();
  const dispatch = useAppDispatch();
  const { showAuthModal } = useAuthModal();
  const session = useSession();
  const message = useMessage();
  const router = useRouter();

  const {
    bookingInfo: { product },
    bookingPassenger,
  } = bookingInformation;

  const getTotalAmountPax = () => {
    const { infant, ...restBookingPax } = bookingPassenger;
    return Object.entries(restBookingPax).reduce((acc, [k, v]) => (acc += v), 0);
  };

  const resetQuantityPassenger = () => {
    dispatch({
      type: "RESET_PASSENGER_QUANTITY",
    });
  };

  const setQuantityPassenger = useCallback(
    (passenger: { type: PassengerType; quantity: number; action: "plus" | "minus" }) => {
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
        type: "SET_PASSENGER_QUANTITY",
        payload: newPassengers,
      });
    },
    [product],
  );

  const initPassengerFormDataThenGoToNext = () => {
    const totalAmountPax = getTotalAmountPax();

    if (session.status === "unauthenticated" || session.status === "loading") {
      showAuthModal();
      return;
    }

    if (!product) {
      throw new Error("!Product invalid");
    }
    if (totalAmountPax > product.open || totalAmountPax <= 0) {
      message.error("Số lượng không hợp lệ.");
      return;
    }

    let passengersFormList: Required<FeBookingInformation>["bookingInfo"]["passengers"] = [];
    let _indexPax = 0;
    Object.entries(bookingPassenger).forEach(([type, quantity]) => {
      for (let i = 0; i < quantity; i++) {
        passengersFormList = [
          ...passengersFormList,
          {
            index: _indexPax,
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
        _indexPax++;
      }
    });

    dispatch({
      type: "INIT_PASSENGERS_INFORMATION_FORMDATA",
      payload: passengersFormList,
    });
    router.push("/passenger");
  };
  return {
    setQuantityPassenger,
    resetQuantityPassenger,
    initPassengerFormDataThenGoToNext,
  };
};
export default useSelectPassengerQuantity;
