import { Doc } from "yjs";

import { useYDocSelector } from "../../lib/react-yjs";

const useBlockDoc = (blockId: string) => {
  return useYDocSelector((yDoc) => {
    return yDoc.getMap<Doc>("blockDocs").get(blockId);
  });
};

export default useBlockDoc;
