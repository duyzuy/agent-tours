import { IMediaFile } from "@/models/management/media.interface";
import { create } from "zustand";

interface useMediaManagerProps {
  isOpen: boolean;
  files: IMediaFile[];
  onConfirm: (files: IMediaFile[], cb?: (files: IMediaFile[]) => void) => void;
  onOpen: () => void;
  onClose: () => void;
  onCallbackFile?: (files: IMediaFile[], cb?: (files: IMediaFile[]) => void) => void;
}
export const useMediaManager = create<useMediaManagerProps>((set, get) => ({
  isOpen: false,
  files: [],
  onOpen: () => set(() => ({ isOpen: true })),
  onClose: () => set(() => ({ isOpen: false })),
  onCallbackFile: (files, cb) => {
    console.log(files);
    cb?.(files);
  },
  onConfirm: (files) =>
    set((state) => {
      return { ...state, files: [...files] };
    }),
}));
