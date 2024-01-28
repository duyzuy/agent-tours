"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
    Drawer,
    Table,
    Form,
    Input,
    InputNumber,
    Typography,
    Popconfirm,
    Divider,
    Row,
    Col,
    Space,
    Button,
} from "antd";
import { TableProps } from "antd/es/table";

import {
    PriceConfig,
    SellablePriceConfigFormData,
    SellablePriceConfigRs,
} from "@/models/management/core/priceConfig.interface";
import { priceConfigColumns } from "./priceConfigColumns";
import { isEqual, isUndefined } from "lodash";
import { SellableListRs } from "@/models/management/core/sellable.interface";
import ContentDetail from "@/components/admin/ContentDetail";
import { formatDate } from "@/utils/date";
import { useFormSubmit } from "@/hooks/useFormSubmit";
import { priceConfigSchema } from "../../../hooks/validation";
import { sortObject } from "@/utils/helper";
import CustomTable from "@/components/admin/CustomTable";
interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
    editing: boolean;
    dataIndex: string;
    title: any;
    inputType: "number" | "text";
    record: SellablePriceConfigRs["result"][0] & {
        index: number;
    };
    index: number;
    children: React.ReactNode;
}
type EditableTableProps = TableProps<
    SellablePriceConfigRs["result"][0] & { index: number }
>;
type PriceConfigEditingKeysType = Pick<
    SellablePriceConfigRs["result"][0],
    | "adult"
    | "child"
    | "infant"
    | "maxAvaiable"
    | "otherPrice01"
    | "otherPrice02"
    | "otherPrice03"
    | "otherPriceNoSeat01"
>;

export type PriceConfigColumnTypes = Exclude<
    EditableTableProps["columns"],
    undefined
>;
const EditableCell: React.FC<EditableCellProps> = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
}) => {
    const inputNode =
        inputType === "number" ? (
            <InputNumber size="small" />
        ) : (
            <Input size="small" />
        );

    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{ margin: 0 }}
                    rules={[
                        {
                            required: true,
                            message: `Không bỏ trống.`,
                        },
                        {
                            pattern: new RegExp(/^[0-9]*$/),
                            message: `Dữ liệu không hợp lệ.`,
                        },
                    ]}
                >
                    {inputNode}
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};

export interface DrawerTemplateSellableProps {
    isOpen?: boolean;
    onCancel: () => void;
    initialValues?: SellablePriceConfigRs["result"];
    sellableRecord?: SellableListRs["result"][0];
    sellableRecId?: number;
    onSubmit?: (formData: SellablePriceConfigFormData) => void;
}

