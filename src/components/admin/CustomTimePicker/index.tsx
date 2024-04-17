import { TimePicker, TimePickerProps } from "antd";
import locale from "antd/es/date-picker/locale/vi_VN";
import "dayjs/locale/vi";

const CustomTimePicker: React.FC<TimePickerProps> = (props) => {
    return <TimePicker {...props} locale={locale} />;
};
export default CustomTimePicker;
