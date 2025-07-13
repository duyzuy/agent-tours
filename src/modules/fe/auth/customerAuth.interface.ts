import {
  ICusTomerRegisterPayload,
  ICustomerForgotPasswordPayload,
  ICustomerLoginPayload,
  ICustomerSetPasswordPayload,
} from "@/models/customerAuth.interface";

export class CustomerRegisterFormData implements ICusTomerRegisterPayload {
  faceBookId?: string;
  googleId?: string;
  username?: string;
  email?: string;
  phoneNumber?: string;
  password?: string;
  passwordConfirm?: string;

  constructor(
    faceBookId: string | undefined,
    googleId: string | undefined,
    username: string | undefined,
    email: string | undefined,
    phoneNumber: string | undefined,
    password: string | undefined,
    passwordConfirm: string | undefined,
  ) {
    this.faceBookId = faceBookId;
    this.googleId = googleId;
    this.username = username;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.password = password;
    this.passwordConfirm = passwordConfirm;
  }
}

export class CustomerLoginFormData implements ICustomerLoginPayload {
  faceBookId?: string;
  googleId?: string;
  username?: string;
  email?: string;
  phoneNumber?: string;
  password?: string;

  constructor(
    faceBookId: string | undefined,
    googleId: string | undefined,
    username: string | undefined,
    email: string | undefined,
    phoneNumber: string | undefined,
    password: string | undefined,
  ) {
    this.faceBookId = faceBookId;
    this.googleId = googleId;
    this.username = username;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.password = password;
  }
}

export class CustomerForgotPasswordFormData implements ICustomerForgotPasswordPayload {
  email: string;
  userName: string;

  constructor(email: string, userName: string) {
    this.userName = userName;
    this.email = email;
  }
}

export class CustomerCreatePasswordFormData implements ICustomerSetPasswordPayload {
  id?: number;
  password?: string;
  passwordConfirm?: string;

  constructor(id: number, password: string, passwordConfirm: string) {
    this.id = id;
    this.password = password;
    this.passwordConfirm = passwordConfirm;
  }
}
