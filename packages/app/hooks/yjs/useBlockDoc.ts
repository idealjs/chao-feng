import { Doc } from "yjs";

import { useYDocSelector } from "../../lib/react-yjs";
import { useYDoc } from "../../lib/react-yjs/src/YDocProvider";

const useBlockDoc = (blockId: string) => {
  const rootDoc = useYDoc();
  return useYDocSelector(rootDoc, (yDoc) => {
    return yDoc.getMap<Doc>("blockDocs").get(blockId);
  });
};

export default useBlockDoc;
