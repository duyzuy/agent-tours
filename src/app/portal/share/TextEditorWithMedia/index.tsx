import TextEditor from "@/components/base/TextEditor";
import MediaUploadDrawler, {
    IMediaUploadProps,
} from "../../media/_components/MediaUploadDrawler";
import React, { useState } from "react";
import tinymce, { RawEditorOptions } from "tinymce";
import { IMediaFile } from "@/models/management/media.interface";
import { useMediaManager } from "../../media/hooks/useMediaManager";
const TextEditorWithMedia = () => {
    const [isOpenDrawler, setOpenDrawler] = useState(false);
    const [file, setFile] = useState<IMediaFile>();

    const isOpen = useMediaManager((state) => state.isOpen);
    const onOPen = useMediaManager((state) => state.onOpen);
    const onClose = useMediaManager((state) => state.onClose);
    const onConfirm = useMediaManager((state) => state.onConfirm);
    const onCallbackFile = useMediaManager((state) => state.onCallbackFile);

    const onFilePickerMediaCallback: RawEditorOptions["file_picker_callback"] =
        (callback, value, meta) => {
            // setOpenDrawler(true);
            //  onOPen();
            // onCallbackFile?.(file ? [file] : [], (files) => {
            //     console.log("lala", files);
            //     if (files.length) {
            //         const nFile = files[0];
            //         callback(nFile?.fullPath || "", {
            //             alt: nFile?.slug || "",
            //         });
            //     }
            // });
            // tinymce?.activeEditor?.windowManager.openUrl({
            //     url: "/portal/media",
            //     title: "Filemanager",
            //     width: 800,
            //     height: 600,
            //     onMessage: (api, message) => {
            //         callback(message.content);
            //     },
            // });
            // if (meta.filetype === "file") {
            //     callback("https://www.google.com/logos/google.jpg", {
            //         text: "My text",
            //     });
            // }
            // // MediaUpload.onOPen(() => {});
            // /* Provide image and alt text for the image dialog */
            // if (meta.filetype === "image") {
            //     // onPickMediaFile?.(callback);
            //     callback("https://www.google.com/logos/google.jpg", {
            //         alt: "My alt texttt",
            //     });
            // }
            // /* Provide alternative source and posted for the media dialog */
            // if (meta.filetype === "media") {
            //     callback("movie.mp4", {
            //         source2: "alt.ogg",
            //         poster: "https://www.google.com/logos/google.jpg",
            //     });
            // }
        };

    const onConfirmSelection: IMediaUploadProps["onConfirm"] = (files) => {
        setFile(() => files[0]);
        onCallbackPickerFile(() => files[0].fullPath);
    };
    const onCallbackPickerFile = (
        callback?: (value: string, meta?: Record<string, any>) => void,
    ) => {
        callback?.(file?.fullPath || "");
    };

    return (
        <React.Fragment>
            <TextEditor
                value={""}
                onEditorChange={() => {}}
                onFilePickerCallback={onFilePickerMediaCallback}
                // onOpenMediaFileUpload={() => setOpenDrawler(true)}
                // onCallbackFilePicker={onCallbackPickerFile}
                file={file?.fullPath}
            />
            <MediaUploadDrawler
                onClose={() => onClose()}
                isOpen={isOpen}
                onConfirm={onConfirm}
                mode="multiple"
            />
        </React.Fragment>
    );
};
export default TextEditorWithMedia;
