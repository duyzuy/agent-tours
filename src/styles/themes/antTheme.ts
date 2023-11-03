import { ThemeConfig } from "antd";

export const antdTheme: ThemeConfig = {
    hashed: false, // this make issue overwriting component font size work doesn't exactly
    token: {
        // colorPrimary: mainTheme.colors.primary,
        fontFamily: "Google Sans",
        fontSize: 16,
        colorPrimary: "#00b8ef",
        colorError: "#ec1c24",
        colorSuccess: "#00b43d",
        colorWarning: "#fec124",
        colorInfo: "#00b8ef",
        colorTextBase: "#141416",
        fontSizeHeading1: 26,
        fontSizeHeading2: 20,
        fontSizeHeading3: 18,
        fontSizeHeading4: 16,
        fontSizeHeading5: 14,
    },
    components: {
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
            colorPrimary: "#00b8ef",
            colorPrimaryBorder: "#7aedff",
            colorSplit: "rgba(5, 5, 5, 0.06)",
            controlItemBgActive: "#E9FAFF",
            marginXXS: 0,
            padding: 16,
            fontSize: 18,
            // itemColor: "#777E90",
            groupTitleColor: "rgba(0, 0, 0, 0.45)",
            itemBg: "#ffffff",
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
