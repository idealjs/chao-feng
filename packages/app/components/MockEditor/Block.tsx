import { schema } from "@idealjs/chao-feng-shared/lib/prosemirror";
import { Block } from "@prisma/client";
import { EditorState } from "prosemirror-state";
import { EditorView } from "prosemirror-view";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  prosemirrorJSONToYDoc,
  yDocToProsemirrorJSON,
  ySyncPlugin,
} from "y-prosemirror";
import { Doc } from "yjs";

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
  const [blockDoc, setBlockDoc] = useState<Doc | null>(null);
  const socket = useSocket();
  const pageId = usePageId();
  const block = useYDocSelector((yDoc) => {
    return yDoc?.getMap<IBlock>("blocks").get(blockId);
  });
  const yDoc = useYDoc();

  const yXmlFragment = useMemo(() => {
    return blockDoc?.getXmlFragment("prosemirror");
  }, [blockDoc]);

  useEffect(() => {
    if (block?.properties == null) {
      return;
    }
    const doc = prosemirrorJSONToYDoc(schema, block?.properties);
    const listener = () => {
      console.log("test test block update");
      const json = yDocToProsemirrorJSON(doc);
      const yBlock = yDoc?.getMap<Block>("blocks").get(blockId);
      if (yBlock != null) {
        yDoc
          ?.getMap<Block>("blocks")
          .set(blockId, { ...yBlock, properties: json });
      }
    };
    setBlockDoc(doc);
    doc.on("update", listener);
    return () => {
      doc.off("update", listener);
    };
  }, [block?.properties, blockId, yDoc]);

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
