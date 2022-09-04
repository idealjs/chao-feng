import { PluginKey } from "prosemirror-state";
import { ReactNode, useMemo } from "react";
import { createPortal } from "react-dom";

import { useEditorView } from "../PMEditor";

const PluginComponent = (props: {
  pluginKey: PluginKey;
  component: ReactNode;
}) => {
  const { pluginKey, component } = props;
  const editor = useEditorView();

  const container = useMemo(
    () => pluginKey.getState(editor.state).container,
    [editor.state, pluginKey]
  );
  return container && createPortal(component, container);
};

export default PluginComponent;
