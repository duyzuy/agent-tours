import React, { useEffect, useState } from "react";
import { Space, Button, Typography } from "antd";
import Image from "next/image";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { mediaConfig } from "@/configs";
import MediaUploadDrawler, { MediaUploadProps } from "@/app/(management)/portal/media/_components/MediaUploadDrawler";
import { isUndefined } from "lodash";
import { IThumbnail } from "@/models/thumbnail.interface";

type ImageItem = { id: number; original: string };

export interface GallerySelectorProps {
  images?: ImageItem[];
  onSave?: (data: ImageItem[]) => void;
  error?: string;
}
const GallerySelector: React.FC<GallerySelectorProps> = ({ images, onSave, error }) => {
  const [openMedia, setOpenMedia] = useState(false);
  const [items, setItems] = useState<ImageItem[]>([]);
  const onCloseMediaUpload = () => {
    setOpenMedia(false);
  };

  const onOpenMediaUpload = () => {
    setOpenMedia(true);
  };

  const onConfirmSelect: MediaUploadProps["onConfirm"] = (files) => {
    const newImages = files.reduce<ImageItem[]>((acc, item) => {
      return [...acc, { id: item.id, original: item.fullPath }];
    }, []);

    onSave ? onSave([...items, ...newImages]) : setItems((oldItem) => [...oldItem, ...newImages]);
  };
  const removeItem = (index: number) => {
    let newItems = [...items];
    newItems.splice(index, 1);
    onSave ? onSave([...newItems]) : setItems(newItems);
  };

  useEffect(() => {
    setItems(() => (isUndefined(images) ? [] : images));
  }, [images]);

  return (
    <>
      <Typography.Title level={4}>Gallery</Typography.Title>
      <div className="gallery-container mb-6 rounded-md">
        <div className="list-image">
          <Space wrap>
            {items.map(({ id, original }, _index) => (
              <div
                key={id}
                className="group/item w-20 h-20 bg-slate-100 flex items-center justify-center overflow-hidden relative rounded-sm"
              >
                <Image
                  src={`${mediaConfig.rootApiPath}/${original}`}
                  alt="thumb"
                  fill
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
                <div className="ovlay absolute left-0 w-full top-0 h-full flex items-center justify-center bg-slate-950/30 text-white invisible group-hover/item:visible">
                  <Space className="text-white">
                    <span className="text-white cursor-pointer text-xs" onClick={() => removeItem(_index)}>
                      <DeleteOutlined />
                    </span>
                  </Space>
                </div>
              </div>
            ))}
            <div className="gallery-action">
              <Button
                onClick={onOpenMediaUpload}
                type="dashed"
                size="small"
                style={{
                  width: 80,
                  height: 80,
                  background: "#f1f5f9",
                }}
              >
                <span className="text-xs text-gray-600">
                  <PlusOutlined />
                  <span className="block text-xs">Thêm</span>
                </span>
              </Button>
            </div>
          </Space>
        </div>
        {error ? <p className=" text-red-500 text-xs">{error}</p> : null}
      </div>
      <MediaUploadDrawler isOpen={openMedia} onClose={onCloseMediaUpload} mode="multiple" onConfirm={onConfirmSelect} />
    </>
  );
};
export default GallerySelector;
