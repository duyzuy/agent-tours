import React, { memo, useEffect, useMemo } from "react";
import { Form, Input } from "antd";
import { useForm, Controller } from "react-hook-form";
import { PageContentStatus } from "@/models/management/cms/pageContent.interface";
import { LangCode } from "@/models/management/cms/language.interface";
import Publishing, { PublishingProps } from "@/components/admin/Publishing";
import TextEditor from "@/components/base/TextEditor";
import FormItem from "@/components/base/FormItem";
import { isEqualObject } from "@/utils/compare";

import { yupResolver } from "@hookform/resolvers/yup";
import { TravelInformationNoticeData } from "../modules/travelInformationNotice";
import { noticeInformationSchema } from "../schema/noticeInformation.schema";

import StateProvinceSelector, { StateProvinceSelectorProps } from "../../_components/StateProvinceSelector";
import { ITravelInformationNotice } from "@/models/management/cms/cmsStateProvinceNotice";

export interface NoticeInformationFormProps {
  lang: LangCode;
  initData?: ITravelInformationNotice;
  originId?: number;
  onSubmit?: (data: TravelInformationNoticeData) => void;
  onPublish?: (id?: number) => void;
  onWatchFormChange?: (data: TravelInformationNoticeData) => void;
  action?: "create" | "update";
  onChangeStatus?: (data: { id: number; status: PageContentStatus }, cb?: () => void) => void;
  onDelete?: (id: number, cb?: () => void) => void;
}
export const initFormData = new TravelInformationNoticeData(
  undefined,
  undefined,
  LangCode.VI,
  PageContentStatus.PUBLISH,
  "",
  "",
  undefined,
);

const NoticeInformationForm: React.FC<NoticeInformationFormProps> = ({
  lang,
  initData,
  onSubmit,
  onWatchFormChange,
  onPublish,
  originId,
  action,
  onChangeStatus,
  onDelete,
}) => {
  const { control, getValues, setValue, watch, clearErrors, handleSubmit } = useForm<TravelInformationNoticeData>({
    resolver: yupResolver(noticeInformationSchema),
    defaultValues: { ...initFormData },
  });

  const isDisablePublishButton = useMemo(() => {
    let newInitData = initData || initFormData;

    return isEqualObject(["name", "descriptions"], getValues(), newInitData);
  }, [initData, watch()]);

  const handleSelectStateProvince: StateProvinceSelectorProps["onSelect"] = (value, data) => {
    setValue("country", {
      regionKey: data.regionKey,
      subRegionKey: data.subRegionKey,
      keyType: data.cat,
      countryKey: data.countryKey,
      stateProvinceKey: data.stateProvinceKey,
    });
  };

  const getProvinceValue = (data: TravelInformationNoticeData["country"]) => {
    switch (data?.keyType) {
      case "REGIONLIST": {
        return data.regionKey;
      }
      case "SUBREGIONLIST": {
        return data.subRegionKey;
      }
      case "COUNTRYLIST": {
        return data.countryKey;
      }
      case "STATEPROVINCELIST": {
        return data.stateProvinceKey;
      }
    }
  };
  const handleChangeStatus: PublishingProps["onChangeStatus"] = (checked) => {
    initData?.id
      ? onChangeStatus?.({ id: initData.id, status: checked ? PageContentStatus.PUBLISH : PageContentStatus.UNPUBLISH })
      : null;
  };
  useEffect(() => {
    const initValues = initData
      ? new TravelInformationNoticeData(
          initData.id,
          initData.originId,
          initData.lang,
          initData.status,
          initData.name,
          initData.descriptions,
          initData.country,
        )
      : { ...initFormData, originId, lang };

    Object.entries(initValues).map(([key, value], _index) => {
      setValue(key as keyof TravelInformationNoticeData, value);
    });
    clearErrors();
  }, [lang, initData]);

  return (
    <Form layout="vertical">
      <div className="flex w-full">
        <div
          className="post-left flex-1 mr-8"
          // style={{ width: "calc(100% - 380px)" }}
        >
          <Controller
            name="name"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <FormItem label="Tiêu đề" required validateStatus={error ? "error" : ""} help={error?.message}>
                <Input placeholder="Tiêu đề" {...field} />
              </FormItem>
            )}
          />

          <Controller
            name="country"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <FormItem label="Chọn điểm đến" required>
                <StateProvinceSelector value={getProvinceValue(field.value)} onSelect={handleSelectStateProvince} />
              </FormItem>
            )}
          />

          <Controller
            name="descriptions"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <FormItem label="Chi tiết" help={error?.message} validateStatus={error ? "error" : ""}>
                <TextEditor onEditorChange={(data, editor) => field.onChange(data)} value={field.value} />
              </FormItem>
            )}
          />
        </div>
        <div className="post-right w-[320px] xl:w-[380px]">
          <div className="inner-right">
            <Publishing
              onSaveAndPublish={handleSubmit((data) =>
                onSubmit?.({
                  ...data,
                  status: PageContentStatus.PUBLISH,
                }),
              )}
              onSaveForApproval={handleSubmit((data) =>
                onSubmit?.({
                  ...data,
                  status: PageContentStatus.PENDING,
                }),
              )}
              onApproval={() => onPublish?.(initData?.id)}
              onChangeStatus={handleChangeStatus}
              onDelete={() => initData?.id && onDelete?.(initData.id)}
              hideSaveForApproval={action === "update" ?? false}
              hideApproval={getValues("status") !== PageContentStatus.PENDING || action === "create"}
              action={action}
              status={getValues("status")}
              disableSubmit={isDisablePublishButton}
              disableSaveForApproval={isDisablePublishButton}
              hideDelete={action === "create"}
            />
          </div>
        </div>
      </div>
    </Form>
  );
};
export default memo(NoticeInformationForm);
