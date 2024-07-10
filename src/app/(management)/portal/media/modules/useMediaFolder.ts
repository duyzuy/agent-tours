import { IMediaFolderPayload } from "@/models/management/media.interface";
import useMessage from "@/hooks/useMessage";
import { useCreateMediaFoldersMutation, useUpdateFolderMutation } from "@/mutations/managements/media";

import { useQueryClient } from "@tanstack/react-query";
import { GET_MEDIA_FOLDERS } from "@/queries/var";
import { MediaFolderCreateFormData, MediaFolderUpdateFormData } from "./media.interface";

export type TMediaFolderErrorsField = Partial<
  Record<keyof Pick<IMediaFolderPayload, "folderName" | "folderSlug">, string>
>;

export interface UseMediaFolderProps {
  onCreateFolder: (formData: MediaFolderCreateFormData, cb?: () => void) => void;
  onUpdateFolder: (formData: MediaFolderUpdateFormData, cb?: () => void) => void;
}
const useMediaFolder = () => {
  const { mutate: makeCreateFolder, isPending: isCreating } = useCreateMediaFoldersMutation();
  const { mutate: makeUpdateFolder, isPending: isUpdateing } = useUpdateFolderMutation();

  const queryClient = useQueryClient();

  const message = useMessage();
  const onCreateFolder: UseMediaFolderProps["onCreateFolder"] = (formData, cb) => {
    makeCreateFolder(formData, {
      onSuccess: (data, variables) => {
        message.success(`Tạo thư mục ${variables.folderName} thành công`);

        queryClient.invalidateQueries({
          queryKey: [GET_MEDIA_FOLDERS],
        });
        cb?.();
      },
      onError: (error, variables) => {
        console.log({ error, variables });
        message.error(error.message);
      },
    });
  };

  const onUpdateFolder: UseMediaFolderProps["onUpdateFolder"] = (formData, cb) => {
    makeUpdateFolder(formData, {
      onSuccess: (data, variables) => {
        message.success(`Cập nhật tên thư mục "${variables.folderName}" thành công`);

        queryClient.invalidateQueries({
          queryKey: [GET_MEDIA_FOLDERS],
        });
        cb?.();
      },
      onError: (error, variables) => {
        console.log({ error, variables });
        message.error(error.message);
      },
    });
  };

  return {
    onCreateFolder,
    isCreating,
    isUpdateing,
    onUpdateFolder,
  };
};
export default useMediaFolder;
