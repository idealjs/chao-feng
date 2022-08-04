import type { Block } from "@prisma/client";
import { useEffect } from "react";
import { proxy, useSnapshot } from "valtio";
import { bindProxyAndYMap } from "valtio-yjs";
import { applyUpdate } from "yjs";

import { useSocket } from "../../features/SocketProvider";
import usePageId from "../../hooks/usePageId";
import { useYDoc } from "../../lib/react-yjs/src/YDocProvider";
import Page from "./Page";

export const state = proxy<{
  blockOrders?: string[];
  blocks?: {
    [blockId: string]: Block;
  };
}>({});

const MockEditor = () => {
  const socket = useSocket();
  const yDoc = useYDoc();
  const pageId = usePageId();

  useEffect(() => {
    if (pageId != null && yDoc != null) {
      const valtioYMap = yDoc?.getMap(pageId);
      bindProxyAndYMap(state, valtioYMap);
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
    const listener = ({ added, removed, loaded }: any) => {
      console.log("test test subdocs");
    };
    yDoc?.on("subdocs", listener);

    return () => {
      yDoc?.off("subdocs", listener);
    };
  }, [yDoc]);

  return (
    <div>
      <Page />
      <button
        onClick={() => {
          console.log("test test", yDoc?.getMap(pageId).toJSON());
        }}
      >
        test
      </button>
    </div>
  );
};

export default MockEditor;
