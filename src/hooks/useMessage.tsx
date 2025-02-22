"use client";
import { App } from "antd";
const useMessage = () => {
  const { useApp } = App;

  const { message } = useApp();

  return message;
};
export default useMessage;
