import React, { memo } from "react";
import { Select, SelectProps } from "antd";
import { Status } from "@/models/common.interface";
import { useGetVendorListCoreQuery } from "@/queries/core/vendor";
import { VendorQueryParams } from "@/models/management/vendor.interface";
import { IVendor } from "@/models/management/vendor.interface";

export type SelectorVendorProps = SelectProps<number, IVendor> & {
  onChange?: SelectProps<number, IVendor>["onChange"];
  value?: number;
};
const SelectorVendor: React.FC<SelectorVendorProps> = ({ onChange, value, ...restProps }) => {
  const vendorQueryParams = new VendorQueryParams(
    { status: Status.OK, shortName: undefined, fullName: undefined },
    1,
    999,
  );
  const { data: vendorResponse, isLoading } = useGetVendorListCoreQuery({
    enabled: true,
    queryParams: vendorQueryParams,
  });

  return (
    <Select<number, IVendor>
      placeholder="Chọn vendor"
      loading={isLoading}
      value={value}
      fieldNames={{ label: "fullName", value: "recId" }}
      options={vendorResponse?.list || []}
      onChange={onChange}
      {...restProps}
    />
  );
};
export default memo(SelectorVendor);
