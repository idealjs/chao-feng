import { createContext, PropsWithChildren, useContext, useMemo } from "react";
import { Doc } from "yjs";

const context = createContext<Doc | null>(null);

interface IProps {
  yDoc: Doc;
}

const YDocProvider = (props: PropsWithChildren<IProps>) => {
  const { children, yDoc } = props;
  return <context.Provider value={yDoc}>{children}</context.Provider>;
};

export default YDocProvider;

export const useYDoc = () => {
  const yDoc = useContext(context);
  if (yDoc == null) {
    throw new Error("yDoc is null");
  }
  return yDoc;
};
