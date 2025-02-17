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
import { Button, Space, Tooltip, Modal, Divider } from "antd";
import { IMediaFile } from "@/models/management/media.interface";
interface IMediaFileItemProps {
  type: string; //"ICON" | "IMAGE" | "FILE";
  fileType: string; //"xlsx" | "pdf" | "docx" | "jpeg" | "svg" | "gif"
  fileName: string;
  filePath: string;
  onSelect?: (item: IMediaFile) => void;
  onCoppyPath?: (evt: React.MouseEvent<HTMLElement, MouseEvent>, path: string) => void;
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
  onCoppyPath,
  isSelected,
  onPreview,
  item,
}) => {
  const renderIconImage = (type: string) => {
    return type === "IMAGE" || type === "ICON" ? (
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
    ) : (
      <span className="font-4xl text-6xl text-gray-600">
        {(fileType === "xlsx" && <FileExcelOutlined />) ||
          (fileType === "docx" && <FileWordOutlined />) ||
          (fileType === "pdf" && <FilePdfOutlined />) || <FileUnknownOutlined />}
      </span>
    );
  };
  return (
    <div
      className={classNames("w-48 border rounded-lg p-2 relative overflow-hidden", {
        "border-primary-default drop-shadow-md": isSelected,
        "border-gray-400/30": !isSelected,
      })}
    >
      <div
        className="file-type inline-flex items-center cursor-pointer justify-center aspect-video w-full"
        onClick={() => onSelect?.(item)}
      >
        {renderIconImage(type)}
      </div>
      <Divider style={{ margin: "12px 0" }} />
      <div className="flex items-center">
        <div className="flex-1 text-gray-400 text-xs leading-4 overflow-hidden">
          <p className="line-clamp-2">{fileName}</p>
        </div>
        <div className="z-10 flex items-center justify-center">
          {type === "ICON" || type === "IMAGE" ? (
            <Tooltip title="Xem trước">
              <Button
                type="text"
                icon={<EyeOutlined />}
                size="small"
                className="!inline-flex items-center justify-center"
                shape="circle"
                onClick={() => onPreview?.(filePath)}
              />
            </Tooltip>
          ) : (
            <Link href={filePath} target="__blank">
              <Button
                type="text"
                icon={<EyeOutlined />}
                size="small"
                className="!inline-flex items-center justify-center"
                shape="circle"
              />
            </Link>
          )}
          <Tooltip title="Sao chép">
            <Button
              type="text"
              icon={<LinkOutlined />}
              size="small"
              shape="circle"
              className="!inline-flex items-center justify-center"
              onClick={(e) => onCoppyPath?.(e, filePath)}
            />
          </Tooltip>
        </div>
      </div>
    </div>
  );
};
export default memo(MediaFileItem);
