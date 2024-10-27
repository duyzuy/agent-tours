import React, { ChangeEventHandler, useEffect, useRef, useState } from "react";
import {
  Button,
  Checkbox,
  Col,
  Drawer,
  DrawerProps,
  Form,
  Input,
  Radio,
  Row,
  Select,
  Space,
  Table,
  TableColumnsType,
  TableProps,
  Upload,
  UploadProps,
} from "antd";

import { useForm, Controller, UseFormHandleSubmit } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { leadingSchema } from "../schema/leading.schema";
import { Leading, LeadingPayload, LeadingSource, LeadingStatus } from "@/models/management/leading.interface";
import { LeadingFormData } from "../modules/leading.interface";
import FormItem from "@/components/base/FormItem";
import { read, utils, writeFile } from "xlsx";

const LEADING_SOURCE_LIST: LeadingSource[] = [
  "RETURNED",
  "FACEBOOK",
  "TIKTOK",
  "ZALO",
  "TELESALE",
  "NEWSPAPER",
  "POSTER",
  "FLYER",
];
const LEADING_STATUS_LIST: LeadingStatus[] = ["CALLBACKLATER", "NEW"];

type LeadingImportKeys = "phone" | "paxName" | "remark" | "source" | "status";

export type DrawerImportLeadProps = DrawerProps & {
  action?: "create" | "edit";
  onClose?: () => void;
  onSubmit?: (data?: LeadingPayload[]) => void;
};

export const initFormData = new LeadingFormData(undefined, "", "", "", "OTHER", "NEW");

const DrawerImportLead: React.FC<DrawerImportLeadProps> = ({ action, onClose, open, onSubmit, ...restprops }) => {
  const [data, setData] = useState<LeadingPayload[] | undefined>();

  const handleChangeExcelFile: ChangeEventHandler<HTMLInputElement> = (evt) => {
    const reader = new FileReader();

    const fileReader = evt.target.files?.[0];

    if (!fileReader) return;

    reader.readAsArrayBuffer(fileReader);

    reader.onload = (e) => {
      const result = e.target?.result;

      const workbook = read(result, { type: "array" });

      workbook.SheetNames.forEach(async (sheet) => {
        const result = utils.sheet_to_json<LeadingPayload>(workbook.Sheets[sheet], {
          raw: false,
        });

        console.log(result);
        setData(result);
      });
    };
  };

  const fileExcerpt = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

  const columns: TableColumnsType<LeadingPayload> = [
    {
      title: "Họ và tên",
      key: "paxName",
      dataIndex: "paxName",
      width: 150,
    },
    {
      title: "Số điện thoại",
      key: "phone",
      dataIndex: "phone",
      width: 150,
    },
    {
      title: "Remark",
      key: "remark",
      dataIndex: "remark",
      width: 200,
    },
    {
      title: "Nguồn",
      key: "source",
      dataIndex: "source",
      width: 80,
    },
    {
      title: "Trạng thái",
      key: "status",
      dataIndex: "status",
      width: 80,
    },
  ];
  return (
    <>
      <Drawer
        title={action === "create" ? "Thêm mới" : "Chỉnh sửa"}
        destroyOnClose
        width={650}
        onClose={onClose}
        open={open}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
      >
        <Form layout="vertical">
          <FormItem label="Import file" required>
            <Input type="file" onChange={handleChangeExcelFile} accept={fileExcerpt} />
          </FormItem>
        </Form>
        <div className="mb-6">
          <p className="font-bold">Lưu ý trước khi import.</p>
          <ul className=" list-disc pl-5">
            <li>
              Key bao gồm: <strong>phone, paxName, remark, source, status</strong>
            </li>
            <li>
              source phải là một trong những giá trị sau:{" "}
              {LEADING_SOURCE_LIST.map((sourceItem, _index) => (
                <span key={sourceItem} className="text-xs font-bold">
                  {_index !== 0 ? ", " : ""}
                  {`${sourceItem}`}
                </span>
              ))}
            </li>
            <li>
              status phải là một trong những giá trị sau:{" "}
              {LEADING_STATUS_LIST.map((statusItem, _index) => (
                <span key={statusItem} className="text-xs font-bold">
                  {_index !== 0 ? ", " : ""}
                  {`${statusItem}`}
                </span>
              ))}
            </li>
          </ul>
        </div>
        <Table dataSource={data} rowKey={"index"} columns={columns} size="small" />
        <div className="bottom py-4 absolute bottom-0 left-0 right-0 border-t px-6 bg-white">
          <Space>
            <Button onClick={onClose} className="w-32">
              Huỷ bỏ
            </Button>
            <Button type="primary" className="w-32" disabled={!data} onClick={() => onSubmit?.(data)}>
              Lưu danh sách
            </Button>
          </Space>
        </div>
      </Drawer>
    </>
  );
};
export default DrawerImportLead;
