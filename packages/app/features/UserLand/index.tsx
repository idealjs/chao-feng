import { useEffect, useState } from "react";
import { Doc } from "yjs";

import usePageId from "../../hooks/usePageId";
import YDocProvider from "../../lib/react-yjs/src/YDocProvider";
import SocketProvider from "../SocketProvider";
import Editor from "./Editor";

const UserLand = () => {
  const pageId = usePageId();

  const [yDoc, setYDoc] = useState<Doc | null>(null);
  useEffect(() => {
    const doc = new Doc();
    setYDoc(doc);
    return () => {
      doc.destroy();
      setYDoc(null);
    };
  }, []);

  return (
    <YDocProvider yDoc={yDoc}>
      <SocketProvider
        uri={process.env.NEXT_PUBLIC_WEBSOCKET_URL}
        opts={{ query: { pageId } }}
      >
        <Editor />
      </SocketProvider>
    </YDocProvider>
  );
};

export default UserLand;
