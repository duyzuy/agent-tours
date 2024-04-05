import React, { memo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
    FileExcelOutlined,
    FileWordOutlined,
    FilePdfOutlined,
    FileUnknownOutlined,
    EyeOutlined,
    LinkOutlined,
} from "@ant-design/icons";
import classNames from "classnames";
import { Button, Space, Tooltip, Modal } from "antd";
import { IMediaFile } from "@/models/management/media.interface";
interface IMediaFileItemProps {
    type: string; //"ICON" | "IMAGE" | "FILE";
    fileType: string; //"xlsx" | "pdf" | "docx" | "jpeg" | "svg" | "gif"
    fileName: string;
    filePath: string;
    onSelect?: (item: IMediaFile) => void;
    item: IMediaFile;
    isSelected?: boolean;
    onPreview?: (path: string) => void;
}
const MediaFileItem: React.FC<IMediaFileItemProps> = ({
    fileType,
    filePath,
    fileName,
    type,
    onSelect,
    isSelected,
    onPreview,
    item,
}) => {
    const onCoppyText = (
        e: React.MouseEvent<HTMLElement, MouseEvent>,
        text: string,
    ) => {
        navigator.clipboard.writeText(text);
        e.stopPropagation();
    };

    return (
        <div
            className={classNames(
                "w-48 h-48 border bg-slate-50 flex items-center justify-center rounded-lg p-2 relative overflow-hidden cursor-pointer",
                {
                    " border-primary-default drop-shadow-md": isSelected,
                },
            )}
            // style={{
            //     background: `url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8AQMAAAAAMksxAAAABlBMVEX////l5eUJgtBrAAAAG0lEQVQoz2MAAub///9/GGWAGEDiD4g3ygACANC87U+XEKc0AAAAAElFTkSuQmCC)`,
            //     backgroundSize: "10px",
            // }}
            onClick={() => onSelect?.(item)}
        >
            {(type === "IMAGE" && (
                <div className="item w-full h-full relative">
                    <Image
                        src={filePath}
                        alt={fileName}
                        loading="lazy"
                        fill
                        placeholder="empty"
                        sizes="100px"
                        style={{
                            objectFit: "contain",
                        }}
                    />
                </div>
            )) ||
                (type === "ICON" && (
                    <Image
                        src={filePath}
                        alt={fileName}
                        loading="lazy"
                        fill
                        sizes="100px"
                        style={{
                            objectFit: "contain",
                        }}
                    />
                )) || (
                    <Link href={filePath} target="__blank">
                        <span className="font-4xl text-8xl text-gray-600">
                            {(fileType === "xlsx" && <FileExcelOutlined />) ||
                                (fileType === "docx" && <FileWordOutlined />) ||
                                (fileType === "pdf" && <FilePdfOutlined />) || (
                                    <FileUnknownOutlined />
                                )}
                        </span>
                    </Link>
                )}
            <div className="p-2 absolute bottom-0 left-0 right-0 bg-white text-gray-400 text-xs leading-4 overflow-hidden">
                <p className="line-clamp-1">{fileName}</p>
            </div>
            <div className="group/item item-actions absolute left-0 right-0 w-full h-full flex items-center justify-center">
                <Space>
                    {type === "ICON" || type === "IMAGE" ? (
                        <Tooltip title="Xem trước">
                            <Button
                                type="primary"
                                icon={<EyeOutlined />}
                                size="small"
                                className="invisible group-hover/item:visible"
                                shape="circle"
                                onClick={() => onPreview?.(filePath)}
                            />
                        </Tooltip>
                    ) : null}
                    <Tooltip title="Sao chép">
                        <Button
                            type="primary"
                            icon={<LinkOutlined />}
                            size="small"
                            shape="circle"
                            className="invisible group-hover/item:visible"
                            onClick={(e) => onCoppyText(e, filePath)}
                        />
                    </Tooltip>
                </Space>
            </div>
        </div>
    );
};
export default memo(MediaFileItem);

// <ul role="list">

//     <li class="group/item hover:bg-slate-100 ...">
//       <img src="{person.imageUrl}" alt="" />
//       <div>
//         <a href="{person.url}">{person.name}</a>
//         <p>{person.title}</p>
//       </div>
//       <a class="group/edit invisible hover:bg-slate-200 group-hover/item:visible ..." href="tel:{person.phone}">
//         <span class="group-hover/edit:text-gray-700 ...">Call</span>
//         <svg class="group-hover/edit:translate-x-0.5 group-hover/edit:text-slate-500 ...">
//           <!-- ... -->
//         </svg>
//       </a>
//     </li>

// </ul>
