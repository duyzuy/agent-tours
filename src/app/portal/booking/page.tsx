"use client";
import React, { useMemo, useState } from "react";
import BoxBooking from "./_components/BoxBooking";
import { IProductItem } from "@/models/management/booking/productItem.interface";

import CustomTable from "@/components/admin/CustomTable";
import { columnsProduct } from "./columnsProduct";
import { Button } from "antd";
import DrawerBookingSelection, {
    DrawerBookingSelectionProps,
} from "./_components/DrawerBookingSelection";
import { ColumnsType } from "antd/es/table";
import useBooking from "./hooks/useBooking";
import { useRouter } from "next/navigation";
import useSearchBookingInformation from "./modules/useSearchBookingInformation";
const BookingPage = () => {
    const [bookingInformation, setBookingInformation] = useBooking();
    const [showDrawer, setShowDrawer] = useState(false);

    const [record, setRecord] = useState<IProductItem>();

    const router = useRouter();
    const { onSearchBooking } = useSearchBookingInformation();

    const productList = useMemo(
        () => bookingInformation?.productList,
        [bookingInformation],
    );
    const productSelectedItem = useMemo(() => {
        return bookingInformation.bookingInfo?.product;
    }, [bookingInformation]);

    const onSelectProduct = (productItem: IProductItem) => {
        setRecord(productItem);
        setShowDrawer(true);
    };

    const handleClickNext: DrawerBookingSelectionProps["onClickNext"] = (
        passengerSelection,
        productItem,
    ) => {
        if (passengerSelection.length && productItem) {
            setShowDrawer(false);
            setBookingInformation((prev) => ({
                ...prev,
                bookingInfo: {
                    ...prev.bookingInfo,
                    passengerSelections: passengerSelection,
                    product: productItem,
                },
            }));
            router.push("./portal/booking/customer-information");
        }
    };

    const customColumns: ColumnsType<IProductItem> = [
        ...columnsProduct,
        {
            dataIndex: "action",
            key: "action",
            width: 100,
            render: (_, record) => {
                return (
                    <Button
                        type="primary"
                        ghost
                        size="small"
                        onClick={() => onSelectProduct(record)}
                        className="w-20"
                    >
                        {record.recId === productSelectedItem?.recId
                            ? "Đang chọn"
                            : "Chọn"}
                    </Button>
                );
            },
        },
    ];

    return (
        <div className="page">
            <div
                className="header-page p-6 bg-gray-200 rounded-lg mb-6"
                style={{
                    background: "url('/assets/images/bg-header.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "bottom center",
                }}
            >
                <div className="h-44"></div>
                <BoxBooking
                    className="searchbox px-6 py-4 bg-white shadow-lg rounded-lg"
                    onSubmit={onSearchBooking}
                />
            </div>
            <div className="tours-wrapper">
                <h3 className="text-lg py-3 font-bold">Danh sách tìm kiếm</h3>
                <div className="tour-list">
                    <CustomTable
                        rowKey={"recId"}
                        // loading={isPending}
                        dataSource={productList}
                        columns={customColumns}
                    ></CustomTable>
                </div>
            </div>
            <DrawerBookingSelection
                isOpen={showDrawer}
                productItem={record}
                onCancel={() => setShowDrawer(false)}
                onClickNext={handleClickNext}
            />
        </div>
    );
};
export default BookingPage;
