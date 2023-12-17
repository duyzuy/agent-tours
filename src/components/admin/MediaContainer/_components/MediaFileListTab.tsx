import React from "react";
import { Spin, Empty } from "antd";
import Image from "next/image";
import { IMediaFileListRs } from "@/models/management/media.interface";
import { mediaConfig } from "@/configs";
import { isEmpty } from "lodash";

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
                                    className="w-40 h-40 border bg-white flex items-center justify-center rounded-lg p-2"
                                    key={item.key}
                                >
                                    {item.type === "IMAGE" ? (
                                        <div className="item w-full h-full relative">
                                            <Image
                                                src={`${mediaConfig.rootPath}/${item.fullPath}`}
                                                // loader={imageLoader}
                                                alt={item.slug}
                                                loading="lazy"
                                                fill
                                                style={{ objectFit: "contain" }}
                                            />
                                        </div>
                                    ) : null}
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
