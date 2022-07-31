import MockEditor from "../components/MockEditor";
import SocketProvider from "../features/SocketProvider";
import { YDocProvider } from "../lib/react-yjs";

const Editor = () => {
  return (
    <YDocProvider>
      <SocketProvider
        uri={process.env.NEXT_PUBLIC_WEBSOCKET_URL}
        opts={{ query: { pageId: "mockeditor" } }}
      >
        <MockEditor />
      </SocketProvider>
    </YDocProvider>
  );
};

export default Editor;
