import { useEffect, useMemo, useState } from "react";
import { Drawer, Space, Button, Form, Input, Checkbox, Select, CheckboxProps } from "antd";
import FormItem from "@/components/base/FormItem";
import { IMenuItem, MenuItemFormData, MenuPositionType } from "@/models/management/cms/menu.interface";
import { updateMenuItemSchema } from "../modules/menu.schema";
import { HandleSubmit, useFormSubmit } from "@/hooks/useFormSubmit";
import useCRUDMenu from "../modules/useCRUDMenu";
import { LangCode } from "@/models/management/cms/language.interface";
import IconSelector from "@/components/base/IconSelector";
import { isEqual } from "lodash";

interface MenuItemFormDrawerProps {
  isOpen?: boolean;
  onClose: () => void;
  menuPosition: MenuPositionType;
  lang: LangCode;
  initialValues?: {
    data: IMenuItem;
    depth?: number;
  };
}
const MenuItemFormDrawer: React.FC<MenuItemFormDrawerProps> = ({
  isOpen,
  onClose,
  initialValues,
  menuPosition,
  lang,
}) => {
  const { data, depth } = initialValues || {};
  const [formData, setFormData] = useState<MenuItemFormData>();

  const { handlerSubmit, errors } = useFormSubmit({ schema: updateMenuItemSchema });
  const { onUpdate, isPendingUpdate } = useCRUDMenu();

  const onChange = (key: keyof MenuItemFormData, value: MenuItemFormData[keyof MenuItemFormData]) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleChangeMegamenu: CheckboxProps["onChange"] = (e) => {
    setFormData((prev) => ({
      ...prev,
      isMega: e.target.checked,
    }));
  };

  const disabledButton = useMemo(() => {
    return isEqual(
      {
        isMega: initialValues?.data.isMega,
        description: initialValues?.data.description,
        name: initialValues?.data.name,
        icon: initialValues?.data.icon,
      },
      { isMega: formData?.isMega, description: formData?.description, name: formData?.name, icon: formData?.icon },
    );
  }, [formData]);
  const onSubmitForm: HandleSubmit<MenuItemFormData> = (data) => {
    initialValues &&
      onUpdate({ data: { ...data, id: initialValues.data.id }, menuPosition: menuPosition, lang: lang }, () => {
        onClose();
      });
  };
  /*
   * INITIAL FORM Data
   */
  useEffect(() => {
    setFormData(data);
  }, [data, isOpen]);

  return (
    <Drawer
      title="Sửa menu item"
      width={550}
      onClose={onClose}
      open={isOpen}
      destroyOnClose={true}
      footer={
        <Space className="py-3">
          <Button
            onClick={() => formData && handlerSubmit(formData, onSubmitForm)}
            type="primary"
            loading={isPendingUpdate}
            className="w-24"
            disabled={disabledButton}
          >
            Lưu
          </Button>
          <Button onClick={onClose} className="w-24">
            Huỷ
          </Button>
        </Space>
      }
    >
      <Form layout="vertical">
        <FormItem label="Tên menu" validateStatus={errors?.name ? "error" : ""} required help={errors?.name || ""}>
          <Input placeholder="Tên menu" value={formData?.name} onChange={(e) => onChange("name", e.target.value)} />
        </FormItem>
        {formData?.objectType === "custom" ? (
          <FormItem label="Đường dẫn" validateStatus={errors?.slug ? "error" : ""} required help={errors?.slug || ""}>
            <Input
              placeholder="Đường dẫn"
              value={formData?.slug}
              onChange={(e) => onChange("slug", e.target.value)}
              disabled={formData?.objectType !== "custom"}
            />
          </FormItem>
        ) : (
          <FormItem label="Đường dẫn">
            <Input
              placeholder="Đường dẫn"
              value={formData?.objectSlug}
              onChange={(e) => onChange("slug", e.target.value)}
              disabled={true}
            />
          </FormItem>
        )}
        <FormItem label="Icon">
          <IconSelector value={formData?.icon} onChange={(value) => onChange("icon", value)} />
        </FormItem>
        <FormItem>
          <Checkbox checked={formData?.isMega} onChange={handleChangeMegamenu}>
            Mega menu
          </Checkbox>
        </FormItem>
        <FormItem
          label="Mô tả ngắn"
          validateStatus={errors?.description ? "error" : ""}
          // required
          help={errors?.description || ""}
        >
          <Input.TextArea
            placeholder="Mô tả ngắn"
            value={formData?.description}
            onChange={(e) => onChange("description", e.target.value)}
            maxLength={80}
            showCount
          />
        </FormItem>
      </Form>
    </Drawer>
  );
};
export default MenuItemFormDrawer;
