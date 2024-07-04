import React, { useEffect, useState } from "react";
import { Space, Button, Typography } from "antd";
import Image from "next/image";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { mediaConfig } from "@/configs";
import MediaUploadDrawler, {
    MediaUploadProps,
} from "@/app/(management)/portal/media/_components/MediaUploadDrawler";
import { isUndefined } from "lodash";

export interface GallerySelectorProps {
    images?: string[];
    onSave?: (paths: string[]) => void;
    error?: string;
}
const GallerySelector: React.FC<GallerySelectorProps> = ({
    images,
    onSave,
    error,
}) => {
    const [openMedia, setOpenMedia] = useState(false);
    const [items, setItems] = useState<string[]>([]);
    const onCloseMediaUpload = () => {
        setOpenMedia(false);
    };

    const onOpenMediaUpload = () => {
        setOpenMedia(true);
    };

    const onConfirmSelect: MediaUploadProps["onConfirm"] = (files) => {
        const imagePaths = files.reduce<string[]>((acc, item) => {
            return [...acc, item.fullPath];
        }, []);
        onSave
            ? onSave([...items, ...imagePaths])
            : setItems((oldItem) => [...oldItem, ...imagePaths]);
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
                        {items.map((pathItem, _index) => (
                            <div
                                key={_index}
                                className="group/item w-20 h-20 bg-slate-100 flex items-center justify-center overflow-hidden relative rounded-sm"
                            >
                                <Image
                                    src={`${mediaConfig.rootApiPath}/${pathItem}`}
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
                                        <span
                                            className="text-white cursor-pointer text-xs"
                                            onClick={() => removeItem(_index)}
                                        >
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
                {error ? (
                    <p className=" text-red-500 text-xs">{error}</p>
                ) : null}
            </div>
            <MediaUploadDrawler
                isOpen={openMedia}
                onClose={onCloseMediaUpload}
                mode="multiple"
                onConfirm={onConfirmSelect}
            />
        </>
    );
};
export default GallerySelector;
