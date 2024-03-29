import { Doc } from "yjs";

import { useYDocSelector } from "../../lib/react-yjs";
import { useYDoc } from "../../lib/react-yjs/src/YDocProvider";

const usePropertiesDoc = (blockId: string) => {
  const rootDoc = useYDoc();
  return useYDocSelector(rootDoc, (yDoc) => {
    return yDoc?.getMap<Doc>("docMapOfBlockProperties").get(blockId);
  });
};

export default usePropertiesDoc;
