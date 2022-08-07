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
  const snapshot = useSnapshot(state);

  useEffect(() => {
    if (pageId != null && yDoc != null) {
      bindProxyAndYMap(state, yDoc.getMap("pages"));
    }
  }, [pageId, yDoc]);

  useEffect(() => {
    socket?.emit("PAGE_DOC_INIT");
    const listener = (msg: { update: ArrayBuffer }) => {
      yDoc && applyUpdate(yDoc, new Uint8Array(msg.update));
    };
    socket?.on("PAGE_DOC_INIT", listener);
    return () => {
      socket?.off("PAGE_DOC_INIT", listener);
    };
  }, [socket, yDoc]);

  useEffect(() => {
    const listener = ({
      added,
      removed,
      loaded,
    }: {
      added: Set<Doc>;
      removed: Set<Doc>;
      loaded: Set<Doc>;
    }) => {
      added.forEach((doc) => {
        socket?.emit("DOC_LOAD", { guid: doc.guid });
      });
    };
    yDoc?.on("subdocs", listener);

    return () => {
      yDoc?.off("subdocs", listener);
    };
  }, [socket, yDoc]);

  return (
    <div>
      <Page />
      <button
        onClick={() => {
          console.log(
            "test test",
            yDoc?.getMap("pages").toJSON(),
            JSON.stringify(snapshot)
          );
        }}
      >
        test
      </button>
    </div>
  );
};

export default MockEditor;
