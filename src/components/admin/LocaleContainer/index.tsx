import React, { useMemo, useState } from "react";
import { locales } from "@/constants/locale.constant";
import { Flex, Typography, Modal, Button } from "antd";
import classNames from "classnames";
import { memo } from "react";
import { localeDefault } from "@/constants/locale.constant";
import { InfoCircleOutlined } from "@ant-design/icons";
import { isEqual } from "lodash";
export type TLocale = (typeof locales)[0];

export interface LocaleContainerProps {
    onChange: (locale: TLocale) => void;
    value?: TLocale;
    initvalue?: TLocale;
    className?: string;
    label?: string;
    currentData: any;
    newData: any;
}
const LocaleContainer: React.FC<LocaleContainerProps> = ({
    onChange,
    value,
    initvalue,
    className = "",
    label = "Ngôn ngữ",
    currentData,
    newData,
}) => {
    const [open, setOpen] = useState(false);
    const [lc, setLc] = useState<TLocale>();
    const onCancel = () => {
        setOpen(false);
        setLc(undefined);
    };

    const handleModalConfirmation = (lc: TLocale) => {
        /**
         * Compare two data
         */
        if (isEqual(JSON.stringify(currentData), JSON.stringify(newData))) {
            onChange(lc);
        } else {
            onShowModalConfirm(lc);
        }
    };
    const onShowModalConfirm = (lc: TLocale) => {
        setOpen(true);
        setLc(lc);
    };
    const onOk = () => {
        lc && onChange(lc);
        setOpen(false);
    };
    const locale = useMemo(() => {
        return value ? value : localeDefault;
    }, [localeDefault, value]);

    const renderModalFooter = () => {
        return (
            <div className="px-2 flex items-center flex-1 justify-center">
                <Button onClick={onCancel} className="w-24">
                    Huỷ bỏ
                </Button>
                <Button onClick={onOk} type="primary" className="w-24">
                    Xác nhận
                </Button>
            </div>
        );
    };

    return (
        <React.Fragment>
            <Flex
                gap="small"
                align="flex-center"
                className={classNames("py-2 mb-2 items-center", {
                    [className]: className,
                })}
            >
                <Typography.Text className="mb-0">{label}</Typography.Text>
                {locales.map((lc) => (
                    <div
                        className={classNames(
                            "border rounded-sm px-3 py-1 cursor-pointer",
                            {
                                "border-primary-default text-primary-default":
                                    lc.key === locale.key,
                                "opacity-60": lc.key !== locale.key,
                            },
                        )}
                        key={lc.key}
                        onClick={() =>
                            lc.key !== locale.key && handleModalConfirmation(lc)
                        }
                    >
                        <div className="flex items-center">
                            <lc.icon className="w-5 h-5 mr-2" />
                            {lc.shortName}
                        </div>
                    </div>
                ))}
            </Flex>
            <Modal
                open={open}
                onCancel={onCancel}
                footer={renderModalFooter}
                width={380}
            >
                <div className="body py-4">
                    <div className="icon text-blue-600 text-center">
                        <InfoCircleOutlined className="text-5xl" />
                    </div>
                    <div className="content py-2 text-center">
                        <p className="font-bold text-center py-2 text-lg">
                            Rời khỏi trang?
                        </p>
                        <p className="text-gray-500">
                            Dữ liệu chưa được lưu sẽ không thể khôi phục lại
                        </p>
                        <p className="text-gray-500">
                            Bạn chắc chắn muốn rời khỏi trang
                        </p>
                    </div>
                </div>
            </Modal>
        </React.Fragment>
    );
};
export default memo(LocaleContainer);
