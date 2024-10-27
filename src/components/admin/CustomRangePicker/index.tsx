import { DatePicker } from "antd";
import { RangePickerProps } from "antd/es/date-picker";
import locale from "antd/es/date-picker/locale/vi_VN";
import "dayjs/locale/vi";
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";
dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.locale("en");
dayjs.locale("vi");

export type CustomRangePickerProps = RangePickerProps & {};
const CustomRangePicker: React.FC<CustomRangePickerProps> = (props) => {
  return <DatePicker.RangePicker locale={locale} {...props} />;
};
export default CustomRangePicker;
