"use client";

import ServiceListSelector, { ServiceListSelectorProps } from "./_components/ServiceListSelector";
import ProductFareClassDrawer from "./_components/ProductFareClassDrawer";
import { IProductService } from "@/models/management/booking/product.interface";
import useSearchBookingExtraInformation from "./modules/useSearchBookingExtraInformation";
import BoxSearchProduct from "@/modules/admin/booking/_components/BoxSearchProduct";
import React, { useCallback, useState } from "react";
import { EProductType } from "@/models/management/core/productType.interface";

const BookingPage = () => {
  const { onSearchBooking, isPending } = useSearchBookingExtraInformation();

  const [selectedProduct, setSelectedProduct] = useState<IProductService>();

  const handleCloseDrawer = () => {
    setSelectedProduct(undefined);
  };
  const handleSelectProductItem = useCallback<Exclude<ServiceListSelectorProps["onSelect"], undefined>>(
    (product: IProductService) => {
      setSelectedProduct(product);
    },
    [],
  );

  return (
    <div className="page">
      <h3 className="text-2xl font-[500] mb-6">Đặt dịch vụ</h3>
      <BoxSearchProduct
        className="searchbox mb-6"
        onSubmit={onSearchBooking}
        loading={isPending}
        type={EProductType.EXTRA}
      />
      <div className="font-[500] text-lg mb-3">Danh sách dịch vụ</div>
      <ServiceListSelector onSelect={handleSelectProductItem} loading={isPending} />
      <ProductFareClassDrawer open={!!selectedProduct} product={selectedProduct} onClose={handleCloseDrawer} />
    </div>
  );
};
export default BookingPage;
