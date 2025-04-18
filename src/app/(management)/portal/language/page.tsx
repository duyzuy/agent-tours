"use client";
import React, { useState } from "react";
import PageContainer from "@/components/admin/PageContainer";
import TableListPage from "@/components/admin/TableListPage";
import { ITransation } from "@/models/management/cms/translations.interface";
import { useGetTranslations } from "@/modules/admin/languageManager";

import { columns } from "./columns";
import { Form, Input, Space, Switch } from "antd";
import FormItem from "@/components/base/FormItem";
import { TranslationFormDataQeryParams } from "@/modules/admin/languageManager/translation.interface";
import { useCreateTranslation, useUpdateTranslation, useDeleteTranslation } from "@/modules/admin/languageManager";
import TranslationFormDrawer, {
  TranslationFormDrawerProps,
} from "@/modules/admin/languageManager/components/TranslationFormDrawer";

const LanguagePage = () => {
  const [queryParams, setQueryParams] = useState(() => new TranslationFormDataQeryParams({ name: "" }, 1, 20));

  const { data: translationData, isLoading } = useGetTranslations({ queryParams: queryParams });

  const { mutate: createTranslation, isPending: loaddingCreate } = useCreateTranslation();
  const { mutate: updateTranslation, isPending: loaddingUpdate } = useUpdateTranslation();
  const { mutate: deleteTranslation, isPending: loadingDelete } = useDeleteTranslation();
  const [editRecord, setEditRecord] = useState<ITransation>();
  const [openDrawer, setOpenDrawer] = useState(false);

  const [action, setAction] = useState<TranslationFormDrawerProps["action"]>();
  const [searchKey, setSearchKey] = useState<"keyName" | "name">("name");
  const setCreateTranslation = () => {
    setAction("create");
    setOpenDrawer(true);
  };
  const setEditTranslation = (record: ITransation) => {
    setAction("edit");
    setOpenDrawer(true);
    setEditRecord(record);
  };
  const setCancelForm = () => {
    setAction(undefined);
    setOpenDrawer(false);
    setEditRecord(undefined);
  };
  const handleChangePage = (page: number, pageSize: number) => {
    setQueryParams((prev) => ({ ...prev, pageCurrent: page, pageSize }));
  };

  const handleSearchLanguage = (value: string) => {
    setQueryParams((prev) => ({ ...prev, requestObject: { ...prev.requestObject, [searchKey]: value } }));
  };

  const handleSwitchFindValue = (value: any) => {
    setSearchKey(() => {
      return value === true ? "keyName" : "name";
    });
    setQueryParams((prev) => ({ ...prev, requestObject: { ...prev.requestObject, keyName: "", name: "" } }));
  };
  const handleSubmitForm: TranslationFormDrawerProps["onSubmit"] = (action, formData, cb) => {
    if (action === "create") {
      createTranslation(formData, {
        onSuccess(data, variables, context) {
          cb?.();
        },
      });
    }
    if (action === "edit") {
      updateTranslation(formData, {
        onSuccess(data, variables, context) {
          cb?.();
        },
      });
    }
  };
  return (
    <React.Fragment>
      <PageContainer
        name="Bản dịch"
        modelName="Bản dịch"
        onClick={setCreateTranslation}
        breadCrumItems={[{ title: "Bản dịch" }]}
      >
        <Form>
          <FormItem>
            <div className="flex items-center gap-x-2">
              <Space>
                Tìm theo
                <Switch
                  checked={searchKey === "keyName"}
                  checkedChildren={"Key"}
                  unCheckedChildren={"Tên"}
                  onChange={handleSwitchFindValue}
                />
              </Space>
              <Input.Search
                allowClear
                placeholder={`Nhập ${searchKey === "keyName" ? "Key" : "Tên"} cần tìm`}
                enterButton="Tìm kiếm"
                onSearch={handleSearchLanguage}
                className="!w-80"
              />
            </div>
          </FormItem>
        </Form>
        <TableListPage<ITransation>
          rowKey={"id"}
          modelName="Bản dịch"
          dataSource={translationData?.list || []}
          showActionsLess={false}
          columns={columns}
          isLoading={isLoading}
          pagination={{
            total: translationData?.totalItems,
            pageSize: translationData?.pageSize,
            current: translationData?.pageCurrent,
            onChange: handleChangePage,
            showQuickJumper: false,
          }}
          scroll={{ x: 1200 }}
          onEdit={(record) => setEditTranslation(record)}
          onDelete={(record) => deleteTranslation(record.id)}
        />
      </PageContainer>
      <TranslationFormDrawer
        action={action}
        isOpen={openDrawer}
        onClose={setCancelForm}
        initialValues={editRecord}
        onSubmit={handleSubmitForm}
      />
    </React.Fragment>
  );
};
export default LanguagePage;
