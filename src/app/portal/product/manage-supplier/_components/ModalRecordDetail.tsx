import React, { memo } from "react";
import { Modal, Tag } from "antd";
import { formatDate } from "@/utils/date";
import { Status } from "@/models/management/common.interface";
import { ISupplier } from "@/models/management/supplier.interface";
export interface ModalVendorDetailProps {
    open?: boolean;
    onClose?: () => void;
    data?: ISupplier;
}

const ModalRecordDetail: React.FC<ModalVendorDetailProps> = ({
    open,
    onClose,
    data,
}) => {
    return (
        <Modal centered open={open} onCancel={onClose} footer={null}>
            <div className="modal__vendor">
                <div className="modal__vendor--head text-center text-lg text-primary-default mb-3 pb-3">
                    <span>{data?.fullName}</span>
                </div>
                <div className="modal__vendor--body">
                    <div className="flex mb-4">
                        <span className="label w-44 block font-bold">#ID</span>
                        <span>{`${data?.recId}`}</span>
                    </div>
                    <div className="flex mb-4">
                        <span className="label w-44 block font-bold">
                            Tên vendor
                        </span>
                        <span>{data?.fullName}</span>
                    </div>
                    <div className="flex mb-4">
                        <span className="label w-44 block font-bold">
                            Tên rút gọn
                        </span>
                        <span>{data?.shortName}</span>
                    </div>
                    <div className="flex mb-4">
                        <span className="label w-44 block font-bold">
                            Người đại diện
                        </span>
                        <span>{data?.contact}</span>
                    </div>
                    <div className="flex mb-4">
                        <span className="label w-44 block font-bold">
                            Email
                        </span>
                        <span>{data?.email}</span>
                    </div>
                    <div className="flex mb-4">
                        <span className="label w-44 block font-bold">
                            Địa chỉ
                        </span>
                        <span>{data?.address}</span>
                    </div>
                    <div className="flex mb-4">
                        <span className="label w-44 block font-bold">
                            Tên ngân hàng
                        </span>
                        <span>{data?.bankName}</span>
                    </div>
                    <div className="flex mb-4">
                        <span className="label w-44 block font-bold">
                            Chi nhánh
                        </span>
                        <span>{data?.bankAddress}</span>
                    </div>
                    <div className="flex mb-4">
                        <span className="label w-44 block font-bold">
                            Số tài khoản
                        </span>
                        <span>{data?.bankAccountNumber}</span>
                    </div>
                    <div className="flex mb-4">
                        <span className="label w-44 block font-bold">
                            Ngày tạo
                        </span>
                        <span>
                            {(data?.sysFstUpdate &&
                                formatDate(data.sysFstUpdate)) ||
                                null}
                        </span>
                    </div>
                    <div className="flex mb-4">
                        <span className="label w-44 block font-bold">
                            Ghi chú
                        </span>
                        <span>{data?.rmk}</span>
                    </div>
                    <div className="flex mb-4">
                        <span className="label w-44 block font-bold">
                            Trạng thái
                        </span>
                        <span>
                            {data?.status === Status.OK ? (
                                <Tag color="green">Đang kích hoạt</Tag>
                            ) : data?.status === Status.QQ ? (
                                <Tag color="orange">Chờ kích hoạt</Tag>
                            ) : (
                                data?.status
                            )}
                        </span>
                    </div>
                </div>
            </div>
        </Modal>
    );
};
export default memo(ModalRecordDetail);
