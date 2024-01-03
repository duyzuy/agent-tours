import React, { useMemo, useState } from "react";
import { Space, Button, Form, Row, Col, Input, TreeSelect } from "antd";
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

import { TMediaFolderErrorsField } from "@/app/portal/media/hooks/useCRUDFolder";

type TFolderSelectOption = {
    id: number;
    title: string;
    value: string;
    parentId: number;
    parentSlug: string;
    children: TFolderSelectOption[];
    depth: number;
};
export interface CreateFolderFormProps {
    onCancel: () => void;
    errors?: TMediaFolderErrorsField;
    onSubmit?: (payload: IMediaFolderPayload) => void;
    folderList: IMediaFolderListRs["result"];
}

const CreateFolderForm: React.FC<CreateFolderFormProps> = ({
    onCancel,
    errors,
    onSubmit,
    folderList,
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
        setFormdata((prev) => ({
            ...prev,
            [key]: value,
            folderSlug: stringToSlug(value),
        }));
    };

    const onSelectFolder = (slug: string, foldItem: TFolderSelectOption) => {
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

    return (
        <Form layout="vertical">
            <FormItem
                label="Tên thư mục"
                required
                validateStatus={errors?.folderName ? "error" : ""}
                help={errors?.folderName || ""}
            >
                <Input
                    placeholder="Tên thư mục"
                    value={formData.folderName}
                    onChange={(e) =>
                        onChangeFolderName("folderName", e.target.value)
                    }
                />
            </FormItem>
            <FormItem label="Thư mục cha" required>
                <TreeSelect
                    treeDefaultExpandAll
                    value={formData.parentSlug}
                    showSearch
                    treeLine={true}
                    treeData={folderListOptions}
                    onSelect={(value, item) => onSelectFolder(value, item)}
                />
            </FormItem>

            <Space>
                <Button onClick={onCancel}>Huỷ</Button>
                <Button onClick={() => onSubmit?.(formData)} type="primary">
                    Thêm mới
                </Button>
            </Space>
        </Form>
    );
};
export default CreateFolderForm;

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
