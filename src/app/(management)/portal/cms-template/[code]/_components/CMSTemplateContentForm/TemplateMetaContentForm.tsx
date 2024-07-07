import React, { useEffect, useMemo, useState } from "react";
import FormItem from "@/components/base/FormItem";
import TextEditor from "@/components/base/TextEditor";
import { Button, Input, Space, TabsProps, Typography } from "antd";
import { CMSTemplateContentMetaDataForm } from "../../../modules/cmsTemplate.interface";
import { LangCode } from "@/models/management/cms/language.interface";
import { useFormSubmit } from "@/hooks/useFormSubmit";
import { Tabs } from "antd";
import { isUndefined } from "lodash";
import classNames from "classnames";
import { ICMSTemplateContentMetaData } from "@/models/management/cms/cmsTemplateContent.interface";
import { isEqualObject } from "@/utils/compare";
export interface TemplateMetaContentFormProps {
  referenceId?: number;
  lang?: LangCode;
  type?: "includeAndNote" | "itinerary";
  contentlabel?: string;
  className?: string;
  onSubmit?: (
    type?: "includeAndNote" | "itinerary",
    action?: "create" | "update",
    data?: CMSTemplateContentMetaDataForm,
  ) => void;
  initialData?: ICMSTemplateContentMetaData;
}
const TemplateMetaContentForm: React.FC<TemplateMetaContentFormProps> = ({
  referenceId,
  lang,
  type,
  contentlabel,
  initialData,
  onSubmit,
  className = "",
}) => {
  const initFormData = new CMSTemplateContentMetaDataForm(undefined, referenceId, "", []);

  const [formData, setFormData] = useState(initFormData);
  const [activeTab, setActiveTab] = useState<string>();

  const onChangeContentInTab: BlockMetaContentProps["onChange"] = (data, index) => {
    if (isUndefined(index)) return;
    setFormData((oldData) => {
      const { metaContent } = oldData;

      let newMetaContent = [...metaContent];
      newMetaContent.splice(index, 1, {
        ...data,
      });

      return {
        ...oldData,
        metaContent: newMetaContent,
      };
    });
  };
  const defaultTabs = [
    {
      label: "Thông tin chung",
      key: "tourInformation",
      children: <TextEditor onEditorChange={(data, editor) => onChange("content", data)} value={formData.content} />,
    },
  ];

  const tabsItems = useMemo(() => {
    const itemsTab = formData.metaContent.reduce<TabsProps["items"]>((acc, item, _index) => {
      return [
        ...(acc || []),
        {
          label: `Block ${_index + 1}`,
          key: `blockContent-${_index}`,
          children: <BlockMetaContent value={item} onChange={onChangeContentInTab} index={_index} />,
        },
      ];
    }, []);

    return itemsTab ? [...defaultTabs, ...itemsTab] : [...defaultTabs];
  }, [formData.metaContent, onChangeContentInTab]);

  const onChange = (
    key: keyof CMSTemplateContentMetaDataForm,
    value: CMSTemplateContentMetaDataForm[keyof CMSTemplateContentMetaDataForm],
  ) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const changeTab = (activeKey: string) => {
    setActiveTab(activeKey);
  };
  const editTabs: TabsProps["onEdit"] = (e, action) => {
    if (action === "add") {
      setFormData((oldData) => ({
        ...oldData,
        metaContent: [...oldData.metaContent, { title: "", content: "" }],
      }));
    }

    if (action === "remove" && typeof e === "string") {
      const [tabName, tabIndex] = e.split("-");

      if (tabName === "blockContent") {
        setFormData((oldData) => {
          const { metaContent } = oldData;

          let newMetaContent = [...metaContent];

          newMetaContent.splice(Number(tabIndex), 1);

          return {
            ...oldData,
            metaContent: [...newMetaContent],
          };
        });
      }
    }
  };

  const isDisabledButton = useMemo(() => {
    return isEqualObject(["content", "metaContent"], formData, initialData ? initialData : initFormData);
  }, [formData, initialData]);

  useEffect(() => {
    setFormData(() => {
      return initialData
        ? {
            id: initialData.id,
            refId: initialData.refId,
            content: initialData.content,
            metaContent: initialData.metaContent,
          }
        : initFormData;
    });
  }, [referenceId, lang, initialData]);

  return (
    <div
      className={classNames("meta__content border rounded-md", {
        [className]: className,
      })}
    >
      <div className="meta__content-head flex items-center justify-between px-4 pt-6 pb-3">
        <Typography.Title level={4}>{contentlabel}</Typography.Title>
      </div>
      <div className="meta__content-body px-4">
        <Tabs
          type="editable-card"
          activeKey={activeTab}
          items={tabsItems}
          onEdit={editTabs}
          onChange={changeTab}
          // tabPosition="left"
        />
      </div>
      <div className="px-4 pt-6 mt-6 border-t pb-6">
        <Space>
          <Button
            onClick={() => onSubmit?.(type, formData.id ? "update" : "create", formData)}
            size="small"
            type="primary"
            disabled={isDisabledButton}
          >
            Lưu
          </Button>
        </Space>
      </div>
    </div>
  );
};
export default TemplateMetaContentForm;

interface BlockMetaContentProps {
  onChange?: (data: { title?: string; content?: string }, index?: number) => void;
  value?: { title?: string; content?: string };
  index?: number;
}
const BlockMetaContent = ({ onChange, value, index }: BlockMetaContentProps) => {
  return (
    <>
      <FormItem>
        <Input
          placeholder="Tên block"
          onChange={(ev) =>
            onChange?.(
              {
                title: ev.target.value,
                content: value?.content,
              },
              index,
            )
          }
          value={value?.title}
        />
      </FormItem>
      <TextEditor
        onEditorChange={(data, editor) => onChange?.({ title: value?.title, content: data }, index)}
        value={value?.content}
      />
    </>
  );
};
