import { useCallback, useRef, useState } from "react";
import FeCustomDatePicker, { FeCustomDatePickerProps } from "@/components/base/FeCustomDatePicker";
import dayjs from "dayjs";
import { IconCalendar } from "@/assets/icons";
import { useClickOutSide } from "@/app/[locale]/hooks/useClickOutSide";
interface CalendarSelectorProps {
  value?: dayjs.Dayjs;
  dateList?: dayjs.Dayjs;
  disabledDate?: FeCustomDatePickerProps["disabledDate"];
  onChange: (value: dayjs.Dayjs | null, dateString: string) => void;
}
const CalendarSelector: React.FC<CalendarSelectorProps> = ({ value, disabledDate, onChange }) => {
  const [open, setOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const openCalendar = useCallback(() => {
    setOpen(true);
  }, []);

  const handleChangeDate: FeCustomDatePickerProps["onChange"] = (value, dateStr) => {
    onChange(value, dateStr);
    setOpen(false);
  };
  useClickOutSide(modalRef, () => {
    setOpen(false);
  });
  return (
    <div>
      <div
        className="control border border-gray-300 rounded-sm px-3 py-2 flex justify-between items-center cursor-pointer"
        onClick={openCalendar}
      >
        <span className="text-base">{dayjs(value).format("DD/MM/YYYY")}</span>
        <span>
          <IconCalendar width={16} height={16} />
        </span>
      </div>
      {open ? (
        <div ref={modalRef} className="absolute">
          <FeCustomDatePicker
            value={value}
            numberOfMonth={1}
            layout="vertical"
            // minDate={dayjs().toDate()}
            startDate={value}
            maxDate={dayjs().add(1, "year")}
            disabledDate={disabledDate}
            onChange={handleChangeDate}
          />
        </div>
      ) : null}
    </div>
  );
};
export default CalendarSelector;
