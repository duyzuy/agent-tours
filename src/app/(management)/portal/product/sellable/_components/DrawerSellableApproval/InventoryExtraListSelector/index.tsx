import React, { useState, useContext, useEffect } from "react";
import { Form, FormInstance, Button, InputNumber, Select, SelectProps } from "antd";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import Table, { TableProps } from "antd/es/table";

import { EInventoryType } from "@/models/management/core/inventoryType.interface";
import { useGetInventoryListCoreQuery } from "@/queries/core/inventory";
import { IInventory, InventoryQueryParams } from "@/models/management/core/inventory.interface";
import { EProductType } from "@/models/management/core/productType.interface";
import { isArray } from "lodash";

const EditableContext = React.createContext<FormInstance<any> | null>(null);

type InventoryItemType = { inventory: IInventory; qty: number };

interface EditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  children: React.ReactNode;
  dataIndex: keyof InventoryItemType;
  record: InventoryItemType;
  handleSave: (record: InventoryItemType) => void;
}

const EditableCell: React.FC<EditableCellProps> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);

  const form = useContext(EditableContext)!;

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();

      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{ margin: 0, padding: 0, height: 28 }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `Không bỏ trống.`,
          },
          {
            type: "number",
            min: 1,
            max: 9999,
            message: "Số lượng không hợp lệ.",
          },
        ]}
      >
        <InputNumber autoFocus={true} size="small" onPressEnter={save} onBlur={save} className="p-0" />
      </Form.Item>
    ) : (
      <div className="editable-cell-value-wrap" onClick={toggleEdit}>
        {children}
        <Button icon={<EditOutlined />} type="text" shape="circle" size="small" />
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

interface EditableRowProps {
  index: number;
}

const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};
// type EditableTableProps = Parameters<typeof Table>[0];
type EditableTableProps = TableProps<InventoryItemType>;
type ColumnTypes = Exclude<EditableTableProps["columns"], undefined>;

export type InventoryExtraListSelectorProps = TableProps<InventoryItemType> & {
  inventories: InventoryItemType[];
  inventoryTypes: EInventoryType[];
  enabled?: boolean;
  onChangeQuantity: (record: InventoryItemType) => void;
  onAdd: (data: IInventory) => void;
  onRemove: (record: InventoryItemType) => void;
};

function InventoryExtraListSelector(props: InventoryExtraListSelectorProps) {
  const { inventories, onChangeQuantity, onAdd, onRemove, inventoryTypes, enabled = true, ...restProps } = props;

  const initQueryParams = new InventoryQueryParams(
    { productType: [EProductType.EXTRA], isStock: false, type: inventoryTypes },
    1,
    999,
  );
  const { data, isLoading } = useGetInventoryListCoreQuery({ queryParams: initQueryParams, enabled: enabled });
  const [inventory, setInventory] = useState<IInventory>();

  const [selectedInventoryList, setSelectedInventoryList] = useState<InventoryItemType[]>([]);

  const handleSave: EditableCellProps["handleSave"] = (record) => {
    onChangeQuantity(record);
  };

  const onSelectInventory: SelectProps<number, IInventory>["onChange"] = (value, option) => {
    setInventory(isArray(option) ? option[0] : option);
  };

  const onAddInventory = () => {
    inventory && onAdd(inventory), setInventory(undefined);
  };

  const defaultColumns: (ColumnTypes[number] & {
    editable?: boolean;
    dataIndex: string;
  })[] = [
    {
      title: "#ID",
      dataIndex: "recId",
      width: 80,
      render: (_, record) => {
        return record.inventory.recId;
      },
    },
    {
      title: "Tên",
      dataIndex: "code",
      width: 250,
      render: (_, record) => {
        return (
          <>
            <p>{record.inventory.name}</p>
            <p className="text-xs text-gray-600">{record.inventory.code}</p>
          </>
        );
      },
    },
    {
      title: "Loại",
      dataIndex: "type",
      width: 150,
      render: (_, record) => {
        return (
          <>
            <p className="text-xs ">{record.inventory.type}</p>
            <p>{record.inventory.tourItinerary}</p>
          </>
        );
      },
    },
    {
      title: "Số lượng",
      dataIndex: "qty",
      width: 150,
      editable: true,
    },
    {
      title: "",
      dataIndex: "actions",
      fixed: "right",
      width: 100,
      render: (_, recrod) => {
        return (
          <Button
            icon={<DeleteOutlined />}
            size="small"
            danger
            type="text"
            onClick={() => onRemove(recrod)}
            shape="circle"
            className="p-2"
          ></Button>
        );
      },
    },
  ];

  const inventoryColumns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: InventoryItemType) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });

  const isSelectedInventory = (inventoryId: number) => {
    return !!selectedInventoryList.find((item) => item.inventory.recId === inventoryId);
  };
  useEffect(() => {
    setSelectedInventoryList(inventories);
  }, [inventories]);
  return (
    <React.Fragment>
      <div className="flex items-center gap-x-2 mb-3">
        <Select<number, IInventory>
          fieldNames={{
            value: "recId",
            label: "name",
          }}
          value={inventory?.recId}
          options={data?.list.filter((item) => !isSelectedInventory(item.recId))}
          onSelect={onSelectInventory}
          placeholder="Chọn loại dịch vụ - Extra"
          className="w-full"
          loading={isLoading}
        />
        <Button type="primary" ghost icon={<PlusOutlined />} loading={isLoading} onClick={onAddInventory}>
          Thêm
        </Button>
      </div>
      <Table
        rowKey={(record) => record.inventory?.recId || ""}
        size="small"
        components={{
          body: {
            row: EditableRow,
            cell: EditableCell,
          },
        }}
        rowClassName={() => "editable-row"}
        columns={inventoryColumns as ColumnTypes}
        dataSource={selectedInventoryList}
        pagination={{
          hideOnSinglePage: true,
          size: "small",
        }}
        {...restProps}
      />
    </React.Fragment>
  );
}
export default InventoryExtraListSelector;
