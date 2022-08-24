import type { Block } from "@prisma/client";

import useBlock from "../../hooks/yjs/useBlock";
import useInitBlockDoc from "../../hooks/yjs/useInitBlockDoc";
import useSyncBlockDoc from "../../hooks/yjs/useSyncBlockDoc";
import { useYDoc } from "../../lib/react-yjs/src/YDocProvider";
import Link, { isLinkBlock } from "./Link";
import Text, { isTextBlock } from "./Text";
import Toolbox from "./Toolbox";

interface IProps {
  blockId: string;
}

const BlockFactory = (props: IProps) => {
  const { blockId } = props;

  const rootDoc = useYDoc();
  const block = useBlock(blockId);

  useSyncBlockDoc(blockId);
  useInitBlockDoc(blockId);

  if (isTextBlock(block)) {
    return (
      <Toolbox blockId={block.id}>
        <Text blockId={block.id} />
      </Toolbox>
    );
  }

  if (isLinkBlock(block)) {
    return (
      <Toolbox blockId={block.id}>
        <Link block={block} />
      </Toolbox>
    );
  }

  return block ? (
    <Toolbox blockId={block.id}>unknown block {block.type}</Toolbox>
  ) : (
    <div
      onClick={() => {
        console.log("test test", rootDoc?.getMap<Block>("blocks").get(blockId));
      }}
    >
      no block data
    </div>
  );
};

export default BlockFactory;
