"use client";
import React, { useEffect, useState } from "react";
import { Space, Spin, Tag, Divider, Button, Popconfirm, Empty } from "antd";
import { DeleteOutlined, EditOutlined, FileExcelOutlined } from "@ant-design/icons";
import { LINKS } from "@/constants/links.constant";
import { useRouter } from "next/navigation";
import { useGetOneTemplateSellableCoreQuery } from "@/queries/core/templateSellable";
import PageContainer from "@/components/admin/PageContainer";
import { Status } from "@/models/common.interface";
import { formatDate } from "@/utils/date";
import Link from "next/link";
import { EProductType } from "@/models/management/core/productType.interface";
import { ContentDetailList } from "@/components/admin/ContentDetailList";
import useCRUDTemplateSellable from "../modules/useCRUDTemplateSellable";
import TempalateSellableTabs from "./_components/TemplateSellableTabs";

import DrawerTemplateSellableForm, { DrawerTemplateSellableFormProps } from "../_components/DrawerTemplateSellableForm";

const Sellablepage = ({ params }: { params: { sellableTemplateId: number } }) => {
  const [showTemplateDrawer, setShowTemplateDrawer] = useState(false);
  const router = useRouter();
  const { data: templateDetail, isLoading } = useGetOneTemplateSellableCoreQuery({
    recId: params.sellableTemplateId,
    enabled: true,
  });

  const { onUpdate, onApproval: onApprovalTemplate, onDelete } = useCRUDTemplateSellable();

  const handleDeleteTemplate = (templateId: number) => {
    onDelete(templateId, () => {
      router.push("/portal/product/template-sellable");
    });
  };

  const handleUpdateTemplate: DrawerTemplateSellableFormProps["onSubmit"] = (action, formData) => {
    action === "EDIT" &&
      templateDetail?.recId &&
      onUpdate(templateDetail.recId, formData, () => {
        setShowTemplateDrawer(false);
      });
  };

  useEffect(() => {
    if (!templateDetail && !isLoading) {
      router.push(LINKS.TemplateSellable);
    }
  }, [templateDetail, isLoading]);

  if (isLoading) {
    return <Spin size="large" />;
  }
  if (!templateDetail) {
    return null;
  }
  return (
    <PageContainer
      name={templateDetail.name}
      onBack={router.back}
      modelName="mẫu sản phẩm"
      breadCrumItems={[{ title: "Mẫu sản phẩm", href: LINKS.TemplateSellable }, { title: templateDetail.name }]}
      hideAddButton
    >
      <div className="flex py-2 mb-6">
        <Space>
          {templateDetail.status === Status.QQ ? (
            <Button
              className="!bg-emerald-100 !text-emerald-600 w-[80px]"
              type="text"
              size="small"
              onClick={() => onApprovalTemplate(templateDetail.recId)}
            >
              Duyệt
            </Button>
          ) : (
            <Button
              className="!bg-blue-100 !text-blue-600 w-[80px]"
              type="text"
              icon={<EditOutlined />}
              size="small"
              onClick={() => setShowTemplateDrawer(true)}
            >
              Sửa
            </Button>
          )}

          <Popconfirm
            placement="topLeft"
            title="Xoá"
            description={`Bạn muốn xoá dịch vụ ${templateDetail.name}`}
            okText="Xác nhận"
            cancelText="Huỷ bỏ"
            onConfirm={() => handleDeleteTemplate(templateDetail.recId)}
          >
            <Button className="!bg-red-100 !text-red-600 w-[80px]" type="text" icon={<DeleteOutlined />} size="small">
              Xoá
            </Button>
          </Popconfirm>
        </Space>
      </div>
      <ContentDetailList
        items={[
          {
            label: "#ID",
            value: templateDetail.recId,
          },
          {
            label: "Mã",
            value: templateDetail.code,
          },
          {
            label: "Tên mẫu sản phẩm",
            value: templateDetail.name,
          },
          {
            label: "Key mẫu nội dung",
            value: <>{templateDetail.cmsIdentity || "--"}</>,
          },
          {
            label: "Ngày tạo",
            value: formatDate(templateDetail.sysFstUpdate),
          },
          {
            label: "Ngày cập nhật",
            value: formatDate(templateDetail.sysLstUpdate),
          },
          {
            label: "Người tạo",
            value: <>{templateDetail.sysFstUser || "--"}</>,
          },
          {
            label: "Người cập nhật",
            value: <>{templateDetail.sysLstUser || "--"}</>,
          },
        ]}
      />
      <Divider />
      <ContentDetailList.Item
        direction="horizontal"
        className="mb-2"
        label="Loại sản phẩm"
        value={
          templateDetail.type === EProductType.TOUR
            ? "Sản phẩm dịch vụ tour."
            : templateDetail.type === EProductType.EXTRA
            ? "Sản phẩm dịch vụ."
            : templateDetail.type
        }
      />
      <ContentDetailList.Item
        direction="horizontal"
        className="mb-2"
        label="Loại dịch vụ"
        value={templateDetail.inventoryTypeList.map((item) => (
          <Tag key={item} bordered={false}>
            {item}
          </Tag>
        ))}
      />
      <ContentDetailList.Item
        direction="horizontal"
        className="mb-2"
        label="Hồ sơ giấy tờ bắt buộc"
        value={
          templateDetail.checkListJson
            ? templateDetail.checkListJson?.map(({ name, link }, _index) => (
                <div key={_index} className="flex">
                  {link && (
                    <span className="mr-1">
                      <Link href={link} target="_blank">
                        <FileExcelOutlined />
                      </Link>
                    </span>
                  )}
                  {name}
                </div>
              ))
            : "--"
        }
      />

      <ContentDetailList.Item
        direction="horizontal"
        className="mb-2"
        label="Khởi hành"
        value={templateDetail.depart?.name_vi || "--"}
      />
      <ContentDetailList.Item
        direction="horizontal"
        className="mb-2"
        label="Điểm đến"
        value={templateDetail.destListJson.map((des) => (
          <div key={des.id} className="mb-3">
            <div className="font-semibold mb-1">{des.codeName}</div>
            <Space wrap>
              {des.listStateProvince.map((item, _index) => (
                <React.Fragment key={_index}>
                  {_index !== 0 && <span className="w-[3px] h-[3px] rounded-full inline-block bg-slate-600"></span>}
                  <span className="text-xs">
                    {item.stateProvinceKey || item.countryKey || item.subRegionKey || item.regionKey}
                  </span>
                </React.Fragment>
              ))}
            </Space>
          </div>
        ))}
      />
      <Divider />
      {templateDetail.status === Status.OK ? (
        <>
          <TempalateSellableTabs templateId={templateDetail.recId} data={templateDetail} />
          <DrawerTemplateSellableForm
            initialValues={templateDetail}
            isOpen={showTemplateDrawer}
            actionType="EDIT"
            onSubmit={handleUpdateTemplate}
            onCancel={() => setShowTemplateDrawer(false)}
          />
        </>
      ) : (
        <Empty description="Duyệt để tạo sản phẩm" />
      )}
    </PageContainer>
  );
};
export default Sellablepage;
