import React from "react";
import { Divider, Drawer, Table } from "antd";
import { SellableDetail } from "@/models/management/core/sellable.interface";
import ContentDetail from "@/components/admin/ContentDetail";
import { formatDate } from "@/utils/date";
import { Status } from "@/models/management/common.interface";
import CustomTable from "@/components/admin/CustomTable";
export interface DrawerSellableDetailProps {
    isOpen?: boolean;
    onCancel?: () => void;
    data?: SellableDetail;
    isLoading?: boolean;
    label: string;
}
const DrawerSellableDetail: React.FC<DrawerSellableDetailProps> = ({
    isOpen,
    onCancel,
    label,
    isLoading,
    data,
}) => {
    const {
        sellable,
        stocks,
        extraInventories,
        extraStocks,
        inventories,
        otherSellables,
    } = data || {};
    return (
        <Drawer
            title={label}
            destroyOnClose
            width={850}
            onClose={onCancel}
            open={isOpen}
            styles={{
                body: {
                    paddingBottom: 80,
                },
            }}
        >
            <div className="sellable">
                <ContentDetail
                    contents={[
                        {
                            label: "#ID",
                            value: sellable?.recId.toString(),
                        },
                        {
                            label: "Code",
                            value: sellable?.code,
                        },
                        {
                            label: "Type",
                            value: sellable?.type,
                        },
                        {
                            label: "Available",
                            value: sellable?.avaiable.toString(),
                        },
                        {
                            label: "Cap",
                            value: sellable?.cap.toString(),
                        },
                        {
                            label: "Open",
                            value: sellable?.open.toString(),
                        },
                        {
                            label: "Used",
                            value: sellable?.used.toString(),
                        },
                        {
                            label: "Valid date",
                            value: `From: ${
                                (sellable?.validFrom &&
                                    formatDate(sellable?.validFrom)) ||
                                "--"
                            } -- To ${
                                (sellable?.validTo &&
                                    formatDate(sellable?.validTo)) ||
                                "--"
                            }`,
                        },
                        {
                            label: "Close date",
                            value:
                                (sellable?.closeDate &&
                                    formatDate(sellable?.closeDate)) ||
                                "--",
                        },
                        {
                            label: "Using date",
                            value: `Start ${
                                (sellable?.startDate &&
                                    formatDate(sellable?.startDate)) ||
                                "--"
                            } -- End ${
                                (sellable?.endDate &&
                                    formatDate(sellable?.endDate)) ||
                                "--"
                            }`,
                        },
                        {
                            label: "sysFstUpdate",
                            value:
                                (sellable?.sysFstUpdate &&
                                    formatDate(sellable?.sysFstUpdate)) ||
                                "--",
                        },
                        {
                            label: "sysLstUpdate",
                            value:
                                (sellable?.sysLstUpdate &&
                                    formatDate(sellable?.sysLstUpdate)) ||
                                "--",
                        },
                        {
                            label: "logStatus",
                            value: sellable?.logStatus || "--",
                        },
                        {
                            label: "Trạng thái",
                            value:
                                (sellable?.status === Status.OK &&
                                    "Đã duyệt") ||
                                (sellable?.status === Status.QQ &&
                                    "Chờ duyệt") ||
                                "Không xác định",
                        },
                    ]}
                />
            </div>
            <Divider />
            <div className="inventory">
                <div className="title">
                    <p className="font-bold mb-6">Danh sách inventories</p>
                </div>
                <CustomTable
                    size="small"
                    loading={isLoading}
                    dataSource={inventories}
                    pagination={{ hideOnSinglePage: true, pageSize: 30 }}
                    columns={[
                        { title: "#ID", dataIndex: "recId", width: 100 },
                        {
                            title: "Code",
                            dataIndex: "code",
                            width: 350,
                            render: (_, record) => (
                                <>
                                    <p>{record.item.code}</p>
                                    <p className="text-gray-500">
                                        {record.item.name}
                                    </p>
                                </>
                            ),
                        },
                        { dataIndex: "qty", title: "Số lượng", width: 100 },
                    ]}
                />
            </div>
            <Divider />
            <div className="stock">
                <div className="title">
                    <p className="font-bold mb-6">Danh sách stocks</p>
                </div>
                <CustomTable
                    size="small"
                    dataSource={stocks}
                    loading={isLoading}
                    pagination={{ hideOnSinglePage: true, pageSize: 30 }}
                    columns={[
                        { title: "#ID", dataIndex: "recId", width: 100 },
                        {
                            title: "Code",
                            dataIndex: "code",
                            width: 350,
                            render: (_, record) => (
                                <>
                                    <p>{record.item.code}</p>
                                    <p className="text-gray-500">
                                        {record.item.description}
                                    </p>
                                </>
                            ),
                        },
                        { dataIndex: "qty", title: "Số lượng", width: 100 },
                    ]}
                />
            </div>
            <Divider />
            <div className="stock">
                <div className="title">
                    <p className="font-bold mb-6">Danh sách extra stocks</p>
                </div>
                <CustomTable
                    size="small"
                    dataSource={extraStocks}
                    loading={isLoading}
                    pagination={{ hideOnSinglePage: true, pageSize: 30 }}
                    rowKey="recId"
                    columns={[
                        { title: "#ID", dataIndex: "recId", width: 100 },
                        {
                            title: "Code",
                            dataIndex: "code",
                            width: 350,
                            render: (_, record) => (
                                <>
                                    <p>{record.item.code}</p>
                                    <p className="text-gray-500">
                                        {record.item.description}
                                    </p>
                                </>
                            ),
                        },
                        { dataIndex: "qty", title: "Số lượng", width: 100 },
                    ]}
                />
            </div>
            <Divider />
            <div className="stock">
                <div className="title">
                    <p className="font-bold mb-6">
                        Danh sách extra inventories
                    </p>
                </div>
                <CustomTable
                    size="small"
                    dataSource={extraInventories}
                    rowKey="recId"
                    loading={isLoading}
                    pagination={{ hideOnSinglePage: true, pageSize: 30 }}
                    columns={[
                        { title: "#ID", dataIndex: "recId", width: 100 },
                        {
                            title: "Code",
                            dataIndex: "code",
                            width: 350,
                            render: (_, record) => (
                                <>
                                    <p>{record?.item?.code}</p>
                                    <p className="text-gray-500">
                                        {record?.item?.name}
                                    </p>
                                </>
                            ),
                        },
                        { dataIndex: "qty", title: "Số lượng", width: 100 },
                    ]}
                />
            </div>
            <Divider />
            <div className="stock">
                <div className="title">
                    <p className="font-bold mb-6">Danh sách sellable</p>
                </div>
                <CustomTable
                    size="small"
                    rowKey="recId"
                    loading={isLoading}
                    dataSource={otherSellables}
                    pagination={{ hideOnSinglePage: true, pageSize: 30 }}
                    columns={[
                        { title: "#ID", dataIndex: "recId", width: 100 },
                        {
                            title: "Code",
                            dataIndex: "code",
                            width: 350,
                            render: (_, record) => record.item.code,
                        },
                        { dataIndex: "qty", title: "Số lượng", width: 100 },
                    ]}
                />
            </div>
        </Drawer>
    );
};
export default DrawerSellableDetail;
