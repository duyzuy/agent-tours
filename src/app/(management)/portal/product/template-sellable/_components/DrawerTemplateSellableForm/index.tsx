"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Form, Input, Select, Space, Button, Drawer, Tag, Checkbox } from "antd";
import FormItem from "@/components/base/FormItem";
import { vietnameseTonesToUnderscoreKeyname } from "@/utils/helper";
import { EInventoryType } from "@/models/management/core/inventoryType.interface";
import { EProductType } from "@/models/management/core/productType.interface";
import { IDestination } from "@/models/management/region.interface";
import { ITemplateSellableDetail } from "@/models/management/core/templateSellable.interface";
import { useGetInventoryTypeListCoreQuery } from "@/queries/core/inventoryType";
import { useGetDestinationsQuery } from "@/queries/cms/destination";
import { useGetProductTypeListCoreQuery } from "@/queries/core/productType";
import { HandleSubmit, useFormSubmit } from "@/hooks/useFormSubmit";
import { TemplateSellableFormData } from "../../modules/templateSellable.interface";
import { templateSellableSchema } from "../../schema/templateSellable.schema";
import CMSTemplateSelectorContainer from "../CMSTemplateSelectorContainer";
import { Status } from "@/models/common.interface";
import { isEmpty, isUndefined } from "lodash";
import MiscDocumentSelector, { MiscDocumentSelectorProps } from "../MiscDocumentSelector";
import MiscDepartSelector, { MiscDepartSelectorProps } from "../MiscDepartSelector";

export type DrawerAction = "CREATE" | "EDIT";
type TDestinationOption = {
  label: string;
  value: string;
  destination: IDestination;
};
export interface DrawerTemplateSellableFormProps {
  isOpen?: boolean;
  onCancel?: () => void;
  actionType?: DrawerAction;
  initialValues?: ITemplateSellableDetail;
  onSubmit?: (actionType: DrawerAction, formData: TemplateSellableFormData) => void;
}

