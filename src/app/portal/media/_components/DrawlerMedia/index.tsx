import React, { useEffect, useMemo, useState } from "react";
import { Drawer, Space, Button, Form, Row, Col, Input, TreeSelect } from "antd";
import { mediaConfig } from "@/configs";
import FormItem from "@/components/base/FormItem";
import {
    IMediaFolderListRs,
    IMediaFolderPayload,
} from "@/models/management/media.interface";

// import { EActionType } from "../../page";
import { stringToSlug } from "@/utils/stringToSlug";
import { isEmpty } from "lodash";
import useMessage from "@/hooks/useMessage";
import { TMediaFolderErrorsField } from "../../hooks/useCRUDFolder";

export enum EActionType {
    CREATE = "create",
    EDIT = "edit",
}
type TDrawlerCreateAction = {
    type: EActionType.CREATE;
};
type TDrawlerEditAction = {
    type: EActionType.EDIT;
    record: any;
};
export type TDrawlerActions = TDrawlerCreateAction | TDrawlerEditAction;

type TFolderSelectOption = {
    id: number;
    title: string;
    value: string;
    parentId: number;
    parentSlug: string;
    children: TFolderSelectOption[];
    depth: number;
};
interface DrawlerUserFormProps {
    isOpen?: boolean;
    onCancel: () => void;
    errors?: TMediaFolderErrorsField;
    actionType?: EActionType;
    onSubmit?: (action: EActionType, payload: IMediaFolderPayload) => void;
    folderList: IMediaFolderListRs["result"];
    initialValues?: IMediaFolderPayload;
}

