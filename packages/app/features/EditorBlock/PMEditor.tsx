import { DirectEditorProps, EditorView } from "prosemirror-view";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

const context = createContext<EditorView | null>(null);

interface IProps {
  editorProps: DirectEditorProps;
}

const PMEditor = (props: PropsWithChildren<IProps>) => {
  const { children, editorProps } = props;
  const ref = useRef<HTMLDivElement>(null);
  const [editor, setEditor] = useState<EditorView | null>(null);

  useEffect(() => {
    const editor = new EditorView(ref.current, editorProps);
    setEditor(editor);
    return () => {
      setEditor(null);
      editor.destroy();
    };
  }, [editorProps]);

  return (
    <div ref={ref} className={"relative"}>
      {editor && <context.Provider value={editor}>{children}</context.Provider>}
    </div>
  );
};

export default PMEditor;

export const useEditorView = () => {
  const editorView = useContext(context);

  if (editorView == null) {
    throw new Error("editorView is null");
  }

  return editorView;
};
