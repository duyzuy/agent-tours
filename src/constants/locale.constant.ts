import IconFlagEN from "@/assets/icons/IconFlagEN";
import IconFlagVN from "@/assets/icons/IconFlagVN";
import { ElementType } from "react";
export interface Locale {
    key: "vi" | "en";
    name: string;
    shortName: string;
    icon: ElementType;
}
export const locales: Locale[] = [
    { key: "vi", name: "Tiếng Việt", shortName: "VN", icon: IconFlagVN },
    { key: "en", name: "Tiếng Anh", shortName: "EN", icon: IconFlagEN },
];

export const localeDefault: Locale = {
    key: "vi",
    name: "Tiếng Việt",
    shortName: "VN",
    icon: IconFlagVN,
};
