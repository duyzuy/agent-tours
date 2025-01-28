"use client";
import React, { useState } from "react";
import PageContainer from "@/components/admin/PageContainer";
import TableListPage from "@/components/admin/TableListPage";
import { columns } from "./columns";
import { MemberQueryParamsFormData } from "@/modules/admin/manageMember/member.interface";
import MemberFormDrawer, { MemberFormDrawerProps } from "@/modules/admin/manageMember/components/MemberFormDrawer";
import { useUpdateMember, useGetMemberList, useResetPasswordMember } from "@/modules/admin/manageMember";
const UserPage: React.FC = () => {
  const [queryParams, setQueryParams] = useState(
    () => new MemberQueryParamsFormData({ username: "", email: "", phoneNumber: "" }, 1, 10),
  );
  const { data: memberData, isLoading } = useGetMemberList({ queryParams: queryParams, enabled: true });

  const { mutate: updateMember, isPending: loadingUpdate } = useUpdateMember();
  const { mutate: resetPassword, isPending: loadingResetPassword } = useResetPasswordMember();
  type MemberItem = Exclude<typeof memberData, undefined>["list"][number];

  const [openDrawer, setOpenDrawer] = useState(false);

  const [editRecord, setEditRecord] = useState<MemberItem>();

  const handleEdit = (record: MemberItem) => {
    setEditRecord(record);
    setOpenDrawer(true);
  };

  const handleCancel = () => {
    setEditRecord(undefined);
    setOpenDrawer(false);
  };
  const handleSubmitFormData: MemberFormDrawerProps["onSubmit"] = (formData) => {
    updateMember(formData, {
      onSuccess(data, variables, context) {
        setOpenDrawer(false);
        setEditRecord(undefined);
      },
    });
  };

  return (
    <PageContainer
      name="Thành viên đăng ký"
      modelName="thành viên"
      hideAddButton={true}
      breadCrumItems={[{ title: "Thành viên đăng ký" }]}
    >
      <TableListPage<MemberItem>
        scroll={{ x: 1200 }}
        modelName="Tài khoản"
        columns={columns}
        rowKey={"recId"}
        dataSource={memberData?.list || []}
        isLoading={isLoading}
        onEdit={(record) => handleEdit(record)}
      />
      <MemberFormDrawer
        isOpen={openDrawer}
        initialValue={editRecord}
        onCancel={handleCancel}
        onSubmit={handleSubmitFormData}
      />
    </PageContainer>
  );
};
export default UserPage;
