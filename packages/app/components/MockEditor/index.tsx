import { schema } from "@idealjs/chao-feng-shared/lib/prosemirror";
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
