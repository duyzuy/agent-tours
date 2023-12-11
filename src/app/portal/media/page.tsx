"use client";
import React, { useState } from "react";
import PageContainer from "@/components/admin/PageContainer";
import Image from "next/image";
import { Row, Col, Button, Empty } from "antd";
import {
    InboxOutlined,
    FolderFilled,
    FolderOpenFilled,
    PlusOutlined,
} from "@ant-design/icons";

import type { UploadProps } from "antd";
import { message, Upload } from "antd";
import DrawlerMedia from "./_components/DrawlerMedia";

import useCreateFolder from "./modules/useCreateFolder";
import { IMediaFolderPayload } from "@/model/Management/media.interface";

const MediaPage = () => {
    const [isOpen, setOpen] = useState(false);
    const [current, setCurrent] = useState(1);

    const { onCreateFolder } = useCreateFolder();
    const THUMBS = [
        {
            id: 1,
            title: "image 1",
            thumbSrc: "/assets/images/article-1.jpg",
            type: "image",
            size: "thumbnail",
        },
        {
            id: 2,
            title: "image 2",
            thumbSrc: "/assets/images/article-2.jpg",
            type: "image",
            size: "thumbnail",
        },
        {
            id: 3,
            title: "image 3",
            thumbSrc: "/assets/images/article-3.jpg",
            type: "image",
            size: "thumbnail",
        },
        {
            id: 4,
            title: "image 4",
            thumbSrc: "/assets/images/article-4.jpg",
            type: "image",
            size: "thumbnail",
        },
        {
            id: 5,
            title: "image 5",
            thumbSrc: "/assets/images/article-5.jpg",
            type: "svg",
            size: "thumbnail",
        },
        {
            id: 6,
            title: "image 6",
            thumbSrc: "/assets/images/article-6.jpg",
            type: "pdf",
            size: "thumbnail",
        },
        {
            id: 7,
            title: "image 7",
            thumbSrc: "/assets/images/article-7.jpg",
            type: "image",
            size: "thumbnail",
        },
        {
            id: 8,
            title: "image 8",
            thumbSrc: "/assets/images/article-8.jpg",
            type: "image",
            size: "thumbnail",
        },
    ];

    const FOLDERS = [
        {
            id: 1,
            type: "folder",
            name: "Thư mục Ảnh trong nước Thư mục Ảnh trong nước",
            children: [
                {
                    id: 11,
                    type: "folder",
                    name: "Thư mục Ảnh Nha trang",
                    children: [
                        {
                            id: 111,
                            type: "folder",
                            name: "Thư mục 1",
                            children: [],
                        },
                    ],
                },
                {
                    id: 16,
                    type: "folder",
                    name: "Thư mục Ảnh Da nang",
                    children: [],
                },
            ],
        },
        {
            id: 2,
            type: "folder",
            name: "Thư mục Ngoài nước",
            children: [
                { id: 12, type: "folder", name: "Thư mục 1", children: [] },
            ],
        },
        {
            id: 3,
            type: "folder",
            name: "Thư mục Ảnh visa",
            children: [
                { id: 13, type: "folder", name: "Thư mục 1", children: [] },
            ],
        },
        {
            id: 4,
            type: "folder",
            name: "Thư mục team building",
            children: [
                { id: 14, type: "folder", name: "Thư mục 1", children: [] },
            ],
        },
        {
            id: 6,
            type: "folder",
            name: "Thư mục nha trang",
            children: [],
        },
    ];
    const { Dragger } = Upload;
    const props: UploadProps = {
        name: "file",
        multiple: true,
        action: `${process.env.LOCAL_API}/mediaUpload"`, //"https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
        onChange(info) {
            const { status } = info.file;
            console.log(info);
            if (status !== "uploading") {
                console.log(info.file, info.fileList);
            }
            if (status === "done") {
                message.success(
                    `${info.file.name} file uploaded successfully.`,
                );
            } else if (status === "error") {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        onDrop(e) {
            console.log("Dropped files", e.dataTransfer.files);
        },
    };

    const handleCreateFolder = (payload: IMediaFolderPayload) => {
        onCreateFolder(payload);
    };
    return (
        <PageContainer
            name="Quản lý Media"
            className="h-full"
            modelName="mục"
            onClick={() => setOpen(true)}
        >
            <div className="flex h-full">
                <div className="col-left w-[260px] h-full pr-6">
                    <div className="media-cat">
                        <div className="media-top mb-3">
                            <p className="font-semibold flex justify-between py-2">
                                <span className="text-lg">Thư mục</span>
                            </p>
                        </div>
                        <ul className="folders">
                            {FOLDERS ? (
                                FOLDERS.map((fold) => (
                                    <li className="cat-1 py-2" key={fold.id}>
                                        <p className="flex items-center justify-between">
                                            <span className="clear-both">
                                                <span className="mr-2 text-lg -mt-1 float-left text-primary-light">
                                                    {current === fold.id ? (
                                                        <FolderOpenFilled />
                                                    ) : (
                                                        <FolderFilled />
                                                    )}
                                                </span>
                                                <span className="line-clamp-1">
                                                    {fold.name}
                                                </span>
                                            </span>
                                            {fold.children.length ? (
                                                <span className="w-6 h-6 text-xs flex items-center justify-center cursor-pointer">
                                                    <PlusOutlined />
                                                </span>
                                            ) : null}
                                        </p>
                                        {fold.children.length ? (
                                            <ul className="sub-folder ml-4">
                                                {fold.children.map(
                                                    (subFolder) => (
                                                        <li
                                                            className="cat-1 py-2"
                                                            key={`sub-${subFolder.id}`}
                                                        >
                                                            <p className="clear-both">
                                                                <span className="mr-2 text-lg -mt-1 float-left text-primary-light">
                                                                    {current ===
                                                                    subFolder.id ? (
                                                                        <FolderOpenFilled />
                                                                    ) : (
                                                                        <FolderFilled />
                                                                    )}
                                                                </span>
                                                                <span className="line-clamp-1">
                                                                    {
                                                                        subFolder.name
                                                                    }
                                                                </span>
                                                            </p>
                                                        </li>
                                                    ),
                                                )}
                                            </ul>
                                        ) : null}
                                    </li>
                                ))
                            ) : (
                                <Empty
                                    imageStyle={{ height: 40 }}
                                    description={
                                        <span className="text-xs text-gray-500">
                                            Không có thư mục nào
                                        </span>
                                    }
                                    className="py-6"
                                />
                            )}
                        </ul>
                    </div>
                </div>
                <div className="col-right flex-1 bg-gray-100 p-6">
                    <div className="upload-area h-40 mb-8">
                        <Dragger
                            {...props}
                            accept=".jpg, .jpeg, .png, .pdf, .svg, .docx, .xlsx"
                        >
                            <p className="ant-upload-drag-icon text-6xl text-gray-400">
                                <InboxOutlined />
                            </p>
                            <p className="ant-upload-text">
                                Nhấn hoặc kéo thả files vào khu vực này để
                                upload
                            </p>
                        </Dragger>
                    </div>

                    <div className="thumbnail-list flex items-center flex-wrap gap-4">
                        {THUMBS.map((thumb) => (
                            <div
                                className="w-40 h-40 border bg-white flex items-center justify-center rounded-lg p-2"
                                key={thumb.id}
                            >
                                {thumb.type === ""}
                                <Image
                                    src={thumb.thumbSrc}
                                    width={160}
                                    height={160}
                                    alt={thumb.title}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <DrawlerMedia
                isOpen={isOpen}
                onCancel={() => setOpen(false)}
                onCreateFolder={handleCreateFolder}
            />
        </PageContainer>
    );
};
export default MediaPage;
