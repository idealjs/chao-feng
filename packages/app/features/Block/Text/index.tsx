import { schema } from "@idealjs/chao-feng-shared/lib/prosemirror";
import { EditorState } from "prosemirror-state";
import { EditorView } from "prosemirror-view";
import { useEffect, useMemo, useRef, useState } from "react";
import { ySyncPlugin } from "y-prosemirror";
import { Doc } from "yjs";

import useBlockDoc from "../../../hooks/yjs/useBlockDoc";
import { useYDocSelector } from "../../../lib/react-yjs";
import { IBaseTextBlock } from "../../../lib/type";

export interface ITextBlock extends IBaseTextBlock {
  type: "text";
}
interface IProps {
  blockId: string;
}

const Text = (props: IProps) => {
  const { blockId } = props;
  const ref = useRef<HTMLDivElement>(null);
  const [editor, setEditor] = useState<EditorView | null>(null);

  const blockDoc = useBlockDoc(blockId);

  const yXmlFragment = useMemo(() => {
    return blockDoc?.getXmlFragment("prosemirror");
  }, [blockDoc]);

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

  return <div ref={ref}></div>;
};

export default Text;

export const isTextBlock = (block?: { type: string }): block is ITextBlock => {
  if (block?.type === "text") {
    return true;
  }
  return false;
};
