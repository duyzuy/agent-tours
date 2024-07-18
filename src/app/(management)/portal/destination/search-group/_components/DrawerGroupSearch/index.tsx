import { useCallback, useEffect, useMemo, useState } from "react";
import { Drawer, Space, Button, Form, Input, Switch, SwitchProps, TreeSelect, TreeSelectProps } from "antd";

import { IStateProvinceListRs } from "@/models/management/region.interface";
import FormItem from "@/components/base/FormItem";
import { HandleSubmit, useFormSubmit } from "@/hooks/useFormSubmit";
import {
  LocalSearchFormData,
  LocalSearchDestinationListRs,
} from "@/models/management/localSearchDestination.interface";
import { localSearchSchema } from "../../../hooks/validate";
export enum EActionType {
  CREATE = "create",
  EDIT = "edit",
}
export type TDrawerCreateAction = {
  action: EActionType.CREATE;
};
export type TDrawerEditAction = {
  action: EActionType.EDIT;
  record: LocalSearchDestinationListRs["result"][0];
};
export type TDrawerSearch = TDrawerEditAction | TDrawerCreateAction;

type TStateProvinceGrouping = IStateProvinceListRs["result"][0] & {
  label: string;
  value: string;
  children: TStateProvinceGrouping[];
};
export interface DrawerGroupSearchProps {
  isOpen?: boolean;
  onClose: () => void;
  actionType?: EActionType;
  initialValues?: LocalSearchDestinationListRs["result"][0];
  onSubmit?: (actionType: EActionType, data: LocalSearchFormData) => void;
  regionList: IStateProvinceListRs["result"];
}
const DrawerGroupSearch: React.FC<DrawerGroupSearchProps> = ({
  isOpen,
  onClose,
  actionType = EActionType.CREATE,
  onSubmit,
  regionList,
  initialValues,
}) => {
  const initFormData = new LocalSearchFormData(
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    "OX",
  );
  const { handlerSubmit, errors } = useFormSubmit<LocalSearchFormData>({
    schema: localSearchSchema,
  });
  const [formData, setFormData] = useState<LocalSearchFormData>(initFormData);

  const provincesGrouping = useMemo(() => {
    const itemMap = regionList.reduce<{
      [key: string]: IStateProvinceListRs["result"];
    }>((acc, item) => {
      acc = {
        ...acc,
        [item.cat]: [...(acc[item.cat] ? acc[item.cat] : []), item],
      };
      return acc;
    }, {});

    let output: TStateProvinceGrouping[] = [];

    itemMap["REGIONLIST"]?.forEach((region) => {
      let childsOfRegion: TStateProvinceGrouping[] = [];
      let restOfChildRegion: IStateProvinceListRs["result"] = [];
      itemMap["SUBREGIONLIST"].forEach((subRegion) => {
        if (subRegion.regionKey === region.regionKey) {
          let countries: TStateProvinceGrouping[] = [];
          let restCountries: IStateProvinceListRs["result"] = [];
          itemMap["COUNTRYLIST"].forEach((country) => {
            if (country.regionKey === region.regionKey && country.subRegionKey === subRegion.subRegionKey) {
              let states: TStateProvinceGrouping[] = [];
              let restStates: IStateProvinceListRs["result"] = [];

              itemMap["STATEPROVINCELIST"].forEach((state) => {
                if (
                  state.regionKey === region.regionKey &&
                  state.subRegionKey === subRegion.subRegionKey &&
                  state.countryKey === country.countryKey
                ) {
                  states = [
                    ...states,
                    {
                      ...state,
                      label: state.stateProvinceKey,
                      value: state.stateProvinceKey,
                      children: [],
                    },
                  ];
                } else {
                  restStates = [...restStates, state];
                }
              });

              countries = [
                ...countries,
                {
                  ...country,
                  label: country.countryName,
                  value: country.countryKey,
                  children: states,
                },
              ];
              itemMap["STATEPROVINCELIST"] = restStates;
            } else {
              restCountries = [...restCountries, country];
            }
          });

          childsOfRegion = [
            ...childsOfRegion,
            {
              ...subRegion,
              label: subRegion.subRegionKey,
              value: subRegion.subRegionKey,
              children: countries,
            },
          ];
        } else {
          restOfChildRegion = [...restOfChildRegion, subRegion];
        }
      });
      itemMap["SUBREGIONLIST"] = restOfChildRegion;
      const regionItem: TStateProvinceGrouping = {
        ...region,
        label: region.regionKey,
        value: region.regionKey,
        children: childsOfRegion,
      };

      output = [...output, regionItem];
    });
    return output;
  }, [regionList]);

  const onChangeFormData = useCallback(
    (key: keyof LocalSearchFormData, value: (typeof initFormData)[keyof LocalSearchFormData]) => {
      setFormData((prev) => ({
        ...prev,
        [key]: value,
      }));
    },
    [formData],
  );
  const onSelectDestination: TreeSelectProps<string, TStateProvinceGrouping>["onSelect"] = (value, option) => {
    setFormData((prev) => ({
      ...prev,
      regionKey: option.regionKey,
      subRegionKey: option.subRegionKey,
      keyType: option.cat,
      countryKey: option.countryKey,
      stateProvinceKey: option.stateProvinceKey,
    }));
  };
  const onChangeStatus: SwitchProps["onChange"] = (checked) => {
    setFormData((prev) => ({ ...prev, status: checked ? "OK" : "OX" }));
  };
  const onSubmitFormData: HandleSubmit<LocalSearchFormData> = (data) => {
    onSubmit?.(actionType, data);
  };

  useEffect(() => {
    if (initialValues && actionType === EActionType.EDIT) {
      setFormData((prev) => ({
        ...prev,
        name: initialValues.name,
        engName: initialValues.engName,
        regionKey: initialValues.regionKey,
        keyType: initialValues.keyType,
        subRegionKey: initialValues.subRegionKey,
        countryKey: initialValues.countryKey,
        stateProvinceKey: initialValues.stateProvinceKey,
        order: Number(initialValues.order),
        status: initialValues.status,
      }));
    } else {
      setFormData(() => initFormData);
    }
  }, [initialValues, actionType, isOpen]);

  const isButtonDisabled = useMemo(() => {
    return false;
  }, [initialValues, formData]);

  const selectedDestinationValue = useMemo(() => {
    switch (initialValues?.keyType) {
      case "REGIONLIST": {
        return initialValues.regionKey;
      }
      case "SUBREGIONLIST": {
        return initialValues.subRegionKey;
      }

      case "COUNTRYLIST": {
        return initialValues.countryKey;
      }
      case "STATEPROVINCELIST": {
        return initialValues.stateProvinceKey;
      }
    }
  }, [initialValues]);

  return (
    <Drawer
      title={actionType === EActionType.CREATE ? "Thêm nhóm điểm đến" : `Sửa nhóm điểm đến`}
      width={850}
      onClose={onClose}
      open={isOpen}
      styles={{
        body: {
          paddingBottom: 80,
        },
      }}
    >
      <Form layout="vertical">
        <FormItem label="Tên nhóm (Vi)" validateStatus={errors?.name ? "error" : ""} required help={errors?.name || ""}>
          <Input
            placeholder="Nhập tên nhóm"
            value={formData.name}
            onChange={(e) => onChangeFormData("name", e.target.value)}
          />
        </FormItem>
        <FormItem
          label="Tên nhóm (En)"
          validateStatus={errors?.engName ? "error" : ""}
          required
          help={errors?.engName || ""}
        >
          <Input
            placeholder="Nhập tên nhóm"
            value={formData.engName}
            onChange={(e) => onChangeFormData("engName", e.target.value)}
          />
        </FormItem>
        <FormItem label="Điểm đến" required>
          <TreeSelect
            showSearch
            defaultValue={undefined}
            style={{ width: "100%" }}
            dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
            placeholder="Chọn điểm đến"
            value={actionType === EActionType.EDIT ? selectedDestinationValue : undefined}
            allowClear
            treeDefaultExpandAll
            onSelect={onSelectDestination}
            treeData={provincesGrouping}
          />
        </FormItem>
        <FormItem
          label="Thứ tự hiển thị"
          validateStatus={errors?.engName ? "error" : ""}
          required
          help={errors?.engName || ""}
        >
          <Input
            placeholder="Thứ tự hiển thị"
            value={formData.order}
            onChange={(e) => onChangeFormData("order", e.target.value)}
          />
        </FormItem>
        <FormItem label="Trạng thái">
          <Switch checked={formData.status === "OK" ? true : false} onChange={onChangeStatus} />
        </FormItem>
      </Form>
      <div className="drawler-action absolute px-4 py-4 border-t left-0 right-0 bg-white bottom-0">
        <Space>
          <Button onClick={onClose}>Huỷ</Button>
          <Button onClick={() => handlerSubmit(formData, onSubmitFormData)} type="primary" disabled={isButtonDisabled}>
            {actionType === EActionType.CREATE ? "Thêm mới" : "Cập nhật"}
          </Button>
        </Space>
      </div>
    </Drawer>
  );
};
export default DrawerGroupSearch;
