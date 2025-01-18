import { memo, useCallback, useRef, useState } from "react";
import dayjs from "dayjs";
import FeCustomDatePicker, { FeCustomDatePickerProps } from "@/components/base/FeCustomDatePicker";
import { IconCalendar, IconCalendarDays } from "@/assets/icons";
import { useClickOutSide } from "@/hooks/fe/useClickOutSide";
import { useLocale } from "next-intl";
import classNames from "classnames";
import styles from "./style.module.scss";
import styled from "styled-components";
import { Button, Drawer } from "antd";
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
              <IconCalendarDays className="w-4 h-4" />
            </div>
          </div>
          {open ? (
            <div ref={modalRef} className={`absolute ${styles["datepicker-dropdown"]}`}>
              <FeCustomDatePicker {...datePickerProps} />
            </div>
          ) : null}
        </div>
      ) : (
        <div className={classNames("control border border-gray-200 rounded-lg px-3 py-3", { [className]: className })}>
          <div className="depart-date w-full">
            <div className="border-b pb-3 mb-3 flex justify-between">
              <span className="block">{label}</span>
              <span className="text-base inline-block rounded-lg  text-primary-default font-semibold">
                {dayjs(value).format("DD/MM/YYYY")}
              </span>
            </div>
            <div className="block">
              <Button
                type="text"
                icon={<IconCalendarDays className="w-4 h-4" />}
                className="!inline-flex items-center !bg-gray-100 !px-3"
                shape="round"
                onClick={openCalendar}
              >
                <span>{t("productSummary.button.otherDate")}</span>
              </Button>
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
