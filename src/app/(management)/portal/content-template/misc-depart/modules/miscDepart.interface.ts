import { Status } from "@/models/common.interface";
import { MiscDepartPayload } from "@/models/management/cms/miscDepartLocation.interface";

export class MiscDepartLocationFormData implements MiscDepartPayload {
  id?: number;
  key?: string; //không thể edit
  name_vi?: string;
  name_en?: string;
  status?: Status;

  constructor(
    id: number | undefined,
    key: string | undefined,
    name_vi: string | undefined,
    name_en: string | undefined,
    status: Status | undefined,
  ) {
    this.id = id;
    this.key = key;
    this.name_vi = name_vi;
    this.name_en = name_en;
    this.status = status;
  }
}
