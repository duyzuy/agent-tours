import { Status } from "../common.interface";
import { BaseResponse } from "../common.interface";

export interface FeDestinationSearchConfig {
  id: number;
  cat: "SEARCHCONFIG_LIST";
  name: string;
  engName: string;
  keyType: string;
  regionKey: string;
  subRegionKey: string;
  countryKey: string;
  stateProvinceKey: string;
  order: number;
  status: Status;
}

export interface FeDestinationSearchConfigResponse extends BaseResponse<FeDestinationSearchConfig[]> {}
