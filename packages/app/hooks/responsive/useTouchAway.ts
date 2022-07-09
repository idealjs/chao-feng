import { useEffect, useRef } from "react";

const useTouchAway = <E extends Element = HTMLDivElement>(
  callback: () => void
) => {
  const ref = useRef<E>(null);
  useEffect(() => {
    const listener = (event: TouchEvent) => {
      console.log();
      if (!ref.current?.contains(event.target as Node)) {
        callback();
      }
    };
    document.addEventListener("touchend", listener);
    return () => {
      document.removeEventListener("touchend", listener);
    };
  }, [callback]);

  return ref;
};

export default useTouchAway;
