import MockEditor from "../../components/MockEditor";
import SocketProvider from "../../features/SocketProvider";
import usePageId from "../../hooks/usePageId";
import { YDocProvider } from "../../lib/react-yjs";

const Editor = () => {
  const pageId = usePageId();

  return (
    <YDocProvider>
      <SocketProvider
        uri={process.env.NEXT_PUBLIC_WEBSOCKET_URL}
        opts={{ query: { pageId } }}
      >
        <MockEditor />
      </SocketProvider>
    </YDocProvider>
  );
};

export default Editor;
