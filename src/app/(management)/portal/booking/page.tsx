"use client";
import React, { useCallback, useMemo, useState } from "react";
import SearchBookingBox from "./_components/SearchBookingBox";
import BoxSearchProduct, { BoxSearchProductProps } from "@/modules/admin/booking/_components/BoxSearchProduct";
import { usePortalBookingManager } from "./context";
import ProductList from "./_components/ProductList";
import ProductFareClassDrawer from "./_components/ProductFareClassDrawer";
import { IProductTour } from "@/models/management/booking/product.interface";
import useSearchBookingInformation from "./modules/useSearchBookingInformation";
import useSelectProductTour from "./modules/useSelectProductTour";
import { EProductType } from "@/models/management/core/productType.interface";
import { SearchProductTourFormData } from "@/modules/admin/booking/searchProduct.interface";
import { useSearchExtraProduct, useSearchTourProduct } from "@/modules/admin/booking/hooks/useSearchProduct";

const BookingPage = () => {
  const [bookingInformation] = usePortalBookingManager();

  const { onSearchTourBooking, isPending } = useSearchBookingInformation();

  const [selectedProduct, setSelectedProduct] = useState<IProductTour>();
  const [showDrawer, setShowDrawer] = useState(false);

  const productList = useMemo(() => bookingInformation?.productList, [bookingInformation.productList]);

  const { onNext } = useSelectProductTour();

  const onCloseDrawer = () => {
    setSelectedProduct(undefined);
    setShowDrawer(false);
  };
  const onSelectProduct = useCallback((product: IProductTour) => {
    setSelectedProduct(product);
    setShowDrawer(true);
  }, []);

  const handleSubmitForm = (data: SearchProductTourFormData, cb?: () => void) => {
    onSearchTourBooking(data);
  };
  return (
    <div className="page">
      <div
        className="header-page p-6 bg-gray-200/30 rounded-lg mb-8"
        style={{
          background: "url('/assets/images/admin/bg-header.png')",
          backgroundSize: "cover",
          backgroundPosition: "bottom center",
        }}
      >
        <div className="h-44"></div>
        {/* <SearchBookingBox className="searchbox shadow-lg" onSubmit={onSearchBooking} loading={isPending} /> */}
        <BoxSearchProduct
          className="searchbox shadow-lg"
          onSubmit={handleSubmitForm}
          type={EProductType.TOUR}
          loading={isPending}
        />
      </div>
      <div className="font-[500] text-lg mb-3">Danh sách tour</div>
      <ProductList items={productList || []} onSelect={onSelectProduct} loading={isPending} />
      <ProductFareClassDrawer open={showDrawer} data={selectedProduct} onClose={onCloseDrawer} onOk={onNext} />
    </div>
  );
};
export default BookingPage;
