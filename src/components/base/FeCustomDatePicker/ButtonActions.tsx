"use client";
import React, { memo } from "react";
import classNames from "classnames";
const NextButton: React.FC<{ onClick: (action: "next") => void }> = ({ onClick }) => {
  return (
    <button className="btn-calendar btn-next" onClick={() => onClick("next")} type="button">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        style={{ width: 18 }}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
      </svg>
    </button>
  );
};

const PrevButton: React.FC<{ onClick: (action: "prev") => void }> = ({ onClick }) => {
  return (
    <button className="btn-calendar btn-prev" type="button" onClick={() => onClick("prev")}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        style={{ width: 18 }}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75" />
      </svg>
    </button>
  );
};

const ButtonResetSelection: React.FC<{
  isDisable: boolean;
  onClick?: () => void;
}> = ({ isDisable, onClick }) => {
  return (
    <button
      type="button"
      className={classNames({
        "btn-calendar btn-reset": true,
        disable: isDisable,
      })}
      onClick={onClick}
    >
      Đặt lại
    </button>
  );
};
const ButtonConfirmSelection: React.FC<{
  isDisable: boolean;
  onClick?: () => void;
}> = ({ isDisable, onClick }) => {
  return (
    <button
      className={classNames({
        "btn-calendar btn-confirm": true,
        disable: isDisable,
      })}
      type="button"
      onClick={() => {
        if (isDisable) return;

        return onClick && onClick();
      }}
    >
      Xác nhận
    </button>
  );
};
const NextCalendarButton = memo(NextButton);
const PrevCalendarButton = memo(PrevButton);
const ButtonReset = memo(ButtonResetSelection);

const ButtonConfirm = memo(ButtonConfirmSelection);

export { NextCalendarButton, PrevCalendarButton, ButtonReset, ButtonConfirm };
