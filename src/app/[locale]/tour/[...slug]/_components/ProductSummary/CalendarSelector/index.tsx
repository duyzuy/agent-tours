import { memo, useCallback, useRef, useState } from "react";
import dayjs from "dayjs";
import FeCustomDatePicker, { FeCustomDatePickerProps } from "@/components/base/FeCustomDatePicker";
import { IconCalendar } from "@/assets/icons";
import { useClickOutSide } from "@/app/[locale]/hooks/useClickOutSide";
import { useLocale } from "next-intl";
import classNames from "classnames";
import styles from "./style.module.scss";
import styled from "styled-components";
import { Drawer } from "antd";
import { useTranslations } from "next-intl";
interface CalendarSelectorProps {
  label?: string;
  value?: dayjs.Dayjs;
  disabledDate?: FeCustomDatePickerProps["disabledDate"];
  onChange?: (value: dayjs.Dayjs | null, dateString: string) => void;
  className?: string;
  isMobile?: boolean;
}
const CalendarSelector: React.FC<CalendarSelectorProps> = ({
  value,
  disabledDate,
  onChange,
  className = "",
  label,
  isMobile = false,
}) => {
  const t = useTranslations("String");
  const [open, setOpen] = useState(false);
  const locale = useLocale();
  const modalRef = useRef<HTMLDivElement>(null);
  const openCalendar = useCallback(() => {
    setOpen(true);
  }, []);

  const handleChangeDate: FeCustomDatePickerProps["onChange"] = (value, dateStr) => {
    onChange?.(value, dateStr);
    setOpen(false);
  };
  useClickOutSide(modalRef, () => {
    setOpen(false);
  });

  let datePickerProps: FeCustomDatePickerProps = {
    value: value,
    numberOfMonth: isMobile ? 12 : 1,
    layout: "vertical",
    lang: locale as "vi" | "en",
    startDate: value,
    maxDate: dayjs().add(1, "year"),
    disabledDate: disabledDate,
    onChange: handleChangeDate,
  };
  const wraperComponent = () => {};
  return (
    <>
      {!isMobile ? (
        <div
          className={classNames(`calendar-selector relative z-10 ${styles["datepicker-control"]}`, {
            [className]: className,
          })}
        >
          <div className="calendar-control">
            <div className="mb-2">{label}</div>
            <div
              className={classNames(
                `flex items-center justify-between cursor-pointer px-3 py-2 rounded-md border border-gray-300 ${styles["datepicker-control"]}`,
              )}
              onClick={openCalendar}
            >
              <span className="text-base">{dayjs(value).format("DD/MM/YYYY")}</span>
              <IconCalendar width={16} height={16} />
            </div>
          </div>
          {open ? (
            <div ref={modalRef} className={`absolute ${styles["datepicker-dropdown"]}`}>
              <FeCustomDatePicker {...datePickerProps} />
            </div>
          ) : null}
        </div>
      ) : (
        <div className={classNames("control border border-gray-200 rounded-lg px-4 py-4", { [className]: className })}>
          <div className="depart-date w-full">
            <div className="mb-4 border-b pb-4 flex justify-between">
              <span className="block">{label}</span>
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
          <DrawerCalendar
            open={open}
            placement="bottom"
            height={"calc(80vh - env(safe-area-inset-bottom))"}
            onClose={() => setOpen(false)}
          >
            <FeCustomDatePicker {...datePickerProps} />
          </DrawerCalendar>
        </div>
      )}
    </>
  );
};
export default memo(CalendarSelector);

const DrawerCalendar = styled(Drawer)`
  &.travel-drawer-content {
    border-radius: 10px 10px 0 0;
    .travel-drawer-body {
      padding: 0;
    }
  }
`;
