import { Status } from "@/models/common.interface";
import { MiscDocumentPayload } from "@/models/management/cms/miscDocument.interface";

export class MiscDocumentFormData implements MiscDocumentPayload {
  id?: number;
  name?: string;
  descriptions?: string;
  link?: string;
  status?: Status;

  constructor(
    id: number | undefined,
    name: string | undefined,
    descriptions: string | undefined,
    link: string | undefined,
    status: Status | undefined,
  ) {
    this.id = id;
    this.name = name;
    this.descriptions = descriptions;
    this.link = link;
    this.status = status;
  }
}
