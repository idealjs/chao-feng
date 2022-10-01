import { XmlFragment } from "yjs";

import { useYDocSelector } from "../../lib/react-yjs";
import { useYDoc } from "../../lib/react-yjs/src/YDocProvider";

const useBlockXmlFragment = (blockId: string) => {
  const rootDoc = useYDoc();
  return useYDocSelector(rootDoc, (yDoc) => {
    return yDoc?.getMap<XmlFragment>("prosemirror").get(blockId);
  });
};

export default useBlockXmlFragment;
