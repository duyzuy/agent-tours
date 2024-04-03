import { LangCode } from "@/models/management/cms/language.interface";
import { Input, Button, Space } from "antd";
import React, { memo, useState } from "react";
import config from "@/configs";
import { stringToSlug } from "@/utils/stringToSlug";
import { EditOutlined } from "@ant-design/icons";
interface SlugProps {
    domainName?: string;
    lang?: LangCode;
    type?: "post" | "page" | "category";
    slugName?: string;
    onSave?: (slug: string) => void;
}
const Slug: React.FC<SlugProps> = ({
    domainName = config.DOMAIN_ROOT,
    lang,
    type,
    slugName = "",
    onSave,
}) => {
    const [slug, setSlug] = useState(slugName);
    const [isEdit, setEdit] = useState(false);
    const onChangeSlug = (value: string) => {
        setSlug(value);
    };
    const onSaveSlug = () => {
        onSave?.(stringToSlug(slug));
        setEdit(false);
    };
    const onCancel = () => {
        setEdit(false);
        setSlug(slugName);
    };
    return (
        <div className="post-slug text-xs py-2 w-full">
            <span className="mr-2">Đường dẫn:</span>
            <div className="flex items-center flex-1 whitespace-nowrap">
                <span>{domainName}</span>
                <span>{`/${lang}`}</span>
                <span>{`/${type}`}</span>
                <div className="flex items-center">
                    <div
                        className="mr-2"
                        style={{
                            width: "calc(100% - 120px)",
                        }}
                    >
                        {!isEdit ? (
                            <p className="text flex-1 overflow-hidden text-ellipsis">
                                {slugName}
                            </p>
                        ) : (
                            <div className="ml-1 w-full max-w-[320px]">
                                <Input
                                    size="small"
                                    value={slug}
                                    onChange={(evt) =>
                                        onChangeSlug(evt.target.value)
                                    }
                                />
                            </div>
                        )}
                    </div>
                    {isEdit ? (
                        <Space>
                            <Button
                                type="primary"
                                size="small"
                                ghost
                                onClick={onSaveSlug}
                            >
                                Lưu
                            </Button>
                            <Button
                                type={isEdit ? "text" : "primary"}
                                size="small"
                                ghost={isEdit ? false : true}
                                onClick={onCancel}
                            >
                                Huỷ bỏ
                            </Button>
                        </Space>
                    ) : (
                        <Button
                            type="text"
                            size="small"
                            className="ml-2"
                            icon={<EditOutlined />}
                            onClick={() => setEdit(true)}
                        >
                            Sửa
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
};
export default memo(Slug);
