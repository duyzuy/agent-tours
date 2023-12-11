import React, { useMemo, useState } from "react";
import { Drawer, Space, Button, Form, Row, Col, Input, TreeSelect } from "antd";

import FormItem from "@/components/base/FormItem";
import { CarryOutOutlined } from "@ant-design/icons";
import { IMediaFolderPayload } from "@/model/Management/media.interface";

// import { EActionType } from "../../page";
import { stringToSlug } from "@/utils/stringToSlug";

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
type TDrawlerAction = TDrawlerCreateAction | TDrawlerEditAction;

interface DrawlerUserFormProps {
    isOpen?: boolean;
    onCancel: () => void;
    errors?: any;
    actionType?: EActionType;
    onSubmit?: (action: EActionType, payload: IMediaFolderPayload) => void;
    onCreateFolder?: (payload: IMediaFolderPayload) => void;
}

const DrawlerMedia: React.FC<DrawlerUserFormProps> = ({
    isOpen,
    onCancel,
    errors,
    actionType = EActionType.CREATE,
    onCreateFolder,
}) => {
    const [formData, setFormdata] = useState<Required<IMediaFolderPayload>>({
        folderName: "",
        folderSlug: "",
        parent: "",
    });

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

    const onChangeParentFolder = (
        value: string,
        labelList: any,
        extra: any,
    ) => {
        console.log({ value, labelList, extra });
    };
    const treeData = [
        {
            value: "uploads",
            title: "Thư mục gốc",
            icon: <CarryOutOutlined />,
            children: [
                {
                    value: "thu-muc-1",
                    title: "Thư mục Ảnh di chơi Đà nẵng",
                    icon: <CarryOutOutlined />,
                    children: [
                        {
                            value: "thu-muc-2",
                            title: "Thư mục Ảnh di chơi Công ty 2",
                            icon: <CarryOutOutlined />,
                        },
                        {
                            value: "thu-muc-3",
                            title: "Thư mục Ảnh di chơi Công ty 3",
                            icon: <CarryOutOutlined />,
                        },
                    ],
                },
                {
                    value: "thu-muc-5",
                    title: "Ảnh di chơi Hà Nội",
                    icon: <CarryOutOutlined />,
                    children: [
                        {
                            value: "thu-muc-222",
                            title: "Thư mục Ảnh di chơi Công ty 1",
                            icon: <CarryOutOutlined />,
                        },
                        {
                            value: "thu-muc-32222",
                            title: "Thư mục Ảnh di chơi Công ty 2",
                            icon: <CarryOutOutlined />,
                        },
                    ],
                },
            ],
        },
    ];

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
                                    <p className="text-xs text-gray-400 py-2">
                                        {`Slug:  ${formData.folderSlug ?? ""}`}
                                    </p>
                                </FormItem>
                            </Col>

                            <Col span={24}>
                                <FormItem
                                    label="Thư mục cha"
                                    required
                                    validateStatus={
                                        errors?.parent ? "error" : ""
                                    }
                                    help={errors?.parent || ""}
                                >
                                    <TreeSelect
                                        defaultValue={"uploads"}
                                        treeDefaultExpandAll
                                        showSearch
                                        treeLine={true}
                                        treeData={treeData}
                                        // onChange={onChangeParentFolder}
                                        onChange={(value, item, extra) =>
                                            onChangeParentFolder(
                                                value,
                                                item,
                                                extra,
                                            )
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
                            onClick={() => onCreateFolder?.(formData)}
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
