import { useMemo } from "react";
import { useMediaQuery } from "react-responsive";

const useDefaultHidden = () => {
  const smBreakPoint = useMediaQuery({ minWidth: 640 });
  const mdBreakPoint = useMediaQuery({ minWidth: 768 });
  const lgBreakPoint = useMediaQuery({ minWidth: 1024 });

  const defaultHidden = useMemo(() => {
    return !smBreakPoint || !mdBreakPoint || !lgBreakPoint;
  }, [lgBreakPoint, mdBreakPoint, smBreakPoint]);
  return defaultHidden;
};

export default useDefaultHidden;
