"use client";
import React, { useState } from "react";
import PageContainer from "@/components/admin/PageContainer";
import { useGetLeadingListQuery } from "@/queries/core/leading";
import { columns } from "./columns";
import { Leading, LeadingSource, LeadingStatus } from "@/models/management/leading.interface";
import TableListPage from "@/components/admin/TableListPage";
import DrawerLeading, {
  DrawerLeadingProps,
  LEADING_SOURCE_LIST,
  LEADING_STATUS_LIST,
} from "../components/DrawerLeading";

import useCRUDLeading from "../modules/useCRUDLeading";
import { Button, Checkbox, Col, Form, Input, Row, Select, SelectProps, Space, TableProps } from "antd";
import { ImportOutlined } from "@ant-design/icons";
import DrawerImportLead, { DrawerImportLeadProps } from "../components/DrawerImportLead";
import { LeadingQueryParamsFormData } from "../modules/leading.interface";
import FormItem from "@/components/base/FormItem";

const MemberPage: React.FC = () => {
  const initQueryParams = new LeadingQueryParamsFormData(
    { status: undefined, phone: "", source: undefined, listSource: [], listStatus: [] },
    20,
    1,
  );
  const [queryParams, setQueryparams] = useState(initQueryParams);
  const { data, isLoading } = useGetLeadingListQuery({ queryParams });

  const [open, setOpen] = useState(false);
  const [openDrawerImport, setOpenDrawerImport] = useState(false);
  const [action, setAction] = useState<"create" | "edit">();
  const [editRecord, setEditRecord] = useState<Leading>();
  const [searchText, setSearchText] = useState("");

  const { onCreate, onUpdate, onCreateMultiple } = useCRUDLeading();
  const setCreateLeading = () => {
    setAction("create");
    setOpen(true);
  };
  const setClose = () => {
    setAction(undefined);
    setOpen(false);
    setEditRecord(undefined);
  };
  const setEdit = (record: Leading) => {
    setEditRecord(record);
    setAction("edit");
    setOpen(true);
  };

  const onChangeSearchText = (text: string) => {
    setSearchText(text);
  };
  const handleSearchText = (text: string) => {
    setQueryparams((params) => ({
      ...params,
      requestObject: {
        ...params.requestObject,
        phone: text,
      },
    }));
  };
  const handleSubmitForm: DrawerLeadingProps["onSubmit"] = (data) => {
    action === "create" &&
      onCreate(data, () => {
        setClose();
      });
    action === "edit" &&
      onUpdate(data, () => {
        setClose();
      });
  };
  const handleImport: DrawerImportLeadProps["onSubmit"] = (data) => {
    onCreateMultiple(data, () => {
      setOpenDrawerImport(false);
    });
  };

  const handleChangeSource: SelectProps<
    LeadingSource[],
    { value: LeadingSource; label: LeadingSource } | { value: LeadingSource; label: LeadingSource }[]
  >["onChange"] = (value, option) => {
    setQueryparams((params) => ({
      ...params,
      requestObject: {
        ...params.requestObject,
        listSource: value,
      },
    }));
  };
  const handleChangeStatus: SelectProps<
    LeadingStatus[],
    { value: LeadingStatus; label: LeadingStatus } | { value: LeadingStatus; label: LeadingStatus }[]
  >["onChange"] = (value, option) => {
    setQueryparams((params) => ({
      ...params,
      requestObject: {
        ...params.requestObject,
        listStatus: value,
      },
    }));
  };

  const parinations: TableProps<Leading>["pagination"] = {
    pageSize: data?.pageSize,
    current: data?.pageCurrent,
    total: data?.totalItems,
    onChange(page, pageSize) {
      setQueryparams((oldData) => ({ ...oldData, pageCurrent: page }));
    },
  };
  return (
    <PageContainer
      name="Leading"
      onClick={setCreateLeading}
      modelName="leading"
      breadCrumItems={[{ title: "Leading" }]}
    >
      <div className="filter mb-6 flex items-start justify-between gap-x-6 border-b">
        <div className="flex-1">
          <Form layout="vertical">
            <Row gutter={[16, 16]}>
              <Col span={6}>
                <FormItem>
                  <Select
                    placeholder="Trạng thái"
                    value={queryParams.requestObject?.listStatus}
                    options={LEADING_STATUS_LIST.map((sourceItem) => ({ label: sourceItem, value: sourceItem }))}
                    onChange={handleChangeStatus}
                    mode="multiple"
                    maxTagCount={1}
                  />
                </FormItem>
              </Col>
              <Col span={6}>
                <FormItem>
                  <Select
                    placeholder="Nguồn"
                    value={queryParams.requestObject?.listSource}
                    options={LEADING_SOURCE_LIST.map((sourceItem) => ({ label: sourceItem, value: sourceItem }))}
                    onChange={handleChangeSource}
                    mode="multiple"
                    maxTagCount={1}
                  />
                </FormItem>
              </Col>
              <Col span={6}>
                <FormItem>
                  <Input.Search
                    placeholder="Nhập số điện thoại"
                    value={searchText}
                    onChange={(evt) => onChangeSearchText(evt.target.value)}
                    onSearch={handleSearchText}
                    enterButton="Tìm kiếm"
                    loading={false}
                  />
                </FormItem>
              </Col>
            </Row>
          </Form>
        </div>

        <Button type="primary" ghost icon={<ImportOutlined />} size="small" onClick={() => setOpenDrawerImport(true)}>
          Import
        </Button>
      </div>
      <TableListPage<Leading>
        scroll={{ x: 1200 }}
        modelName="Leading"
        rowKey="recId"
        columns={columns}
        dataSource={data?.list || []}
        isLoading={isLoading}
        onEdit={(record) => setEdit(record)}
        size="small"
        pagination={parinations}
      />
      <DrawerLeading
        open={open}
        onClose={setClose}
        action={action}
        initialValue={editRecord}
        onSubmit={handleSubmitForm}
      />
      <DrawerImportLead open={openDrawerImport} onClose={() => setOpenDrawerImport(false)} onSubmit={handleImport} />
    </PageContainer>
  );
};
export default MemberPage;
