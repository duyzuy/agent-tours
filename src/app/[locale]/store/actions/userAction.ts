import { ICustomerProfile } from "@/models/fe/profile.interface";

export enum EUserActions {
  INIT_PROFILE = "INIT_PROFILE",
  CLEAR_PROFILE = "CLEAR_PROFILE",
}

export type UserActions =
  | {
      type: EUserActions.INIT_PROFILE;
      payload: ICustomerProfile;
    }
  | {
      type: EUserActions.CLEAR_PROFILE;
      payload?: any;
    };
