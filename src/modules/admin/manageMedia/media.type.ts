import { IMediaFile, IMediaFolder } from "@/models/management/media.interface";
import { MediaFileQueryParamsFormData, MediaFolderQueryParamsFormData } from "./media.interface";

export type MediaManagerState = {
  files: IMediaFile[];
  folders: IMediaFolder[];
  selectedFolder?: Pick<IMediaFolder, "folderName" | "id" | "folderSlug">;
  selectedFiles?: IMediaFile[];
  queryParams: {
    file: MediaFileQueryParamsFormData;
    folder: MediaFolderQueryParamsFormData;
  };
};
export type MediaManagerAction =
  | {
      type: "SET_FOLDER";
      payload?: IMediaFolder;
    }
  | {
      type: "SET_QUERY_FILES";
      payload: MediaFileQueryParamsFormData;
    }
  | {
      type: "SET_QUERY_FOLDER";
      payload: MediaFolderQueryParamsFormData;
    }
  | {
      type: "INIT_FOLDERS";
      payload: any;
    };
