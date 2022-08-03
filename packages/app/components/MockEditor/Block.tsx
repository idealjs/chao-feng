import { schema } from "@idealjs/chao-feng-shared/lib/prosemirror";
import { EditorState } from "prosemirror-state";
import { EditorView } from "prosemirror-view";
import { useEffect, useRef, useState } from "react";
import { ySyncPlugin } from "y-prosemirror";
import { Doc } from "yjs";

import usePageId from "../../hooks/usePageId";
import { useYDocSelector } from "../../lib/react-yjs";

interface IProps {
  blockId: string;
}

const Block = (props: IProps) => {
  const { blockId } = props;
  const ref = useRef<HTMLDivElement>(null);
  const [editor, setEditor] = useState<EditorView | null>(null);

  const pageId = usePageId();
  const yXmlFragment = useYDocSelector((root) => {
    return (root?.getMap(pageId).get(blockId) as Doc | null)?.getXmlFragment(
      "prosemirror"
    );
  });

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
  }, [yXmlFragment]);

  return (
    <div ref={ref} style={{ height: "100px", width: "100px" }}>
      Block
    </div>
  );
};
export default Block;
