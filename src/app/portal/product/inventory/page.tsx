"use client";
import PageContainer from "@/components/admin/PageContainer";
import { IInventoryListRs } from "@/models/management/core/inventory.interface";
import { useGetInventoryListCoreQuery } from "@/queries/core/inventory";
import { useState } from "react";
import TableListPage from "@/components/admin/TableListPage";
import { inventoryColumns } from "./columns";
import DrawlerInventory, {
    DrawlerInventoryProps,
    EActionType,
    TDrawlerAction,
} from "../components/DrawlerInventory";
import useCRUDInventory from "../hooks/useCRUDInventory";

const InventoryPage = () => {
    const { data: inventoryList, isLoading } = useGetInventoryListCoreQuery();
    const [isOpenDrawler, setOpenDrawler] = useState(false);
    const [editRecord, setEditRecord] =
        useState<IInventoryListRs["result"][0]>();

    const {
        onCreateInventory,
        onUpdateInventory,
        onApprovalInventory,
        onDeleteInventory,
        errors,
    } = useCRUDInventory();

    const handleDrawlerInventory = (drawler: TDrawlerAction) => {
        if (drawler.type === EActionType.EDIT) {
            setEditRecord(drawler.record);
        }

        if (drawler.type === EActionType.CREATE) {
        }
        setOpenDrawler(true);
    };
    const onCancelDrawler = () => {
        setOpenDrawler(false);
        setEditRecord(undefined);
    };
    const handleCreateInventory: DrawlerInventoryProps["onSubmit"] = (
        action,
        formData,
    ) => {
        if (action === EActionType.CREATE) {
            onCreateInventory(formData, () => {
                setOpenDrawler(false);
            });
        }
        if (action === EActionType.EDIT && editRecord) {
            onUpdateInventory(editRecord.recId, formData, () => {
                setOpenDrawler(false);
                setEditRecord(undefined);
            });
        }
    };
    return (
        <PageContainer
            name="Inventory"
            modelName="Inventory"
            breadCrumItems={[{ title: "Inventory" }]}
            onClick={() => handleDrawlerInventory({ type: EActionType.CREATE })}
        >
            <TableListPage<IInventoryListRs["result"][0]>
                scroll={{ x: 1200 }}
                modelName="Inventory"
                columns={inventoryColumns}
                rowKey={"recId"}
                dataSource={inventoryList || []}
                isLoading={isLoading}
                onEdit={(record) =>
                    handleDrawlerInventory({ type: EActionType.EDIT, record })
                }
                onDelete={(record) => onDeleteInventory(record.recId)}
                onApproval={(record) =>
                    record.status === "QQ" && onApprovalInventory(record.recId)
                }
            />
            <DrawlerInventory
                isOpen={isOpenDrawler}
                onCancel={onCancelDrawler}
                actionType={editRecord ? EActionType.EDIT : EActionType.CREATE}
                initialValues={editRecord}
                onSubmit={handleCreateInventory}
                errors={errors}
            />
        </PageContainer>
    );
};
export default InventoryPage;
