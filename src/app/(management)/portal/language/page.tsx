"use client";
import React, { useState } from "react";
import PageContainer from "@/components/admin/PageContainer";
import TableListPage from "@/components/admin/TableListPage";
import DrawerLanguage, { DrawerLanguageProps } from "./_components/DrawerLanguage";
import { ITransation } from "@/models/management/cms/translations.interface";
import { useGetTranslationFeQuery } from "@/queries/cms/translationFe";
import useCRUDTranslation from "./modules/useCRUDTranslation";
import { columns } from "./columns";
import { Button, Form, Input } from "antd";
import FormItem from "@/components/base/FormItem";

const LanguagePage = () => {
  const [queryString, setQueryString] = useState("");
  const { data: translationList, isLoading } = useGetTranslationFeQuery(queryString);
  const { onCreate, onUpdate, onDelete } = useCRUDTranslation();
  const [drawerAction, setDrawerAction] = useState<{
    isShow: boolean;
    action?: "create" | "edit";
    record?: ITransation;
  }>({ isShow: false });

  const handleSubmitForm: DrawerLanguageProps["onSubmit"] = (type, formData, cb) => {
    if (type === "create") {
      onCreate(formData, cb);
    }

    if (type === "edit") {
      drawerAction.record && onUpdate(drawerAction.record.id, formData, cb);
    }
  };
  return (
    <React.Fragment>
      <PageContainer
        name="Bản dịch"
        modelName="Bản dịch"
        onClick={() =>
          setDrawerAction({
            isShow: true,
            action: "create",
          })
        }
        breadCrumItems={[{ title: "Bản dịch" }]}
      >
        <div>
          <Form>
            <div className="lg:w-3/6 md:w-4/6 xl:w-2/6">
              <FormItem>
                <Input.Search
                  placeholder="Nhập từ cần tìm"
                  enterButton="Tìm kiếm"
                  onSearch={(value) => {
                    setQueryString(value);
                  }}
                />
              </FormItem>
            </div>
          </Form>
        </div>
        <TableListPage<ITransation>
          scroll={{ x: 1200 }}
          modelName="Bản dịch"
          dataSource={translationList || []}
          showActionsLess={false}
          rowKey={"id"}
          columns={columns}
          onEdit={(record) =>
            setDrawerAction({
              isShow: true,
              action: "edit",
              record: record,
            })
          }
          onDelete={(record) => onDelete(record.id)}
          isLoading={isLoading}
          size="small"
        />
      </PageContainer>

      <DrawerLanguage
        isOpen={drawerAction.isShow}
        onClose={() =>
          setDrawerAction({
            isShow: false,
            record: undefined,
            action: undefined,
          })
        }
        initialValues={drawerAction.record}
        actionType={drawerAction.action}
        onSubmit={handleSubmitForm}
      />
    </React.Fragment>
  );
};
export default LanguagePage;
