import { schema } from "@idealjs/chao-feng-shared/lib/prosemirror";
import { EditorState } from "prosemirror-state";
import { DirectEditorProps } from "prosemirror-view";
import { useEffect, useMemo, useState } from "react";
import { ySyncPlugin } from "y-prosemirror";

import usePageId from "../../../hooks/usePageId";
import useBlockXmlFragment from "../../../hooks/yjs/useBlockXmlFragment";
import { IBaseTextBlock } from "../../../lib/type";
import Composistion from "../Composistion";
import PluginComponent from "../plugins/PluginComponent";
import useCreatePlugin from "../plugins/useCreatePlugin";
import { StoredPluginKey } from "../plugins/usePluginKey";
import PMEditor from "../PMEditor";

export interface ITextBlock extends IBaseTextBlock {
  type: "text";
}

interface IProps {
  blockId: string;
}

const Text = (props: IProps) => {
  const { blockId } = props;

  const [editorProps, setEditorProps] = useState<DirectEditorProps | null>(
    null
  );
  const storedPluginKey = useMemo(
    () => new StoredPluginKey<{ container: HTMLDivElement }>(blockId),
    [blockId]
  );

  const pageId = usePageId();

  const yXmlFragment = useBlockXmlFragment(blockId);

  const createPlugin = useCreatePlugin();

  useEffect(() => {
    if (yXmlFragment) {
      setEditorProps({
        state: EditorState.create({
          schema,
          plugins: [ySyncPlugin(yXmlFragment), createPlugin(storedPluginKey)],
        }),
      });
    }
  }, [createPlugin, storedPluginKey, yXmlFragment]);

  return (
    editorProps && (
      <PMEditor editorProps={editorProps}>
        {pageId != null && <Composistion pageId={pageId} />}
      </PMEditor>
    )
  );
};

export default Text;

export const isTextBlock = (
  block: { type: string } | undefined | null
): block is ITextBlock => {
  if (block?.type === "text") {
    return true;
  }
  return false;
};
