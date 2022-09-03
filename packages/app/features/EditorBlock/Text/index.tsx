import { schema } from "@idealjs/chao-feng-shared/lib/prosemirror";
import { EditorState } from "prosemirror-state";
import { DirectEditorProps } from "prosemirror-view";
import { useEffect, useMemo, useState } from "react";
import { ySyncPlugin } from "y-prosemirror";

import usePropertiesDoc from "../../../hooks/yjs/usePropertiesDoc";
import { IBaseTextBlock } from "../../../lib/type";
import Composistion from "../Composistion";
import PMEditor from "../PMEditor";

export interface ITextBlock extends IBaseTextBlock {
  type: "text";
}
interface IProps {
  blockId: string;
}

import { Plugin } from "prosemirror-state";

import SelectionSizeTooltip from "../SelectionSizeTooltip";

let selectionSizePlugin = new Plugin({
  view(editorView) {
    return new SelectionSizeTooltip(editorView);
  },
});

const Text = (props: IProps) => {
  const { blockId } = props;

  const [editorProps, setEditorProps] = useState<DirectEditorProps | null>(
    null
  );

  const propertiesDoc = usePropertiesDoc(blockId);

  const yXmlFragment = useMemo(() => {
    return propertiesDoc?.getXmlFragment("prosemirror");
  }, [propertiesDoc]);

  useEffect(() => {
    if (yXmlFragment) {
      setEditorProps({
        state: EditorState.create({
          schema,
          plugins: [ySyncPlugin(yXmlFragment), selectionSizePlugin],
        }),
      });
    }
  }, [yXmlFragment]);

  return (
    editorProps && (
      <PMEditor editorProps={editorProps}>
        <Composistion blockId={blockId} />
      </PMEditor>
    )
  );
};

export default Text;

export const isTextBlock = (block?: { type: string }): block is ITextBlock => {
  if (block?.type === "text") {
    return true;
  }
  return false;
};
