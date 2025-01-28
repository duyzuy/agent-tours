import React, { useEffect, useMemo, useState } from "react";
import { Drawer, Form, Space, Button, Input } from "antd";
import FormItem from "@/components/base/FormItem";
import { TranslationFormData } from "../translation.interface";
import { translationSchema } from "../translation.schema";
import { ITransation } from "@/models/management/cms/translations.interface";
import { locales } from "@/constants/locale.constant";
import { isEmpty, isUndefined } from "lodash";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

type Action = "create" | "edit";
export interface TranslationFormDrawerProps {
  onClose?: () => void;
  isOpen?: boolean;
  initialValues?: ITransation;
  onSubmit: (action: Action, formData: TranslationFormData, cb?: () => void) => void;
  action?: Action;
}
const initFormData = new TranslationFormData(
  undefined,
  "",
  locales.map((item) => ({ name: "", lang: item.key })),
  "",
);
const TranslationFormDrawer: React.FC<TranslationFormDrawerProps> = ({
  onClose,
  isOpen,
  onSubmit,
  action,
  initialValues,
}) => {
  const {
    handleSubmit,
    setValue,
    getValues,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm<TranslationFormData & { action: Action }>({
    defaultValues: { ...initFormData, action },
    resolver: yupResolver(translationSchema),
  });

  const { fields } = useFieldArray({
    control: control,
    name: "languages",
  });

  const submitForm = (data: TranslationFormData, type: "continue" | "close") => {
    action &&
      onSubmit(action, data, () => {
        type === "close" ? onClose?.() : reset();
      });
  };

  const isDisableButton = useMemo(() => {
    const data = getValues();
    return (
      isUndefined(data.keyName) ||
      isEmpty(data.keyName) ||
      isEmpty(data.languages) ||
      data.languages?.some((item) => isUndefined(item.name) || isEmpty(item.name))
    );
  }, [watch()]);

  useEffect(() => {
    const formData = initialValues
      ? new TranslationFormData(
          initialValues.id,
          initialValues.keyName,
          initialValues.languages.map((item) => ({ name: item.name, lang: item.lang })),
          initialValues.note,
        )
      : initFormData;

    Object.entries({ ...formData, action }).forEach(([key, value]) => {
      setValue(key as keyof TranslationFormData, value as TranslationFormData[keyof TranslationFormData]);
    });
  }, [initialValues, isOpen, action]);

  return (
    <Drawer
      title="Bản dịch"
      width={550}
      onClose={onClose}
      destroyOnClose={true}
      open={isOpen}
      footer={
        <Space className="py-3">
          <Button onClick={handleSubmit((data) => submitForm(data, "close"))} type="primary" disabled={isDisableButton}>
            Lưu và đóng
          </Button>
          {action === "create" ? (
            <Button
              onClick={handleSubmit((data) => submitForm(data, "continue"))}
              type="primary"
              disabled={isDisableButton}
            >
              Lưu và nhập tiếp
            </Button>
          ) : null}
          <Button onClick={onClose}>Huỷ</Button>
        </Space>
      }
    >
      <Form layout="vertical">
        <Controller
          name="note"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <FormItem label="Ghi chú" validateStatus={error ? "error" : undefined} help={error?.message}>
              <Input.TextArea placeholder="Ghi chú" {...field} />
            </FormItem>
          )}
        />
        <Controller
          name="keyName"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <FormItem label="Key" validateStatus={error ? "error" : undefined} help={error?.message}>
              <Input placeholder="Key" {...field} />
            </FormItem>
          )}
        />
        {fields.map((item, _index) => (
          <React.Fragment key={item.id}>
            <Controller
              name={`languages.${_index}.name`}
              control={control}
              render={({ field, fieldState: { error } }) => (
                <FormItem
                  label={`Tên - ${item.lang}`}
                  validateStatus={error ? "error" : undefined}
                  help={error?.message}
                  required
                >
                  <Input {...field} placeholder={`Tên ${item.lang}`} />
                </FormItem>
              )}
            />
          </React.Fragment>
        ))}
      </Form>
    </Drawer>
  );
};
export default TranslationFormDrawer;
