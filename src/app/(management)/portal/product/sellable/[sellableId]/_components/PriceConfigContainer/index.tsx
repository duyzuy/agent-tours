"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Form, Input, InputNumber, Popconfirm, Button, Table, Space } from "antd";
import { ColumnsType } from "antd/es/table";
import { PriceConfig } from "@/models/management/core/priceConfig.interface";
import { isEqual, isUndefined } from "lodash";
import { EditOutlined, SaveOutlined } from "@ant-design/icons";
import useMessage from "@/hooks/useMessage";

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: "number" | "text";
  record: PriceConfig & {
    index: number;
  };
  index: number;
  children: React.ReactNode;
}

type PriceConfigEditingKeysType = Pick<
  PriceConfig,
  "adult" | "child" | "infant" | "maxAvailable" | "available" | "limitPerBooking"
>;

type PriceConfigRowRecord = PriceConfig & { index: number };
export type PriceConfigColumnTypes = ColumnsType<PriceConfigRowRecord>;

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
  const inputNode = inputType === "number" ? <InputNumber size="small" /> : <Input size="small" />;

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

export interface PriceConfigContainerProps {
  priceConfigs: PriceConfig[];
  tableColumn: (PriceConfigColumnTypes[number] & {
    editable?: boolean;
    dataIndex: string;
  })[];
  sellableId: number;
  cap: number;
  onSubmit?: (priceConfigs: PriceConfig[]) => void;
}

const PriceConfigContainer: React.FC<PriceConfigContainerProps> = ({
  onSubmit,
  priceConfigs,
  cap = 0,
  tableColumn,
}) => {
  const [form] = Form.useForm();

  const [editingRow, setEditingRow] = useState<number>();
  const [data, setData] = useState<PriceConfigRowRecord[]>();
  const isEditing = (record: PriceConfigRowRecord) => record.index === editingRow;
  const message = useMessage();

  const onSave = async (recordIndex: number) => {
    try {
      const row = (await form.validateFields()) as PriceConfigEditingKeysType;

      if (row.maxAvailable > cap || row.available > cap) {
        message.error(`Số lượng không được lớn hơn ${cap}`);
        return;
      }

      const correctRowValue = Object.keys(row).reduce((acc, key) => {
        acc[key as keyof PriceConfigEditingKeysType] = Number(row[key as keyof PriceConfigEditingKeysType]);
        return acc;
      }, {} as PriceConfigEditingKeysType);

      const newData = [...(data || [])];
      const index = newData.findIndex((item) => recordIndex === item.index);
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
    record: PriceConfig & {
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
    const keyChangesRows = data?.reduce<PriceConfigEditingKeysType[]>((acc, item) => {
      return [
        ...acc,
        {
          adult: item.adult,
          child: item.child,
          infant: item.infant,
          maxAvailable: item.maxAvailable,
          available: item.available,
          limitPerBooking: item.limitPerBooking,
        },
      ];
    }, []);

    const initKeyRows = priceConfigs.reduce<PriceConfigEditingKeysType[]>((acc, item) => {
      return [
        ...acc,
        {
          adult: item.adult,
          child: item.child,
          infant: item.infant,
          maxAvailable: item.maxAvailable,
          available: item.available,
          limitPerBooking: item.limitPerBooking,
        },
      ];
    }, []);

    return isEqual(keyChangesRows, initKeyRows);
  }, [data]);

  const handleSubmitFormData = () => {
    data && onSubmit?.(data);
  };

  const onCancelEditingRow = () => {
    setData(() =>
      priceConfigs
        .sort((a, b) => a.channel.localeCompare(b.channel))
        .reduce<PriceConfigRowRecord[]>((acc, item, _index) => {
          return [...acc, { ...item, index: _index }];
        }, []),
    );
  };

  const columns: (PriceConfigColumnTypes[number] & {
    editable?: boolean;
    dataIndex: string;
  })[] = [
    ...tableColumn,
    {
      title: "Hành động",
      dataIndex: "operation",
      fixed: "right",
      width: 150,
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <>
            <Button
              icon={<SaveOutlined />}
              type="text"
              size="small"
              onClick={() => onSave(record.index)}
              style={{ marginRight: 8 }}
            >
              Lưu
            </Button>
            <Popconfirm title="Bạn chắc chắn không muốn sửa?" onConfirm={cancel}>
              <span className="text-red-600 cursor-pointer">Huỷ</span>
            </Popconfirm>
          </>
        ) : (
          <Button
            icon={<EditOutlined />}
            type="text"
            size="small"
            disabled={!isUndefined(editingRow)}
            onClick={() => edit(record)}
          >
            Sửa
          </Button>
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
      onCell: (record: PriceConfig & { index: number }, rowIndex: number, key: any) => {
        return {
          record,
          inputType: col.dataIndex === "maxAvaiable" ? "number" : "text",
          dataIndex: col.dataIndex,
          title: col.title,
          editing: isEditing(record),
        };
      },
    };
  });

  useEffect(() => {
    setData(() =>
      priceConfigs
        .sort((a, b) => a.channel.localeCompare(b.channel))
        .reduce<PriceConfigRowRecord[]>((acc, item, _index) => {
          return [...acc, { ...item, index: _index }];
        }, []),
    );
  }, [priceConfigs]);

  return (
    <Form form={form} component={false}>
      <Table
        size="small"
        scroll={{ x: 1600, y: 800 }}
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
        footer={() => {
          return (
            <div className="px-4 flex items-center justify-end">
              <Space>
                <Button onClick={onCancelEditingRow} disabled={isDisableSubmit} className="w-[120px]">
                  Huỷ bỏ
                </Button>
                <Button onClick={handleSubmitFormData} disabled={isDisableSubmit} type="primary" className="w-[120px]">
                  Lưu
                </Button>
              </Space>
            </div>
          );
        }}
      />
    </Form>
  );
};
export default PriceConfigContainer;
