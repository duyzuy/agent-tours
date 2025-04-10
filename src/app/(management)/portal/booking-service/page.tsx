"use client";
import React, { useCallback, useMemo, useState } from "react";
// import SearchBookingBox from "./_components/SearchBookingBox";
import ServiceListSelector, { ServiceListSelectorProps } from "./_components/ServiceListSelector";
import useSearchProduct from "@/modules/admin/booking/hooks/useSearchProduct";
import ProductFareClassDrawer from "./_components/ProductFareClassDrawer";
import { IProductService } from "@/models/management/booking/product.interface";
import useSearchBookingInformation from "./modules/useSearchBookingInformation";
import useSelectProductTour from "./modules/useSelectProductService";
import SearchBookingBox, {
  SearchBookingBoxProps,
} from "@/modules/admin/booking/_components/BoxSearchProduct/SearchBookingBox";
import { EProductType } from "@/models/management/core/productType.interface";

const BookingPage = () => {
  // const { onSearchBooking, isPending } = useSearchBookingInformation();

  const { mutate: searchProduct, isPending } = useSearchProduct();
  const [selectedProduct, setSelectedProduct] = useState<IProductService>();
  const [showDrawer, setShowDrawer] = useState(false);

  const { onNext } = useSelectProductTour();

  const onCloseDrawer = () => {
    setSelectedProduct(undefined);
    setShowDrawer(false);
  };
  const onSelectProduct = useCallback<Exclude<ServiceListSelectorProps["onSelect"], undefined>>(
    (product: IProductService) => {
      setSelectedProduct(product);
      setShowDrawer(true);
    },
    [],
  );

  const handleSearchProduct: SearchBookingBoxProps["onSubmit"] = (data) => {
    searchProduct;
  };
  return (
    <div className="page">
      <h3 className="text-2xl font-[500] mb-6">Đặt dịch vụ</h3>
      <SearchBookingBox
        className="searchbox mb-6"
        onSubmit={handleSearchProduct}
        loading={isPending}
        type={EProductType.EXTRA}
      />
      <div className="font-[500] text-lg mb-3">Danh sách dịch vụ</div>
      <ServiceListSelector onSelect={onSelectProduct} loading={isPending} />
      <ProductFareClassDrawer open={showDrawer} data={selectedProduct} onClose={onCloseDrawer} onOk={onNext} />
    </div>
  );
};
export default BookingPage;
