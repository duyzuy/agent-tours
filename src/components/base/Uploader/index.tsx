import React, { memo, useEffect } from "react";
import { Upload, UploadProps, message } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import Image from "next/image";

type UploaderProps = UploadProps & {
    thumbnailUrl?: string;
    isLoading?: boolean;
    error?: string;
};
const Uploader: React.FC<UploaderProps> = (props) => {
    useEffect(() => {
        if (props.error && props.error !== "") {
            message.error(props.error);
        }
    }, [props.error]);

    const uploadButton = (
        <div>
            {props.isLoading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );
    return <Upload {...props}>{props.thumbnailUrl ? <Image src={props.thumbnailUrl} alt="thumbnail" style={{ width: "100%" }} /> : uploadButton}</Upload>;
};
export default memo(Uploader);
