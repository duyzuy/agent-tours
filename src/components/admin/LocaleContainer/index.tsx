import React from "react";
import { locales } from "@/constants/locale.constant";
import { Button, Flex, Typography } from "antd";
import classNames from "classnames";
import { memo } from "react";
import { DownloadOutlined } from "@ant-design/icons";

export type TLocale = (typeof locales)[0];

interface Props {
    onChangeLocale: (data: TLocale) => void;
    selectedLocale?: TLocale;
    className?: string;
    label?: string;
}
const LocaleContainer: React.FC<Props> = ({ onChangeLocale, selectedLocale: locale, className = "", label = "Ngôn ngữ" }) => {
    return (
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
                    className={classNames("border rounded-sm px-3 py-1 cursor-pointer", {
                        "border-primary-default text-primary-default": lc.key === locale?.key,
                        "opacity-60": lc.key !== locale?.key,
                    })}
                    key={lc.key}
                    onClick={() => onChangeLocale(lc)}
                >
                    <div className="flex items-center">
                        <lc.icon className="w-5 h-5 mr-2" />
                        {lc.shortName}
                    </div>
                </div>
            ))}
        </Flex>
    );
};
export default memo(LocaleContainer);
