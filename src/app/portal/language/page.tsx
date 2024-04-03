"use client";
import React, { useState } from "react";
import PageContainer from "@/components/admin/PageContainer";
import TableListPage from "@/components/admin/TableListPage";
import DrawerLanguage, {
    DrawerLanguageProps,
} from "./_components/DrawerLanguage";
import { ITransation } from "@/models/management/cms/translations.interface";
import { useGetTranslationFeQuery } from "@/queries/cms/translationFe";
import useCreateTranslation from "./modules/useCreateTranslation";
import { columns } from "./columns";

const LanguagePage = () => {
    const { data: translationList, isLoading } = useGetTranslationFeQuery();
    const { onCreate, onUpdate } = useCreateTranslation();
    const [drawerAction, setDrawerAction] = useState<{
        isShow: boolean;
        action?: "create" | "edit";
        record?: ITransation;
    }>({ isShow: false });

    const handleSubmitForm: DrawerLanguageProps["onSubmit"] = (
        type,
        formData,
        cb,
    ) => {
        if (type === "create") {
            onCreate(formData, cb);
        }

        if (type === "edit") {
            drawerAction.record &&
                onUpdate(drawerAction.record.id, formData, cb);
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
                    // onDelete={(record) => {}}
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
