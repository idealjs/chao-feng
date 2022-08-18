import usePageId from "../../hooks/usePageId";
import YDocProvider from "../../lib/react-yjs/src/YDocProvider";
import SocketProvider from "../SocketProvider";
import Editor from "./Editor";

const UserLand = () => {
  const pageId = usePageId();

  return (
    <YDocProvider>
      {pageId != null && (
        <SocketProvider
          uri={process.env.NEXT_PUBLIC_WEBSOCKET_URL}
          opts={{ query: { pageId } }}
        >
          <Editor />
        </SocketProvider>
      )}
    </YDocProvider>
  );
};

export default UserLand;
