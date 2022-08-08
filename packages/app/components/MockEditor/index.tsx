import type { Block } from "@prisma/client";
import { useEffect } from "react";
import { proxy, useSnapshot } from "valtio";
import { bindProxyAndYMap } from "valtio-yjs";
import { applyUpdate, Doc } from "yjs";

import { useSocket } from "../../features/SocketProvider";
import usePageId from "../../hooks/usePageId";
import { useYDoc } from "../../lib/react-yjs/src/YDocProvider";
import Page from "./Page";

export const state = proxy<{
  [key: string]: {
    blockOrders?: string[];
    blocks?: {
      [blockId: string]: Block;
    };
  };
}>({});

const MockEditor = () => {
  const socket = useSocket();
  const yDoc = useYDoc();
  const pageId = usePageId();

  useEffect(() => {
    const listener = (msg: { pageId: string; update: ArrayBuffer }) => {};
    socket?.on("PAGE_DOC_UPDATE", listener);
    return () => {
      socket?.off("PAGE_DOC_UPDATE", listener);
    };
  }, [pageId, socket, yDoc]);

  return (
    <div>
      <Page />
      <button
        onClick={() => {
          console.log(
            "test test",
            yDoc?.getMap<Doc>("pages").toJSON(),
            yDoc
              ?.getMap<Doc>("pages")
              .get(pageId!)
              ?.getArray("blockOrder")
              .toJSON()
          );
        }}
      >
        test
      </button>
    </div>
  );
};

export default MockEditor;
