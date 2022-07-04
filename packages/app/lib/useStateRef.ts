import { useEffect, useRef } from "react";

const useStateRef = <S>(state: S) => {
  const ref = useRef(state);
  useEffect(() => {
    ref.current = state;
  }, [state]);
  return ref;
};

export default useStateRef;
