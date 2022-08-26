import { schema } from "@idealjs/chao-feng-shared/lib/prosemirror";
import { EditorState } from "prosemirror-state";
import { EditorView } from "prosemirror-view";
import { useEffect, useMemo, useRef, useState } from "react";
import { ySyncPlugin } from "y-prosemirror";

import { useSocket } from "../../features/SocketProvider";
import useLoadPropertiesDoc from "../../hooks/yjs/useLoadPropertiesDoc";
import usePropertiesDoc from "../../hooks/yjs/usePropertiesDoc";
import useSyncBlockDoc from "../../hooks/yjs/useSyncBlockDoc";

interface IProps {
  blockId: string;
}

const Block = (props: IProps) => {
  const { blockId } = props;
  const ref = useRef<HTMLDivElement>(null);
  const [editor, setEditor] = useState<EditorView | null>(null);
  const socket = useSocket();
  const propertiesDoc = usePropertiesDoc(blockId);
  const yXmlFragment = useMemo(() => {
    return propertiesDoc?.getXmlFragment("prosemirror");
  }, [propertiesDoc]);

  useSyncBlockDoc(blockId);

  useLoadPropertiesDoc(blockId);

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
