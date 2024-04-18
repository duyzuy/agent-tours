import { useEffect, useState } from "react";

const useAnimation = (isShow: boolean, timeout = 100) => {
  const [stage, setStage] = useState(isShow);
  const [isMounted, setMounted] = useState(isShow);

  useEffect(() => {
    isShow === true ? setMounted(isShow) : setStage(isShow);

    const timeOutId = setTimeout(() => {
      isShow === true ? setStage(isShow) : setMounted(isShow);
      clearTimeout(timeOutId);
    }, timeout);
  }, [isShow, timeout]);

  return {
    stage,
    isMounted,
  };
};
export default useAnimation;
