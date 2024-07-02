"use client";
import styled from "styled-components";
import { Button, Form, Select } from "antd";
import IconMapPin from "@/assets/icons/IconMapPin";
import IconCalendar from "@/assets/icons/IconCalendar";
import IconSearch from "@/assets/icons/IconSearch";
import { useGetLocalSearchListMISCQuery } from "@/queries/misc/destination";
import CustomDatePicker from "@/components/admin/CustomDatePicker";
import dayjs from "dayjs";
import { LocalSearchDestinationListRs } from "@/models/management/localSearchDestination.interface";
import { useTranslations } from "next-intl";
import { useState } from "react";
import PureClient from "@/components/admin/PureClient";

const BoxSearchTourFe = () => {
    const { data: destinationsListSearch, isLoading } =
        useGetLocalSearchListMISCQuery();

    const t = useTranslations("String");

    const [formData, serchFormData] = useState();
    const selectDate = () => {};
    return (
        <PureClient>
            <div className="search-box-tour px-6">
                <div className="bg-white px-6 py-6 rounded-md shadow-md max-w-2xl mx-auto">
                    <Form>
                        <div className="flex flex-wrap items-center gap-x-4">
                            <div className="control mb-4 lg:mb-0 w-full flex-1">
                                <div className="flex items-center border h-12 px-3 rounded-md">
                                    <span className="mr-2">
                                        <IconMapPin />
                                    </span>
                                    <Select<
                                        number,
                                        LocalSearchDestinationListRs["result"][0]
                                    >
                                        placeholder="Chọn điểm đến"
                                        bordered={false}
                                        loading={isLoading}
                                        className="w-full p-0"
                                        showSearch={true}
                                        fieldNames={{
                                            label: "name",
                                            value: "id",
                                        }}
                                        size="large"
                                        // value={
                                        //     formData.byDest
                                        //         ? formData.byDest[0]?.id
                                        //         : undefined
                                        // }
                                        options={destinationsListSearch || []}
                                        // onChange={onChangeDestination}
                                        getPopupContainer={(triggerNode) =>
                                            triggerNode.parentElement
                                                .parentElement
                                        }
                                        suffixIcon={null}
                                    />
                                </div>
                            </div>
                            <div className="control mb-4 lg:mb-0 w-full lg:w-1/3">
                                <div className="flex items-center border h-12 px-3 rounded-md">
                                    <span className="icon mr-2">
                                        <IconCalendar />
                                    </span>
                                    <CustomDatePicker
                                        placeholder="Thời gian đi"
                                        size="large"
                                        disabledDate={(date) => {
                                            return date.isBefore(dayjs());
                                        }}
                                        format={"MMMM/YYYY"}
                                        picker="month"
                                        className="w-full p-0"
                                        bordered={false}
                                        suffixIcon={null}
                                        // value={
                                        //     formData.byMonth
                                        //         ? dayjs(formData.byMonth, {
                                        //               format: MONTH_FORMAT,
                                        //           })
                                        //         : undefined
                                        // }
                                        //onChange={handleSelectDate}
                                    />
                                </div>
                            </div>
                            <div className="button">
                                <ButtonSearch
                                    danger
                                    type="primary"
                                    size="large"
                                >
                                    <span className="mr-2">
                                        <IconSearch />
                                    </span>
                                    <span>{t("button.search")}</span>
                                </ButtonSearch>
                            </div>
                        </div>
                    </Form>
                </div>
            </div>
        </PureClient>
    );
};
export default BoxSearchTourFe;

const ButtonSearch = styled(Button)`
    && {
        display: flex;
        align-items: center;
        height: 48px !important;
    }
`;
