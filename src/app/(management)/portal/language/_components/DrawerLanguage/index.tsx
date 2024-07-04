import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Drawer, Form, Space, Button, Input } from "antd";
import FormItem from "@/components/base/FormItem";
import { HandleSubmit, useFormSubmit } from "@/hooks/useFormSubmit";
import { TranslationFormData } from "../../modules/language.interface";
import { translationSchema } from "../../schema/translation.schema";
import { ITransation } from "@/models/management/cms/translations.interface";
import { locales } from "@/constants/locale.constant";
import { LangCode } from "@/models/management/cms/language.interface";
import { isEmpty, isUndefined } from "lodash";

type RequiredLanguageFormData = Required<TranslationFormData>;

export interface DrawerLanguageProps {
    onClose?: () => void;
    isOpen?: boolean;
    initialValues?: ITransation;
    onSubmit: (
        type: "create" | "edit",
        formData: TranslationFormData,
        cb?: () => void,
    ) => void;
    actionType?: "create" | "edit";
}

const DrawerLanguage: React.FC<DrawerLanguageProps> = ({
    onClose,
    isOpen,
    onSubmit,
    actionType,
    initialValues,
}) => {
    const initFormData = new TranslationFormData(undefined, [], undefined);
    const [formData, setFormData] = useState(initFormData);
    const { handlerSubmit, errors } = useFormSubmit({
        schema: translationSchema,
    });

    const onChangeFormData = (
        key: keyof RequiredLanguageFormData,
        value: RequiredLanguageFormData[keyof RequiredLanguageFormData],
    ) => {
        setFormData((oldData) => ({ ...oldData, [key]: value }));
    };

    const onChangeTranslationName = (langCode: LangCode, value: string) => {
        setFormData((oldData) => {
            let newLanguages = [...oldData.languages];

            const indexItem = oldData.languages.findIndex(
                (item) => item.lang === langCode,
            );

            if (indexItem !== -1) {
                newLanguages.splice(indexItem, 1, {
                    ...newLanguages[indexItem],
                    name: value,
                });
            } else {
                newLanguages = [
                    ...newLanguages,
                    { lang: langCode, name: value },
                ];
            }
            return { ...oldData, languages: newLanguages };
        });
    };

    const getTranslationName = useCallback(
        (langCode: LangCode) => {
            const item = formData.languages.find(
                (item) => item.lang === langCode,
            );

            return item?.name || "";
        },
        [formData.languages],
    );

    const onSubmitForm = (
        data: TranslationFormData,
        type: "continue" | "close",
    ) => {
        actionType &&
            onSubmit(actionType, data, () => {
                if (type === "close") {
                    onClose?.();
                }
                if (type === "continue") {
                    setFormData(initFormData);
                }
            });
    };

    const isDisableButton = useMemo(() => {
        return (
            isUndefined(formData.keyName) ||
            isEmpty(formData.keyName) ||
            isEmpty(formData.languages) ||
            formData.languages.some(
                (item) => isUndefined(item.name) || isEmpty(item.name),
            )
        );
    }, [formData.keyName, formData.languages]);

    useEffect(() => {
        setFormData((oldData) => {
            return initialValues
                ? {
                      ...oldData,
                      note: initialValues.note,
                      languages: initialValues.languages,
                      keyName: initialValues.keyName,
                  }
                : initFormData;
        });
    }, [initialValues, isOpen]);
    return (
        <Drawer
            title="Bản dịch"
            width={550}
            onClose={onClose}
            destroyOnClose={true}
            open={isOpen}
            styles={{
                body: {
                    paddingBottom: 80,
                },
            }}
        >
            <Form layout="vertical">
                <FormItem
                    label="Ghi chú"
                    validateStatus={errors?.note ? "error" : ""}
                    help={errors?.note || ""}
                >
                    <Input.TextArea
                        placeholder="Ghi chú"
                        value={formData.note}
                        onChange={(e) =>
                            onChangeFormData("note", e.target.value)
                        }
                    />
                </FormItem>
                <FormItem
                    label="Key"
                    validateStatus={errors?.keyName ? "error" : ""}
                    required
                    help={errors?.keyName || ""}
                >
                    <Input
                        placeholder="Key"
                        value={formData.keyName}
                        onChange={(e) =>
                            onChangeFormData("keyName", e.target.value)
                        }
                    />
                </FormItem>
                {locales.map((locale) => (
                    <React.Fragment key={locale.key}>
                        <FormItem
                            label={`Tên - ${locale.name}`}
                            validateStatus={errors?.languages ? "error" : ""}
                            required
                            help={errors?.languages || ""}
                        >
                            <Input
                                placeholder={`Tên ${locale.name}`}
                                value={getTranslationName(locale.key)}
                                onChange={(e) =>
                                    onChangeTranslationName(
                                        locale.key,
                                        e.target.value,
                                    )
                                }
                            />
                        </FormItem>
                    </React.Fragment>
                ))}
            </Form>
            <div className="drawler-action absolute px-4 py-4 border-t left-0 right-0 bg-white bottom-0">
                <Space>
                    <Button onClick={onClose}>Huỷ</Button>
                    <Button
                        onClick={() =>
                            handlerSubmit?.(formData, (data) =>
                                onSubmitForm(data, "continue"),
                            )
                        }
                        type="primary"
                        disabled={isDisableButton}
                    >
                        Lưu và nhập tiếp
                    </Button>
                    <Button
                        onClick={() =>
                            handlerSubmit?.(formData, (data) =>
                                onSubmitForm(data, "close"),
                            )
                        }
                        type="primary"
                        disabled={isDisableButton}
                    >
                        Lưu và đóng
                    </Button>
                </Space>
            </div>
        </Drawer>
    );
};
export default DrawerLanguage;
