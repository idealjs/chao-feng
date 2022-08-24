import type { Block } from "@prisma/client";

import { useYDocSelector } from "../../lib/react-yjs";
import { useYDoc } from "../../lib/react-yjs/src/YDocProvider";

const useBlock = (blockId: string) => {
  const rootDoc = useYDoc();
  return useYDocSelector(rootDoc, (yDoc) => {
    return yDoc?.getMap<Block>("blocks").get(blockId);
  });
};

export default useBlock;
