import { IMediaFile, MediaTypes } from "@/models/management/media.interface";
import { DrawerMediaContainerActions } from "./mediaContainerActions";
type DrawerMediaContainerState = {
  selected: IMediaFile[];
  isOpen: boolean;
  allowTypes: MediaTypes[];
  isMultiple: boolean;
  onSelect: (items: IMediaFile[]) => void;
  open: () => void;
  close: () => void;
};
export const initDrawerMediaContainerState: DrawerMediaContainerState = {
  selected: [],
  isOpen: false,
  allowTypes: [MediaTypes.FILE, MediaTypes.ICON, MediaTypes.IMAGE],
  isMultiple: false,
  onSelect: () => {},
  open: () => {},
  close: () => {},
};

export const drawerMediaContainerReducer = (
  state: DrawerMediaContainerState,
  action: DrawerMediaContainerActions,
): DrawerMediaContainerState => {
  switch (action.type) {
    case "OPEN": {
      return {
        ...state,
        isOpen: true,
      };
    }
    case "INIT": {
      return {
        ...state,
        isMultiple: action.payload.isMultiple || state.isMultiple,
        selected: action.payload.selected || state.selected,
        allowTypes: action.payload.allowTypes || state.allowTypes,
      };
    }
    case "CLOSE": {
      return {
        ...state,
        isOpen: false,
        selected: [],
      };
    }
    case "RESET": {
      return {
        ...state,
        isOpen: false,
        selected: [],
      };
    }
    case "ON_SELECTED": {
      const onSelect = action.payload;
      return {
        ...state,
        onSelect: onSelect,
      };
    }
    default: {
      return state;
    }
  }
};
