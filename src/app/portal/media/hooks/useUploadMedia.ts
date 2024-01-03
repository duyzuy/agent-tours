import { useUploadMediaFilesMutation } from "@/mutations/managements/media";
import useMessage from "@/hooks/useMessage";
import { useQueryClient } from "@tanstack/react-query";
import { GET_MEDIA_FILES } from "@/queries/var";
import { TFolderSelect } from "../_components/MediaUploadContainer/UploadFileForm";
import { UploadFile } from "antd";
import { RcFile } from "antd/es/upload";

const useUploadMedia = () => {
    const { mutate: makeUploadMediaFiles } = useUploadMediaFilesMutation();
    const message = useMessage();
    const queryClient = useQueryClient();
    const onUploadMedia = (
        { folder, fileList }: { folder: TFolderSelect; fileList: UploadFile[] },
        cb?: () => void,
    ) => {
        const formData = new FormData();
        fileList.forEach((file) => {
            formData.append("files[]", file as RcFile);
        });
        formData.append("folder", JSON.stringify(folder));

        makeUploadMediaFiles(formData, {
            onSuccess: (data) => {
                console.log(data);
                message.success("Upload File thành công.");
                queryClient.invalidateQueries({
                    queryKey: [GET_MEDIA_FILES, folder.id],
                });
                cb?.();
            },
            onError: (error) => {
                console.log(error);
                message.error("Upload File Thất bại.");
            },
        });
    };

    return onUploadMedia;
};
export default useUploadMedia;
