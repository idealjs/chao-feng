import { ReactDOMAttributes } from "@use-gesture/react/dist/declarations/src/types";
import { createContext, PropsWithChildren, useContext } from "react";

const context = createContext<(() => ReactDOMAttributes) | null>(null);

interface IProps {
  bindFunc: () => ReactDOMAttributes;
}

const BindContext = (props: PropsWithChildren<IProps>) => {
  const { children, bindFunc } = props;
  return <context.Provider value={bindFunc}>{children}</context.Provider>;
};

export default BindContext;

export const useBind = () => {
  const ctx = useContext(context);
  if (ctx == null) {
    throw new Error("useBind must be used within a BindContext");
  }
  return ctx;
};
