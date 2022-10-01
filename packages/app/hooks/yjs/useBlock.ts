import { useMemo } from "react";
import { useSnapshot } from "valtio";

import { proxyBlocks } from "../../features/state";

const useBlock = (blockId: string) => {
  const blocks = useSnapshot(proxyBlocks);

  return useMemo(() => {
    return blocks[blockId];
  }, [blockId, blocks]);
};

export default useBlock;
