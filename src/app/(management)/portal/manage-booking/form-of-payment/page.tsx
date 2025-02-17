"use client";
import PageContainer from "@/components/admin/PageContainer";
import TableListPage from "@/components/admin/TableListPage";
import { useState } from "react";

import { columnsFOPs } from "./columns";
import { useRouter } from "next/navigation";
import { Status } from "@/models/common.interface";
import {
  IFormOfPayment,
  FormOfPaymentListRs,
  FormOfPaymmentQueryParams,
} from "@/models/management/core/formOfPayment.interface";
import ModalFormOfPaymentDetail from "./ModalFormOfPaymentDetail";
import { useApprovalFormOfpayment } from "@/modules/admin/form-of-payment/hooks/useApprovalFormOfpayment";
import { useDeleteFormOfPayment } from "@/modules/admin/form-of-payment/hooks/useDeleteFormOfPayment";
import { useGetFormOfPaymentList } from "@/modules/admin/form-of-payment/hooks/useGetFormOfPayment";
import { ContentDetailList } from "@/components/admin/ContentDetailList";
import { moneyFormatVND } from "@/utils/helper";
import { formatDate } from "@/utils/date";
export default function FormOfPaymentPage() {
  const router = useRouter();

  const iniitQueryParams = new FormOfPaymmentQueryParams({ status: Status.QQ }, 1, 10);
  const { data: fopList, isLoading } = useGetFormOfPaymentList({
    enabled: true,
    queryParams: iniitQueryParams,
  });

  const { mutate: onApproval } = useApprovalFormOfpayment();
  const { mutate: onDelete } = useDeleteFormOfPayment();

  const handleApproval = (record: IFormOfPayment) => {
    onApproval({ recId: record.recId, attachedMedias: [] });
  };

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
        onApproval={handleApproval}
        onDelete={(record) => onDelete(record.recId)}
        scroll={{ x: 1200 }}
        showActionsLess={false}
        expandable={{
          expandedRowRender: (record) => (
            <>
              <ContentDetailList
                direction="horizontal"
                items={[
                  { label: "Người thanh toán", value: record.payer || "--" },
                  { label: "Loại", value: record.type },
                  { label: "Phương thức", value: record.fopType || "--" },
                  { label: "Số tiền", value: moneyFormatVND(record.amount) },
                  { label: "Thông tin thanh toán", value: record.fopDocument || "--" },
                  { label: "File đính kèm", value: record.fopDocument || "--" },
                  { label: "infoTnxId", value: record.infoTnxId || "--" },
                  { label: "infoMId", value: record.infoMId || "--" },
                  { label: "infoTrace", value: record.infoTrace || "--" },
                  { label: "infoNumber", value: record.infoNumber || "--" },
                  { label: "infoNote", value: record.infoNote || "--" },
                  { label: "Ghi chú", value: record.rmk || "--" },
                  { label: "Ngày tạo", value: formatDate(record.sysFstUpdate) },
                ]}
              />
            </>
          ),
        }}
      />
    </PageContainer>
  );
}
