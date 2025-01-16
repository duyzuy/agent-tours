import { LanguageContext, UserManagerContext, BookingContext, ModalsManagerContext } from "./context";
import { LanguageContentContainer } from "./type";
import { IUserManager } from "./type/user.type";
import { FeBookingInformation } from "@/app/[locale]/(booking)/modules/booking.interface";
import { IModalManagers } from "../store/type/modal.type";
import { useContext } from "react";

export const useLanguage = () => {
  const languages = useContext(LanguageContext);

  if (!languages) {
    throw new Error("Hook must use under language provider");
  }

  return languages;
};

export const useLanguageSelector = <T>(selector: (state: LanguageContentContainer) => T) => {
  const languages = useContext(LanguageContext);

  if (!languages) {
    throw new Error("Hook must use under language provider");
  }
  const [state, _] = languages;

  return selector(state);
};

export const useUser = () => {
  const languages = useContext(UserManagerContext);

  if (!languages) {
    throw new Error("Hook must use under language provider");
  }

  return languages;
};

export const useUserSelector = <T>(selector: (state: IUserManager) => T) => {
  const userData = useContext(UserManagerContext);

  if (!userData) {
    throw new Error("Hook must use under user provider");
  }
  const [state, _] = userData;

  return selector(state);
};

export const useBookingInformation = () => {
  const booking = useContext(BookingContext);

  if (!booking) {
    throw new Error("Hook must use under Booking provider");
  }

  return booking;
};

/**
 *
 * @param selector
 * @returns
 * Manage booking information state management frontend.
 */
export const useBookingSelector = <T>(selector: (state: FeBookingInformation) => T) => {
  const booking = useContext(BookingContext);

  if (!booking) {
    throw new Error("Hook must use under Booking provider");
  }
  const [state, _] = booking;

  return selector(state);
};

/**
 *
 *
 */

export const useModalManager = () => {
  const modals = useContext(ModalsManagerContext);

  if (!modals) {
    throw new Error("Hook must use under Modal manager provider");
  }

  return modals;
};

export const useModalManagerSelector = <T>(selector: (state: IModalManagers) => T) => {
  const booking = useContext(ModalsManagerContext);

  if (!booking) {
    throw new Error("Hook must use under Booking provider");
  }
  const [state, _] = booking;

  return selector(state);
};
