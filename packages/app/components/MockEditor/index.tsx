import { Node as PMNode, Schema } from "prosemirror-model";
import { EditorState } from "prosemirror-state";
import { EditorView } from "prosemirror-view";
import { useEffect, useRef, useState } from "react";
import { prosemirrorJSONToYDoc, ySyncPlugin } from "y-prosemirror";

const MockEditor = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [yDoc] = useState(
    prosemirrorJSONToYDoc(schema, {
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
    })
  );

  const [editor, setEditor] = useState<EditorView | null>(null);

  useEffect(() => {
    const yXmlFragment = yDoc?.getXmlFragment("prosemirror");

    const editor = new EditorView(ref.current, {
      state: EditorState.create({
        schema,
        plugins: [yXmlFragment && ySyncPlugin(yXmlFragment)],
      }),
    });
    setEditor(editor);
    return () => {
      editor.destroy();
      setEditor(null);
    };
  }, [yDoc]);

  return (
    <div>
      <div ref={ref} style={{ height: "100px", width: "100px" }}></div>
      <button
        onClick={() => {
          console.log("test test", editor?.state.toJSON());
        }}
      >
        test
      </button>
    </div>
  );
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
