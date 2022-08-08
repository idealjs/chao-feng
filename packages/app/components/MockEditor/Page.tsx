import { useEffect } from "react";
import { applyUpdate, Doc } from "yjs";

import { useSocket } from "../../features/SocketProvider";
import usePageId from "../../hooks/usePageId";
import { useYDocSelector } from "../../lib/react-yjs";
import { useYDoc } from "../../lib/react-yjs/src/YDocProvider";

const Page = () => {
  const pageId = usePageId()!;
  const yDoc = useYDoc();
  const pageDoc = useYDocSelector((root) => {
    return root?.getMap<Doc>("pages").get(pageId);
  });

  const socket = useSocket();

  useEffect(() => {
    if (socket == null) {
      return;
    }

    if (pageDoc == null) {
      const listener = (msg: { pageId: string; update: ArrayBuffer }) => {
        console.debug("[debug] PAGE_DOC_UPDATE", msg.pageId);
        if (msg.pageId === pageId) {
          applyUpdate(pageDoc, new Uint8Array(msg.update));
        }
      };
      console.log("test test PAGE_DOC_INIT", socket);
      let pageDoc = new Doc({ guid: pageId });
      socket.emit("PAGE_DOC_INIT", { pageId });
      socket.on("PAGE_DOC_UPDATE", listener);
      yDoc?.getMap<Doc>("pages").set(pageId, pageDoc);

      return () => {
        socket.off("PAGE_DOC_UPDATE", listener);
      };
    }
  }, [pageDoc, pageId, socket, yDoc]);

  return (
    <div>
      {/* {snapshot.blockOrders?.map((blockId) => {
        return <Block key={blockId} blockId={blockId} />;
      })} */}
    </div>
  );
};
export default Page;
