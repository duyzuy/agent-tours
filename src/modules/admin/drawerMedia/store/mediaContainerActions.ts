import { IMediaFile, MediaTypes } from "@/models/management/media.interface";

export type DrawerMediaContainerActions =
  | {
      type: "RESET";
    }
  | {
      type: "INIT";
      payload: { selected?: IMediaFile[]; allowTypes?: MediaTypes[]; isMultiple?: boolean };
    }
  | {
      type: "OPEN";
    }
  | {
      type: "CLOSE";
    }
  | {
      type: "ON_SELECTED";
      payload: (item: IMediaFile[]) => void;
    };
