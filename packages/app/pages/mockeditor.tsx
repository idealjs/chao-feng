import prisma from "@idealjs/chao-feng-shared/lib/prisma";
import { schema } from "@idealjs/chao-feng-shared/lib/prosemirror";
import { prosemirrorJSONToYDoc } from "y-prosemirror";
import { Doc, encodeStateVector } from "yjs";

import MockEditor from "../components/MockEditor";
import SocketProvider from "../features/SocketProvider";
import { YDocProvider } from "../lib/react-yjs";

const Editor = () => {
  const pageId = "mockeditor";
  return (
    <YDocProvider>
      <SocketProvider
        uri={process.env.NEXT_PUBLIC_WEBSOCKET_URL}
        opts={{ query: { pageId: pageId } }}
      >
        <MockEditor pageId={pageId} blockId={"a"} />
      </SocketProvider>
    </YDocProvider>
  );
};

export default Editor;
