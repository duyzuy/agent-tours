import { LangCode } from "@/models/management/cms/language.interface";
import { Input, Button, Space } from "antd";
import React, { memo, useState } from "react";
import config from "@/configs";
import { stringToSlug } from "@/utils/stringToSlug";
import { EditOutlined } from "@ant-design/icons";
import FormItem from "@/components/base/FormItem";
import classNames from "classnames";
export interface SlugProps {
  domainName?: string;
  lang?: LangCode;
  type?: string; //slug for define post type template
  validateStatus?: "" | "error" | "success" | "warning" | "validating";
  help?: string;
  slugName?: string;
  onSave?: (value: string) => void;
  className?: string;
  hiddenLabel?: boolean;
  disabled?: boolean;
}
const Slug: React.FC<SlugProps> = ({
  domainName = config.DOMAIN_ROOT,
  lang,
  type,
  slugName = "",
  onSave,
  className = "",
  validateStatus,
  help,
  hiddenLabel = false,
  disabled = false,
}) => {
  const [error, setError] = useState(help);
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

  const onEdit = () => {
    setEdit(true);
    setSlug(slugName);
  };

  return (
    <div
      className={classNames("post-slug text-xs w-full", {
        [className]: className,
      })}
    >
      <div className="flex items-center">
        {hiddenLabel ? null : <span className="mr-2">Đường dẫn:</span>}
        <div className="flex items-center flex-1 whitespace-nowrap">
          <span>{domainName}</span>
          <span>{`/${lang}`}</span>
          <span>{`/${type}/`}</span>
          <div className="flex items-center max-w-[280px]">
            <div className="mr-2 w-full">
              {!isEdit ? (
                <p className="overflow-hidden text-ellipsis bg-slate-100">
                  <span>{`${slugName}`}</span>
                </p>
              ) : (
                <Input size="small" value={slug} onChange={(evt) => onChangeSlug(evt.target.value)} />
              )}
            </div>
            {disabled === false ? (
              <>
                {isEdit ? (
                  <Space>
                    <Button type="primary" size="small" ghost onClick={onSaveSlug}>
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
                  <Button type="text" size="small" className="ml-2" icon={<EditOutlined />} onClick={onEdit}>
                    Sửa
                  </Button>
                )}
              </>
            ) : null}
          </div>
        </div>
      </div>
      <p
        className={classNames({
          "text-red-500": validateStatus === "error",
        })}
      >
        {help ?? null}
      </p>
    </div>
  );
};
export default memo(Slug);
