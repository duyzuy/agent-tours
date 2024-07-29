import { useCallback, useRef, useState } from "react";
import FeCustomDatePicker, { FeCustomDatePickerProps } from "@/components/base/FeCustomDatePicker";
import { useTranslations } from "next-intl";
import dayjs from "dayjs";
import { IconCalendar } from "@/assets/icons";
import { Drawer } from "antd";
import styled from "styled-components";
import { useLocale } from "next-intl";
interface CalendarSelectorProps {
  value?: dayjs.Dayjs;
  dateList?: dayjs.Dayjs;
  disabledDate?: FeCustomDatePickerProps["disabledDate"];
  onChange: (value: dayjs.Dayjs | null, dateString: string) => void;
}
const CalendarSelector: React.FC<CalendarSelectorProps> = ({ value, disabledDate, onChange }) => {
  const locale = useLocale();
  const t = useTranslations("String");

  const [open, setOpen] = useState(false);

  const openCalendar = useCallback(() => {
    setOpen(true);
  }, []);

  const handleChangeDate: FeCustomDatePickerProps["onChange"] = (value, dateStr) => {
    onChange(value, dateStr);
    setOpen(false);
  };

  return (
    <>
      <div className="control border border-gray-200 rounded-lg px-4 py-4 flex justify-between items-center">
        <div className="depart-date w-full">
          <div className="mb-4 border-b pb-4 flex justify-between">
            <span className="block">{t("productSummary.departDate.title")}</span>
            <span className="text-base inline-block rounded-lg  text-primary-default ">
              {dayjs(value).format("DD/MM/YYYY")}
            </span>
          </div>
          <div className="block">
            <span className="flex items-center cursor-pointer" onClick={openCalendar}>
              <IconCalendar width={16} height={16} className="mr-2" />
              {t("productSummary.button.otherDate")}
            </span>
          </div>
        </div>
      </div>
      <DrawerCalendar
        open={open}
        placement="bottom"
        height={"calc(80vh - env(safe-area-inset-bottom))"}
        onClose={() => setOpen(false)}
      >
        <FeCustomDatePicker
          value={value}
          numberOfMonth={12}
          layout="vertical"
          hideNextAndPrev={true}
          lang={locale as "vi" | "en"}
          // minDate={dayjs().toDate()}
          // startDate={value}
          // maxDate={dayjs().add(1, "year")}
          disabledDate={disabledDate}
          onChange={handleChangeDate}
        />
      </DrawerCalendar>
    </>
  );
};
export default CalendarSelector;

const DrawerCalendar = styled(Drawer)`
  &.travel-drawer-content {
    border-radius: 10px 10px 0 0;
    .travel-drawer-body {
      padding: 0;
    }
  }
`;
