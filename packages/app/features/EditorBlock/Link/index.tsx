import { schema } from "@idealjs/chao-feng-shared/lib/prosemirror";
import { EditorState } from "prosemirror-state";
import { DirectEditorProps } from "prosemirror-view";
import { useEffect, useMemo, useState } from "react";
import { ySyncPlugin } from "y-prosemirror";

import usePropertiesDoc from "../../../hooks/yjs/usePropertiesDoc";
import { IBaseTextBlock } from "../../../lib/type";
import Composistion from "../Composistion";
import PluginComponent from "../plugins/PluginComponent";
import useCreatePlugin from "../plugins/useCreatePlugin";
import { StoredPluginKey } from "../plugins/usePluginKey";
import PMEditor from "../PMEditor";
import PMLink from "./PMLink";
export interface ILinkBlock extends IBaseTextBlock {
  type: "text";
  properties: {
    title?: string | undefined;
    linkId: string;
  };
}

interface IProps {
  blockId: string;
}

const Link = (props: IProps) => {
  const { blockId } = props;

  const [editorProps, setEditorProps] = useState<DirectEditorProps | null>(
    null
  );
  const storedPluginKey = useMemo(
    () => new StoredPluginKey<{ container: HTMLDivElement }>(blockId),
    [blockId]
  );

  const propertiesDoc = usePropertiesDoc(blockId);

  const yXmlFragment = useMemo(() => {
    return propertiesDoc?.getXmlFragment("prosemirror");
  }, [propertiesDoc]);

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
        <Composistion blockId={blockId} />
        <PluginComponent
          className={"absolute"}
          storedPluginKey={storedPluginKey}
          component={<PMLink storedPluginKey={storedPluginKey} />}
        />
      </PMEditor>
    )
  );
};

export default Link;

export const isLinkBlock = (block?: { type: string }): block is ILinkBlock => {
  if (block?.type === "link") {
    return true;
  }
  return false;
};
