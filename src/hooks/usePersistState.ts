"use client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { isSSR } from "@/utils/common";
export const usePersistState = <T>({
  key,
  initialValue,
}: {
  key: string;
  initialValue: T;
}): [T, Dispatch<SetStateAction<T>>] => {
  const [state, setState] = useState(() => {
    if (!isSSR()) {
      const data = localStorage.getItem(key);

      if (data) {
        return data as T;
      }
    }
    return initialValue;
  });

  useEffect(() => {
    state && localStorage.setItem(key, state.toString());
  }, [state, setState]);

  return [state, setState];
};
