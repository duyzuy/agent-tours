import { IMediaFolderPayload, IMediaFolderUpdatePayload } from "@/models/management/media.interface";

export class MediaFolderUpdateFormData implements IMediaFolderUpdatePayload {
  id?: number;
  folderName?: string;
  oldFolderName?: string;
  parent?: number;
  constructor(
    id: number | undefined,
    folderName: string | undefined,
    oldFolderName: string | undefined,
    parent: number | undefined,
  ) {
    this.id = id;
    this.folderName = folderName;
    this.oldFolderName = oldFolderName;
    this.parent = parent;
  }
}

export class MediaFolderCreateFormData implements IMediaFolderPayload {
  folderName?: string;
  folderSlug?: string;
  parentSlug?: string;
  parent?: number;
  folderPath?: string;
  constructor(
    folderName: string | undefined,
    folderSlug: string | undefined,
    parentSlug: string | undefined,
    parent: number | undefined,
    folderPath: string | undefined,
  ) {
    this.folderName = folderName;
    this.folderSlug = folderSlug;
    this.parentSlug = parentSlug;
    this.parent = parent;
    this.folderPath = folderPath;
  }
}
