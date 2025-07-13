"use client";
import React, { memo, PropsWithChildren, useDeferredValue, useEffect, useState } from "react";
import { useId } from "react";
import { createPortal } from "react-dom";
import { CloseOutlined } from "@ant-design/icons";
import classNames from "classnames";

interface CustomModalProps extends PropsWithChildren {
  open?: boolean;
  onClose?: () => void;
}
const CustomModal: React.FC<CustomModalProps> = ({ children, open, onClose }) => {
  const deferedOpen = useDeferredValue(open);

  if (!open) return null;

  return createPortal(
    <div
      className={classNames("gallery-modal fixed left-0 top-0 w-full h-full z-50 transition-all", {
        "opacity-0": !deferedOpen,
        "opacity-100 ": deferedOpen,
      })}
    >
      <div className="overlay bg-gray-900/90 absolute left-0 top-0 w-full h-full"></div>
      <div className="gallery-modal-inner relative left-0 top-0 w-full h-full flex items-center justify-center">
        <button className="absolute top-8 right-8 text-4xl text-white/80 cursor-pointer" onClick={onClose}>
          <CloseOutlined className="stroke-none" />
        </button>
        <div className="w-full h-full max-w-[1560px] flex flex-col justify-between px-6 lg:px-16 pt-24 pb-12">
          {children}
        </div>
      </div>
    </div>,
    document.body,
  );
};
export default memo(CustomModal);
