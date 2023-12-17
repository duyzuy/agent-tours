import React from "react";
import { Spin, Empty } from "antd";
import Image from "next/image";
import { IMediaFileListRs } from "@/models/management/media.interface";
import { mediaConfig } from "@/configs";
import { isEmpty } from "lodash";
import {
    FilePdfOutlined,
    FileExcelOutlined,
    FileWordOutlined,
    FileUnknownOutlined,
} from "@ant-design/icons";
interface Props {
    isLoading?: boolean;
    items: IMediaFileListRs["result"];
}
const MediaFileLibTab: React.FC<Props> = ({ isLoading, items }) => {
    return (
        <>
            {isLoading ? (
                <div className="flex items-center justify-center py-2">
                    <Spin />
                </div>
            ) : (
                <React.Fragment>
                    {isEmpty(items) ? (
                        <Empty
                            description={
                                <div className="text-center">
                                    <p>Chưa có file nào trong thư mục này.</p>
                                    <p>Vui lòng chọn tải file để upload</p>
                                </div>
                            }
                        />
                    ) : (
                        <div className="thumbnail-list flex items-center flex-wrap gap-4">
                            {items.map((item) => (
                                <div
                                    className="w-40 h-40 border bg-slate-50 flex items-center justify-center rounded-lg p-2 relative overflow-hidden"
                                    key={item.key}
                                    // style={{
                                    //     background: `url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8AQMAAAAAMksxAAAABlBMVEX////l5eUJgtBrAAAAG0lEQVQoz2MAAub///9/GGWAGEDiD4g3ygACANC87U+XEKc0AAAAAElFTkSuQmCC)`,
                                    //     backgroundSize: "10px",
                                    // }}
                                >
                                    {item.type === "IMAGE" ||
                                    item.type === "ICON" ? (
                                        <div className="item w-full h-full relative">
                                            <Image
                                                src={`${mediaConfig.rootPath}/${item.fullPath}`}
                                                alt={item.slug}
                                                loading="lazy"
                                                fill
                                                style={{
                                                    objectFit: "contain",
                                                }}
                                            />
                                        </div>
                                    ) : (
                                        <span className="font-4xl text-8xl text-gray-600">
                                            {(item.fileType === ".xlsx" && (
                                                <FileExcelOutlined />
                                            )) ||
                                                (item.fileType === ".docx" && (
                                                    <FileWordOutlined />
                                                )) ||
                                                (item.fileType === ".pdf" && (
                                                    <FilePdfOutlined />
                                                )) || <FileUnknownOutlined />}
                                        </span>
                                    )}
                                    <div className="p-2 absolute bottom-0 left-0 right-0 bg-white text-gray-400 text-xs leading-4 overflow-hidden">
                                        <p className="line-clamp-1">
                                            {item.fullPath}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </React.Fragment>
            )}
        </>
    );
};
export default MediaFileLibTab;
