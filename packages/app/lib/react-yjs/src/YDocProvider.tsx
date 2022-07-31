import { createContext, PropsWithChildren, useContext } from "react";
import { Doc } from "yjs";

const context = createContext<Doc | null>(null);

interface IProps {
  yDoc: Doc | null;
}

const YDocProvider = (props: PropsWithChildren<IProps>) => {
  const { children, yDoc } = props;

  return <context.Provider value={yDoc}>{children}</context.Provider>;
};

export default YDocProvider;

export const useYDoc = () => {
  const yDoc = useContext(context);
  return yDoc;
};
