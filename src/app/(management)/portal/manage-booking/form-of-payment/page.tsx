"use client";
import PageContainer from "@/components/admin/PageContainer";
import TableListPage from "@/components/admin/TableListPage";
import { useState } from "react";
import { useGetFormOfPaymentListCoreQuery } from "@/queries/core/formOfPayment";
import { columnsFOPs } from "./columns";
import { useRouter } from "next/navigation";
import { Status } from "@/models/common.interface";
import {
  IFormOfPayment,
  FormOfPaymentListRs,
  FormOfPaymmentQueryParams,
} from "@/models/management/core/formOfPayment.interface";
import { useFormOfPayment } from "../[orderId]/modules/useFormOfPayment";
import ModalFormOfPaymentDetail from "./ModalFormOfPaymentDetail";
export default function FormOfPaymentPage() {
  const router = useRouter();

  const iniitQueryParams = new FormOfPaymmentQueryParams({ status: Status.QQ }, 1, 10);
  const { data: fopList, isLoading } = useGetFormOfPaymentListCoreQuery({
    enabled: true,
    queryParams: iniitQueryParams,
  });

  const { onApproval, onDelete } = useFormOfPayment();

  const [fopDetail, setSOPDetail] = useState<{
    isShow: boolean;
    record?: IFormOfPayment;
  }>({ isShow: false, record: undefined });
  return (
    <PageContainer
      name="Phiếu thu"
      modelName="Phiếu thu"
      breadCrumItems={[{ title: "Quản lý đặt chỗ" }, { title: "Phiếu thu" }]}
      hideAddButton
    >
      <div className=""></div>
      <TableListPage<FormOfPaymentListRs["result"][number]>
        dataSource={fopList || []}
        size="small"
        columns={columnsFOPs}
        isLoading={isLoading}
        rowKey={"recId"}
        onApproval={(record) => onApproval(record.recId)}
        onView={(record) => setSOPDetail({ isShow: true, record })}
        onDelete={(record) => onDelete(record.recId)}
        scroll={{ x: 1200 }}
        showActionsLess={false}
      />
      <ModalFormOfPaymentDetail
        isShowModal={fopDetail.isShow}
        data={fopDetail.record}
        onCancel={() => setSOPDetail({ isShow: false, record: undefined })}
      />
    </PageContainer>
  );
}
