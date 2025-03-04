import React, { memo, useCallback, useEffect, useState } from "react";
import { Form, Button, Input, Space, Drawer, Tabs } from "antd";
import FormItem from "@/components/base/FormItem";
import MediaUploadDrawer, {
  MediaUploadDrawerProps,
} from "@/app/(management)/portal/media/_components/MediaUploadDrawer";
import Image from "next/image";
import Slug from "@/components/admin/Slug";
import { useFormSubmit } from "@/hooks/useFormSubmit";
import { PictureOutlined } from "@ant-design/icons";
import { LangCode } from "@/models/management/cms/language.interface";
import { mediaConfig } from "@/configs";
import { locales } from "@/constants/locale.constant";
import { VisaTemplateKeyFormData } from "../../modules/visaTemplate.interface";
import { visaTemplateSchema } from "../../schema/visaTemplate.schema";
import { vietnameseTonesToUnderscoreKeyname } from "@/utils/helper";
import { stringToSlug } from "@/utils/stringToSlug";
import { ICMSTemplate } from "@/models/management/cms/cmsTemplate.interface";
import { IVisaTemplateKeyMinimalItem } from "@/models/management/cms/visaTemplate.interface";

type EditAction = {
  type: "edit";
  record: ICMSTemplate;
};
type CreateAction = {
  type: "create";
};
export type DrawerCMSTemplateActions = EditAction | CreateAction;
export interface DrawerCMSTemplateProps {
  isOpen?: boolean;
  onClose?: () => void;
  onSubmit?: (formData: VisaTemplateKeyFormData, cb?: () => void) => void;
  initialValue?: IVisaTemplateKeyMinimalItem;
  action?: "edit" | "create";
}
const DrawerCMSTemplate: React.FC<DrawerCMSTemplateProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialValue,
  action = "create",
}) => {
  const initFormData = new VisaTemplateKeyFormData("", "", undefined, 0, [
    { name: "", lang: LangCode.VI, slug: "" },
    { name: "", lang: LangCode.EN, slug: "" },
  ]);
  const [formData, setFormData] = useState(initFormData);
  const { errors, handlerSubmit } = useFormSubmit({
    schema: visaTemplateSchema,
  });
  const [showMedia, setShowMedia] = useState(false);

  const onChangeFormData = (
    key: keyof VisaTemplateKeyFormData,
    value: VisaTemplateKeyFormData[keyof VisaTemplateKeyFormData],
  ) => {
    if (key === "code" && typeof value === "string") {
      value = vietnameseTonesToUnderscoreKeyname(value).toUpperCase();
    }
    setFormData((oldData) => ({
      ...oldData,
      [key]: value,
    }));
  };

  const onSelectThumb: MediaUploadDrawerProps["onConfirm"] = (files) => {
    const file = files[0];
    setFormData((oldData) => ({
      ...oldData,
      codeImage: { id: file.id, original: file.fullPath, small: file.thumb },
    }));
  };

  const onChangeTemplateFormContent: Required<FormContentTemplateByLangProps>["onChangeForm"] = useCallback(
    (lang, data) => {
      setFormData((oldData) => {
        const { visaTemplates } = oldData;
        let newTemplates = [...visaTemplates];
        const indexItem = visaTemplates.findIndex((item) => item.lang === lang);

        if (indexItem !== -1) {
          newTemplates.splice(indexItem, 1, {
            lang: lang,
            name: data.name || "",
            slug: data.slug || "",
          });
        }
        return {
          ...oldData,
          visaTemplates: [...newTemplates],
        };
      });
    },
    [],
  );

  const getContentByLang = (lang: LangCode) => formData.visaTemplates.find((item) => item.lang === lang);

  useEffect(() => {
    setFormData(() => {
      return action === "edit" && initialValue
        ? {
            code: initialValue?.code,
            codeName: initialValue?.codeName,
            codeImage: initialValue?.codeImage ?? undefined,
            amount: initialValue.amount,
            visaTemplates:
              initialValue?.visaTemplatesMinimal.reduce<VisaTemplateKeyFormData["visaTemplates"]>((acc, item) => {
                return [
                  ...acc,
                  {
                    name: item.name,
                    slug: item.slug,
                    lang: item.lang,
                  },
                ];
              }, []) || [],
          }
        : initFormData;
    });
  }, [isOpen]);

  return (
    <>
      <Drawer
        open={isOpen}
        destroyOnClose={true}
        onClose={onClose}
        width={550}
        title={action === "create" ? "Thêm template" : "Sửa template"}
        push={false}
      >
        <Form layout="vertical">
          <FormItem
            label="Tên template"
            required
            validateStatus={errors?.codeName ? "error" : ""}
            help={errors?.codeName || ""}
          >
            <Input
              name="Tên template"
              placeholder="Tên template"
              value={formData.codeName}
              onChange={(ev) => onChangeFormData("codeName", ev.target.value)}
            />
          </FormItem>
          <FormItem label="Code" required validateStatus={errors?.code ? "error" : ""} help={errors?.code || ""}>
            <Input
              name="code"
              placeholder="Mã template"
              value={formData.code}
              onChange={(ev) => onChangeFormData("code", ev.target.value)}
              disabled={action === "edit"}
            />
          </FormItem>
          <FormItem
            label="Giá tiền (Mỗi khách)"
            required
            validateStatus={errors?.amount ? "error" : ""}
            help={errors?.code || ""}
          >
            <Input
              name="amount"
              placeholder="Giá tiền"
              value={formData.amount}
              onChange={(ev) => onChangeFormData("amount", ev.target.value)}
            />
          </FormItem>
          <FormItem
            label="Ảnh đại diện"
            validateStatus={errors?.codeImage ? "error" : ""}
            help={errors?.codeImage || ""}
          >
            <div className="feature-image">
              <span className="no-image border border-dashed w-24 h-24 p-1 rounded-md flex items-center justify-center bg-gray-50 mb-2 overflow-hidden">
                {formData.codeImage ? (
                  <Image
                    src={`${mediaConfig.rootApiPath}/${formData.codeImage.original}`}
                    alt="feature image"
                    width={80}
                    height={80}
                  />
                ) : (
                  <span className="text-slate-500 text-center">
                    <span className="text-2xl">
                      <PictureOutlined />
                    </span>
                    <span className="text-xs block">Chưa có ảnh</span>
                  </span>
                )}
              </span>
            </div>
            <div className="upload-media">
              <Button onClick={() => setShowMedia(true)} size="small">
                {`${formData.codeImage ? "Thay" : "Chọn"} ảnh `}
              </Button>
            </div>
          </FormItem>
          <Tabs
            type="editable-card"
            hideAdd
            items={locales.map((locale, i) => {
              return {
                label: locale.name,
                key: locale.key,
                children: (
                  <FormContentTemplateByLang
                    lang={locale.key}
                    onChangeForm={onChangeTemplateFormContent}
                    values={getContentByLang(locale.key)}
                    disabled={action === "edit"}
                  />
                ),
              };
            })}
          />
          <FormItem>
            <Space>
              <Button type="default" onClick={onClose}>
                Huỷ bỏ
              </Button>
              <Button
                type="primary"
                onClick={() => handlerSubmit(formData, onSubmit)}
                //disabled={isDisableButton}
              >
                {action === "edit" ? "Cập nhật" : "Lưu"}
              </Button>
            </Space>
          </FormItem>
        </Form>
      </Drawer>
      <MediaUploadDrawer onClose={() => setShowMedia(false)} isOpen={showMedia} onConfirm={onSelectThumb} />
    </>
  );
};
export default DrawerCMSTemplate;

interface FormContentTemplateByLangProps {
  lang: LangCode;
  onChangeForm?: (lang: LangCode, data: { name?: string; slug?: string }) => void;
  values?: { name?: string; slug?: string };
  disabled?: boolean;
}
function FormContentTemplateByLang({ lang, onChangeForm, values, disabled }: FormContentTemplateByLangProps) {
  return (
    <div className="">
      <FormItem label={`Tên (${lang})`}>
        <Input
          placeholder={`Tên (${lang})`}
          onChange={(ev) =>
            onChangeForm?.(lang, {
              name: ev.target.value,
              slug: stringToSlug(ev.target.value),
            })
          }
          value={values?.name}
          disabled={disabled}
        />
      </FormItem>
      <FormItem>
        <Slug
          lang={lang}
          slugName={values?.slug}
          onSave={(slug) =>
            onChangeForm?.(lang, {
              name: values?.name,
              slug: stringToSlug(slug),
            })
          }
          type="visa"
          disabled={disabled}
        />
      </FormItem>
    </div>
  );
}
