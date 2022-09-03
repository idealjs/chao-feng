import { EditorView } from "prosemirror-view";
import { useEffect } from "react";
import { encodeStateAsUpdate } from "yjs";

import usePropertiesDoc from "../../hooks/yjs/usePropertiesDoc";
import { syncSuspenseProxy } from "../../hooks/yjs/useSyncPropertiesDoc";
import { useSocket } from "../SocketProvider";
import { useEditorView } from "./PMEditor";

interface IProps {
  blockId: string;
}

const Composistion = (props: IProps) => {
  const { blockId } = props;
  const editor = useEditorView();

  useComposistion(editor, blockId);

  return null;
};
export default Composistion;

const useComposistion = (editor: EditorView | null, blockId: string) => {
  const propertiesDoc = usePropertiesDoc(blockId);
  const socket = useSocket();

  useEffect(() => {
    const startListener = () => {
      syncSuspenseProxy[blockId] = true;
    };

    const endListener = () => {
      syncSuspenseProxy[blockId] = false;
      if (propertiesDoc != null) {
        const update = encodeStateAsUpdate(propertiesDoc);
        socket?.emit("PROPERTIES_DOC_UPDATED", {
          blockId,
          update,
        });
        socket?.emit("LOAD_PROPERTIES_DOC", { blockId });
      }
    };

    editor?.dom.addEventListener("compositionstart", startListener);
    editor?.dom.addEventListener("compositionend", endListener);

    return () => {
      editor?.dom.removeEventListener("compositionstart", startListener);
      editor?.dom.removeEventListener("compositionend", endListener);
    };
  }, [blockId, editor?.dom, propertiesDoc, socket]);
};