const DrawlerMedia: React.FC<DrawlerUserFormProps> = ({
    isOpen,
    onCancel,
    errors,
    actionType = EActionType.CREATE,
    onSubmit,
    folderList,
    initialValues,
}) => {
    const [formData, setFormdata] = useState<Required<IMediaFolderPayload>>({
        folderName: "",
        folderSlug: "",
        folderPath: `/${mediaConfig.rootFolder}`,
        parentSlug: mediaConfig.rootFolder,
        parent: 0,
    });

    const message = useMessage();
    const onChangeFolderName = (
        key: keyof IMediaFolderPayload,
        value: string,
    ) => {
        const folderSlug =
            actionType === EActionType.EDIT
                ? formData.folderSlug
                : stringToSlug(value);
        setFormdata((prev) => ({
            ...prev,
            [key]: value,
            folderSlug,
        }));
    };

    const onSelectFolder = (slug: string, foldItem: TFolderSelectOption) => {
        if (actionType === EActionType.EDIT) {
            return;
        }
        if (foldItem.depth >= 2) {
            message.error("Chỉ cho phép tạo tối đa 2 cấp thư mục.");
            return;
        }
        let folderPath = "";
        if (isEmpty(foldItem.parentSlug)) {
            folderPath = `/${slug}`;
        } else {
            folderPath = `/${foldItem.parentSlug.concat("/", slug)}`;
        }
        setFormdata((prev) => ({
            ...prev,
            folderPath: folderPath,
            parentSlug: slug,
            parent: foldItem.id,
        }));
    };

    const folderListOptions: TFolderSelectOption[] = useMemo(() => {
        return [
            {
                id: 0,
                title: "Thư mục gốc",
                value: mediaConfig.rootFolder,
                parentId: 0,
                parentSlug: "",
                depth: 0,
                children: formatFolderListToOptionDataSelectTree(
                    folderList,
                    mediaConfig.rootFolder,
                    1,
                ),
            },
        ];
    }, [folderList]);

    useEffect(() => {
        if (actionType === EActionType.EDIT) {
            const parentItem = folderList.find(
                (foldItem) => foldItem.id === initialValues?.parent,
            );
            let folderPath = `/${mediaConfig.rootFolder}`;
            if (parentItem) {
                folderPath = folderPath.concat("/", parentItem.folderSlug);
            }
            setFormdata((prev) => ({
                ...prev,
                folderName: initialValues?.folderName || "",
                folderSlug: initialValues?.folderSlug || "",
                parent: initialValues?.parent || 0,
                parentSlug: parentItem?.folderSlug || mediaConfig.rootFolder,
                folderPath: folderPath,
            }));
        }
    }, [initialValues, actionType, folderListOptions]);

    return (
        <>
            <Drawer
                title={
                    actionType === EActionType.CREATE ? "Thêm mới" : "Chỉnh sửa"
                }
                destroyOnClose
                width={550}
                onClose={onCancel}
                open={isOpen}
                styles={{
                    body: {
                        paddingBottom: 80,
                    },
                }}
            >
                <Form layout="vertical">
                    <div className="account-information">
                        <div className="header py-2 mb-4">
                            <p className="font-bold text-lg">Thư mục</p>
                        </div>
                        <Row gutter={16}>
                            <Col span={24}>
                                <FormItem
                                    label="Tên thư mục"
                                    required
                                    validateStatus={
                                        errors?.folderName ? "error" : ""
                                    }
                                    help={errors?.folderName || ""}
                                >
                                    <Input
                                        placeholder="Tên thư mục"
                                        value={formData.folderName}
                                        onChange={(e) =>
                                            onChangeFolderName(
                                                "folderName",
                                                e.target.value,
                                            )
                                        }
                                    />
                                </FormItem>
                            </Col>
                            {actionType === EActionType.EDIT ? (
                                <Col span={24}>
                                    <FormItem
                                        label="Đường dẫn thư mục"
                                        required
                                        validateStatus={
                                            errors?.folderSlug ? "error" : ""
                                        }
                                        help={errors?.folderSlug || ""}
                                    >
                                        <Input
                                            placeholder="Đường dẫn thư mục"
                                            value={formData.folderSlug}
                                            disabled
                                            onChange={(e) =>
                                                onChangeFolderName(
                                                    "folderName",
                                                    e.target.value,
                                                )
                                            }
                                        />
                                    </FormItem>
                                </Col>
                            ) : null}
                            <Col span={24}>
                                <FormItem label="Thư mục cha" required>
                                    <TreeSelect
                                        // defaultValue={mediaConfig.rootFolder}
                                        disabled={
                                            actionType === EActionType.EDIT
                                                ? true
                                                : false
                                        }
                                        treeDefaultExpandAll
                                        value={formData.parentSlug}
                                        showSearch
                                        treeLine={true}
                                        treeData={folderListOptions}
                                        // onChange={onChangeParentFolder}
                                        onSelect={(value, item) =>
                                            onSelectFolder(value, item)
                                        }
                                    />
                                </FormItem>
                            </Col>
                        </Row>
                    </div>
                </Form>
                <div className="bottom py-4 absolute bottom-0 left-0 right-0 border-t px-6 bg-white">
                    <Space>
                        <Button onClick={onCancel}>Huỷ</Button>
                        <Button
                            onClick={() => onSubmit?.(actionType, formData)}
                            type="primary"
                        >
                            {actionType === EActionType.CREATE
                                ? "Thêm mới"
                                : "Cập nhật"}
                        </Button>
                    </Space>
                </div>
            </Drawer>
        </>
    );
};
export default DrawlerMedia;

const formatFolderListToOptionDataSelectTree = (
    items: IMediaFolderListRs["result"],
    parentSlug: string,
    depth: number,
): TFolderSelectOption[] => {
    return items.map((item) => {
        const formatItem = {
            id: item.id,
            value: item.folderSlug,
            title: item.folderName,
            parentId: item.parent,
            parentSlug: parentSlug,
            depth: depth,
        };
        let childs: TFolderSelectOption[] = [];
        if (!isEmpty(item.children)) {
            childs = formatFolderListToOptionDataSelectTree(
                item.children,
                item.folderSlug,
                depth + 1,
            );
        }

        return { ...formatItem, children: childs };
    });
};
