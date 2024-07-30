import { useEffect, useState } from "react";
import { Drawer, Space, Button, Form, Input, Checkbox, Select, CheckboxProps } from "antd";
import FormItem from "@/components/base/FormItem";
import { IRolesPermissionsRs } from "@/models/management/role.interface";
import { IMenuItem, MenuItemFormData, MenuPositionType } from "@/models/management/cms/menu.interface";
import { ICON_LIST } from "@/constants/icons.constant";
import { updateMenuItemSchema } from "../../schema/menu.schema";
import { HandleSubmit, useFormSubmit } from "@/hooks/useFormSubmit";
import useCRUDMenu from "../../modules/useCRUDMenu";
import { LangCode } from "@/models/management/cms/language.interface";

interface DrawerMenuItemProps {
  isOpen?: boolean;
  onClose: () => void;
  menuPosition: MenuPositionType;
  lang: LangCode;
  initialValues?: {
    data: IMenuItem;
    depth?: number;
  };
}
const DrawerMenuItem: React.FC<DrawerMenuItemProps> = ({ isOpen, onClose, initialValues, menuPosition, lang }) => {
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
      styles={{
        body: {
          paddingBottom: 80,
        },
      }}
    >
      <Form layout="vertical">
        <FormItem label="Tên menu" validateStatus={errors?.name ? "error" : ""} required help={errors?.name || ""}>
          <Input placeholder="Tên menu" value={formData?.name} onChange={(e) => onChange("name", e.target.value)} />
        </FormItem>
        {formData?.objectType === "custom" ? (
          <FormItem
            label="Đường dẫn"
            validateStatus={errors?.slug ? "error" : ""}
            // required
            help={errors?.slug || ""}
          >
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
          <Select
            fieldNames={{ label: "name", value: "key" }}
            optionLabelProp="name"
            options={[
              { name: "-- None --", key: "" },
              ...ICON_LIST.map((item) => ({ name: item.name, key: item.key })),
            ]}
            value={formData?.icon}
            onChange={(value) => onChange("icon", value)}
            className="w-full"
          />
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
      <Space>
        <Button onClick={onClose} className="w-32">
          Huỷ
        </Button>
        <Button
          onClick={() => formData && handlerSubmit(formData, onSubmitForm)}
          type="primary"
          loading={isPendingUpdate}
          className="w-32"
        >
          Cập nhật
        </Button>
      </Space>
    </Drawer>
  );
};
export default DrawerMenuItem;
