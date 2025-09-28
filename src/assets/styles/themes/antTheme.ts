import { Select, ThemeConfig, theme } from "antd";

const baseTheme: ThemeConfig = {
  hashed: false,
  token: {
    fontFamily: "Google Sans",
    fontSize: 14,
    colorPrimary: "#124ba5",
    colorError: "#ec1c24",
    colorSuccess: "#00b43d",
    colorWarning: "#fec124",
    colorInfo: "#2563eb",

    fontSizeHeading1: 26,
    fontSizeHeading2: 20,
    fontSizeHeading3: 18,
    fontSizeHeading4: 16,
    fontSizeHeading5: 14,
    borderRadiusSM: 3,
    borderRadius: 6,
    borderRadiusLG: 6,
    controlHeight: 38,
  },
  components: {
    Button: {
      contentFontSizeSM: 12,
      controlHeightSM: 28,
      borderRadiusSM: 3,
      borderRadius: 4,
      borderRadiusLG: 6,
    },
    Table: {
      // colorText: "red",
    },
    Input: {
      fontSizeSM: 12,
      paddingInlineSM: 11,
      paddingBlockSM: 4,
      fontSizeLG: 16,
      paddingInlineLG: 16,
      borderRadiusSM: 4,
      borderRadius: 4,
      borderRadiusLG: 6,
    },
    DatePicker: {
      fontSizeSM: 12,
      paddingInlineSM: 8,
      paddingBlockSM: 2,
      fontSizeLG: 16,
      paddingInlineLG: 16,
      borderRadiusSM: 3,
      borderRadius: 4,
      borderRadiusLG: 6,
    },
    Select: {
      paddingSM: 8,
    },
    Form: {
      colorTextHeading: "#23262F",
    },
    Checkbox: {
      paddingXS: 12,
    },
    Menu: {
      darkItemBg: "rgb(20, 20, 20)",
      darkSubMenuItemBg: "rgb(33 33 33)",
    },
    Layout: {
      triggerBg: "rgb(20, 20, 20)",
    },
  },
};

const lightTheme = {
  ...baseTheme,
  components: {
    ...baseTheme.components,
    Select: { ...baseTheme.components?.Select, optionSelectedBg: "#e7f3ff" },
  },
  algorithm: theme.defaultAlgorithm,
};
const darkTheme = {
  ...baseTheme,
  components: {
    ...baseTheme.components,
    Form: { ...baseTheme.components?.Form, labelColor: "rgba(255, 255, 255, 0.85)" },
  },
  algorithm: theme.darkAlgorithm,
};

export { lightTheme, darkTheme };
// export default mainTheme;
