import { BaseResponse } from "@/models/common.interface";

export interface AdminLoginPayload {
  userId: string;
  username: string;
  password: string;
}

export interface AdminLoginResponse extends BaseResponse<string> {}
