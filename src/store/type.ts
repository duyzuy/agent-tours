import { CustomerAuthAction } from "./customer/customerActions";
import { BookingActions } from "./booking/bookingActions";
import { LanguageActions } from "./language/languageActions";
import { ModalManagerActions } from "./modal/modalActions";

export type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export type AppActions = CustomerAuthAction | BookingActions | LanguageActions | ModalManagerActions;
