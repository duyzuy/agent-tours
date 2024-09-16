import { BaseResponse } from "../common.interface";

export type LeadingStatus = "NEW" | "CALLBACKLATER" | "WIN" | "LOSS" | "NORESPONSE" | "BLACKLIST";
export type LeadingSource =
  | "NEW"
  | "RETURNED"
  | "FACEBOOK"
  | "TIKTOK"
  | "ZALO"
  | "TELESALE"
  | "SMS"
  | "NEWSPAPER"
  | "POSTER"
  | "FLYER"
  | "OTHER";
export interface Leading {
  recId: number;
  phone: string;
  paxName: string;
  remark: string;
  source: LeadingSource;
  status: LeadingStatus;
}

export interface LeadingPayload {
  recId?: number;
  phone?: string;
  paxName?: string;
  remark?: string;
  source?: LeadingSource;
  status?: LeadingStatus;
}

export interface LeadingQueryParams {
  requestObject?: {
    status?: LeadingStatus;
    phone?: string;
    source?: LeadingSource;
    listStatus?: LeadingStatus[];
    listSource?: LeadingSource[];
  };
  pageSize?: number;
  pageCurrent?: number;
}

export interface LeadingListResponse extends BaseResponse<Leading[]> {}
export interface LeadingResponse extends BaseResponse<Leading> {}

// "phone": "123456",  //nullable ? contains search
// "status": "NEW",  //nullable
// "source": "", //nullable
// "listStatus": ["NEW", "CALLBACKLATER"], //nullable
// "listSource": [] //nullable