const DrawerPriceConfig: React.FC<DrawerTemplateSellableProps> = ({
    isOpen,
    onCancel,
    onSubmit,
    initialValues,
    sellableRecord,
    sellableRecId,
}) => {
    const [form] = Form.useForm();

    const { handlerSubmit, errors } =
        useFormSubmit<SellablePriceConfigFormData>({
            schema: priceConfigSchema,
        });
    const [editingRow, setEditingRow] = useState<number>();
    const [initPriceConfigValues, setInitPriceConfigValues] =
        useState<(SellablePriceConfigRs["result"][0] & { index: number })[]>();
    const [data, setData] =
        useState<(SellablePriceConfigRs["result"][0] & { index: number })[]>();

    const isEditing = (
        record: SellablePriceConfigRs["result"][0] & { index: number },
    ) => record.index === editingRow;

    const onSave = async (recordIndex: number) => {
        try {
            const row =
                (await form.validateFields()) as PriceConfigEditingKeysType;
            /**
             * format correct value number
             */
            const correctRowValue = Object.keys(row).reduce((acc, key) => {
                acc[key as keyof PriceConfigEditingKeysType] = Number(
                    row[key as keyof PriceConfigEditingKeysType],
                );
                return acc;
            }, {} as PriceConfigEditingKeysType);

            const newData = [...(data || [])];
            const index = newData.findIndex(
                (item) => recordIndex === item.index,
            );
            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...correctRowValue,
                });
            }
            setData(newData);
            setEditingRow(undefined);
        } catch (errInfo) {
            console.log("Validate Failed:", errInfo);
        }
    };

    const edit = (
        record: SellablePriceConfigRs["result"][0] & {
            index: number;
        },
    ) => {
        form.setFieldsValue({ ...record });
        setEditingRow(record.index);
    };

    const cancel = () => {
        setEditingRow(undefined);
    };

    const isDisableSubmit = useMemo(() => {
        const dataObject = data?.reduce<
            { [key: string]: PriceConfig & { index: number } }[]
        >((acc, item) => {
            return [
                ...acc,
                {
                    [item.index]: sortObject(item),
                },
            ];
        }, []);
        const initDataObject = initPriceConfigValues?.reduce<
            { [key: string]: PriceConfig }[]
        >((acc, item) => {
            return [...acc, { [item.index]: sortObject(item) }];
        }, []);

        return isEqual({ ...dataObject }, { ...initDataObject });
    }, [data, initPriceConfigValues]);
    const handleSubmitFormData = () => {
        sellableRecId &&
            handlerSubmit(
                { sellableRecId, configs: data } as SellablePriceConfigFormData,
                onSubmit,
            );
    };
    const columns: (PriceConfigColumnTypes[number] & {
        editable?: boolean;
        dataIndex: string;
    })[] = [
        ...priceConfigColumns,
        {
            title: "Hành động",
            dataIndex: "operation",
            fixed: "right",
            width: 150,
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
                        <Typography.Link
                            onClick={() => onSave(record.index)}
                            style={{ marginRight: 8 }}
                        >
                            Lưu
                        </Typography.Link>
                        <Popconfirm
                            title="Bạn chắc chắn không muốn sửa?"
                            onConfirm={cancel}
                        >
                            <span className="text-red-600 cursor-pointer">
                                Huỷ
                            </span>
                        </Popconfirm>
                    </span>
                ) : (
                    <Typography.Link
                        disabled={!isUndefined(editingRow)}
                        onClick={() => edit(record)}
                    >
                        Sửa
                    </Typography.Link>
                );
            },
        },
    ];

    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (
                record: PriceConfig & { index: number },
                rowIndex: number,
                key: any,
            ) => {
                console.log(key, rowIndex);
                return {
                    record,
                    inputType:
                        col.dataIndex === "maxAvaiable" ? "number" : "text",
                    dataIndex: col.dataIndex,
                    title: col.title,
                    editing: isEditing(record),
                };
            },
        };
    });

    useEffect(() => {
        if (isUndefined(initialValues)) return;
        initialValues.sort((a, b) => a.channel.localeCompare(b.channel));
        const valueWithIndex = initialValues.reduce<
            (SellablePriceConfigRs["result"][0] & { index: number })[]
        >((acc, item, _index) => {
            return [...acc, { ...item, index: _index }];
        }, []);
        setData(valueWithIndex);
        setInitPriceConfigValues(valueWithIndex);
    }, [initialValues]);

    return (
        <Drawer
            title={"Thiết lập giá"}
            destroyOnClose
            height={"90vh"}
            onClose={onCancel}
            placement="bottom"
            extra={
                <Space>
                    <Button onClick={onCancel}>Cancel</Button>
                    <Button
                        type="primary"
                        onClick={handleSubmitFormData}
                        disabled={isDisableSubmit}
                    >
                        Lưu chỉnh sửa
                    </Button>
                </Space>
            }
            open={isOpen}
        >
            <div className="sellable detail">
                {sellableRecord ? (
                    <Row>
                        <Col span={12}>
                            <ContentDetail
                                contents={[
                                    {
                                        label: "Code",
                                        value: sellableRecord.code,
                                    },
                                    {
                                        label: "Loại",
                                        value: sellableRecord.type,
                                    },
                                    {
                                        label: "Cap",
                                        value: sellableRecord.cap.toString(),
                                    },
                                    {
                                        label: "Đã sử dụng",
                                        value: sellableRecord.used.toString(),
                                    },
                                ]}
                            />
                        </Col>
                        <Col span={12}>
                            <ContentDetail
                                contents={[
                                    {
                                        label: "Ngày bắt đầu mở bán",
                                        value: formatDate(
                                            sellableRecord.validFrom,
                                        ),
                                    },
                                    {
                                        label: "Ngày kết thúc mở bán",
                                        value: formatDate(
                                            sellableRecord.validTo,
                                        ),
                                    },
                                    {
                                        label: "Close date",
                                        value: formatDate(
                                            sellableRecord.closeDate,
                                        ),
                                    },
                                    {
                                        label: "Ngày bắt đầu hiệu lực",
                                        value: formatDate(
                                            sellableRecord.startDate,
                                        ),
                                    },
                                    {
                                        label: "Ngày kết thúc hiệu lực",
                                        value: formatDate(
                                            sellableRecord.endDate,
                                        ),
                                    },
                                ]}
                            />
                        </Col>
                    </Row>
                ) : null}
            </div>
            <Divider />
            <Form form={form} component={false}>
                <CustomTable
                    scroll={{ x: 1600, y: "60vh" }}
                    dataSource={data}
                    columns={mergedColumns as PriceConfigColumnTypes}
                    rowKey={(record) => record.index}
                    components={{
                        body: {
                            cell: EditableCell,
                        },
                    }}
                    pagination={{
                        pageSize: 30,
                        hideOnSinglePage: true,
                        current: 1,
                    }}
                />
            </Form>
        </Drawer>
    );
};
export default DrawerPriceConfig;
