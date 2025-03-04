import React, { memo, useState } from "react";
import { Form, Row, Col, Input, Select, Button, SelectProps } from "antd";
import FormItem from "@/components/base/FormItem";
import { Status } from "@/models/common.interface";
import { FilterOutlined } from "@ant-design/icons";
import { VendorQueryParams } from "@/models/management/vendor.interface";
import SelectorVendor, { SelectorVendorProps } from "./SelectorVendor";

export interface FilterVendorProps {
  value: VendorQueryParams["requestObject"];
  setFilter: React.Dispatch<React.SetStateAction<VendorQueryParams>>;
}

const FilterFormData: React.FC<FilterVendorProps> = ({ setFilter, value }) => {
  const [filterSearch, setFilterSearch] = useState<{
    fullName?: string;
    shortName?: string;
    vendorId?: number;
  }>({
    fullName: "",
    shortName: "",
    vendorId: undefined,
  });

  const onChange = (key: "fullName" | "shortName", value: string) => {
    setFilterSearch((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const submitSearch = () => {
    setFilter((prev) => ({
      ...prev,
      requestObject: {
        ...prev.requestObject,
        ...filterSearch,
      },
    }));
  };
  const changeStatus: SelectProps<Status.OK | Status.QQ | "all">["onChange"] = (value) => {
    setFilter((prev) => ({
      ...prev,
      requestObject: {
        ...prev.requestObject,
        status: value === "all" ? undefined : value,
      },
    }));
  };
  const changeVendor: SelectorVendorProps["onChange"] = (vendorId, option) => {
    setFilterSearch((prev) => ({ ...prev, vendorId: vendorId }));
  };
  return (
    <Form layout="vertical">
      <Row gutter={12}>
        <Col>
          <FormItem>
            <FilterOutlined /> Lọc
          </FormItem>
        </Col>
        <Col flex={1} lg={6} xl={4} xxl={3}>
          <FormItem>
            <Select<Status.OK | Status.QQ | "all">
              options={[
                {
                  value: "all",
                  label: "Tất cả trạng thái",
                },
                {
                  value: Status.OK,
                  label: "Đã duyệt",
                },
                {
                  value: Status.QQ,
                  label: "Chờ duyệt",
                },
              ]}
              value={value?.status ? value.status : "all"}
              onChange={changeStatus}
              placeholder="Trạng thái"
            />
          </FormItem>
        </Col>
        <Col span={12} lg={6} xl={4} xxl={3}>
          <FormItem>
            <SelectorVendor value={filterSearch.vendorId} onChange={changeVendor} />
          </FormItem>
        </Col>
        <Col span={12} lg={6} xl={4} xxl={3}>
          <FormItem>
            <Input placeholder="Tên Supplier" onChange={(evt) => onChange("fullName", evt.target.value)} />
          </FormItem>
        </Col>
        <Col span={12} lg={6} xl={4} xxl={3}>
          <FormItem>
            <Input placeholder="Tên rút gọn" onChange={(evt) => onChange("shortName", evt.target.value)} />
          </FormItem>
        </Col>
        <Col>
          <FormItem>
            <Button type="primary" onClick={submitSearch}>
              Tìm kiếm
            </Button>
          </FormItem>
        </Col>
      </Row>
    </Form>
  );
};
export default memo(FilterFormData);
