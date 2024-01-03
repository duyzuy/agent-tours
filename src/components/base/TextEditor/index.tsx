import { Editor } from "@tinymce/tinymce-react";

import React, { useRef } from "react";
import { RawEditorOptions } from "tinymce";

interface Props {
    value?: string;
    id?: string;
    onEditorChange: (a: any, editor: any) => void;
    onFilePickerCallback?: RawEditorOptions["file_picker_callback"];
    height?: number;
    minHeight?: number;
    file?: string;
    initialValue?: string;
}
const TextEditor = ({
    value,
    onEditorChange,
    height,
    minHeight = 450,
    onFilePickerCallback,
    id,
    initialValue = "",
}: Props) => {
    const editorRef = useRef<any>(null);
    const log = () => {
        if (editorRef.current) {
            console.log(editorRef.current.getContent());
        }
    };

    return (
        <Editor
            tinymceScriptSrc={"/assets/libs/tinymce/tinymce.min.js"}
            id={id}
            initialValue={initialValue}
            onInit={(evt, editor) => (editorRef.current = editor.getContent())}
            value={value}
            init={{
                ui_mode: "split",

                skin: "snow",
                height: height,
                min_height: minHeight,
                // icons: "thin",
                skin_url: "/assets/libs/tinymce/skins/ui/custom",
                branding: false,
                promotion: false,
                plugins:
                    "autoresize preview importcss autolink autosave save directionality code visualblocks visualchars fullscreen image link media table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount charmap  emoticons",
                // editimage_cors_hosts: ["picsum.photos"],
                menubar: "file edit view table",
                // images_upload_handler: (blob, progressFn) => {

                //     return Promise.resolve("11");
                // },
                toolbar:
                    "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | align numlist bullist | link image | table media | lineheight outdent indent| forecolor backcolor removeformat | charmap emoticons | code fullscreen preview | pagebreak anchor codesample",
                autosave_ask_before_unload: true,
                autosave_interval: "30s",
                autosave_prefix: "{path}{query}-{id}-",
                autosave_restore_when_empty: false,
                autosave_retention: "2m",
                // image_advtab: true,
                // link_list: [
                //     { title: "My page 1", value: "https://www.tiny.cloud" },
                //     { title: "My page 2", value: "http://www.moxiecode.com" },
                // ],
                // image_list: [
                //     { title: "My page 1", value: "https://www.tiny.cloud" },
                //     { title: "My page 2", value: "http://www.moxiecode.com" },
                // ],
                // image_class_list: [
                //     { title: "None", value: "" },
                //     { title: "Some class", value: "class-name" },
                // ],
                importcss_append: true,
                // file_picker_validator_handler: (a, b) => {
                //     console.log(a, b);
                // },
                // images_upload_handler: (blobInfo, progress) => {
                //     console.log({ blobInfo, progress });
                //     return Promise.resolve("path/a/aa");
                // },

                file_picker_callback: onFilePickerCallback,
                // file_picker_validator_handler(info, callback) {
                //     console.log(info, callback);

                //     callback({ status: "invalid", message: "ádfasdfa" });
                // },
                // file_picker_callback: (callback, value, meta) => {
                //     /* Provide file and text for the link dialog */
                //     onOpenMediaFileUpload?.();
                //     // console.log({ callback, value, meta });
                //     if (meta.filetype === "file") {
                //         callback("https://www.google.com/logos/google.jpg", {
                //             text: "My text",
                //         });
                //     }

                //     /* Provide image and alt text for the image dialog */
                //     if (meta.filetype === "image") {
                //         // onPickMediaFile?.(callback);
                //         // callback(file, {
                //         //     alt: "My alt text",
                //         // });
                //         onCallbackFilePicker?.((value, meta) =>
                //             callback(value, meta),
                //         );
                //     }

                //     /* Provide alternative source and posted for the media dialog */
                //     if (meta.filetype === "media") {
                //         callback("movie.mp4", {
                //             source2: "alt.ogg",
                //             poster: "https://www.google.com/logos/google.jpg",
                //         });
                //     }
                // },
                // templates: [
                //     {
                //         title: "New Table",
                //         description: "creates a new table",
                //         content:
                //             '<div class="mceTmpl"><table width="98%%"  border="0" cellspacing="0" cellpadding="0"><tr><th scope="col"> </th><th scope="col"> </th></tr><tr><td> </td><td> </td></tr></table></div>',
                //     },
                //     { title: "Starting my story", description: "A cure for writers block", content: "Once upon a time..." },
                //     {
                //         title: "New list with dates",
                //         description: "New List with dates",
                //         content: '<div class="mceTmpl"><span class="cdate">cdate</span><br><span class="mdate">mdate</span><h2>My List</h2><ul><li></li><li></li></ul></div>',
                //     },
                // ],
                // template_cdate_format: "[Date Created (CDATE): %m/%d/%Y : %H:%M:%S]",
                // template_mdate_format: "[Date Modified (MDATE): %m/%d/%Y : %H:%M:%S]",
                // image_caption: true,
                quickbars_selection_toolbar:
                    "bold italic | quicklink h2 h3 blockquote quickimage quicktable",
                noneditable_class: "mceNonEditable",
                toolbar_mode: "sliding",
                contextmenu: "link table",
                content_style:
                    "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
            onEditorChange={onEditorChange}
        />
    );
};
export default TextEditor;
