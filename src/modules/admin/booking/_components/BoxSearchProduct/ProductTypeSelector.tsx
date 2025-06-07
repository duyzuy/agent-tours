import { EProductType } from "@/models/management/core/productType.interface";
import { useGetProductTypeListCoreQuery } from "@/queries/core/productType";
import { Radio } from "antd";
import React from "react";

export interface ProductTypeSelectorProps {
  value?: EProductType;
  onChange?: (type: EProductType) => void;
  disabled?: boolean;
}
const ProductTypeSelector: React.FC<ProductTypeSelectorProps> = ({ value, onChange, disabled }) => {
  const { data: productType, isLoading: isLoadingProductType } = useGetProductTypeListCoreQuery({
    enabled: true,
  });
  return (
    <>
      {isLoadingProductType ? (
        <div className="flex items-center gap-x-3 animate-pulse">
          <div className="w-12 h-4 bg-slate-100"></div>
          <div className="w-12 h-4 bg-slate-100"></div>
        </div>
      ) : (
        <Radio.Group value={value} onChange={(evt) => onChange?.(evt.target.value as EProductType)} disabled={disabled}>
          {productType?.map((type) => (
            <React.Fragment key={type}>
              <Radio value={type}>
                <span className="font-[500] mr-3">{getProductTypeName(type)}</span>
              </Radio>
            </React.Fragment>
          ))}
        </Radio.Group>
      )}
    </>
  );
};
export default ProductTypeSelector;
const getProductTypeName = (type: EProductType) => {
  if (type === EProductType.EXTRA) {
    return "Dịch vụ";
  }
  return "Tour";
};
