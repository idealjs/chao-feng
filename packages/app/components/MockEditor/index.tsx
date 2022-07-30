import { Node as PMNode, Schema } from "prosemirror-model";
import { EditorState } from "prosemirror-state";
import { EditorView } from "prosemirror-view";
import { useEffect, useRef, useState } from "react";

const MockEditor = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [editor, setEditor] = useState<EditorView | null>(null);
  const [editorState] = useState(
    EditorState.create({
      schema,
    })
  );

  useEffect(() => {
    const editor = new EditorView(ref.current, {
      state: editorState,
    });
    setEditor(editor);
    return () => {
      editor.destroy();
      setEditor(null);
    };
  }, [editorState]);

  return <div ref={ref} style={{ height: "100px", width: "100px" }} />;
};
export default MockEditor;

export const schema = new Schema({
  nodes: {
    doc: {
      content: "block+",
    },
    paragraph: {
      content: "inline*",
      group: "block",
      selectable: false,
      parseDOM: [{ tag: "p" }],
      toDOM() {
        return ["p", 0];
      },
    },
    pmBlockquote: {
      content: "paragraph+",
      group: "block",
      defining: true,
      selectable: false,
      attrs: {
        class: { default: "pm-blockquote" },
      },
      parseDOM: [{ tag: "blockquote" }],
      toDOM(node: PMNode) {
        return ["blockquote", node.attrs, 0];
      },
    },
    blockquote: {
      content: "paragraph+",
      group: "block",
      defining: true,
      selectable: false,
      parseDOM: [{ tag: "blockquote" }],
      toDOM() {
        return ["blockquote", 0];
      },
    },
    text: {
      group: "inline",
    },
  },
});
