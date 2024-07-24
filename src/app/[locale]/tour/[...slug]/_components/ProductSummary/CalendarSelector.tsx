import { useCallback, useRef, useState } from "react";
import dayjs from "dayjs";
import FeCustomDatePicker, { FeCustomDatePickerProps } from "@/components/base/FeCustomDatePicker";
import { IconCalendar } from "@/assets/icons";
import { useClickOutSide } from "@/app/[locale]/hooks/useClickOutSide";
import classNames from "classnames";
interface CalendarSelectorProps {
  label?: string;
  value?: dayjs.Dayjs;
  dateList?: dayjs.Dayjs;
  disabledDate?: FeCustomDatePickerProps["disabledDate"];
  onChange: (value: dayjs.Dayjs | null, dateString: string) => void;
  className?: string;
}
const CalendarSelector: React.FC<CalendarSelectorProps> = ({
  value,
  disabledDate,
  onChange,
  className = "",
  label,
}) => {
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
    <div
      className={classNames("calendar-selector relative z-10", {
        [className]: className,
      })}
    >
      <div className="calendar-control">
        <div className="mb-2">{label}</div>
        <div
          className="flex items-center justify-between cursor-pointer px-3 py-2 rounded-sm border border-gray-300 "
          onClick={openCalendar}
        >
          <span className="text-base">{dayjs(value).format("DD/MM/YYYY")}</span>
          <span>
            <IconCalendar width={16} height={16} />
          </span>
        </div>
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
