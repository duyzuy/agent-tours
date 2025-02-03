import { useEffect, useState } from "react";

const useDebounce = (value: string, ms = 300) => {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebounceValue(value);
    }, ms);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [ms, value]);

  return debounceValue;
};

export { useDebounce };
