import { ICustomerProfile } from "@/models/fe/profile.interface";

export type CustomerAuthAction =
  | {
      type: "SET_PROFILE";
      payload: ICustomerProfile;
    }
  | {
      type: "CLEAR_PROFILE";
    };
