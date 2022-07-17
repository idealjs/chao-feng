import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { io, Socket } from "socket.io-client";

import usePageId from "../hooks/usePageId";

const context = createContext<Socket | null>(null);

interface IProps {
  uri: string | undefined;
}

const SocketProvider = (props: PropsWithChildren<IProps>) => {
  const { children, uri } = props;
  const [socket, setSocket] = useState<Socket | null>(null);
  const pageId = usePageId();

  useEffect(() => {
    let socket: Socket | null = null;
    if (uri != null && pageId != null) {
      socket = io(uri, { query: { pageId } });
      setSocket(socket);
    }
    return () => {
      socket?.close();
      setSocket(null);
    };
  }, [pageId, uri]);

  return <context.Provider value={socket}>{children}</context.Provider>;
};

export default SocketProvider;

export const useSocket = () => {
  const socket = useContext(context);
  return socket;
};
