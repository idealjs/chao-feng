import { createContext, PropsWithChildren, RefObject, useContext } from "react";

const context = createContext<RefObject<HTMLDivElement> | null>(null);

interface IProps {
  blockRef: RefObject<HTMLDivElement>;
}

const RefContext = (props: PropsWithChildren<IProps>) => {
  const { children, blockRef } = props;
  return <context.Provider value={blockRef}>{children}</context.Provider>;
};

export default RefContext;

export const useBlockRef = () => {
  const ctx = useContext(context);
  if (ctx == null) {
    throw new Error("useBlockRef must be used within a RefContext");
  }
  return ctx;
};
