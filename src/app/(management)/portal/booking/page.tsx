"use client";
import React, { useMemo, useState } from "react";
import SearchBookingBox from "./_components/SearchBookingBox";
import useBooking from "./hooks/useBooking";
import ProductList from "./_components/ProductList";
import DrawerSelectProduct from "./_components/DrawerSelectProduct";
import { IProductTour } from "@/models/management/booking/product.interface";
import useSearchBookingInformation from "./modules/useSearchBookingInformation";

const BookingPage = () => {
  const [bookingInformation, _] = useBooking();
  const { onSearchBooking, isPending } = useSearchBookingInformation();
  const [selectedProduct, setSelectedProduct] = useState<IProductTour>();
  const [showDrawer, setShowDrawer] = useState(false);

  const productList = useMemo(() => bookingInformation?.productList, [bookingInformation]);

  const onCloseDrawer = () => {
    setSelectedProduct(undefined);
    setShowDrawer(false);
  };
  const onSelectProduct = (product: IProductTour) => {
    setSelectedProduct(product);
    setShowDrawer(true);
  };

  return (
    <div className="page">
      <div
        className="header-page p-6 bg-gray-200 rounded-lg mb-8"
        style={{
          background: "url('/assets/images/admin/bg-header.png')",
          backgroundSize: "cover",
          backgroundPosition: "bottom center",
        }}
      >
        <div className="h-44"></div>
        <SearchBookingBox className="searchbox shadow-lg" onSubmit={onSearchBooking} loading={isPending} />
      </div>

      <div className="font-[500] text-lg mb-3">Danh sách tour</div>
      <ProductList items={productList || []} onSelect={onSelectProduct} loading={isPending} />
      <DrawerSelectProduct open={showDrawer} data={selectedProduct} onClose={onCloseDrawer} />
    </div>
  );
};
export default BookingPage;
