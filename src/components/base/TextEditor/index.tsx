import React, { useRef, useState, memo, useCallback } from "react";
import { Editor } from "@tinymce/tinymce-react";
import MediaUploadDrawler, { MediaUploadProps } from "@/app/(management)/portal/media/_components/MediaUploadDrawler";
import { MediaTypes } from "@/models/management/media.interface";
import { mediaConfig } from "@/configs";
export interface TextEditorProps {
  value?: string;
  id?: string;
  onEditorChange: (a: any, editor: any) => void;
  height?: number;
  minHeight?: number;
  maxHeight?: number;
  initialValue?: string;
}
const TextEditor = ({
  value,
  onEditorChange,
  height = 500,
  minHeight = 550,
  maxHeight = 600,
  id,
  initialValue = "",
}: TextEditorProps) => {
  const editorRef = useRef<any>(null);
  const [isShowMedia, setShowMedia] = useState(false);

  const onConfirmSelection = useCallback<Required<MediaUploadProps>["onConfirm"]>((files) => {
    let contents = "";
    files.forEach((file) => {
      if (file.mediaType === MediaTypes.IMAGE || file.mediaType === MediaTypes.ICON) {
        contents = contents.concat(
          `<img src="${mediaConfig.rootApiPath}/${file.fullPath}" class="max-w-full" alt="${file.slug}" style="max-width: 100%"/>`,
        );
      }

      if (file.mediaType === MediaTypes.FILE) {
        contents = contents.concat(
          `<a href="${mediaConfig.rootApiPath}/${file.fullPath}" target="_blank">${mediaConfig.rootPath}/${file.fullPath}</a>`,
        );
      }
    });

    editorRef.current.insertContent(contents);
  }, []);
  const onCloseMedia = useCallback(() => setShowMedia(false), []);
  return (
    <>
      <Editor
        tinymceScriptSrc={"/assets/libs/tinymce/tinymce.min.js"}
        id={id}
        // initialValue={initialValue}
        onInit={(evt, editor) => {
          editorRef.current = editor;
          // editor.setContent(value || "");
        }}
        value={value}
        init={{
          relative_urls: false,
          remove_script_host: false,
          convert_urls: true,
          ui_mode: "split",
          skin_url: "/assets/libs/tinymce/skins/ui/custom",
          language_url: "/assets/libs/tinymce/langs/vi.js",
          language: "vi",
          statusbar: true,
          language_load: false,
          toolbar_mode: "sliding",
          contextmenu: "link table",

          fontSize: {
            // supportAllValues: true,
            options: ["tiny", "default", "big"],
            // unit: "px",
          },
          content_style:
            "body { font-family: Helvetica,Arial,sans-serif;}" +
            "img.center {margin-left: auto; margin-right: auto}" +
            ".text-center {text-align: center}" +
            ".center {text-align: center}" +
            ".font-bold {font-weight: bold}" +
            ".italic {font-style: italic}" +
            ".underline {text-decoration-line: underline}",
          quickbars_selection_toolbar: "bold italic | quicklink h2 h3 blockquote quickimage quicktable",
          noneditable_class: "mceNonEditable",
          // icons: "thin",
          height: height,
          min_height: minHeight,

          max_height: maxHeight,
          branding: false,
          promotion: false,
          plugins: [
            "autoresize",
            "preview",
            "autolink",
            "autosave",
            "save",
            "directionality",
            "code",
            "image",
            "media",
            "visualblocks",
            "visualchars",
            "fullscreen",
            "link",
            "table",
            "charmap",
            "pagebreak",
            "nonbreaking",
            "anchor",
            "insertdatetime",
            "advlist",
            "lists",
            "wordcount",
            "charmap",
            "emoticons",
          ],
          toolbar: [
            "undo redo | blocks fontfamily fontsize | bold italic underline | align numlist bullist | image media link | table lineheight outdent indent | forecolor backcolor removeformat | charmap emoticons | code fullscreen preview | pagebreak anchor codesample",
            // "table lineheight outdent indent | forecolor backcolor removeformat | charmap emoticons | code fullscreen preview | pagebreak anchor codesample",
          ],
          menubar: "file edit view table insert mediaLib",
          menu: {
            mediaLib: {
              title: "Upload",
              items: "mediaUpload",
            },
          },
          setup: (editor) => {
            editor.ui.registry.addMenuItem("mediaUpload", {
              text: "Thư viện ảnh",
              icon: "image",
              onAction: () => {
                setShowMedia(true);
              },
            });
          },
          image_class_list: [
            { title: "None", value: "" },
            { title: "Max width", value: "max-w-full" },
          ],
          autosave_ask_before_unload: true,
          autosave_interval: "30s",
          autosave_prefix: "{path}{query}-{id}-",
          autosave_restore_when_empty: false,
          autosave_retention: "2m",
          importcss_append: false,
          // file_picker_callback: () => {},
          image_caption: true,

          formats: {
            alignleft: {
              selector: "p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img,audio,video",
              classes: "left",
            },
            aligncenter: {
              selector: "p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img,audio,video",
              classes: "center",
            },
            alignright: {
              selector: "p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img,audio,video",
              classes: "right",
            },
            alignjustify: {
              selector: "p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img,audio,video",
              classes: "full",
            },
            bold: { inline: "span", classes: "font-bold" },
            italic: { inline: "span", classes: "italic" },
            underline: {
              inline: "span",
              classes: "underline",
              exact: true,
            },
            strikethrough: { inline: "del" },
            forecolor: {
              inline: "span",
              classes: "forecolor",
              styles: { color: "%value" },
            },
            hilitecolor: {
              inline: "span",
              classes: "hilitecolor",
              styles: { backgroundColor: "%value" },
            },
            custom_format: {
              block: "h1",
              attributes: { title: "Header" },
              styles: { color: "red" },
            },
          },
        }}
        onEditorChange={onEditorChange}
      />
      <MediaUploadDrawler isOpen={isShowMedia} onClose={onCloseMedia} onConfirm={onConfirmSelection} mode="multiple" />
    </>
  );
};
export default memo(TextEditor);
