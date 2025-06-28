"use client";
import React, { useCallback, useEffect, useState } from "react";
import BoxSearchProduct from "@/modules/admin/booking/_components/BoxSearchProduct";
import ProductList from "./_components/ProductList";
import ProductFareClassDrawer from "./_components/ProductFareClassDrawer";
import { IProductTour } from "@/models/management/booking/product.interface";
import useSearchBookingInformation from "./modules/useSearchBookingInformation";
import useSelectProductTour from "./modules/useSelectProductTour";
import { EProductType } from "@/models/management/core/productType.interface";

const BookingPage = () => {
  const { onSearchTourBooking, isPending } = useSearchBookingInformation();
  const [selectedProduct, setSelectedProduct] = useState<IProductTour>();
  const productDrawer = ProductFareClassDrawer.useDrawer();
  const { onNext } = useSelectProductTour();

  const handleCloseDrawer = () => {
    setSelectedProduct(undefined);
    productDrawer.onClose();
  };
  const onSelectProduct = useCallback((product: IProductTour) => {
    setSelectedProduct(product);
    productDrawer.onOpen();
  }, []);

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
        <BoxSearchProduct
          className="searchbox shadow-lg"
          onSubmit={onSearchTourBooking}
          type={EProductType.TOUR}
          loading={isPending}
        />
      </div>
      <div className="font-[500] text-lg mb-3">Danh sách tour</div>
      <ProductList onSelect={onSelectProduct} loading={isPending} />
      <ProductFareClassDrawer
        open={productDrawer.isOpen}
        data={selectedProduct}
        onClose={handleCloseDrawer}
        onOk={onNext}
      />
    </div>
  );
};
export default BookingPage;
