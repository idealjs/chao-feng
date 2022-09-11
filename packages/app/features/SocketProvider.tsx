import { useRouter } from "next/router";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { io, ManagerOptions, Socket, SocketOptions } from "socket.io-client";

const context = createContext<Socket | null>(null);

interface IProps {
  uri: string | undefined;
  opts?: Partial<ManagerOptions & SocketOptions>;
}

const SocketProvider = (props: PropsWithChildren<IProps>) => {
  const { children, uri, opts } = props;
  const [socket, setSocket] = useState<Socket | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (uri != null) {
      const socket = io(uri, opts);
      socket.on("error", (msg) => {
        router.push("/notfound");
      });
      setSocket(socket);

      return () => {
        socket?.close();
        setSocket(null);
      };
    }
  }, [opts, router, uri]);

  return <context.Provider value={socket}>{children}</context.Provider>;
};

export default SocketProvider;

export const useSocket = () => {
  const socket = useContext(context);
  return socket;
};
