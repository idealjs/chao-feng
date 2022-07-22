import { createContext, PropsWithChildren, useContext } from "react";

const context = createContext<string | undefined>(undefined);

interface IProps {
  nextTo: string | undefined;
}

const NextToProvider = (props: PropsWithChildren<IProps>) => {
  const { children, nextTo } = props;
  return <context.Provider value={nextTo}>{children}</context.Provider>;
};

export default NextToProvider;

export const useNextTo = () => {
  return useContext(context);
};
