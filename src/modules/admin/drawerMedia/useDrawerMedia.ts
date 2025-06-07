import { useCallback, useEffect } from "react";
import { useDrawerMediaManager } from "./store/MediaContainer.context";
import { IMediaFile, MediaTypes } from "@/models/management/media.interface";
import { isUndefined } from "lodash";

type DrawerMediaManagerOptions = { isMultiple?: boolean; allowTypes?: MediaTypes[]; selected?: IMediaFile[] };
type DrawerMediaManagerActions = { onSelect?: (items: IMediaFile[]) => void; isMultiple?: boolean };

type UseDrawerMedia = {
  onSelect: (callback: (items: IMediaFile[]) => void) => void;
};
export const useDrawerMedia = (initMedia?: DrawerMediaManagerOptions) => {
  const [_, dispatch] = useDrawerMediaManager();

  const open = useCallback((options: DrawerMediaManagerActions & DrawerMediaManagerOptions) => {
    const { onSelect, ...restOptions } = options;
    dispatch({ type: "OPEN" });

    dispatch({
      type: "INIT",
      payload: {
        ...restOptions,
      },
    });
    onSelect && dispatch({ type: "ON_SELECTED", payload: onSelect });
  }, []);

  const close = useCallback(() => {
    dispatch({ type: "CLOSE" });
  }, []);

  /**
   * use this funtion must wrapped by useEffect hook
   */
  const onSelect = useCallback((onSelect: (items: IMediaFile[]) => void) => {
    dispatch({ type: "ON_SELECTED", payload: onSelect });
  }, []);

  useEffect(() => {
    if (isUndefined(initMedia)) return;
    dispatch({
      type: "INIT",
      payload: {
        ...initMedia,
      },
    });
  }, []);

  return { onSelect, open, close };
};
