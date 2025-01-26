import { Space, Button, Popconfirm, Switch } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { ISellable } from "@/models/management/core/sellable.interface";
import { Status } from "@/models/common.interface";
import useCRUDSellable from "../../modules/useCRUDSellable";
import { useRouter } from "next/navigation";
import DrawerSellableApproval, { DrawerSellableApprovalProps } from "../../_components/DrawerSellableApproval";
import { useState } from "react";
interface SellableActionsButtonProps {
  item: ISellable;
  status: ISellable["status"];
  type: ISellable["type"];
  code: string;
  inventoryTypeList: Exclude<ISellable["template"], null>["inventoryTypeList"];
}
const SellableActionsButton: React.FC<SellableActionsButtonProps> = ({
  status,
  type,
  inventoryTypeList,
  code,
  item,
}) => {
  const router = useRouter();

  const [openDrawerAppoval, setOpenDrawerApproval] = useState(false);
  const { onApproval, onDelete } = useCRUDSellable();

  const handleApproval: DrawerSellableApprovalProps["onSubmit"] = (formData) => {
    onApproval(formData, () => {
      setOpenDrawerApproval(false);
    });
  };

  return (
    <div className="mb-6">
      <Space>
        {status === Status.QQ ? (
          <>
            <Button
              className="!bg-emerald-100 !text-emerald-600 w-[80px]"
              type="text"
              size="small"
              onClick={() => setOpenDrawerApproval(true)}
            >
              Duyệt
            </Button>
            <Popconfirm
              placement="topLeft"
              title="Xoá"
              description={`Bạn muốn xoá sản phẩm ${item.code}`}
              okText="Xác nhận"
              cancelText="Huỷ bỏ"
              onConfirm={() =>
                onDelete(item.recId, () => {
                  router.push("/portal/product/sellable");
                })
              }
            >
              <Button className="!bg-red-100 !text-red-600 w-[80px]" type="text" icon={<DeleteOutlined />} size="small">
                Xoá
              </Button>
            </Popconfirm>
          </>
        ) : (
          <Space>
            <Switch loading={false} checked />
            Mở
          </Space>
        )}
      </Space>
      {type === "EXTRA" || type === "TOUR" ? (
        <DrawerSellableApproval
          isOpen={openDrawerAppoval}
          inventoryTypeList={inventoryTypeList || []}
          productType={type}
          sellableName={code}
          onCancel={() => setOpenDrawerApproval(false)}
          initialValues={item}
          onSubmit={handleApproval}
        />
      ) : null}
    </div>
  );
};
export default SellableActionsButton;
