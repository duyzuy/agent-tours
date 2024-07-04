"use client";
import React, { useCallback, useEffect, useState } from "react";
import PageContainer from "@/components/admin/PageContainer";
import TableListPage from "@/components/admin/TableListPage";
import {
    DisCountQueryParams,
    DiscountType,
    IDiscountPolicy,
} from "@/models/management/core/discountPolicy.interface";
import { lowerCase } from "lodash";
import { useRouter } from "next/navigation";
import DrawerDiscountPolicyForm from "./_components/DrawerDiscountPolicyForm";
import useCRUDDiscountPolicy from "../modules/useCRUDDiscountPolicy";
import { useGetDiscountPolicyListCoreQuery } from "@/queries/core/discountPolicy";
import { createDynamicDiscountColumns } from "./columns";
import { PaginationProps } from "antd";
import { DiscountPolicyFormData } from "../modules/discountPolicy.interface";
import ModalDiscountDetail from "./_components/ModalDiscountDetail";
import { Status } from "@/models/common.interface";

interface DiscountPolicyPageProps {
    params: {
        type: DiscountType;
    };
}
const DiscountPolicyPage = ({ params }: DiscountPolicyPageProps) => {
    const { type } = params;
    const router = useRouter();
    const [openDrawer, setOpenDrawer] = useState(false);
    const [isShowDetail, setShowModalDetail] = useState(false);
    const [discountDetail, setDiscountDetail] = useState<IDiscountPolicy>();
    const onCloseDrawer = useCallback(() => setOpenDrawer(false), []);
    const onOpenDrawer = useCallback(() => setOpenDrawer(true), []);

    const { onCreate, onActive, onDeactive } = useCRUDDiscountPolicy();

    const [queryParams, setQueryParams] = useState(
        () =>
            new DisCountQueryParams(
                {
                    type: params.type,
                    isValid: true,
                    validFrom: undefined,
                    validTo: undefined,
                    status: undefined,
                },
                1,
                10,
            ),
    );
    const { data: discountResponse, isLoading: isLoadingList } =
        useGetDiscountPolicyListCoreQuery({
            queryParams: queryParams,
            enabled: true,
        });

    const onChangePagination = useCallback<
        Required<PaginationProps>["onChange"]
    >(
        (page, pageSize) => {
            setQueryParams((prev) => ({ ...prev, pageCurrent: page }));
        },
        [queryParams],
    );
    const showDiscountDetail = useCallback((record: IDiscountPolicy) => {
        setShowModalDetail(true);
        setDiscountDetail(record);
    }, []);
    const hideDiscountDetail = useCallback(() => {
        setShowModalDetail(false);
        setDiscountDetail(undefined);
    }, []);
    const handleSubmitForm = useCallback((data: DiscountPolicyFormData) => {
        onCreate(data, () => {
            setOpenDrawer(false);
        });
    }, []);

    useEffect(() => {
        if (
            type !== lowerCase(DiscountType.COUPON) &&
            type !== lowerCase(DiscountType.POLICY)
        ) {
            router.push(
                `./portal/discount-policy/${lowerCase(DiscountType.POLICY)}`,
            );
        }
    }, []);

    if (
        type !== lowerCase(DiscountType.COUPON) &&
        type !== lowerCase(DiscountType.POLICY)
    ) {
        return null;
    }
    return (
        <React.Fragment>
            <PageContainer
                name="Chính sách giá giảm"
                onClick={onOpenDrawer}
                breadCrumItems={[{ title: "Chính sách giá giảm" }]}
            >
                <TableListPage<IDiscountPolicy>
                    scroll={{ x: 1200 }}
                    modelName="mã giảm giá"
                    dataSource={discountResponse?.list || []}
                    rowKey={"recId"}
                    columns={createDynamicDiscountColumns(params.type)}
                    loading={isLoadingList}
                    pagination={{
                        total: discountResponse?.totalItems,
                        pageSize: discountResponse?.pageSize,
                        current: discountResponse?.pageCurrent,
                        onChange: onChangePagination,
                    }}
                    showActionsLess={false}
                    onView={(record) => showDiscountDetail(record)}
                    onApproval={(record) => onActive({ recId: record.recId })}
                    hideApproval={(record) =>
                        record.status === Status.OK ||
                        record.status === Status.EX
                    }
                    hideDelete={(record) => record.status === Status.EX}
                    onDelete={({ recId }) => onDeactive({ recId })}
                    fixedActionsColumn={false}
                />

                <ModalDiscountDetail
                    isOpen={isShowDetail}
                    onClose={hideDiscountDetail}
                    record={discountDetail}
                />
                <DrawerDiscountPolicyForm
                    isOpen={openDrawer}
                    discountType={type.toUpperCase() as DiscountType}
                    onClose={onCloseDrawer}
                    onSubmit={handleSubmitForm}
                />
            </PageContainer>
        </React.Fragment>
    );
};
export default DiscountPolicyPage;
