import { SpringRef } from "@react-spring/web";
import { createContext, PropsWithChildren, useContext } from "react";

export type ApiType = SpringRef<{
  y: number;
}>;

const context = createContext<ApiType | null>(null);

interface IProps {
  api: ApiType;
}

const SpringApiProvider = (props: PropsWithChildren<IProps>) => {
  const { children, api } = props;
  return <context.Provider value={api}>{children}</context.Provider>;
};

export default SpringApiProvider;

export const useSpringApi = () => {
  return useContext(context);
};
