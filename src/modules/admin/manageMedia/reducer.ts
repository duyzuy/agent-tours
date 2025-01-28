import { MediaTypes } from "@/models/management/media.interface";
import { MediaManagerAction, MediaManagerState } from "./media.type";
import { MediaFileQueryParamsFormData, MediaFolderQueryParamsFormData } from "./media.interface";

export const initMediaManagerState: MediaManagerState = {
  files: [],
  folders: [],
  selectedFolder: { id: 0, folderName: "Thư mục gốc", folderSlug: "upload" },
  selectedFiles: [],
  queryParams: {
    file: new MediaFileQueryParamsFormData(
      { mediaType: [MediaTypes.FILE, MediaTypes.ICON, MediaTypes.IMAGE], mediaInFolderRecid: 0 },
      1,
      20,
    ),
    folder: new MediaFolderQueryParamsFormData(1, 20, { sortColumn: "id", direction: "desc" }),
  },
};

export const mediaManagerReducer = (mediaState: MediaManagerState, action: MediaManagerAction): MediaManagerState => {
  switch (action.type) {
    case "SET_FOLDER":
      const newFolder = action.payload;
      return { ...mediaState, selectedFolder: newFolder };
    case "SET_ROOT_FOLDER":
      return {
        ...mediaState,
        selectedFolder: initMediaManagerState.selectedFolder,
        queryParams: {
          ...mediaState.queryParams,
          file: {
            ...mediaState.queryParams.file,
            requestObject: {
              ...mediaState.queryParams.file.requestObject,
              mediaInFolderRecid: 0,
            },
          },
        },
      };

    case "SET_QUERY_FILES":
      const newQueryFile = action.payload;
      return { ...mediaState, queryParams: { ...mediaState.queryParams, file: newQueryFile } };
    case "SET_QUERY_FOLDER":
      const newQueryFolder = action.payload;
      return { ...mediaState, queryParams: { ...mediaState.queryParams, folder: newQueryFolder } };

    default:
      return mediaState;
  }
};
