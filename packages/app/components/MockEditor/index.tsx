import { useEffect, useRef } from "react";
import { applyUpdate } from "yjs";

import { useSocket } from "../../features/SocketProvider";
import usePageId from "../../hooks/usePageId";
import { useYDoc } from "../../lib/react-yjs/src/YDocProvider";
import Page from "./Page";

const MockEditor = () => {
  const socket = useSocket();
  const yDoc = useYDoc();

  useEffect(() => {
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
          console.log("test test", yDoc?.getArray("blockOrder").toJSON());
        }}
      >
        test
      </button>
    </div>
  );
};

export default MockEditor;
