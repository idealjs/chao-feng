import YDocProvider from "../../lib/react-yjs/src/YDocProvider";
import SocketProvider from "../SocketProvider";
import Editor from "./Editor";

const UserLand = () => {
  return (
    <YDocProvider>
      <SocketProvider uri={process.env.NEXT_PUBLIC_WEBSOCKET_URL}>
        <Editor />
      </SocketProvider>
    </YDocProvider>
  );
};

export default UserLand;
