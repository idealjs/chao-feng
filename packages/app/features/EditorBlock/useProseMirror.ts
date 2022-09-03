import { Schema } from "prosemirror-model";
import { EditorState } from "prosemirror-state";
import { EditorView } from "prosemirror-view";
import { useEffect, useMemo, useRef, useState } from "react";
import { ySyncPlugin } from "y-prosemirror";

import usePropertiesDoc from "../../hooks/yjs/usePropertiesDoc";

const useProseMirror = <E extends HTMLElement>(
  blockId: string,
  schema: Schema
): [React.RefObject<E>, EditorView | null] => {
  const ref = useRef<E>(null);

  const [editor, setEditor] = useState<EditorView | null>(null);

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
      });
      setEditor(editor);
      return () => {
        editor.destroy();
        setEditor(null);
      };
    }
  }, [schema, yXmlFragment]);

  return [ref, editor];
};

export default useProseMirror;
