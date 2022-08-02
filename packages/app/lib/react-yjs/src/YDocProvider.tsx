import { createContext, PropsWithChildren, useContext, useMemo } from "react";
import { Doc } from "yjs";

const context = createContext<Doc | null>(null);

interface IProps {
  initVector?: Uint8Array;
}

const YDocProvider = (props: PropsWithChildren<IProps>) => {
  const { children } = props;
  const yDoc = useMemo(() => new Doc(), []);
  return <context.Provider value={yDoc}>{children}</context.Provider>;
};

export default YDocProvider;

export const useYDoc = () => {
  const yDoc = useContext(context);
  return yDoc;
};
