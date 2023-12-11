import { IMediaFolderPayload } from "@/Model/Management/media.interface";

const useCreateFolder = () => {
    const onCreateFolder = async (payload: IMediaFolderPayload) => {
        console.log(payload);

        const response = await fetch(`${process.env.LOCAL_API}/createFolder`, {
            method: "POST",
            body: JSON.stringify(payload),
        });

        const data = await response.json();
        console.log(data);
    };

    return {
        onCreateFolder,
    };
};
export default useCreateFolder;