const DrawerTemplateSellableForm: React.FC<DrawerTemplateSellableFormProps> = ({
  isOpen,
  onCancel,
  actionType,
  onSubmit,
  initialValues,
}) => {
  const initFormData = new TemplateSellableFormData(undefined, undefined, "", "", [], [], [], undefined, Status.QQ);

  const [templateSellableFormData, setTemplateSellableFormData] = useState(initFormData);

  const { data: destinationList } = useGetDestinationsQuery();

  const { data: inventoryTypeList } = useGetInventoryTypeListCoreQuery({
    enabled: true,
  });

  const { data: productTypeList } = useGetProductTypeListCoreQuery({
    enabled: true,
  });

  const { handlerSubmit, errors } = useFormSubmit<TemplateSellableFormData>({
    schema: templateSellableSchema,
  });

  const destinationListOptions = useMemo(() => {
    return destinationList?.reduce<{ value: string; label: string; destination: IDestination }[]>(
      (acc, destination) => {
        acc = [
          ...acc,
          {
            value: destination.codeKey,
            label: destination.codeName,
            destination: destination,
          },
        ];
        return acc;
      },
      [],
    );
  }, [destinationList]);

  const onSelectDestination = (options: TDestinationOption[]) => {
    const destinations = options.map((opt) => opt.destination);
    setTemplateSellableFormData((prev) => ({
      ...prev,
      destListJson: [...destinations],
    }));
  };
  const onChangeSellableFormData = (
    key: keyof Required<TemplateSellableFormData>,
    value: string | number | EInventoryType[] | EProductType | IDestination[],
  ) => {
    if (key === "code" && typeof value === "string") {
      value = vietnameseTonesToUnderscoreKeyname(value).toUpperCase();
    }

    setTemplateSellableFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const onChangeInventory = (inventoryItem: EInventoryType) => {
    setTemplateSellableFormData((oldData) => {
      const { inventoryTypeList } = oldData;
      let newItems = [...inventoryTypeList];
      const indexIv = inventoryTypeList.indexOf(inventoryItem);

      if (indexIv !== -1) {
        newItems.splice(indexIv, 1);
      } else {
        newItems = [...newItems, inventoryItem];
      }
      return {
        ...oldData,
        inventoryTypeList: [...newItems],
      };
    });
  };
  const onChangeProductType = (type: EProductType) => {
    setTemplateSellableFormData((oldData) => {
      return {
        ...oldData,
        type: type,
      };
    });
  };

  const onChangeDocument: MiscDocumentSelectorProps["onChange"] = (values, options) => {
    const checkList = options.reduce<TemplateSellableFormData["checkListJson"]>((acc, item) => {
      return [
        ...(acc || []),
        {
          id: item.id,
          name: item.name,
          descriptions: item.descriptions,
          link: item.link,
        },
      ];
    }, []);
    setTemplateSellableFormData((oldData) => {
      return {
        ...oldData,
        checkListJson: checkList ? [...checkList] : undefined,
      };
    });
  };
  const handleChangeDepartLocation: MiscDepartSelectorProps["onChange"] = (value, { name_en, name_vi, id, key }) => {
    setTemplateSellableFormData((oldData) => {
      return {
        ...oldData,
        depart: {
          name_en,
          name_vi,
          key,
          id,
        },
      };
    });
  };
  const documentSelectedValues = useMemo(() => {
    if (!templateSellableFormData.checkListJson) return undefined;

    return templateSellableFormData.checkListJson.reduce<number[]>((acc, item) => {
      if (item.id) {
        acc = [...acc, item.id];
      }
      return acc;
    }, []);
  }, [templateSellableFormData.checkListJson]);

  const handleSubmitForm: HandleSubmit<TemplateSellableFormData> = (data) => {
    actionType && onSubmit?.(actionType, data);
  };

  const isWaitingApproval = useMemo(() => {
    return initialValues?.status === Status.QQ;
  }, [initialValues]);

  useEffect(() => {
    setTemplateSellableFormData((prev) =>
      initialValues
        ? {
            ...prev,
            inventoryTypeList: initialValues.inventoryTypeList,
            type: initialValues.type,
            name: initialValues.name,
            code: initialValues.code,
            cmsIdentity: initialValues.cmsIdentity,
            destListJson: initialValues.destListJson,
            checkListJson: initialValues.checkListJson ?? undefined,
            depart: initialValues.depart ?? undefined,
            status: initialValues.status,
          }
        : initFormData,
    );
  }, [initialValues, isOpen]);

  return (
    <Drawer
      title={actionType === "CREATE" ? "Thêm mới" : "Chỉnh sửa"}
      push={false}
      destroyOnClose
      width={550}
      onClose={onCancel}
      open={isOpen}
      className="drawer-template-sellable"
      styles={{
        body: {
          paddingBottom: 80,
        },
      }}
    >
      <Form layout="vertical" colon={false} labelWrap className="max-w-4xl">
        <FormItem label="Tên sản phẩm" required validateStatus={errors?.name ? "error" : ""} help={errors?.name || ""}>
          <Input
            placeholder="Tên sản phẩm"
            disabled={isWaitingApproval}
            value={templateSellableFormData.name}
            onChange={(ev) => onChangeSellableFormData("name", ev.target.value)}
          />
        </FormItem>
        <FormItem label="Mã" required validateStatus={errors?.code ? "error" : ""} help={errors?.code || ""}>
          <Input
            placeholder="Mã"
            disabled={isWaitingApproval || actionType === "EDIT"}
            value={templateSellableFormData.code}
            onChange={(ev) => onChangeSellableFormData("code", ev.target.value)}
          />
        </FormItem>
        <FormItem label="Loại sản phẩm" required validateStatus={errors?.type ? "error" : ""} help={errors?.type || ""}>
          <Space wrap direction="vertical">
            {productTypeList?.map((item) => (
              <Checkbox
                key={item}
                value={item}
                checked={templateSellableFormData.type?.includes(item)}
                onChange={() => onChangeProductType(item)}
                disabled={isWaitingApproval || actionType === "EDIT"}
              >
                {item === EProductType.TOUR
                  ? "Sản phẩm, dịch vụ tour."
                  : item === EProductType.EXTRA
                  ? "Sản phẩm, dịch vụ."
                  : item}
              </Checkbox>
            ))}
          </Space>
        </FormItem>
        <FormItem
          label="Loại dịch vụ bao gồm"
          required
          validateStatus={errors?.inventoryTypeList ? "error" : ""}
          help={errors?.inventoryTypeList || ""}
        >
          <Space wrap>
            {inventoryTypeList?.map((item) => (
              <Checkbox
                key={item}
                value={item}
                checked={templateSellableFormData.inventoryTypeList.includes(item)}
                onChange={() => onChangeInventory(item)}
              >
                {item}
              </Checkbox>
            ))}
          </Space>
        </FormItem>
        <FormItem label="Điểm khởi hành">
          <MiscDepartSelector value={templateSellableFormData.depart?.id} onChange={handleChangeDepartLocation} />
        </FormItem>
        <FormItem
          label="Điểm đến"
          required
          validateStatus={errors?.destListJson ? "error" : ""}
          help={errors?.destListJson || ""}
        >
          <Select
            placeholder="Chọn điểm đến"
            onChange={(value, options) => onSelectDestination(options as TDestinationOption[])}
            disabled={isWaitingApproval}
            value={getSelectedDestination(templateSellableFormData.destListJson)}
            mode="multiple"
            options={destinationListOptions}
          />
        </FormItem>

        <FormItem label="Hồ sơ giấy tờ yêu cầu">
          <MiscDocumentSelector values={documentSelectedValues} onChange={onChangeDocument} />
        </FormItem>
        <CMSTemplateSelectorContainer
          errors={errors?.cmsIdentity}
          onChange={(value) => onChangeSellableFormData("cmsIdentity", value)}
          value={isEmpty(templateSellableFormData.cmsIdentity) ? undefined : templateSellableFormData.cmsIdentity}
        />
      </Form>

      <div className="bottom py-4 absolute bottom-0 left-0 right-0 border-t px-6 bg-white">
        <Space>
          <Button onClick={onCancel} className="min-w-[120px]">
            Huỷ bỏ
          </Button>
          <Button
            type="primary"
            className="min-w-[120px]"
            onClick={() => handlerSubmit(templateSellableFormData, handleSubmitForm)}
          >
            Lưu
          </Button>
        </Space>
      </div>
    </Drawer>
  );
};
export default DrawerTemplateSellableForm;

const getSelectedDestination = (destinations: Partial<IDestination>[]) => {
  return destinations.map((des) => des.codeKey);
};
