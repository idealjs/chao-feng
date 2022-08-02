import { schema } from "@idealjs/chao-feng-shared/lib/prosemirror";
import { EditorState } from "prosemirror-state";
import { EditorView } from "prosemirror-view";
import { useEffect, useRef, useState } from "react";
import { prosemirrorJSONToYDoc, ySyncPlugin } from "y-prosemirror";
import { applyUpdate, Doc, encodeStateAsUpdate, XmlFragment } from "yjs";

import { useSocket } from "../../features/SocketProvider";
import { useYDocSelector } from "../../lib/react-yjs";
import { useYDoc } from "../../lib/react-yjs/src/YDocProvider";

interface IProps {
  pageId: string;
  blockId: string;
}

const MockEditor = (props: IProps) => {
  const { pageId, blockId } = props;

  const ref = useRef<HTMLDivElement>(null);
  const socket = useSocket();
  const yDoc = useYDoc();
  const [yXmlFragment, setYXmlFragment] = useState<XmlFragment | null>(null);

  const [editor, setEditor] = useState<EditorView | null>(null);

  useEffect(() => {
    if (yXmlFragment) {
      const editor = new EditorView(ref.current, {
        state: EditorState.create({
          schema,
          plugins: [yXmlFragment && ySyncPlugin(yXmlFragment)].filter(
            (p) => p != null
          ),
        }),
      });
      setEditor(editor);
      return () => {
        editor.destroy();
        setEditor(null);
      };
    }
  }, [yDoc, yXmlFragment]);

  useEffect(() => {
    const listener = () => {
      const yXmlFragment = (
        yDoc?.getMap(pageId).get(blockId) as Doc | null
      )?.getXmlFragment("prosemirror");
      console.log("test test update", yXmlFragment);
      setYXmlFragment(yXmlFragment ?? null);
    };

    yDoc?.on("update", listener);
    return () => {
      yDoc?.off("update", listener);
    };
  }, [blockId, pageId, yDoc]);

  useEffect(() => {
    const initListener = (msg: { update: Uint8Array }) => {
      const doc = new Doc();

      doc.getArray("blockOrder").insert(0, ["a", "b", "c"]);

      ["a", "b", "c"].forEach((blockId) => {
        const subDoc = prosemirrorJSONToYDoc(schema, {
          type: "doc",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "aaaaa",
                },
              ],
            },
          ],
        });

        doc.getMap(pageId).set(blockId, subDoc);
      });

      if (yDoc) applyUpdate(yDoc, encodeStateAsUpdate(doc));
    };
    socket?.on("init", initListener);
    return () => {
      socket?.off("init", initListener);
    };
  }, [pageId, socket, yDoc]);

  return (
    <div>
      <div ref={ref} style={{ height: "100px", width: "100px" }}></div>
      <button
        onClick={() => {
          console.log("test test", editor?.state.toJSON(), yDoc);
        }}
      >
        test
      </button>
    </div>
  );
};

export default MockEditor;
