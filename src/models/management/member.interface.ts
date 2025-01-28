import { BaseQueryParams, BaseResponse } from "../common.interface";

export interface Member {
  recId: number;
  faceBookId: string;
  googleId: string;
  username: string;
  email: string;
  phoneNumber: string;
  webSession: string;
}

export interface MemberQueryParams
  extends BaseQueryParams<{ username?: string; email?: string; phoneNumber?: string }> {}

export interface UpdateMemberPayload {
  recId?: number;
  username?: string;
  email?: string;
  phoneNumber?: string;
}

export interface MemberListResponse extends BaseResponse<Member[]> {}
export interface MemberResponse extends BaseResponse<Member> {}
