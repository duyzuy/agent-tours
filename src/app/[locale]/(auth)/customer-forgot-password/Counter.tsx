"use client";
import { useState, useEffect, memo } from "react";
import { useTranslations } from "next-intl";
interface CounterProps {
  durationTime?: number;
  onFinish?: () => void;
}
const Counter: React.FC<CounterProps> = ({ durationTime, onFinish }) => {
  const [counter, setCounter] = useState<{ minute: string; second: string }>({ minute: "00", second: "00" });
  const t = useTranslations("String");

  useEffect(() => {
    if (!durationTime) {
      return;
    }
    const minute = Math.floor(durationTime / 60);
    const second = Math.round(durationTime % 60);
    setCounter({ minute: minute.toString(), second: second.toString() });
    let countTime = durationTime;
    const interValId = setInterval(() => {
      if (countTime <= 0) {
        clearInterval(interValId);
        onFinish?.();
        return;
      }
      countTime = countTime - 1;
      const minute = Math.floor(countTime / 60);
      const second = Math.round(countTime % 60);
      setCounter({ minute: minute.toString(), second: second.toString() });
    }, 1000);

    return () => {
      clearInterval(interValId);
    };
  }, [durationTime]);
  return (
    <div className="counter flex gap-x-2 items-center justify-center">
      <span className="inline-flex flex-col justify-center items-center w-16 h-16 bg-gray-100 rounded-md">
        <span className="block text-xs text-gray-500">Phút</span>
        <span className="block font-bold text-xl">
          {counter.minute.length === 1 ? `0${counter.minute}` : counter.minute}
        </span>
      </span>
      <span className="inline-flex flex-col justify-center items-center w-16 h-16 bg-gray-100 rounded-md">
        <span className="block text-xs text-gray-500">Giây</span>
        <span className="block font-bold text-xl">
          {counter.second.length === 1 ? `0${counter.second}` : counter.second}
        </span>
      </span>
    </div>
  );
};
export default memo(Counter);
