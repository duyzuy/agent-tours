import { ICustomerProfile } from "@/models/fe/profile.interface";

export interface IUserManager {
  profile?: ICustomerProfile;
}
export class UserManagerData implements IUserManager {
  profile?: ICustomerProfile;
  constructor(profile: ICustomerProfile | undefined) {
    this.profile = profile;
  }
}
