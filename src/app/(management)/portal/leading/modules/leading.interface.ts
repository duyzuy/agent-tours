import {
  LeadingPayload,
  LeadingQueryParams,
  LeadingSource,
  LeadingStatus,
} from "@/models/management/leading.interface";

export class LeadingFormData implements LeadingPayload {
  recId?: number;
  phone?: string;
  paxName?: string;
  remark?: string;
  source?: LeadingSource;
  status?: LeadingStatus;

  constructor(
    recId: number | undefined,
    phone: string | undefined,
    paxName: string | undefined,
    remark: string | undefined,
    source: LeadingSource | undefined,
    status: LeadingStatus | undefined,
  ) {
    this.recId = recId;
    this.phone = phone;
    this.paxName = paxName;
    this.remark = remark;
    this.source = source;
    this.status = status;
  }
}

export class LeadingQueryParamsFormData implements LeadingQueryParams {
  requestObject?: {
    status?: LeadingStatus;
    phone?: string;
    source?: LeadingSource;
    listStatus?: LeadingStatus[];
    listSource?: LeadingSource[];
  };
  pageSize?: number;
  pageCurrent?: number;

  constructor(
    requestObject:
      | {
          status: LeadingStatus | undefined;
          phone: string | undefined;
          source: LeadingSource | undefined;
          listStatus?: LeadingStatus[];
          listSource?: LeadingSource[];
        }
      | undefined,
    pageSize: number | undefined,
    pageCurrent: number | undefined,
  ) {
    this.requestObject = requestObject;
    this.pageSize = pageSize ?? 10;
    this.pageCurrent = pageCurrent ?? 1;
  }
}
