import React, { memo, useState } from "react";
import { Space, Button } from "antd";
import Image from "next/image";
import { PictureOutlined } from "@ant-design/icons";
import { isEmpty, isUndefined } from "lodash";
import classNames from "classnames";
import MediaUploadDrawer, {
  MediaUploadDrawerProps,
} from "@/app/(management)/portal/media/_components/MediaUploadDrawer";
import { MediaTypes } from "@/models/management/media.interface";

export interface ThumbnailImageProps {
  label?: string;
  thumbnailUrl?: string;
  buttonAddName?: string;
  onAdd?: (thumbnail: { id: number; fullPath: string; thumb: string }) => void;
  onCancel?: () => void;
  onRemove?: () => void;
  error?: string;
  className?: string;
}
const ThumbnailImage: React.FC<ThumbnailImageProps> = ({
  label = "Ảnh bài viết",
  thumbnailUrl,
  buttonAddName = "Chọn ảnh",
  onAdd,
  onCancel,
  onRemove,
  error,
  className = "",
}) => {
  const [showMedia, setShowMedia] = useState(false);
  const confirmSelect: Exclude<MediaUploadDrawerProps["onConfirm"], undefined> = (files) => {
    onAdd?.({ id: files[0].id, fullPath: files[0].fullPath, thumb: files[0].thumb });
  };
  const closeMedia = () => {
    setShowMedia(false);
  };
  const openMediaDrawer = () => {
    setShowMedia(true);
  };
  return (
    <>
      <div
        className={classNames("thumbnail box border rounded-[4px] mb-6", {
          [className]: className,
        })}
      >
        <div className="thumbnail-head py-4 border-b px-4">
          <p className="font-bold">{label}</p>
        </div>
        <div className="thumbnail-body py-4 px-4">
          <div className="thumbnail-preview bg-slate-100 h-40 mb-3 flex items-center justify-center">
            {thumbnailUrl ? (
              <div className="relative w-full h-full">
                <Image
                  src={thumbnailUrl}
                  alt="thumbnail"
                  fill
                  style={{
                    objectFit: "contain",
                  }}
                />
              </div>
            ) : (
              <div className="no-image text-slate-400 text-center">
                <span className="text-2xl stroke-slate-400">
                  <PictureOutlined />
                </span>
                <span className="block">Chưa có ảnh</span>
              </div>
            )}
          </div>
          <Space>
            <Button onClick={openMediaDrawer}>{buttonAddName}</Button>
            {isEmpty(thumbnailUrl) || isUndefined(thumbnailUrl) ? null : (
              <Button type="primary" ghost danger onClick={onRemove}>
                Xoá ảnh
              </Button>
            )}
          </Space>
          {error ? <p className="text-xs text-red-600 pt-1">{error}</p> : null}
        </div>
      </div>
      <MediaUploadDrawer
        isOpen={showMedia}
        onClose={closeMedia}
        onConfirm={confirmSelect}
        mediaTypes={[MediaTypes.IMAGE]}
        mode={"single"}
      />
    </>
  );
};

export default memo(ThumbnailImage);
