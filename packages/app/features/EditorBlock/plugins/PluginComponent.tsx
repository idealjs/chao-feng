import { ReactNode } from "react";
import { createPortal } from "react-dom";

import { useEditorView } from "../PMEditor";
import usePluginKey, { StoredPluginKey } from "./usePluginKey";

const PluginComponent = (props: {
  storedPluginKey: StoredPluginKey<{ container: HTMLDivElement }>;
  component: ReactNode;
}) => {
  const { storedPluginKey, component } = props;

  const editor = useEditorView();
  const container = usePluginKey(storedPluginKey, (pluginKey) => {
    return pluginKey.getState(editor.state)?.container;
  });

  return container != null ? createPortal(component, container) : null;
};

export default PluginComponent;
