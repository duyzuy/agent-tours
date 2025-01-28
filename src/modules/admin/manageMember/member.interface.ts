import { MemberQueryParams, UpdateMemberPayload } from "@/models/management/member.interface";

export class MemberQueryParamsFormData implements MemberQueryParams {
  requestObject?: { username?: string; email?: string; phoneNumber?: string } | undefined;
  pageCurrent?: number | undefined;
  pageSize?: number | undefined;
  orderBy?: { sortColumn?: string; direction?: "asc" | "desc" } | undefined;
  constructor(
    requestObject: { username?: string; email?: string; phoneNumber?: string } | undefined,
    pageCurrent: number | undefined,
    pageSize: number | undefined,
  ) {
    this.requestObject = requestObject;
    this.pageCurrent = pageCurrent;
    this.pageSize = pageSize;
    this.orderBy = { sortColumn: "recId", direction: "desc" };
  }
}

export class MemberUpdateFormData implements Partial<UpdateMemberPayload> {
  email?: string | undefined;
  phoneNumber?: string | undefined;
  username?: string | undefined;
  recId?: number;
  constructor(
    recId: number | undefined,
    username: string | undefined,
    email: string | undefined,
    phoneNumber: string | undefined,
  ) {
    this.recId = recId;
    this.email = email;
    this.username = username;
    this.phoneNumber = phoneNumber;
  }
}
