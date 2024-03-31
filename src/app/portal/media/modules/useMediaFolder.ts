import { IMediaFolderPayload } from "@/models/management/media.interface";
import useMessage from "@/hooks/useMessage";
import {
    useCreateMediaFoldersMutation,
    useUpdateFolderMutation,
} from "@/mutations/managements/media";

import { useQueryClient } from "@tanstack/react-query";
import { GET_MEDIA_FOLDERS } from "@/queries/var";
import {
    MediaFolderCreateFormData,
    MediaFolderUpdateFormData,
} from "./media.interface";

export type TMediaFolderErrorsField = Partial<
    Record<keyof Pick<IMediaFolderPayload, "folderName" | "folderSlug">, string>
>;
const useMediaFolder = () => {
    const { mutate: makeCreateFolder } = useCreateMediaFoldersMutation();
    const { mutate: makeUpdateFolder } = useUpdateFolderMutation();

    const queryClient = useQueryClient();

    const message = useMessage();
    const onCreateFolder = (
        formData: MediaFolderCreateFormData,
        cb?: () => void,
    ) => {
        makeCreateFolder(formData, {
            onSuccess: (data, variables) => {
                message.success(
                    `Tạo thư mục ${variables.folderName} thành công`,
                );

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

    const onUpdateFolder = (
        formData: MediaFolderUpdateFormData,
        cb?: () => void,
    ) => {
        makeUpdateFolder(formData, {
            onSuccess: (data, variables) => {
                message.success(
                    `Cập nhật tên thư mục "${variables.folderName}" thành công`,
                );

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
        onUpdateFolder,
    };
};
export default useMediaFolder;
