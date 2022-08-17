import { useSocket } from "../../features/SocketProvider";
import { useYDocSocket } from "../../lib/react-yjs";
import Page from "./Page";

const MockEditor = () => {
  const socket = useSocket();
  useYDocSocket(socket);

  return (
    <div>
      <Page />
    </div>
  );
};

export default MockEditor;
