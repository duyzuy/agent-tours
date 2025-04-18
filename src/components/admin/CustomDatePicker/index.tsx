import locale from "antd/es/date-picker/locale/vi_VN";
import "dayjs/locale/vi";
import { DatePicker, DatePickerProps } from "antd";

const CustomDatePicker: React.FC<DatePickerProps> = (props) => {
  return <DatePicker locale={locale} format="DD/MM/YYYY" {...props} />;
};
export default CustomDatePicker;
