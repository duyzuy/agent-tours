import { ThemeConfig, theme } from "antd";

export const antdTheme: ThemeConfig = {
    //hashed: false, // this make issue overwriting component font size work doesn't exactly

    token: {
        fontFamily: "Google Sans",
        fontSize: 14,
        colorPrimary: "#124ba5",
        colorError: "#ec1c24",
        colorSuccess: "#00b43d",
        colorWarning: "#fec124",
        colorInfo: "#2563eb",
        colorTextBase: "#141416",
        fontSizeHeading1: 26,
        fontSizeHeading2: 20,
        fontSizeHeading3: 18,
        fontSizeHeading4: 16,
        fontSizeHeading5: 14,
        borderRadiusSM: 3,
        borderRadius: 4,
        borderRadiusLG: 6,
    },
    components: {
        Button: {
            contentFontSizeSM: 13,
            controlHeightSM: 28,
            borderRadiusSM: 3,
            borderRadius: 4,
            borderRadiusLG: 6,
        },
        Input: {
            // paddingLG: 14,
            // fontSize: 16,
            fontSizeSM: 12,
            paddingInlineSM: 8,
            paddingBlockSM: 2,
            fontSizeLG: 16,
            paddingInlineLG: 16,
            borderRadiusSM: 3,
            borderRadius: 4,
            borderRadiusLG: 6,
        },
        Menu: {
            radiusItem: 0,
            itemBorderRadius: 0,
            radiusSubMenuItem: 0,
            subMenuItemBorderRadius: 0,
            paddingXL: 32,
            controlHeightLG: 48,
            marginXS: 8,
            paddingXS: 8,
            itemMarginInline: 0,
            controlHeightSM: 24,
            // colorPrimary: "#124ba5",
            // colorPrimaryBorder: "#7aedff",
            // colorSplit: "rgba(5, 5, 5, 0.06)",
            // controlItemBgActive: "rgb(18 75 165 / 7%)",
            itemSelectedBg: "#f1f1f1",
            subMenuItemBg: "#f9f9f9",
            marginXXS: 0,
            padding: 16,
            fontSize: 14,
            // itemColor: "#777E90",
            // groupTitleColor: "rgba(0, 0, 0, 0.45)",
            itemBg: "#fff",
        },
        Select: {
            // selectorBg: "red",
            // colorBgTextActive: "blue",
            optionSelectedBg: "#e7f3ff",
        },
        Form: {
            colorTextHeading: "#23262F",
        },
        Checkbox: {
            paddingXS: 12,
        },
    },
};

// export default mainTheme;
