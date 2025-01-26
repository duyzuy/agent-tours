import { ThemeConfig, theme } from "antd";

const baseTheme: ThemeConfig = {
  hashed: true,
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
    borderRadius: 4,
    borderRadiusLG: 6,
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
      // paddingLG: 14,
      // fontSize: 16,
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
      // selectorBg: "red",
      // colorBgTextActive: "blue",
      paddingSM: 8,
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

const lightTheme = { ...baseTheme, algorithm: theme.defaultAlgorithm };
const darkTheme = { ...baseTheme, algorithm: theme.darkAlgorithm };

export { lightTheme, darkTheme };
// export default mainTheme;
