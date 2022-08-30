import { schema } from "@idealjs/chao-feng-shared/lib/prosemirror";
import { EditorState } from "prosemirror-state";
import { EditorView } from "prosemirror-view";
import { ReactPortal, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ySyncPlugin } from "y-prosemirror";
import { encodeStateAsUpdate } from "yjs";

import usePropertiesDoc from "../../../hooks/yjs/usePropertiesDoc";
import { syncSuspenseProxy } from "../../../hooks/yjs/useSyncPropertiesDoc";
import { IBaseTextBlock } from "../../../lib/type";
import useStateRef from "../../../lib/useStateRef";
import { useSocket } from "../../SocketProvider";

export interface ITextBlock extends IBaseTextBlock {
  type: "text";
}
interface IProps {
  blockId: string;
}

const Text = (props: IProps) => {
  const { blockId } = props;
  const ref = useRef<HTMLDivElement>(null);
  const [target, setTarget] = useState<HTMLDivElement | null>(null);
  const [portal, setPortal] = useState<ReactPortal | null>(null);
  const portalRef = useStateRef(portal);
  const [editor, setEditor] = useState<EditorView | null>(null);
  const [text, setText] = useState<string>();
  const socket = useSocket();

  const propertiesDoc = usePropertiesDoc(blockId);

  const yXmlFragment = useMemo(() => {
    return propertiesDoc?.getXmlFragment("prosemirror");
  }, [propertiesDoc]);

  useEffect(() => {
    if (yXmlFragment) {
      const editor = new EditorView(ref.current, {
        state: EditorState.create({
          schema,
          plugins: [ySyncPlugin(yXmlFragment)],
        }),
        nodeViews: {
          paragraph: (node, view, getPos, decorations) => {
            const dom = document.createElement("div");
            dom.classList.add("ProseMirror__dom");

            let contentDOM;
            if (!node.isLeaf) {
              contentDOM = document.createElement("span");
              contentDOM.classList.add("ProseMirror__contentDOM");
              dom.appendChild(contentDOM);
            }
            setTarget(dom);

            if (portalRef.current == null) {
              const portal = createPortal(
                <div className="ProseMirror__reactComponent"></div>,
                dom
              );
              setPortal(portal);
            }
            setText(node.text);
            return {
              dom,
              contentDOM,
              destroy: () => {
                dom.remove();
                setPortal(null);
              },
            };
          },
        },
      });
      setEditor(editor);
      return () => {
        editor.destroy();
        setEditor(null);
      };
    }
  }, [portalRef, yXmlFragment]);

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

  return <div ref={ref}>{portal}</div>;
};

export default Text;

export const isTextBlock = (block?: { type: string }): block is ITextBlock => {
  if (block?.type === "text") {
    return true;
  }
  return false;
};
