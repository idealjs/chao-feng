import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { io, ManagerOptions, Socket, SocketOptions } from "socket.io-client";

import usePageId from "../hooks/usePageId";

const context = createContext<Socket | null>(null);

interface IProps {
  uri: string | undefined;
  opts?: Partial<ManagerOptions & SocketOptions>;
}

const SocketProvider = (props: PropsWithChildren<IProps>) => {
  const { children, uri, opts } = props;
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    let socket: Socket | null = null;
    if (uri != null) {
      socket = io(uri, opts);
      setSocket(socket);
    }
    return () => {
      socket?.close();
      setSocket(null);
    };
  }, [opts, uri]);

  return <context.Provider value={socket}>{children}</context.Provider>;
};

export default SocketProvider;

export const useSocket = () => {
  const socket = useContext(context);
  return socket;
};
