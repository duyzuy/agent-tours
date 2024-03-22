"use client";
import PageContainer from "@/components/admin/PageContainer";
import TableListPage from "@/components/admin/TableListPage";
import { BookingOrderListQueryParams } from "@/models/management/booking/reservation.interface";
import { useGetBookingOrderListCoreQuery } from "@/queries/core/bookingOrder";
import { columnsOrderList } from "./columnsOrderList";
import { useRouter } from "next/navigation";
import { IOrderListRs } from "@/models/management/booking/order.interface";
export default function ManageBookingOrderListPage() {
    const router = useRouter();
    const initBookingOrderListQueryParams = new BookingOrderListQueryParams(
        undefined,
        1,
        10,
    );

    const { data: reservationList, isLoading } =
        useGetBookingOrderListCoreQuery({
            enabled: true,
            queryParams: initBookingOrderListQueryParams,
        });

    return (
        <PageContainer
            name="Quản lý booking"
            modelName="Quản lý booking"
            breadCrumItems={[
                { title: "Quản lý booking" },
                { title: "Danh sách booking" },
            ]}
            hideAddButton
        >
            <div className=""></div>
            <TableListPage<IOrderListRs["result"][0]>
                dataSource={reservationList || []}
                columns={columnsOrderList}
                isLoading={isLoading}
                rowKey={"recId"}
                onEdit={(record) =>
                    router.push(`./portal/manage-booking/${record.recId}`)
                }
                scroll={{ x: 1200 }}
                showActionsLess={false}
            />
        </PageContainer>
    );
}
