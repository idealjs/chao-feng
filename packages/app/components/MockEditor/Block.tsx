import { schema } from "@idealjs/chao-feng-shared/lib/prosemirror";
import { EditorState } from "prosemirror-state";
import { EditorView } from "prosemirror-view";
import { useEffect, useMemo, useRef, useState } from "react";
import { prosemirrorJSONToYDoc, ySyncPlugin } from "y-prosemirror";
import { applyUpdate, Doc } from "yjs";

import { useSocket } from "../../features/SocketProvider";
import usePageId from "../../hooks/usePageId";
import { useYDocSelector } from "../../lib/react-yjs";
import { useYDoc } from "../../lib/react-yjs/src/YDocProvider";
import { IBlock } from "../../lib/type";

interface IProps {
  blockId: string;
}

const Block = (props: IProps) => {
  const { blockId } = props;
  const ref = useRef<HTMLDivElement>(null);
  const [editor, setEditor] = useState<EditorView | null>(null);
  const socket = useSocket();
  const blockDoc = useYDocSelector((yDoc) => {
    return yDoc?.getMap<Doc>("blockDocs").get(blockId);
  });
  
  const yXmlFragment = useMemo(() => {
    return blockDoc?.getXmlFragment("prosemirror");
  }, [blockDoc]);

  useEffect(() => {
    const listener = (msg: { blockId: string; update: ArrayBuffer }) => {
      if (blockDoc != null && msg.blockId === blockId) {
        applyUpdate(blockDoc, new Uint8Array(msg.update));
      }
    };

    socket?.on("BLOCK_DOC_UPDATE", listener);

    return () => {
      socket?.off("BLOCK_DOC_UPDATE", listener);
    };
  }, [blockDoc, blockId, socket]);

  useEffect(() => {
    if (socket == null) {
      return;
    }
    socket.emit("BLOCK_DOC_INIT", { blockId });
  }, [blockId, socket]);

  useEffect(() => {
    if (yXmlFragment) {
      const editor = new EditorView(ref.current, {
        state: EditorState.create({
          schema,
          plugins: [ySyncPlugin(yXmlFragment)],
        }),
      });
      setEditor(editor);
      return () => {
        editor.destroy();
        setEditor(null);
      };
    }
  }, [yXmlFragment]);

  return (
    <div ref={ref} style={{ height: "100px", width: "100px" }}>
      Block
    </div>
  );
};

export default Block;
