"use client";
import React, { useEffect, useState } from "react";
import { Button, Form, Input, Tabs, TabsProps } from "antd";
import PageContainer from "@/components/admin/PageContainer";
import { useGetSettingEmailQuery } from "@/queries/cms/settings";
import { useUpdateSettingEmailMutation } from "@/mutations/managements/settings";
import FormItem from "@/components/base/FormItem";
import { useQueryClient } from "@tanstack/react-query";
import { queryCMS } from "@/queries/var";
import useMessage from "@/hooks/useMessage";
const RuleAndPolicyPage = () => {
  const { data, isLoading } = useGetSettingEmailQuery();
  const { mutate: updateSettingEmail, isPending } = useUpdateSettingEmailMutation();
  const [emailSettingForm, setEmailSettingForm] = useState({ email: "", appPassword: "" });

  const queryClient = useQueryClient();
  const message = useMessage();
  const onChangeForm = (key: "email" | "appPassword", value: string) => {
    setEmailSettingForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };
  const handleUpdateSettingEmail = () => {
    updateSettingEmail(
      { email: emailSettingForm.email, appPassword: emailSettingForm.appPassword },
      {
        onSuccess(data, variables, context) {
          queryClient.invalidateQueries({ queryKey: [queryCMS.GET_SETTING_EMAIL] });
          message.success("Cập nhật thành công");
        },
        onError(error, variables, context) {
          message.error(error.message);
        },
      },
    );
  };
  useEffect(() => {
    if (data && !isLoading) {
      setEmailSettingForm({ email: data.email, appPassword: data.appPassword });
    }
  }, [data, isLoading]);
  const tabItems: TabsProps["items"] = [
    {
      key: "email",
      label: "Cấu hình email",
      children: (
        <div className="pt-6">
          <div className="mb-3">
            <span className="block font-[500] text-lg">Cấu hình FTP Gmail</span>
          </div>
          <div className="form max-w-[450px]">
            <Form layout="vertical">
              <FormItem label="Email" required>
                <Input
                  placeholder="Email"
                  value={emailSettingForm.email}
                  onChange={(ev) => onChangeForm("email", ev.target.value)}
                />
              </FormItem>
              <FormItem label="Mật khẩu ứng dụng" required>
                <Input
                  placeholder="Mật khẩu ứng dụng"
                  value={emailSettingForm.appPassword}
                  onChange={(ev) => onChangeForm("appPassword", ev.target.value)}
                />
              </FormItem>
              <Button type="primary" loading={isPending} onClick={handleUpdateSettingEmail}>
                Lưu
              </Button>
            </Form>
          </div>
        </div>
      ),
    },
  ];
  return (
    <React.Fragment>
      <PageContainer
        name="Cấu hình chung"
        modelName="Chính sách thanh toán"
        onClick={() => {}}
        hideAddButton
        breadCrumItems={[{ title: "Chính sách thanh toán" }]}
      >
        <Tabs defaultActiveKey="ruleAndPolicyList" items={tabItems} />
      </PageContainer>
    </React.Fragment>
  );
};
export default RuleAndPolicyPage;
