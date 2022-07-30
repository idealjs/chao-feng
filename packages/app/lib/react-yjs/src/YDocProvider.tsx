import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { Doc } from "yjs";

const context = createContext<Doc | null>(null);

interface IProps {}

const YDocProvider = (props: PropsWithChildren<IProps>) => {
  const { children } = props;
  const [yDoc, setYDoc] = useState<Doc | null>(null);
  useEffect(() => {
    const doc = new Doc();
    setYDoc(doc);
    return () => {
      doc.destroy();
      setYDoc(null);
    };
  }, []);

  return <context.Provider value={yDoc}>{children}</context.Provider>;
};

export default YDocProvider;

export const useYDoc = () => {
  const yDoc = useContext(context);
  return yDoc;
};
