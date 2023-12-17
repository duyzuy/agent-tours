import { useUploadMediaFilesMutation } from "@/mutations/managements/media";
import useMessage from "@/hooks/useMessage";
import { IMediaFilePayload } from "@/models/management/media.interface";
const useUploadMedia = () => {
    const { mutate: makeUploadMediaFiles } = useUploadMediaFilesMutation();
    const message = useMessage();

    const onUploadMedia = (payload: FormData, cb?: () => void) => {
        makeUploadMediaFiles(payload, {
            onSuccess: (data) => {
                console.log(data);
                message.success("Upload File thành công.");
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
