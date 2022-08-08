import { useEffect } from "react";
import { useSnapshot } from "valtio";

import { useSocket } from "../../features/SocketProvider";
import usePageId from "../../hooks/usePageId";
import Block from "./Block";
import { pageStates } from "./state";

const Page = () => {
  const pageId = usePageId();
  const socket = useSocket();

  const pageSnapShots = useSnapshot(pageStates);

  useEffect(() => {
    if (socket == null) {
      return;
    }
    console.log("test test", pageId);
    socket.emit("PAGE_DOC_INIT", { pageId });
  }, [pageId, socket]);

  return (
    <div>
      {pageId != null &&
        pageSnapShots[pageId]?.blockOrder.map((blockId) => {
          return <Block key={blockId} blockId={blockId} />;
        })}
      <button
        onClick={() => {
          console.log("test test", JSON.stringify(pageSnapShots));
        }}
      >
        test
      </button>
    </div>
  );
};
export default Page;
