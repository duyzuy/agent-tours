import { createContext, useReducer, useContext } from "react";
import { MediaManagerAction, MediaManagerState } from "./media.type";
import { initMediaManagerState, mediaManagerReducer } from "./reducer";

const MediaManagerContext = createContext<[MediaManagerState, React.Dispatch<MediaManagerAction>] | undefined>(
  undefined,
);

const MediaManagerProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(mediaManagerReducer, initMediaManagerState);

  return <MediaManagerContext.Provider value={[state, dispatch]}>{children}</MediaManagerContext.Provider>;
};

const useMediaManager = () => {
  const context = useContext(MediaManagerContext);

  if (!context) {
    throw new Error("context must used in MediaManagerProvider");
  }

  return context;
};

const useMediaManagerSelector = <T,>(selector: (state: MediaManagerState) => T) => {
  const context = useContext(MediaManagerContext);

  if (!context) {
    throw new Error("context must used in MediaManagerProvider");
  }

  return selector(context[0]);
};

export { MediaManagerProvider, useMediaManager, useMediaManagerSelector };
