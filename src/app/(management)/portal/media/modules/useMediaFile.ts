import { useUploadMediaFilesMutation } from "@/mutations/managements/media";
import useMessage from "@/hooks/useMessage";
import { useQueryClient } from "@tanstack/react-query";
import { GET_MEDIA_FILES } from "@/queries/var";
import { FolderItemTree } from "../_components/MediaUploadContainer/UploadFileForm";
import { UploadFile } from "antd";
import { RcFile } from "antd/es/upload";

const useMediaFile = () => {
  const { mutate: makeUploadMediaFiles, isPending, isIdle } = useUploadMediaFilesMutation();
  const message = useMessage();
  const queryClient = useQueryClient();
  const onUploadMedia = ({ folder, fileList }: { folder: FolderItemTree; fileList: UploadFile[] }, cb?: () => void) => {
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append("files[]", file as RcFile);
    });
    formData.append("folder", JSON.stringify(folder));

    makeUploadMediaFiles(formData, {
      onSuccess: (data) => {
        message.success("Upload File thành công.");
        queryClient.invalidateQueries({
          queryKey: [GET_MEDIA_FILES],
        });
        cb?.();
      },
      onError: (error) => {
        console.log(error);
        message.error("Upload File Thất bại.");
      },
    });
  };

  return {
    onUploadMedia,
    isPending,
    isIdle,
  };
};
export default useMediaFile;
