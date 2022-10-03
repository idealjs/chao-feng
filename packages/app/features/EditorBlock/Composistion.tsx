import { EditorView } from "prosemirror-view";
import { useEffect } from "react";
import { encodeStateAsUpdate } from "yjs";

import { syncSuspenseProxy } from "../../hooks/yjs/useSyncPropertiesDoc";
import { useYDoc } from "../../lib/react-yjs";
import { useSocket } from "../SocketProvider";
import { useEditorView } from "./PMEditor";

interface IProps {
  pageId: string;
}

const Composistion = (props: IProps) => {
  const { pageId } = props;
  const editor = useEditorView();

  useComposistion(editor, pageId);

  return null;
};
export default Composistion;

const useComposistion = (editor: EditorView | null, pageId: string) => {
  const yDoc = useYDoc();
  const socket = useSocket();

  useEffect(() => {
    const startListener = () => {
      syncSuspenseProxy[pageId] = true;
    };

    const endListener = () => {
      syncSuspenseProxy[pageId] = false;
      const update = encodeStateAsUpdate(yDoc);
      socket?.emit("DOC_UPDATE", {
        pageId,
        update,
      });
    };

    editor?.dom.addEventListener("compositionstart", startListener);
    editor?.dom.addEventListener("compositionend", endListener);

    return () => {
      editor?.dom.removeEventListener("compositionstart", startListener);
      editor?.dom.removeEventListener("compositionend", endListener);
    };
  }, [pageId, editor?.dom, socket, yDoc]);
};
